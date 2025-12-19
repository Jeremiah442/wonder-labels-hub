import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Tag, Shirt, Footprints, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import heroBg from '@/assets/hero-bg.jpg';
import { useAuth } from '@/lib/auth';

const services = [
  {
    icon: Tag,
    title: 'Custom Name Sticker labels',
    description: 'Durable, waterproof name stickers designed to stay put and look great on bottles, lunchboxes, and more.',
  },
  {
    icon: Shirt,
    title: 'Custom Iron-On Name labels',
    description: 'Heat applied name labels that bond securely to clothing for a clean, long lasting finish.',
  },
  {
    icon: Footprints,
    title: 'Custom Shoe Labels',
    description: 'Tough, flexible labels made for shoes and are for perfect for school, sports, and everyday wear.',
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

export default function Index() {
  const { user } = useAuth();

  return (
    <Layout hideNavbar>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Premium labels on marble surface"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background" />
        </div>

        {/* Content */}
        <div className="container relative z-10 px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 text-center lg:text-left">
                <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 opacity-0 animate-fade-up stagger-1">
                  Crafting{' '}
                  <span className="text-gradient-gold">Wonder</span>
                  <br />
                  In Every Label
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10 opacity-0 animate-fade-up stagger-2">
                  From waterproof name stickers to iron-on and shoe labels, we help you create durable, personalized labels with premium quality.
                </p>

                <div className="opacity-0 animate-fade-up stagger-3">
                  {user ? (
                    <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
                      <Button variant="hero" size="xl" asChild>
                        <Link to="/designer">
                          Start Designing
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                      </Button>
                      <Button variant="outline-gold" size="xl" asChild>
                        <Link to="/products">Browse Products</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="max-w-xl mx-auto lg:mx-0 rounded-2xl border border-border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 p-3">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button variant="outline-gold" size="xl" className="flex-1" asChild>
                          <Link to="/auth">Sign In</Link>
                        </Button>
                        <Button variant="hero" size="xl" className="flex-1" asChild>
                          <Link to="/auth?mode=signup">
                            Get Started
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-3xl border border-border bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/30 p-8 opacity-0 animate-fade-up stagger-2">
                  <div className="grid grid-cols-1 gap-4">
                    {services.slice(0, 3).map((service) => (
                      <div key={service.title} className="flex items-start gap-3 rounded-2xl border border-border bg-background/50 p-4">
                        <div className="mt-0.5 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <service.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{service.title}</div>
                          <div className="text-sm text-muted-foreground leading-relaxed">{service.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
          <div className="max-w-4xl mx-auto">
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
          </div>
        </div>
      </section>
    </Layout>
  );
}
