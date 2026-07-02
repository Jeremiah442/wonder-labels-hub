import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Package, Users, MessageSquare, CheckCircle, Clock, XCircle, Eye, Pencil, Printer, Palette } from 'lucide-react';
import type { SavedDesignRow, ProductType } from '@/lib/savedDesigns';
import { CircularLabelPreview, type CircularLabelData } from '@/components/previews/CircularLabelPreview';
import { SquareLabelPreview, type SquareLabelData } from '@/components/previews/SquareLabelPreview';
import { RectangularLabelPreview, type RectangularLabelData } from '@/components/previews/RectangularLabelPreview';
import { MixedLabelPreview, type MixedLabelData } from '@/components/previews/MixedLabelPreview';

interface Order {
  id: string;
  user_id: string;
  label_type: string;
  size: string;
  material: string;
  quantity: number;
  price: number | null;
  status: string;
  notes: string | null;
  file_path: string | null;
  created_at: string;
}

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  request_type: string | null;
  created_at: string;
}

interface Profile {
  user_id: string;
  full_name: string | null;
}

const statusOptions = ['pending', 'processing', 'completed', 'cancelled'];

const productTypeLabels: Record<ProductType, string> = {
  circular: 'Circular Labels',
  square: 'Square Labels',
  rectangular: 'Rectangular Labels',
  mixed: 'Mixed Labels',
};

const productTypeEditPath: Record<ProductType, string> = {
  circular: '/designer',
  square: '/designer/square',
  rectangular: '/designer/rectangular',
  mixed: '/designer/mixed',
};

function renderSavedDesignPreview(row: SavedDesignRow) {
  switch (row.product_type) {
    case 'circular':
      return <CircularLabelPreview labelData={row.design as unknown as CircularLabelData} />;
    case 'square':
      return <SquareLabelPreview labelData={row.design as unknown as SquareLabelData} />;
    case 'rectangular':
      return <RectangularLabelPreview labelData={row.design as unknown as RectangularLabelData} />;
    case 'mixed':
      return <MixedLabelPreview labelData={row.design as unknown as MixedLabelData} />;
    default:
      return null;
  }
}

