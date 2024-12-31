import { Metadata } from 'next'
import Image from 'next/image'
import { siteConfig } from '@/lib/constants'
import { getUnsplashImage } from '@/lib/unsplash'

interface ElectricianService {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  acf: {
    service_image: string
    service_description: string
  }
}

async function getElectricianServices(): Promise<ElectricianService[]> {
  try {
    const res = await fetch('https://sariea.com/wp-json/wp/v2/electrician-services', {
      next: { revalidate: 3600 }
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch services')
    }

    return res.json()
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

export const metadata: Metadata = {
  title: 'Electrical Services - ' + siteConfig.name,
  description: 'Professional electrical services for your home and business needs',
}

export default async function ServicesPage() {
  const services = await getElectricianServices()
  
  // Pre-fetch fallback images for services without images
  const fallbackImages = await Promise.all(
    services.map(service => 
      !service.acf.service_image 
        ? getUnsplashImage("electrical,service").catch(() => null)
        : null
    )
  )

  return (
    <div className="min-h-screen bg-background">
      <div className={siteConfig.containerWidth}>
        <div className="py-10">
          <h1 className="text-3xl font-bold text-center mb-8 text-foreground">Our Electrical Services</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <div key={service.id} className="bg-card rounded-lg overflow-hidden border hover:border-primary/50 transition-colors">
                <div className="relative h-48">
                  {service.acf.service_image ? (
                    <Image
                      src={service.acf.service_image}
                      alt={service.title.rendered}
                      fill
                      className="object-cover"
                    />
                  ) : fallbackImages[index] && (
                    <Image
                      src={fallbackImages[index]}
                      alt={service.title.rendered}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2 text-foreground line-clamp-2" 
                      dangerouslySetInnerHTML={{ __html: service.title.rendered }} 
                  />
                  <div className="prose prose-sm dark:prose-invert max-w-none line-clamp-3"
                       dangerouslySetInnerHTML={{ __html: service.acf.service_description || service.content.rendered }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 