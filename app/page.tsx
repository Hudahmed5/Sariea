import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, Shield, Star, Wrench, Hammer, Lightbulb, Droplets, Wind, Paintbrush, Ruler } from "lucide-react"
import { getUnsplashImage } from "@/lib/unsplash"

export default async function Home() {
  // Fetch images for different sections with error handling
  const [heroImage, ...servicesImages] = await Promise.all([
    getUnsplashImage("handyman,repair,professional").catch(() => null),
    ...services.map(service => 
      getUnsplashImage(`${service.title.toLowerCase()},repair,service`).catch(() => null)
    )
  ])

  const ctaImage = await getUnsplashImage("home,repair,tools").catch(() => null)

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-background border-b">
        <div className="max-w-[1800px] mx-auto px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <h1 className="text-6xl font-bold mb-8 text-foreground">On Time, Done Right.</h1>
              <p className="text-2xl text-muted-foreground mb-10">
                Professional handyman services for your home and business needs. Expert technicians, reliable service, and competitive pricing.
              </p>
              
              {/* City Selector */}
              <div className="space-y-6 max-w-lg">
                <h3 className="text-xl font-semibold text-foreground">Select Your City</h3>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose your location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dubai">Dubai</SelectItem>
                    <SelectItem value="abudhabi">Abu Dhabi</SelectItem>
                    <SelectItem value="sharjah">Sharjah</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="lg" className="w-full text-lg py-6">
                  Book Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="relative h-[700px] rounded-lg overflow-hidden">
              {heroImage && (
                <Image
                  src={heroImage}
                  alt="Professional Handyman"
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="max-w-[1800px] mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Link href={service.href} key={service.title}>
                <Card className="hover:shadow-lg transition-shadow">
                  <div className="relative h-48 w-full">
                    {servicesImages[index] && (
                      <Image
                        src={servicesImages[index]}
                        alt={service.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    )}
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="h-14 w-14 flex items-center justify-center rounded-full bg-accent">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-3 text-foreground">{service.title}</h3>
                        <p className="text-muted-foreground text-lg">{service.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {ctaImage && (
            <Image
              src={ctaImage}
              alt="Background"
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="max-w-[1800px] mx-auto px-8 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-8 text-primary-foreground">Ready to Get Started?</h2>
          <p className="text-2xl mb-10 max-w-4xl mx-auto text-primary-foreground/90">
            Book your service today and experience the best in professional handyman services
          </p>
          <Button size="lg" variant="secondary" className="text-lg py-6 px-8">
            Book a Service
          </Button>
      </div>
      </section>
    </main>
  )
}

const services = [
  {
    title: "Electrical Services",
    description: "Professional electrical repairs and installations",
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
    href: "/services"
  },
  {
    title: "Plumbing",
    description: "Expert plumbing solutions for any issue",
    icon: <Droplets className="h-6 w-6 text-primary" />,
    href: "/services"
  },
  {
    title: "Home Maintenance",
    description: "Complete home maintenance and repairs",
    icon: <Wrench className="h-6 w-6 text-primary" />,
    href: "/services"
  },
  {
    title: "AC Services",
    description: "AC installation, repair, and maintenance",
    icon: <Wind className="h-6 w-6 text-primary" />,
    href: "/services"
  },
  {
    title: "Painting",
    description: "Professional painting services",
    icon: <Paintbrush className="h-6 w-6 text-primary" />,
    href: "/services"
  },
  {
    title: "Carpentry",
    description: "Custom carpentry and furniture repairs",
    icon: <Ruler className="h-6 w-6 text-primary" />,
    href: "/services"
  }
]

const features = [
  {
    title: "Professional Experts",
    description: "Skilled and certified technicians",
    icon: <Shield className="h-12 w-12" />
  },
  {
    title: "On-Time Service",
    description: "Punctual and reliable service delivery",
    icon: <Clock className="h-12 w-12" />
  },
  {
    title: "Quality Work",
    description: "100% satisfaction guaranteed",
    icon: <Star className="h-12 w-12" />
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock customer service",
    icon: <Hammer className="h-12 w-12" />
  }
]