export default function Admin() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [savedDesigns, setSavedDesigns] = useState<SavedDesignRow[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [previewRow, setPreviewRow] = useState<SavedDesignRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalContacts: 0,
  });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/');
      toast.error('Access denied. Admin privileges required.');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin]);

  const fetchData = async () => {
    try {
      const [ordersRes, contactsRes, savedDesignsRes, profilesRes] = await Promise.all([
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('saved_designs').select('*').order('updated_at', { ascending: false }),
        supabase.from('profiles').select('user_id, full_name'),
      ]);

      if (ordersRes.error) throw ordersRes.error;
      if (contactsRes.error) throw contactsRes.error;
      if (savedDesignsRes.error) throw savedDesignsRes.error;
      if (profilesRes.error) throw profilesRes.error;

      setOrders(ordersRes.data || []);
      setContacts(contactsRes.data || []);
      setSavedDesigns(
        (savedDesignsRes.data || []).map((row) => ({ ...row, design: row.design as Record<string, unknown> })) as SavedDesignRow[]
      );
      setProfiles(profilesRes.data || []);

      setStats({
        totalOrders: ordersRes.data?.length || 0,
        pendingOrders: ordersRes.data?.filter(o => o.status === 'pending').length || 0,
        totalContacts: contactsRes.data?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const customerNameFor = (userId: string) => profiles.find((p) => p.user_id === userId)?.full_name || 'Unnamed customer';

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      toast.success('Order status updated');
      fetchData();
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-primary" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Package className="w-4 h-4 text-muted-foreground" />;
    }
  };

  if (authLoading || !user || !isAdmin) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12">
        <div className="container px-4">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage orders, products, and customer inquiries.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-xl bg-gradient-card border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.totalOrders}</div>
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-gradient-card border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.pendingOrders}</div>
                  <div className="text-sm text-muted-foreground">Pending Orders</div>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-gradient-card border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.totalContacts}</div>
                  <div className="text-sm text-muted-foreground">Contact Requests</div>
                </div>
              </div>
            </div>
          </div>

          <Tabs className="space-y-6">
            <TabsList className="bg-surface-1 border border-border">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="saved-designs">Saved Designs</TabsTrigger>
              <TabsTrigger value="contacts">Contact Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-4">
              {loading ? (
                <div className="text-center py-12 text-muted-foreground">Loading...</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12 rounded-xl bg-gradient-card border border-border">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    No orders yet
                  </h3>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Details</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Quantity</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b border-border/50 hover:bg-surface-2">
                          <td className="py-4 px-4">
                            <div className="font-medium text-foreground">{order.label_type}</div>
                            <div className="text-sm text-muted-foreground">{order.id.slice(0, 8)}...</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm text-foreground">{order.size}</div>
                            <div className="text-sm text-muted-foreground">{order.material}</div>
                          </td>
                          <td className="py-4 px-4 text-foreground">{order.quantity}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(order.status)}
                              <span className="capitalize">{order.status}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            <Select
                              value={order.status}
                              onValueChange={(value) => updateOrderStatus(order.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {statusOptions.map((status) => (
                                  <SelectItem key={status} value={status}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="saved-designs" className="space-y-4">
              {loading ? (
                <div className="text-center py-12 text-muted-foreground">Loading...</div>
              ) : savedDesigns.length === 0 ? (
                <div className="text-center py-12 rounded-xl bg-gradient-card border border-border">
                  <Palette className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    No saved designs yet
                  </h3>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Product</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Last Updated</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedDesigns.map((row) => (
                        <tr key={row.id} className="border-b border-border/50 hover:bg-surface-2">
                          <td className="py-4 px-4 font-medium text-foreground">{customerNameFor(row.user_id)}</td>
                          <td className="py-4 px-4">
                            <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              {productTypeLabels[row.product_type]}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            {new Date(row.updated_at).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => setPreviewRow(row)}
                                className="flex items-center gap-1 text-sm text-primary hover:underline"
                              >
                                <Eye className="w-4 h-4" />
                                Preview
                              </button>
                              <button
                                type="button"
                                onClick={() => navigate(`${productTypeEditPath[row.product_type]}?editId=${row.id}`)}
                                className="flex items-center gap-1 text-sm text-primary hover:underline"
                              >
                                <Pencil className="w-4 h-4" />
                                Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="contacts" className="space-y-4">
              {loading ? (
                <div className="text-center py-12 text-muted-foreground">Loading...</div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-12 rounded-xl bg-gradient-card border border-border">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    No contact requests yet
                  </h3>
                </div>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="p-6 rounded-xl bg-gradient-card border border-border">
                      <div className="flex flex-wrap justify-between gap-4 mb-4">
                        <div>
                          <h3 className="font-semibold text-foreground">{contact.name}</h3>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                          {contact.company && (
                            <p className="text-sm text-muted-foreground">{contact.company}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            {contact.request_type || 'General'}
                          </span>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(contact.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-foreground">{contact.message}</p>
                      {contact.phone && (
                        <p className="text-sm text-muted-foreground mt-2">Phone: {contact.phone}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Dialog open={!!previewRow} onOpenChange={(open) => !open && setPreviewRow(null)}>
        <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {previewRow ? `${customerNameFor(previewRow.user_id)} — ${productTypeLabels[previewRow.product_type]}` : 'Preview'}
            </DialogTitle>
            <DialogDescription>
              Read-only preview of the customer's saved design. Use Print to send it straight to a printer.
            </DialogDescription>
          </DialogHeader>

          {previewRow && (
            <>
              <div id="print-area" className="rounded-xl border border-border bg-white p-4 overflow-x-auto min-w-0">
                {renderSavedDesignPreview(previewRow)}
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => navigate(`${productTypeEditPath[previewRow.product_type]}?editId=${previewRow.id}`)}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="gold" onClick={() => window.print()}>
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
