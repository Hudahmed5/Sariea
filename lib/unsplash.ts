const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY

// Default image to use if everything fails
const DEFAULT_IMAGE = "https://source.unsplash.com/1200x800/?professional,service"

interface UnsplashImage {
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
  alt_description: string
  description: string
}

function getSourceUnsplashUrl(query: string): string {
  try {
    // Ensure the query is properly formatted for source.unsplash.com
    const formattedQuery = query
      .split(',')
      .map(term => term.trim())
      .filter(Boolean)
      .join(',') || 'professional,service'
    
    // Add a random parameter to prevent caching
    const timestamp = new Date().getTime()
    const url = `https://source.unsplash.com/1200x800/?${encodeURIComponent(formattedQuery)}&random=${timestamp}`
    
    // Validate the URL
    new URL(url)
    return url
  } catch (error) {
    console.error('Error generating source.unsplash.com URL:', error)
    return DEFAULT_IMAGE
  }
}

export async function getUnsplashImage(query: string): Promise<string> {
  try {
    // Validate and sanitize input
    if (!query || typeof query !== 'string') {
      return DEFAULT_IMAGE
    }

    // If no API key is set, use source.unsplash.com directly
    if (!UNSPLASH_ACCESS_KEY) {
      console.warn('UNSPLASH_ACCESS_KEY is not set, using source.unsplash.com')
      return getSourceUnsplashUrl(query)
    }

    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    const data: UnsplashImage = await response.json()
    const imageUrl = data.urls?.regular

    // Validate the URL before returning
    if (!imageUrl || typeof imageUrl !== 'string') {
      throw new Error('Invalid image URL received from Unsplash')
    }

    // Validate the URL format
    new URL(imageUrl)
    
    return `${imageUrl}?w=1200&q=80&auto=format&fit=crop`
  } catch (error) {
    console.error('Error fetching Unsplash image:', error)
    // Use source.unsplash.com as fallback
    return getSourceUnsplashUrl(query)
  }
} 