// product.js:

const products = [
  {
    name: "Cozy Dog Sweater",
    description:
      "A warm and comfortable sweater for your furry friend. Made from soft, high-quality wool blend that's perfect for chilly days. Features an easy-to-wear design with adjustable straps for a perfect fit.",
    price: 29.99,
    discountPrice: 24.99,
    countInStock: 20,
    sku: "DOG-SW-001",
    category: "Dog Clothing",
    brand: "PawStyle",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Red", "Blue", "Gray", "Navy"],
    collections: "Winter Collection",
    material: "Wool Blend",
    gender: "Unisex",
    petType: "Dogs",
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Cozy Dog Sweater Front View",
      }
    ],
    rating: 4.5,
    numReviews: 12
  },
  {
    name: "Cat Harness and Leash Set",
    description:
      "Escape-proof cat harness with a matching leash. Made with breathable mesh material and secure buckles. Perfect for adventurous cats who love to explore.",
    price: 24.99,
    discountPrice: 19.99,
    countInStock: 35,
    sku: "CAT-HL-002",
    category: "Cat Accessories",
    brand: "SafePaws",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Blue", "Pink", "Purple"],
    collections: "Outdoor Gear",
    material: "Mesh",
    gender: "Unisex",
    petType: "Cats",
    images: [
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Cat Harness and Leash Set"
      }
    ],
    rating: 4.8,
    numReviews: 15
  },
  {
    name: "Bird Cage Cover",
    description:
      "Premium cage cover designed to provide your feathered friend with a peaceful night's sleep. Features breathable fabric and adjustable ties.",
    price: 19.99,
    discountPrice: 16.99,
    countInStock: 15,
    sku: "BRD-CV-003",
    category: "Bird Accessories",
    brand: "BirdLife",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Dark Green", "Black", "Brown"],
    collections: "Essential Care",
    material: "Cotton Blend",
    gender: "Unisex",
    petType: "Birds",
    images: [
      {
        url: "https://picsum.photos/500/500?random=3",
        altText: "Bird Cage Cover"
      }
    ],
    rating: 4.6,
    numReviews: 8
  },
  {
    name: "Hamster Exercise Ball",
    description:
      "Safe and durable exercise ball for small pets. Provides entertainment and exercise while keeping your pet secure. Features ventilation holes and a secure closure.",
    price: 12.99,
    discountPrice: 10.99,
    countInStock: 25,
    sku: "SML-EB-004",
    category: "Small Pet Accessories",
    brand: "TinyFriends",
    sizes: ["S", "M"],
    colors: ["Clear", "Blue", "Pink", "Green"],
    collections: "Exercise Equipment",
    material: "Pet-Safe Plastic",
    gender: "Unisex",
    petType: "Small Pets",
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Hamster Exercise Ball"
      }
    ],
    rating: 4.4,
    numReviews: 10
  },
  {
    name: "Reflective Dog Raincoat",
    description:
      "Waterproof raincoat with reflective strips for safe nighttime walks. Features adjustable straps and a hood for complete protection.",
    price: 34.99,
    discountPrice: 29.99,
    countInStock: 30,
    sku: "DOG-RC-005",
    category: "Dog Clothing",
    brand: "PawStyle",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Yellow", "Orange", "Blue", "Black"],
    collections: "Rainy Day Essentials",
    material: "Waterproof Nylon",
    gender: "Unisex",
    petType: "Dogs",
    images: [
      {
        url: "https://picsum.photos/500/500?random=5",
        altText: "Reflective Dog Raincoat"
      }
    ],
    rating: 4.7,
    numReviews: 14
  },
  {
    name: "Cat Bow Tie Collar",
    description:
      "Elegant bow tie collar for stylish cats. Made with soft fabric and featuring a breakaway safety buckle. Perfect for special occasions.",
    price: 14.99,
    discountPrice: 12.99,
    countInStock: 40,
    sku: "CAT-BT-006",
    category: "Cat Accessories",
    brand: "FancyFeline",
    sizes: ["One Size"],
    colors: ["Black", "Navy", "Red", "Pink"],
    collections: "Formal Wear",
    material: "Cotton",
    gender: "Unisex",
    petType: "Cats",
    images: [
      {
        url: "https://picsum.photos/500/500?random=6",
        altText: "Cat Bow Tie Collar"
      }
    ],
    rating: 4.9,
    numReviews: 22
  },
  {
    name: "Bird Flight Suit",
    description:
      "Comfortable and secure flight suit with built-in leash attachment. Perfect for taking your bird outside safely. Includes removable diaper liner.",
    price: 29.99,
    discountPrice: 24.99,
    countInStock: 20,
    sku: "BRD-FS-007",
    category: "Bird Clothing",
    brand: "FeatherFriend",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Red", "Blue", "Green", "Purple"],
    collections: "Outdoor Safety",
    material: "Cotton Blend",
    gender: "Unisex",
    petType: "Birds",
    images: [
      {
        url: "https://picsum.photos/500/500?random=7",
        altText: "Bird Flight Suit"
      }
    ],
    rating: 4.5,
    numReviews: 18
  },
  {
    name: "Small Pet Cozy House",
    description:
      "Soft and warm hideout for small pets. Features a plush interior and sturdy construction. Perfect for hamsters, gerbils, and other small animals.",
    price: 19.99,
    discountPrice: 16.99,
    countInStock: 25,
    sku: "SML-CH-008",
    category: "Small Pet Accessories",
    brand: "TinyHomes",
    sizes: ["One Size"],
    colors: ["Brown", "Gray", "Pink", "Blue"],
    collections: "Comfort Living",
    material: "Plush Fabric",
    gender: "Unisex",
    petType: "Small Pets",
    images: [
      {
        url: "https://picsum.photos/500/500?random=8",
        altText: "Small Pet Cozy House"
      }
    ],
    rating: 4.6,
    numReviews: 15
  },
  {
    name: "Dog Party Dress",
    description:
      "Adorable party dress for special occasions. Features ruffled details and a bow accent. Perfect for birthdays and celebrations.",
    price: 39.99,
    discountPrice: 34.99,
    countInStock: 15,
    sku: "DOG-PD-009",
    category: "Dog Clothing",
    brand: "PawStyle",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Pink", "Purple", "Blue", "White"],
    collections: "Party Collection",
    material: "Satin",
    gender: "Unisex",
    petType: "Dogs",
    images: [
      {
        url: "https://picsum.photos/500/500?random=9",
        altText: "Dog Party Dress"
      }
    ],
    rating: 4.8,
    numReviews: 20
  },
  {
    name: "Cat Cooling Vest",
    description:
      "Keep your cat cool during hot summer days with this specially designed cooling vest. Features moisture-wicking fabric and UV protection.",
    price: 27.99,
    discountPrice: 23.99,
    countInStock: 30,
    sku: "CAT-CV-010",
    category: "Cat Clothing",
    brand: "CoolCat",
    sizes: ["S", "M", "L"],
    colors: ["Light Blue", "Mint", "White", "Gray"],
    collections: "Summer Essentials",
    material: "Cooling Mesh",
    gender: "Unisex",
    petType: "Cats",
    images: [
      {
        url: "https://picsum.photos/500/500?random=10",
        altText: "Cat Cooling Vest"
      }
    ],
    rating: 4.7,
    numReviews: 25
  }
];

module.exports = products;
