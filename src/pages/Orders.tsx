import { useEffect, useMemo, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { Package, Clock, CheckCircle, XCircle, Search } from 'lucide-react';

interface Order {
  id: string;
  label_type: string;
  size: string;
  material: string;
  quantity: number;
  price: number | null;
  status: string;
  notes: string | null;
  file_path: string | null;
  created_at: string;
  updated_at: string;
}

type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

const statusSteps: Array<{ key: OrderStatus; label: string }> = [
  { key: 'pending', label: 'Order placed' },
  { key: 'processing', label: 'In production' },
  { key: 'completed', label: 'Completed' },
];

function normalizeStatus(status: string): OrderStatus {
  const s = status.toLowerCase();
  if (s === 'processing' || s === 'completed' || s === 'cancelled') return s;
  return 'pending';
}

function statusBadgeVariant(status: OrderStatus): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'completed':
      return 'default';
    case 'processing':
      return 'secondary';
    case 'cancelled':
      return 'destructive';
    default:
      return 'outline';
  }
}

function statusIcon(status: OrderStatus) {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4" />;
    case 'processing':
      return <Clock className="w-4 h-4" />;
    case 'cancelled':
      return <XCircle className="w-4 h-4" />;
    default:
      return <Package className="w-4 h-4" />;
  }
}

function formatShortOrderId(id: string) {
  return id.length > 12 ? `${id.slice(0, 8)}…${id.slice(-4)}` : id;
}

export default function Orders() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;

    const fetchOrders = async () => {
      if (!user) return;

      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (cancelled) return;

      if (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      } else {
        setOrders((data as Order[]) || []);
      }

      setLoading(false);
    };

    fetchOrders();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const filteredOrders = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return orders;

    return orders.filter((o) => {
      const haystack = [
        o.id,
        o.label_type,
        o.size,
        o.material,
        o.status,
        o.notes ?? '',
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [orders, query]);

  return (
    <Layout>
      <section className="py-12">
        <div className="container px-4">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Order Tracking</h1>
              <p className="text-muted-foreground mt-1">Track your orders and see the latest status updates.</p>
            </div>

            <div className="w-full md:w-[360px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9"
                  placeholder="Search by order ID, label type, status…"
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            {loading ? (
              <div className="text-center py-16 text-muted-foreground">Loading your orders…</div>
            ) : filteredOrders.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Package className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <div className="font-medium text-foreground">No orders found</div>
                  <div className="text-sm text-muted-foreground mt-1">Try adjusting your search.</div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid lg:grid-cols-2 gap-6">
                {filteredOrders.map((order) => {
                  const status = normalizeStatus(order.status);
                  const isCancelled = status === 'cancelled';
                  const statusIndex = statusSteps.findIndex((s) => s.key === status);

                  return (
                    <Card key={order.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <div className="font-semibold text-foreground">{order.label_type}</div>
                              <Badge variant={statusBadgeVariant(status)} className="gap-1">
                                {statusIcon(status)}
                                <span className="capitalize">{status}</span>
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Order: <span className="font-mono">{formatShortOrderId(order.id)}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {order.size} • {order.material} • Qty {order.quantity}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</div>
                            {typeof order.price === 'number' && (
                              <div className="mt-1 font-semibold text-primary">{order.price.toFixed(2)}</div>
                            )}
                          </div>
                        </div>

                        <div className="mt-5">
                          {isCancelled ? (
                            <div className="rounded-xl border border-border bg-surface-1 p-4">
                              <div className="flex items-center gap-2 text-destructive font-medium">
                                <XCircle className="w-4 h-4" />
                                Cancelled
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                This order was cancelled. If you believe this is a mistake, please contact support.
                              </div>
                            </div>
                          ) : (
                            <div className="rounded-xl border border-border bg-surface-1 p-4">
                              <div className="text-sm font-medium text-foreground mb-3">Status</div>
                              <div className="flex items-center gap-3">
                                {statusSteps.map((step, idx) => {
                                  const done = idx <= statusIndex;
                                  const isLast = idx === statusSteps.length - 1;

                                  return (
                                    <div key={step.key} className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <div
                                          className={
                                            done
                                              ? 'w-3 h-3 rounded-full bg-primary'
                                              : 'w-3 h-3 rounded-full bg-muted'
                                          }
                                        />
                                        <div className={done ? 'text-sm text-foreground' : 'text-sm text-muted-foreground'}>
                                          {step.label}
                                        </div>
                                      </div>
                                      {!isLast && (
                                        <div className={done ? 'h-0.5 bg-primary/60 mt-3' : 'h-0.5 bg-muted mt-3'} />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="text-xs text-muted-foreground mt-3">
                                Last update: {new Date(order.updated_at).toLocaleString()}
                              </div>
                            </div>
                          )}

                          {order.notes && (
                            <div className="mt-4 text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">Notes:</span> {order.notes}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
