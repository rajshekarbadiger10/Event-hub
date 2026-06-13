export type VendorPackage = {
  name: string
  description: string
  price: string
}

export type VendorReview = {
  name: string
  rating: number
  review: string
}

export type VendorDetails = {
  id: string
  image: string
  name: string
  rating: number
  location: string
  price: string
  priceValue: number
  category: string
  categoryLabel: string
  description: string
  gallery: string[]
  services: string[]
  packages: VendorPackage[]
  reviews: VendorReview[]
}

export const vendorCatalog: VendorDetails[] = [
  {
    id: 'royal-vows-events',
    image: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&w=1200&q=80',
    name: 'Royal Vows Events',
    rating: 4.9,
    location: 'Mumbai, India',
    price: '$1,200',
    priceValue: 1200,
    category: 'wedding',
    categoryLabel: 'Wedding Planning',
    description:
      'Elegant, full-service wedding planning with curated vendors, refined styling, and flawless coordination for modern couples.',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523438097201-512ae7d59b23?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    ],
    services: ['Venue coordination', 'Theme styling', 'Guest management', 'Vendor booking'],
    packages: [
      { name: 'Essential', description: 'Planning support for intimate celebrations.', price: '$1,200' },
      { name: 'Signature', description: 'End-to-end wedding coordination with styling.', price: '$2,500' },
      { name: 'Luxury', description: 'Premium concierge planning and full event management.', price: '$4,000' },
    ],
    reviews: [
      {
        name: 'Aarav Mehta',
        rating: 5,
        review: 'The team handled every detail beautifully and kept the whole wedding stress-free.',
      },
      {
        name: 'Meera Shah',
        rating: 5,
        review: 'Professional, creative, and incredibly reliable from the first consultation to the final send-off.',
      },
    ],
  },
  {
    id: 'spark-studio',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    name: 'Spark Studio',
    rating: 4.8,
    location: 'Delhi, India',
    price: '$800',
    priceValue: 800,
    category: 'photography',
    categoryLabel: 'Photography',
    description:
      'Premium event photography and cinematic storytelling for weddings, corporate events, and milestone celebrations.',
    gallery: [
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    ],
    services: ['Candid photography', 'Cinematic reels', 'Drone coverage', 'Photo albums'],
    packages: [
      { name: 'Half Day', description: 'Coverage for small to medium events.', price: '$800' },
      { name: 'Full Day', description: 'Complete event coverage with edited photos.', price: '$1,500' },
      { name: 'Elite', description: 'Photo + video team with premium editing.', price: '$2,800' },
    ],
    reviews: [
      {
        name: 'Priya Sharma',
        rating: 5,
        review: 'The photos captured the energy of our event perfectly. Fast delivery too.',
      },
      {
        name: 'Karan Singh',
        rating: 5,
        review: 'Very polished work and the team knew exactly how to frame the key moments.',
      },
    ],
  },
  {
    id: 'rhythm-house',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    name: 'Rhythm House',
    rating: 4.7,
    location: 'Bengaluru, India',
    price: '$950',
    priceValue: 950,
    category: 'dj-night',
    categoryLabel: 'DJ & Entertainment',
    description:
      'Live DJs, immersive sound, and crowd-friendly entertainment for high-energy celebrations and brand events.',
    gallery: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80',
    ],
    services: ['DJ sets', 'Audio setup', 'Lighting design', 'MC hosting'],
    packages: [
      { name: 'Starter', description: 'Perfect for birthdays and private parties.', price: '$950' },
      { name: 'Performance', description: 'DJ + lighting for medium-scale events.', price: '$1,800' },
      { name: 'Festival', description: 'Full production for large celebrations.', price: '$3,200' },
    ],
    reviews: [
      {
        name: 'Riya Kapoor',
        rating: 5,
        review: 'The music kept the dance floor full all night. The setup looked premium.',
      },
      {
        name: 'Arjun Verma',
        rating: 4,
        review: 'Smooth coordination and excellent sound quality for our launch event.',
      },
    ],
  },
  {
    id: 'whitepetal-decor',
    image: 'https://images.unsplash.com/photo-1523438097201-512ae7d59b23?auto=format&fit=crop&w=1200&q=80',
    name: 'WhitePetal Decor',
    rating: 5.0,
    location: 'Hyderabad, India',
    price: '$1,500',
    priceValue: 1500,
    category: 'decoration',
    categoryLabel: 'Decoration Services',
    description:
      'Luxury decor and floral styling tailored to weddings, milestone parties, and sophisticated corporate functions.',
    gallery: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    ],
    services: ['Floral arches', 'Stage decor', 'Table styling', 'Themed installations'],
    packages: [
      { name: 'Classic', description: 'Elegant decor for intimate events.', price: '$1,500' },
      { name: 'Premium', description: 'Signature styling and large floral elements.', price: '$3,000' },
      { name: 'Grande', description: 'Full venue transformation and custom design.', price: '$5,000' },
    ],
    reviews: [
      {
        name: 'Sana Iqbal',
        rating: 5,
        review: 'The decor looked even better in person. Elegant, modern, and exactly what we wanted.',
      },
      {
        name: 'Nikhil Rao',
        rating: 5,
        review: 'They transformed the venue completely and stayed on schedule throughout.',
      },
    ],
  },
  {
    id: 'capture-moment-co',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    name: 'Capture Moment Co.',
    rating: 4.9,
    location: 'Pune, India',
    price: '$600',
    priceValue: 600,
    category: 'birthday',
    categoryLabel: 'Birthday Parties',
    description:
      'Fun, vibrant event photography and coordination for birthdays, family gatherings, and intimate celebrations.',
    gallery: [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    ],
    services: ['Event coverage', 'Family portraits', 'Decor coordination', 'Highlight reels'],
    packages: [
      { name: 'Basic', description: 'Short coverage for small parties.', price: '$600' },
      { name: 'Celebration', description: 'Photo coverage with edited album.', price: '$1,100' },
      { name: 'Premium Party', description: 'Photo + video for larger events.', price: '$2,000' },
    ],
    reviews: [
      {
        name: 'Neha Deshmukh',
        rating: 5,
        review: 'The photos were colorful, lively, and perfect for our daughter’s birthday.',
      },
      {
        name: 'Rahul Joshi',
        rating: 5,
        review: 'Quick, professional, and very easy to coordinate with during the party.',
      },
    ],
  },
  {
    id: 'aura-corporate-events',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    name: 'Aura Corporate Events',
    rating: 4.8,
    location: 'Chennai, India',
    price: '$2,000',
    priceValue: 2000,
    category: 'corporate',
    categoryLabel: 'Corporate Events',
    description:
      'Professional planning and production for conferences, launches, and premium business events.',
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    ],
    services: ['Conference planning', 'Stage production', 'Registration support', 'Brand activations'],
    packages: [
      { name: 'Launch', description: 'Small team events and meetings.', price: '$2,000' },
      { name: 'Conference', description: 'Full corporate event coordination.', price: '$4,500' },
      { name: 'Executive', description: 'High-touch planning and premium production.', price: '$7,500' },
    ],
    reviews: [
      {
        name: 'Anita Krishnan',
        rating: 5,
        review: 'Very polished execution and great communication across the entire project.',
      },
      {
        name: 'Dev Patel',
        rating: 5,
        review: 'Excellent for business events. The team handled logistics with confidence.',
      },
    ],
  },
  {
    id: 'twinkle-moments',
    image: 'https://images.unsplash.com/photo-1529634896880-6f7f5e3f9f2a?auto=format&fit=crop&w=1200&q=80',
    name: 'Twinkle Moments',
    rating: 4.9,
    location: 'Mumbai, India',
    price: '$1,100',
    priceValue: 1100,
    category: 'wedding',
    categoryLabel: 'Wedding Planning',
    description:
      'Creative planning and styling for couples who want a warm, modern, and memorable wedding experience.',
    gallery: [
      'https://images.unsplash.com/photo-1529634896880-6f7f5e3f9f2a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523438097201-512ae7d59b23?auto=format&fit=crop&w=1200&q=80',
    ],
    services: ['Planning support', 'Vendor coordination', 'Decor concepts', 'Timeline management'],
    packages: [
      { name: 'Intimate', description: 'Ideal for smaller weddings and ceremonies.', price: '$1,100' },
      { name: 'Complete', description: 'Full planning with styling and coordination.', price: '$2,700' },
      { name: 'Signature', description: 'Luxury planning and concierge event management.', price: '$4,500' },
    ],
    reviews: [
      {
        name: 'Isha Mehta',
        rating: 5,
        review: 'Their styling taste was excellent. Everything felt cohesive and premium.',
      },
      {
        name: 'Vivek Nair',
        rating: 5,
        review: 'The whole process felt organized and calm, which is exactly what we needed.',
      },
    ],
  },
  {
    id: 'milestone-magic',
    image: 'https://images.unsplash.com/photo-1525572348770-0dac42b16507?auto=format&fit=crop&w=1200&q=80',
    name: 'Milestone Magic',
    rating: 4.6,
    location: 'Kolkata, India',
    price: '$700',
    priceValue: 700,
    category: 'birthday',
    categoryLabel: 'Birthday Parties',
    description:
      'Joyful birthday event planning with playful decor and smooth coordination for all ages.',
    gallery: [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1525572348770-0dac42b16507?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    ],
    services: ['Theme planning', 'Balloon setups', 'Entertainment booking', 'Cake table styling'],
    packages: [
      { name: 'Mini', description: 'Cute and simple setup for small celebrations.', price: '$700' },
      { name: 'Party Plus', description: 'Decor + entertainment coordination.', price: '$1,300' },
      { name: 'Grand Celebration', description: 'Large event management with premium styling.', price: '$2,500' },
    ],
    reviews: [
      {
        name: 'Pallavi Sen',
        rating: 5,
        review: 'The party setup was colorful and fun, and the team was really easy to work with.',
      },
      {
        name: 'Rohan Das',
        rating: 4,
        review: 'Great value and very reliable for family events.',
      },
    ],
  },
]

export const getVendorById = (vendorId?: string) =>
  vendorId ? vendorCatalog.find((vendor) => vendor.id === vendorId) ?? null : null

export const getVendorsByCategory = (category?: string | null) =>
  category ? vendorCatalog.filter((vendor) => vendor.category === category) : vendorCatalog