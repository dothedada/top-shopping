import { ProductData, FetchCategories } from '../types/global';

export const mockedItemsData: ProductData[] = [
  {
    id: 1,
    title:
      'Sony WH-1000XM3 Bluetooth Wireless Over Ear Headphones with Mic (Silver)',
    image:
      'https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947383286-714WUJlhbLS._SL1500_.jpg',
    price: 773,
    description: 'Digital noise cancelling : Industry leading Active',
    brand: 'Sony',
    category: 'audio',
    discount: 0,
  },
  {
    id: 2,
    title:
      'Bose QuietComfort 35 II Wireless Bluetooth Headphones with Mic (Black)',
    image: 'https://example.com/bose-quietcomfort.jpg',
    price: 349,
    description:
      'Noise-cancelling Bluetooth headphones with up to 20 hours of battery life',
    brand: 'Bose',
    category: 'audio',
    discount: 10,
  },
  {
    id: 3,
    title:
      'Sennheiser Momentum 3 Wireless Noise Cancelling Headphones (Silver)',
    image: 'https://example.com/sennheiser-momentum.jpg',
    price: 399,
    description:
      'Premium sound and noise-cancelling technology with 17-hour battery life',
    brand: 'Sennheiser',
    category: 'audio',
    discount: 5,
  },
  {
    id: 4,
    title: 'Sony WF-1000XM4 Wireless Noise Cancelling Earbuds (Black)',
    image: 'https://example.com/sony-earbuds.jpg',
    price: 279,
    description:
      'Industry-leading noise-cancelling earbuds with superior sound quality',
    brand: 'Sony',
    category: 'audio',
    discount: 15,
  },
  {
    id: 5,
    title: 'Apple AirPods Pro (White)',
    image: 'https://example.com/apple-airpods-pro.jpg',
    price: 249,
    description:
      'Active noise cancellation for immersive sound, transparency mode for hearing and connecting with the world around you',
    brand: 'Apple',
    category: 'audio',
    discount: 5,
  },
  {
    id: 6,
    title:
      'JBL Live 650BTNC Over Ear Noise Cancelling Bluetooth Headphones (Blue)',
    image: 'https://example.com/jbl-live650.jpg',
    price: 199,
    description:
      'JBL Signature Sound with active noise cancelling and up to 30 hours of battery life',
    brand: 'JBL',
    category: 'audio',
    discount: 20,
  },
  {
    id: 7,
    title: 'Bang & Olufsen Beoplay H95 Premium Wireless Headphones (Grey)',
    image: 'https://example.com/beoplay-h95.jpg',
    price: 899,
    description:
      'Luxurious design and impeccable sound quality with adaptive ANC',
    brand: 'Bang & Olufsen',
    category: 'audio',
    discount: 0,
  },
  {
    id: 8,
    title:
      'Anker Soundcore Life Q30 Hybrid Active Noise Cancelling Headphones (Black)',
    image: 'https://example.com/soundcore-q30.jpg',
    price: 79,
    description:
      'Hybrid active noise cancelling headphones with 40-hour battery life',
    brand: 'Anker',
    category: 'audio',
    discount: 25,
  },
  {
    id: 9,
    title: 'Skullcandy Crusher Evo Wireless Over Ear Headphones (Red)',
    image: 'https://example.com/skullcandy-crusher.jpg',
    price: 199,
    description:
      'Personal sound tuning with adjustable sensory bass and long battery life',
    brand: 'Skullcandy',
    category: 'audio',
    discount: 10,
  },
  {
    id: 10,
    title: 'Logitech G Pro X Gaming Headset with Blue Voice Technology (Black)',
    image: 'https://example.com/logitech-gpro.jpg',
    price: 129,
    description:
      'Professional gaming headset with advanced noise-cancelling mic',
    brand: 'Logitech',
    category: 'gaming',
    discount: 15,
  },
  {
    id: 11,
    title: '18K Gold Plated Pendant Necklace for Women',
    image: 'https://example.com/gold-necklace.jpg',
    price: 149,
    description:
      'Elegant gold-plated necklace with a minimalist pendant design',
    brand: 'JewelryHouse',
    category: 'jewelery',
    discount: 20,
  },
  {
    id: 12,
    title: 'Men’s Classic Leather Jacket (Black)',
    image: 'https://example.com/leather-jacket.jpg',
    price: 299,
    description: 'High-quality leather jacket with a timeless design',
    brand: 'FashionPro',
    category: "men's clothing",
    discount: 15,
  },
  {
    id: 13,
    title: 'Women’s Floral Print Maxi Dress',
    image: 'https://example.com/maxi-dress.jpg',
    price: 79,
    description:
      'Flowy maxi dress with vibrant floral prints, perfect for summer',
    brand: 'BloomWear',
    category: "women's clothing",
    discount: 10,
  },
  {
    id: 14,
    title: 'Sterling Silver Hoop Earrings',
    image: 'https://example.com/silver-earrings.jpg',
    price: 79,
    description:
      'Classic sterling silver hoop earrings, perfect for any occasion',
    brand: 'SilverCraft',
    category: 'jewelery',
    discount: 5,
  },
  {
    id: 15,
    title: 'Men’s Slim Fit Chinos (Khaki)',
    image: 'https://example.com/slim-fit-chinos.jpg',
    price: 49,
    description: 'Comfortable and stylish slim fit chinos for everyday wear',
    brand: 'UrbanStyle',
    category: "men's clothing",
    discount: 10,
  },
  {
    id: 16,
    title: 'Women’s Faux Fur Winter Coat (White)',
    image: 'https://example.com/faux-fur-coat.jpg',
    price: 159,
    description: 'Luxurious and warm faux fur coat for winter fashion',
    brand: 'WinterElegance',
    category: "women's clothing",
    discount: 15,
  },
  {
    id: 17,
    title: 'Men’s Cotton Crew Neck T-Shirt (Navy Blue)',
    image: 'https://example.com/cotton-tshirt.jpg',
    price: 19,
    description: 'Soft and breathable cotton T-shirt for everyday comfort',
    brand: 'ComfortWear',
    category: "men's clothing",
    discount: 5,
  },
  {
    id: 18,
    title: 'Women’s Casual Sneakers (Pink)',
    image: 'https://example.com/casual-sneakers.jpg',
    price: 49,
    description: 'Lightweight sneakers with a stylish design for casual wear',
    brand: 'StepUp',
    category: "women's clothing",
    discount: 10,
  },
  {
    id: 19,
    title: 'Gold-Plated Bracelet with Charms',
    image: 'https://example.com/gold-bracelet.jpg',
    price: 199,
    description: 'Elegant gold-plated bracelet featuring customizable charms',
    brand: 'CharmWorks',
    category: 'jewelery',
    discount: 15,
  },
  {
    id: 20,
    title: 'Men’s Wool Scarf (Gray)',
    image: 'https://example.com/wool-scarf.jpg',
    price: 59,
    description: 'Warm and stylish wool scarf, perfect for winter',
    brand: 'WinterWear',
    category: "men's clothing",
    discount: 10,
  },
];

export const mockedCategoriesData: FetchCategories = [
  'tv',
  'audio',
  'laptop',
  'mobile',
  'gaming',
  'appliances',
];

export const commonFetchErrors = [
  [400, 'Bad Request...'],
  [401, 'Unauthorized...'],
  [403, 'Forbidden...'],
  [404, 'Not Found...'],
  [500, 'Internal Server Error...'],
];
