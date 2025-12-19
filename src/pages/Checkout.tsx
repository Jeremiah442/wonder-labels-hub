import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/lib/cart';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

function formatUGX(value: number) {
  return new Intl.NumberFormat('en-UG', { maximumFractionDigits: 0 }).format(value);
}

export default function Checkout() {
  const { items, subtotalUGX, shippingAddress, updateShippingAddress, clearCart } = useCart();
  const navigate = useNavigate();

  const canPlaceOrder =
    items.length > 0 &&
    shippingAddress.fullName.trim().length > 0 &&
    shippingAddress.phone.trim().length > 0 &&
    shippingAddress.addressLine1.trim().length > 0 &&
    shippingAddress.city.trim().length > 0;

  const placeOrder = () => {
    if (!canPlaceOrder) {
      toast({
        title: 'Missing information',
        description: 'Please fill in your shipping details to continue.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Order saved',
      description: 'Your shipping details have been captured. This is a demo checkout.',
    });

    clearCart();
    navigate('/');
  };

  return (
    <Layout>
      <section className="py-12">
        <div className="container px-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Checkout</h1>
              <p className="text-muted-foreground mt-1">Enter your shipping address</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/cart')}>
              Back to Cart
            </Button>
          </div>

          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={shippingAddress.fullName}
                        onChange={(e) => updateShippingAddress({ fullName: e.target.value })}
                        placeholder="Parent/Guardian name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={shippingAddress.phone}
                        onChange={(e) => updateShippingAddress({ phone: e.target.value })}
                        placeholder="e.g. 077..."
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="addressLine1">Address Line 1</Label>
                      <Input
                        id="addressLine1"
                        value={shippingAddress.addressLine1}
                        onChange={(e) => updateShippingAddress({ addressLine1: e.target.value })}
                        placeholder="House/Plot, Street"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="addressLine2">Address Line 2 (optional)</Label>
                      <Input
                        id="addressLine2"
                        value={shippingAddress.addressLine2}
                        onChange={(e) => updateShippingAddress({ addressLine2: e.target.value })}
                        placeholder="Area, landmark"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) => updateShippingAddress({ city: e.target.value })}
                        placeholder="Kampala"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="region">Region / District</Label>
                      <Input
                        id="region"
                        value={shippingAddress.region}
                        onChange={(e) => updateShippingAddress({ region: e.target.value })}
                        placeholder="Central"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code (optional)</Label>
                      <Input
                        id="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={(e) => updateShippingAddress({ postalCode: e.target.value })}
                        placeholder=""
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={shippingAddress.country}
                        onChange={(e) => updateShippingAddress({ country: e.target.value })}
                        placeholder="Uganda"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="notes">Delivery Notes (optional)</Label>
                      <Input
                        id="notes"
                        value={shippingAddress.notes}
                        onChange={(e) => updateShippingAddress({ notes: e.target.value })}
                        placeholder="Gate color, nearby shop, etc."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">{formatUGX(subtotalUGX)} UGX</span>
                  </div>
                  <div className="mt-6">
                    <Button variant="gold" size="lg" className="w-full" onClick={placeOrder}>
                      Place Order
                    </Button>
                    {!canPlaceOrder && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Fill in Full Name, Phone, Address Line 1, and City.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
