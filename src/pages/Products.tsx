import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Circular Labels',
    description: 'Perfect for labeling all your school items! Mix of stick-on labels with fun icons and colors. Waterproof and durable!',
    image: '/circular-labels.jpeg',
    features: ['200+ labels', 'Multiple colors', 'Fun icons', 'Waterproof'],
    price: '20,000 UGX',
    originalPrice: '',
    discount: '',
    link: '/designer',
  },
  {
    id: 2,
    name: 'Square Labels',
    description: 'Great starter pack! Perfect for labeling books, notebooks, and school supplies. Easy to stick and remove!',
    image: '/square-labels.jpg',
    features: ['100+ labels', 'Easy to apply', 'Various sizes', 'Kid-friendly'],
    price: '20,000 UGX',
    originalPrice: '',
    discount: '',
    link: '/designer/square',
  },
  {
    id: 3,
    name: 'Rectangular Labels',
    description: 'The perfect combo! Stick-on labels for books and iron-on labels for uniforms. Two great options in one pack!',
    image: '/rectangular-labels.png',
    features: ['Dual purpose', 'Iron-on included', 'Uniform ready', 'Long lasting'],
    price: '20,000 UGX',
    originalPrice: '',
    discount: '',
    link: '/designer/rectangular',
  },
  {
    id: 4,
    name: 'Mixed Labels',
    description: 'A reusable stamp for marking uniforms! Just press and stamp your name directly onto fabric. No need for labels!',
    image: '/mixed-labels.jpg',
    features: ['Reusable', 'Direct stamping', 'No labels needed', 'Quick application'],
    price: '20,000 UGX',
    originalPrice: '',
    discount: '',
    link: '/designer/mixed',
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
              School <span className="text-gradient-gold">Labels</span>
            </h1>
            <p className="text-lg text-muted-foreground opacity-0 animate-fade-up stagger-1">
              Fun and colorful labels to help kids keep track of their school items! Design your own personalized labels! 🎨
            </p>
            <div className="mt-6 opacity-0 animate-fade-up stagger-2">
              <Button variant="gold" size="lg" asChild>
                <Link to="/designer">
                  Start Designing Your Label
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
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
                {product.image && (
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <div className="pt-4 border-t border-border space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-primary font-bold text-lg">{product.price}</span>
                    </div>
                    <Button variant="gold" size="sm" className="w-full" asChild>
                      <Link to={product.link || '/designer'}>
                        Design Now
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
