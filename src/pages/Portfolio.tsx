import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = ['All', 'Stickers', 'Packaging', 'Barcode', 'Specialty'];

const portfolioItems = [
  {
    id: 1,
    title: 'Organic Food Labels',
    category: 'Packaging',
    image: 'https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=600&h=600&fit=crop',
    client: 'GreenLeaf Foods',
  },
  {
    id: 2,
    title: 'Craft Beer Labels',
    category: 'Packaging',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&h=600&fit=crop',
    client: 'Mountain Brewery',
  },
  {
    id: 3,
    title: 'Brand Stickers',
    category: 'Stickers',
    image: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=600&h=600&fit=crop',
    client: 'TechStart Inc',
  },
  {
    id: 4,
    title: 'Inventory Barcodes',
    category: 'Barcode',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop',
    client: 'Global Logistics',
  },
  {
    id: 5,
    title: 'Holographic Labels',
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1615799998603-7c6270a45196?w=600&h=600&fit=crop',
    client: 'Luxury Cosmetics',
  },
  {
    id: 6,
    title: 'Wine Labels',
    category: 'Packaging',
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&h=600&fit=crop',
    client: 'Valley Vineyards',
  },
  {
    id: 7,
    title: 'Event Stickers',
    category: 'Stickers',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
    client: 'Festival Corp',
  },
  {
    id: 8,
    title: 'Product QR Codes',
    category: 'Barcode',
    image: 'https://images.unsplash.com/photo-1595079837624-a5f6820ba55e?w=600&h=600&fit=crop',
    client: 'Smart Retail',
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 opacity-0 animate-fade-up">
              Our <span className="text-gradient-gold">Portfolio</span>
            </h1>
            <p className="text-lg text-muted-foreground opacity-0 animate-fade-up stagger-1">
              Explore our work and see how we've helped businesses create stunning labels that stand out.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Gallery */}
      <section className="py-24">
        <div className="container px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'gold' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative aspect-square rounded-xl overflow-hidden opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs text-primary font-medium uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.client}</p>
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
            Ready to Start Your Project?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Let's create something amazing together. Contact us to discuss your labeling needs.
          </p>
          <Button variant="gold" size="lg" asChild>
            <Link to="/contact">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
