import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Custom Stickers',
    description: 'High-quality custom stickers perfect for branding, packaging, and promotional use. Available in various shapes, sizes, and finishes.',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop',
    features: ['Die-cut shapes', 'Matte or glossy finish', 'Waterproof options', 'Bulk pricing'],
    price: 'From $0.10/sticker',
  },
  {
    id: 2,
    name: 'Packaging Labels',
    description: 'Professional packaging labels that enhance your product presentation. Perfect for food, cosmetics, and retail products.',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&h=400&fit=crop',
    features: ['FDA compliant', 'Custom sizes', 'Premium materials', 'Full color printing'],
    price: 'From $0.15/label',
  },
  {
    id: 3,
    name: 'Barcode Labels',
    description: 'High-precision barcode and QR code labels for inventory management, retail, and logistics applications.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    features: ['Scannable quality', 'Various formats', 'Thermal compatible', 'Durable adhesive'],
    price: 'From $0.05/label',
  },
  {
    id: 4,
    name: 'Product Labels',
    description: 'Versatile product labels for any industry. From wine bottles to electronics, we have the perfect solution.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    features: ['Industry specific', 'Custom shapes', 'Variable data', 'Premium adhesives'],
    price: 'From $0.12/label',
  },
  {
    id: 5,
    name: 'Roll Labels',
    description: 'Convenient roll labels for high-volume applications. Perfect for automated labeling systems and fast-paced production.',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop',
    features: ['Core sizes available', 'Machine compatible', 'Large quantities', 'Quick turnaround'],
    price: 'From $0.08/label',
  },
  {
    id: 6,
    name: 'Specialty Labels',
    description: 'Unique specialty labels including holographic, metallic, and textured finishes for premium products.',
    image: 'https://images.unsplash.com/photo-1636622433525-f6e2c8a5b11e?w=600&h=400&fit=crop',
    features: ['Holographic options', 'Metallic finishes', 'Embossing available', 'Security features'],
    price: 'From $0.25/label',
  },
];

export default function Products() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 opacity-0 animate-fade-up">
              Our <span className="text-gradient-gold">Products</span>
            </h1>
            <p className="text-lg text-muted-foreground opacity-0 animate-fade-up stagger-1">
              Discover our comprehensive range of labeling solutions designed to meet every business need.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="group rounded-xl bg-gradient-card border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover-lift opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <ul className="space-y-1 mb-4">
                    {product.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-primary font-semibold">{product.price}</span>
                    <Button variant="ghost-gold" size="sm" asChild>
                      <Link to="/contact">
                        Get Quote
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-surface-1">
        <div className="container px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            We offer custom solutions for unique labeling needs. Contact us to discuss your requirements.
          </p>
          <Button variant="gold" size="lg" asChild>
            <Link to="/contact">
              Contact Us
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
