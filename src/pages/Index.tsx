import { Link } from 'react-router-dom';
import { ArrowRight, Star, Zap, Shield, Package, Printer, BarChart3, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import heroBg from '@/assets/hero-bg.jpg';

const services = [
  {
    icon: Package,
    title: 'Custom Stickers',
    description: 'Premium quality stickers with vibrant colors and durable materials for any surface.',
  },
  {
    icon: Printer,
    title: 'Packaging Labels',
    description: 'Professional packaging labels that elevate your brand and product presentation.',
  },
  {
    icon: BarChart3,
    title: 'Barcode Labels',
    description: 'High-precision barcode and product labels for inventory and retail needs.',
  },
  {
    icon: Zap,
    title: 'Bulk Printing',
    description: 'Cost-effective bulk printing solutions for businesses of all sizes.',
  },
];

const features = [
  'Premium quality materials',
  'Fast turnaround times',
  'Competitive pricing',
  'Expert design support',
  'Eco-friendly options',
  'Satisfaction guaranteed',
];

const stats = [
  { value: '10K+', label: 'Labels Delivered' },
  { value: '500+', label: 'Happy Clients' },
  { value: '15+', label: 'Years Experience' },
  { value: '99%', label: 'Satisfaction Rate' },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Premium labels on marble surface"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        {/* Content */}
        <div className="container relative z-10 px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 opacity-0 animate-fade-up">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Premium Labeling Solutions</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 opacity-0 animate-fade-up stagger-1">
              Crafting{' '}
              <span className="text-gradient-gold">Wonder</span>
              <br />
              In Every Label
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up stagger-2">
              From custom stickers to premium packaging labels, we bring your brand to life with exceptional quality and precision printing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up stagger-3">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  Get a Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline-gold" size="xl" asChild>
                <Link to="/products">Explore Products</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-surface-1">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Our <span className="text-gradient-gold">Services</span>
            </h2>
            <p className="text-muted-foreground">
              Comprehensive labeling solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group p-6 rounded-xl bg-gradient-card border border-border hover:border-primary/50 transition-all duration-300 hover-lift opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface-1">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
                Why Choose{' '}
                <span className="text-gradient-gold">Wonder Labels</span>?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                We combine state-of-the-art printing technology with exceptional customer service to deliver labels that exceed expectations.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 opacity-0 animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Button variant="gold" size="lg" asChild>
                  <Link to="/about">
                    Learn More About Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-card border border-border p-8 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full">
                  {[Shield, Star, Zap, Package].map((Icon, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-xl bg-surface-2 border border-border flex items-center justify-center gold-glow opacity-0 animate-scale-in"
                      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                    >
                      <Icon className="w-12 h-12 text-primary" />
                    </div>
                  ))}
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-primary/5 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container px-4">
          <div className="relative rounded-3xl bg-gradient-hero border border-border overflow-hidden p-12 md:p-16">
            <div className="relative z-10 max-w-2xl">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
                Ready to Create{' '}
                <span className="text-gradient-gold">Amazing Labels</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Get started with a free quote today. Our team is ready to bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gold" size="lg" asChild>
                  <Link to="/contact">
                    Request a Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline-gold" size="lg" asChild>
                  <Link to="/portfolio">View Our Work</Link>
                </Button>
              </div>
            </div>

            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
              <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-primary blur-3xl" />
              <div className="absolute bottom-1/4 right-1/3 w-24 h-24 rounded-full bg-primary/50 blur-2xl" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
