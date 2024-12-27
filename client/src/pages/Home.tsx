import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-b from-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Transforming Business Through Innovation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We help businesses grow and succeed through strategic consulting,
              technology solutions, and professional services.
            </p>
            <div className="space-x-4">
              <Link href="/contact">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border bg-card text-card-foreground"
              >
                <div className="mb-4 text-primary">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our growing list of satisfied clients and take your business to the next level.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

const services = [
  {
    icon: <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">🎯</div>,
    title: "Strategic Consulting",
    description: "Expert guidance to help you make informed business decisions and achieve your goals.",
  },
  {
    icon: <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">💻</div>,
    title: "Technology Solutions",
    description: "Custom software and digital transformation services to modernize your operations.",
  },
  {
    icon: <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">📈</div>,
    title: "Business Growth",
    description: "Comprehensive strategies to expand your market presence and increase revenue.",
  },
];
