import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCart } from '@/lib/cart';
import { Link, useNavigate } from 'react-router-dom';

function formatUGX(value: number) {
  return new Intl.NumberFormat('en-UG', { maximumFractionDigits: 0 }).format(value);
}

export default function Cart() {
  const { items, removeItem, setQuantity, clearCart, subtotalUGX, totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="py-12">
        <div className="container px-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Your Cart</h1>
              <p className="text-muted-foreground mt-1">{totalItems} item{totalItems === 1 ? '' : 's'}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Continue Shopping
              </Button>
              {items.length > 0 && (
                <Button variant="outline" onClick={clearCart}>
                  Clear
                </Button>
              )}
            </div>
          </div>

          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.length === 0 ? (
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">Your cart is empty.</p>
                    <div className="mt-4">
                      <Button variant="gold" asChild>
                        <Link to="/products">Browse Products</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-semibold text-foreground">{item.title}</div>
                          <div className="text-sm text-muted-foreground mt-1">Type: {item.productType}</div>
                          <div className="text-sm text-muted-foreground">Unit: {formatUGX(item.unitPriceUGX)} UGX</div>
                        </div>
                        <Button variant="outline" onClick={() => removeItem(item.id)}>
                          Remove
                        </Button>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Qty</span>
                          <Input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) => setQuantity(item.id, Number(e.target.value))}
                            className="w-24"
                          />
                        </div>
                        <div className="font-semibold">{formatUGX(item.unitPriceUGX * item.quantity)} UGX</div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">{formatUGX(subtotalUGX)} UGX</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Shipping is calculated at checkout.</p>
                  <div className="mt-6">
                    <Button
                      variant="gold"
                      size="lg"
                      className="w-full"
                      disabled={items.length === 0}
                      onClick={() => navigate('/checkout')}
                    >
                      Checkout
                    </Button>
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
