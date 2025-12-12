import { Layout } from '@/components/layout/Layout';
import { Award, Users, Target, Heart } from 'lucide-react';

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for perfection in every label we produce, using only the finest materials and cutting-edge technology.',
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'Your success is our priority. We work closely with you to understand and exceed your expectations.',
  },
  {
    icon: Target,
    title: 'Precision',
    description: 'Every detail matters. Our attention to precision ensures consistent, high-quality results every time.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'We love what we do. Our passion for labeling drives us to innovate and deliver exceptional products.',
  },
];

const team = [
  { name: 'John Wonder', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
  { name: 'Sarah Chen', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop' },
  { name: 'Michael Torres', role: 'Production Manager', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 opacity-0 animate-fade-up">
              About <span className="text-gradient-gold">Wonder Labels</span>
            </h1>
            <p className="text-lg text-muted-foreground opacity-0 animate-fade-up stagger-1">
              For over 15 years, we've been crafting premium labels that help businesses stand out. Our commitment to quality and innovation has made us a trusted partner for brands worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="opacity-0 animate-fade-up">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Wonder Labels was founded in 2008 with a simple mission: to provide businesses with the highest quality labels at competitive prices. What started as a small printing operation has grown into a full-service labeling company serving clients across the globe.
                </p>
                <p>
                  Our state-of-the-art facility combines traditional craftsmanship with modern technology, allowing us to produce everything from custom stickers to complex barcode labels with precision and efficiency.
                </p>
                <p>
                  Today, we're proud to be the trusted labeling partner for hundreds of businesses, from local startups to Fortune 500 companies. Our success is built on our unwavering commitment to quality, innovation, and customer satisfaction.
                </p>
              </div>
            </div>
            <div className="relative opacity-0 animate-fade-up stagger-2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&h=600&fit=crop"
                  alt="Printing facility"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-xl bg-primary/10 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-surface-1">
        <div className="container px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our <span className="text-gradient-gold">Values</span>
            </h2>
            <p className="text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="p-6 rounded-xl bg-gradient-card border border-border opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our <span className="text-gradient-gold">Team</span>
            </h2>
            <p className="text-muted-foreground">
              The passionate people behind Wonder Labels
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="text-center opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-2 border-primary/20">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
