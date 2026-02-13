import { Property } from '../types';

export const PROPERTIES: Property[] = [
  // HOMES FOR SALE
  {
    id: '1',
    title: 'Modern Loft in Downtown',
    price: 850000,
    address: '123 Innovation Ave, Tech District, CA',
    beds: 2,
    baths: 2,
    sqft: 1450,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop',
    imageUrls: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2670&auto=format&fit=crop'
    ],
    tag: 'Condo',
    listingType: 'sale',
    isPopular: true,
    dateAdded: '2024-02-15',
    developer: {
      name: 'Urban Living Partners',
      logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=2069&auto=format&fit=crop'
    },
    landmarks: [
      { name: 'Central Tech Hub', distance: '0.2 miles', type: 'Business' },
      { name: 'Downtown Metro Station', distance: '0.5 miles', type: 'Transport' },
      { name: 'City Arts Park', distance: '0.8 miles', type: 'Recreation' }
    ],
    documents: [
      { title: 'Floor Plan - Unit 404', type: 'pdf', size: '2.4 MB' },
      { title: 'HOA Bylaws', type: 'pdf', size: '1.1 MB' },
      { title: 'Property Brochure', type: 'pdf', size: '5.6 MB' }
    ]
  },
  {
    id: '3',
    title: 'Suburban Family Home',
    price: 650000,
    address: '789 Maple Ln, Pleasantville, NY',
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2670&auto=format&fit=crop',
    imageUrls: [
       'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2670&auto=format&fit=crop',
       'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=2670&auto=format&fit=crop',
       'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2670&auto=format&fit=crop'
    ],
    tag: 'Family',
    listingType: 'sale',
    isNew: true,
    dateAdded: '2024-03-10',
    developer: {
      name: 'Classic Homes Inc.',
      logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2673&auto=format&fit=crop'
    },
    landmarks: [
      { name: 'Pleasantville Elementary', distance: '0.4 miles', type: 'School' },
      { name: 'Maple Street Park', distance: '0.1 miles', type: 'Park' },
      { name: 'Whole Foods Market', distance: '1.2 miles', type: 'Grocery' }
    ],
    documents: [
      { title: 'Property Survey', type: 'pdf', size: '3.1 MB' },
      { title: 'Disclosure Statement', type: 'pdf', size: '0.8 MB' }
    ]
  },
  {
    id: '6',
    title: 'Historic Brownstone',
    price: 3100000,
    address: '55 Beacon St, Boston, MA',
    beds: 5,
    baths: 4,
    sqft: 4500,
    imageUrl: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2670&auto=format&fit=crop',
    imageUrls: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2670&auto=format&fit=crop'
    ],
    tag: 'Historic',
    listingType: 'sale',
    isPopular: true,
    dateAdded: '2023-12-01',
    developer: {
      name: 'Beacon Hill Preservation',
      logoUrl: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=2574&auto=format&fit=crop'
    },
    landmarks: [
      { name: 'Boston Common', distance: '0.1 miles', type: 'Park' },
      { name: 'State House', distance: '0.2 miles', type: 'Government' }
    ],
    documents: [
      { title: 'Historical Certificate', type: 'pdf', size: '5.0 MB' },
      { title: 'Renovation Plans', type: 'pdf', size: '12.4 MB' }
    ]
  },

  // RENTALS
  {
    id: '2',
    title: 'Seaside Villa',
    price: 15000,
    address: '456 Ocean Dr, Malibu, CA',
    beds: 4,
    baths: 3,
    sqft: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop',
    imageUrls: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=2684&auto=format&fit=crop'
    ],
    tag: 'Luxury Rent',
    listingType: 'rent',
    isPopular: true,
    dateAdded: '2024-01-20',
    landmarks: [
      { name: 'Malibu Pier', distance: '1.5 miles', type: 'Attraction' },
      { name: 'Nobu Malibu', distance: '2.0 miles', type: 'Dining' }
    ],
    documents: [
      { title: 'Lease Terms', type: 'pdf', size: '0.5 MB' }
    ]
  },
  {
    id: '5',
    title: 'Minimalist Studio',
    price: 2400,
    address: '202 Center St, Seattle, WA',
    beds: 1,
    baths: 1,
    sqft: 850,
    imageUrl: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=2671&auto=format&fit=crop',
    imageUrls: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=2671&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=2718&auto=format&fit=crop'
    ],
    tag: 'Apartment',
    listingType: 'rent',
    dateAdded: '2024-02-28',
    landmarks: [
      { name: 'Space Needle', distance: '0.6 miles', type: 'Landmark' },
      { name: 'Pike Place Market', distance: '1.0 miles', type: 'Market' }
    ]
  },
  {
    id: '8',
    title: 'Penthouse Suite',
    price: 8500,
    address: '101 Skyline Blvd, New York, NY',
    beds: 2,
    baths: 2.5,
    sqft: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop',
    imageUrls: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?q=80&w=2670&auto=format&fit=crop'
    ],
    tag: 'Penthouse',
    listingType: 'rent',
    isNew: true,
    isPopular: true,
    dateAdded: '2024-03-12',
    developer: {
       name: 'Skyline Developments',
       logoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop'
    },
    landmarks: [
      { name: 'Central Park', distance: '2 blocks', type: 'Park' },
      { name: 'Met Museum', distance: '0.5 miles', type: 'Museum' }
    ],
    documents: [
      { title: 'Floor Plan', type: 'pdf', size: '1.2 MB' }
    ]
  },

  // LANDS
  {
    id: '4',
    title: 'Mountain Ridge Acreage',
    price: 450000,
    address: 'Lot 44, Aspen Highlands, CO',
    beds: 0,
    baths: 0,
    sqft: 2.5,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop',
    imageUrls: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2670&auto=format&fit=crop'
    ],
    tag: 'Development',
    listingType: 'land',
    dateAdded: '2023-11-15',
    documents: [
      { title: 'Topographical Map', type: 'pdf', size: '8.5 MB' },
      { title: 'Soil Report', type: 'pdf', size: '4.2 MB' }
    ]
  },
  {
    id: '7',
    title: 'Lakeside Plot',
    price: 220000,
    address: '12 Lakeview Dr, Tahoe, NV',
    beds: 0,
    baths: 0,
    sqft: 0.8,
    imageUrl: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=2703&auto=format&fit=crop',
    imageUrls: [
      'https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=2703&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1499363536502-87642509e31b?q=80&w=2670&auto=format&fit=crop'
    ],
    tag: 'Waterfront',
    listingType: 'land',
    isNew: true,
    dateAdded: '2024-03-05'
  },
  {
    id: '9',
    title: 'Desert Oasis Parcel',
    price: 150000,
    address: 'Sector 7, Joshua Tree, CA',
    beds: 0,
    baths: 0,
    sqft: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop',
    imageUrls: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=2574&auto=format&fit=crop'
    ],
    tag: 'Off-grid',
    listingType: 'land',
    dateAdded: '2023-10-30'
  },
  {
    id: '10',
    title: 'Glass House Estate',
    price: 5200000,
    address: '888 Viewpoint Rd, Hollywood Hills, CA',
    beds: 4,
    baths: 5,
    sqft: 5200,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-60c37c6525fa?q=80&w=2674&auto=format&fit=crop',
    imageUrls: [
       'https://images.unsplash.com/photo-1600596542815-60c37c6525fa?q=80&w=2674&auto=format&fit=crop',
       'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2674&auto=format&fit=crop'
    ],
    tag: 'Estate',
    listingType: 'sale',
    isNew: true,
    isPopular: true,
    dateAdded: '2024-03-14'
  }
];