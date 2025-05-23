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
        url: "https://images.unsplash.com/photo-1640130960412-af425bde2be3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y296eSUyMGRvZyUyMHN3ZWF0ZXJ8ZW58MHx8MHx8fDA%3D",
        altText: "Cozy Dog Sweater Front View",
      },
      {
        url: "https://images.unsplash.com/photo-1697939829612-f2ee98421a53?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y296eSUyMGRvZyUyMHN3ZWF0ZXJ8ZW58MHx8MHx8fDA%3D",
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
        url: "https://plus.unsplash.com/premium_photo-1664371206022-59b8607e00ac?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        altText: "Cat Harness and Leash Set"
      },
      {
        url: "https://images.unsplash.com/photo-1712143093737-e94eccccef9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2F0JTIwSGFybmVzcyUyMGFuZCUyMExlYXNoJTIwU2V0fGVufDB8fDB8fHww",
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
        url: "https://plus.unsplash.com/premium_photo-1664304957188-a2f67dd1f721?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEJpcmQlMjBDYWdlJTIwQ292ZXJ8ZW58MHx8MHx8fDA%3D",
        altText: "Bird Cage Cover"
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1668046490283-8fca695d50a8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEJpcmQlMjBDYWdlJTIwQ292ZXJ8ZW58MHx8MHx8fDA%3D",
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
        url: "https://images.unsplash.com/photo-1556568575-6c09e7df1441?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        altText: "Hamster Exercise Ball"
      },
      {
        url: "https://images.unsplash.com/photo-1592159371936-61a70cbeb5f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        url: "https://images.unsplash.com/photo-1688592286068-1169451c0ae4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UmVmbGVjdGl2ZSUyMERvZyUyMFJhaW5jb2F0fGVufDB8fDB8fHww",
        altText: "Reflective Dog Raincoat"
      },
      {
        url: "https://images.unsplash.com/photo-1681571033428-cea742a5c4fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFJlZmxlY3RpdmUlMjBEb2clMjBSYWluY29hdHxlbnwwfHwwfHx8MA%3D%3D",
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
        url: "https://images.unsplash.com/photo-1589223590696-6300f41aee7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q2F0JTIwQm93JTIwVGllJTIwQ29sbGFyfGVufDB8fDB8fHww",
        altText: "Cat Bow Tie Collar"
      },
      {
        url: "https://images.unsplash.com/photo-1619682488107-c0791e9be98d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2F0JTIwQm93JTIwVGllJTIwQ29sbGFyfGVufDB8fDB8fHww",
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
        url: "https://plus.unsplash.com/premium_photo-1669673986444-3d8d63f74ab3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        altText: "Bird Flight Suit"
      },
      {
        url: "https://images.unsplash.com/photo-1617480606371-cc0877a1cb61?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        url: "https://images.unsplash.com/photo-1653828950828-ff635393f11d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U21hbGwlMjBQZXQlMjBDb3p5JTIwSG91c2V8ZW58MHx8MHx8fDA%3D",
        altText: "Small Pet Cozy House"
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1743613465776-1b1b8092a2a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U21hbGwlMjBQZXQlMjBDb3p5JTIwSG91c2V8ZW58MHx8MHx8fDA%3D",
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
        url: "https://images.unsplash.com/photo-1701722579310-e033b550d55e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8RG9nJTIwUGFydHklMjBEcmVzc3xlbnwwfHwwfHx8MA%3D%3D",
        altText: "Dog Party Dress"
      },
      {
        url: "https://images.unsplash.com/photo-1624976066674-ed900e3f699e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fERvZyUyMFBhcnR5JTIwRHJlc3N8ZW58MHx8MHx8fDA%3D",
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
        url: "https://plus.unsplash.com/premium_photo-1661507128534-6b5d449995b8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        altText: "Cat Cooling Vest"
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1695815433310-15c6475c10aa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        altText: "Cat Cooling Vest"
      }
    ],
    rating: 4.7,
    numReviews: 25
  },
  {
    name: "Luxury Dog Bed",
    description: "Premium memory foam dog bed with orthopedic support. Perfect for senior dogs or those needing extra comfort.",
    price: 89.99,
    discountPrice: 79.99,
    countInStock: 25,
    sku: "DOG-BD-011",
    category: "Dog Furniture",
    brand: "PawStyle",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gray", "Brown", "Navy"],
    collections: "Comfort Living",
    material: "Memory Foam",
    gender: "Unisex",
    petType: "Dogs",
    images: [
      {
        url: "https://images.unsplash.com/photo-1640130960412-af425bde2be3",
        altText: "Luxury Dog Bed Front View"
      },
      {
        url: "https://images.unsplash.com/photo-1697939829612-f2ee98421a53",
        altText: "Luxury Dog Bed Side View"
      }
    ],
    rating: 4.9,
    numReviews: 45
  },
  {
    name: "Interactive Cat Toy Set",
    description: "Set of engaging toys to keep your cat entertained. Includes laser pointer, feather wand, and puzzle feeder.",
    price: 29.99,
    discountPrice: 24.99,
    countInStock: 50,
    sku: "CAT-TY-012",
    category: "Cat Toys",
    brand: "FancyFeline",
    sizes: ["One Size"],
    colors: ["Multicolor"],
    collections: "Play Time",
    material: "Mixed Materials",
    gender: "Unisex",
    petType: "Cats",
    images: [
      {
        url: "https://plus.unsplash.com/premium_photo-1664371206022-59b8607e00ac",
        altText: "Interactive Cat Toy Set"
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1661507128534-6b5d449995b8",
        altText: "Cat Playing with Toys"
      }
    ],
    rating: 4.7,
    numReviews: 32
  },
  {
    name: "Premium Bird Perch",
    description: "Natural wood perch with varying diameters for proper foot exercise. Includes mounting hardware.",
    price: 24.99,
    discountPrice: 19.99,
    countInStock: 40,
    sku: "BRD-PR-013",
    category: "Bird Accessories",
    brand: "BirdLife",
    sizes: ["S", "M", "L"],
    colors: ["Natural Wood"],
    collections: "Essential Care",
    material: "Natural Wood",
    gender: "Unisex",
    petType: "Birds",
    images: [
      {
        url: "https://plus.unsplash.com/premium_photo-1664304957188-a2f67dd1f721",
        altText: "Premium Bird Perch"
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1668046490283-8fca695d50a8",
        altText: "Bird on Perch"
      }
    ],
    rating: 4.6,
    numReviews: 28
  },
  {
    name: "Deluxe Hamster Habitat",
    description: "Spacious multi-level habitat with tubes, wheels, and feeding areas. Perfect for active small pets.",
    price: 79.99,
    discountPrice: 69.99,
    countInStock: 20,
    sku: "SML-HB-014",
    category: "Small Pet Housing",
    brand: "TinyHomes",
    sizes: ["One Size"],
    colors: ["Clear", "Blue", "Pink"],
    collections: "Luxury Living",
    material: "Pet-Safe Plastic",
    gender: "Unisex",
    petType: "Small Pets",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556568575-6c09e7df1441",
        altText: "Deluxe Hamster Habitat"
      },
      {
        url: "https://images.unsplash.com/photo-1592159371936-61a70cbeb5f7",
        altText: "Hamster in Habitat"
      }
    ],
    rating: 4.8,
    numReviews: 35
  },
  {
    name: "Winter Dog Boots Set",
    description: "Waterproof and warm boots for winter protection. Non-slip soles and adjustable straps for secure fit.",
    price: 45.99,
    discountPrice: 39.99,
    countInStock: 30,
    sku: "DOG-BT-015",
    category: "Dog Accessories",
    brand: "PawStyle",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Red", "Blue"],
    collections: "Winter Collection",
    material: "Waterproof Nylon",
    gender: "Unisex",
    petType: "Dogs",
    images: [
      {
        url: "https://images.unsplash.com/photo-1688592286068-1169451c0ae4",
        altText: "Winter Dog Boots"
      },
      {
        url: "https://images.unsplash.com/photo-1681571033428-cea742a5c4fc",
        altText: "Dog Wearing Boots"
      }
    ],
    rating: 4.5,
    numReviews: 42
  },
  {
    name: "Cat Window Perch",
    description: "Strong suction cup window seat giving your cat a perfect view. Supports up to 30lbs.",
    price: 34.99,
    discountPrice: 29.99,
    countInStock: 45,
    sku: "CAT-WP-016",
    category: "Cat Furniture",
    brand: "CoolCat",
    sizes: ["One Size"],
    colors: ["Beige", "Gray"],
    collections: "Comfort Living",
    material: "Sturdy Canvas",
    gender: "Unisex",
    petType: "Cats",
    images: [
      {
        url: "https://plus.unsplash.com/premium_photo-1695815433310-15c6475c10aa",
        altText: "Cat Window Perch"
      },
      {
        url: "https://images.unsplash.com/photo-1589223590696-6300f41aee7f",
        altText: "Cat on Window Perch"
      }
    ],
    rating: 4.7,
    numReviews: 38
  },
  {
    name: "Bird Training Kit",
    description: "Complete training kit including clicker, treats, and guide book. Perfect for teaching tricks and commands.",
    price: 49.99,
    discountPrice: 44.99,
    countInStock: 25,
    sku: "BRD-TK-017",
    category: "Bird Training",
    brand: "FeatherFriend",
    sizes: ["One Size"],
    colors: ["Mixed"],
    collections: "Training Essentials",
    material: "Mixed Materials",
    gender: "Unisex",
    petType: "Birds",
    images: [
      {
        url: "https://plus.unsplash.com/premium_photo-1669673986444-3d8d63f74ab3",
        altText: "Bird Training Kit"
      },
      {
        url: "https://images.unsplash.com/photo-1617480606371-cc0877a1cb61",
        altText: "Bird Training Session"
      }
    ],
    rating: 4.6,
    numReviews: 22
  },
  {
    name: "Small Pet Adventure Pack",
    description: "Travel carrier with built-in water bottle and treat compartment. Perfect for vet visits or travel.",
    price: 32.99,
    discountPrice: 27.99,
    countInStock: 35,
    sku: "SML-AP-018",
    category: "Small Pet Accessories",
    brand: "TinyFriends",
    sizes: ["S", "M"],
    colors: ["Pink", "Blue", "Green"],
    collections: "Travel Gear",
    material: "Durable Nylon",
    gender: "Unisex",
    petType: "Small Pets",
    images: [
      {
        url: "https://images.unsplash.com/photo-1653828950828-ff635393f11d",
        altText: "Small Pet Adventure Pack"
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1743613465776-1b1b8092a2a7",
        altText: "Adventure Pack in Use"
      }
    ],
    rating: 4.4,
    numReviews: 19
  },
  {
    name: "Designer Dog Collar",
    description: "Stylish and durable collar with premium hardware. Features quick-release buckle and ID tag ring.",
    price: 29.99,
    discountPrice: 24.99,
    countInStock: 50,
    sku: "DOG-CL-019",
    category: "Dog Accessories",
    brand: "PawStyle",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Brown", "Red", "Blue"],
    collections: "Fashion Collection",
    material: "Genuine Leather",
    gender: "Unisex",
    petType: "Dogs",
    images: [
      {
        url: "https://images.unsplash.com/photo-1701722579310-e033b550d55e",
        altText: "Designer Dog Collar"
      },
      {
        url: "https://images.unsplash.com/photo-1624976066674-ed900e3f699e",
        altText: "Dog Wearing Collar"
      }
    ],
    rating: 4.8,
    numReviews: 55
  },
  {
    name: "Cat Grooming Set",
    description: "Professional grooming kit including brush, nail clippers, and detangling comb. Keeps your cat looking their best.",
    price: 39.99,
    discountPrice: 34.99,
    countInStock: 40,
    sku: "CAT-GR-020",
    category: "Cat Grooming",
    brand: "FancyFeline",
    sizes: ["One Size"],
    colors: ["Pink", "Blue"],
    collections: "Grooming Essentials",
    material: "Stainless Steel",
    gender: "Unisex",
    petType: "Cats",
    images: [
      {
        url: "https://plus.unsplash.com/premium_photo-1664371206022-59b8607e00ac",
        altText: "Cat Grooming Set"
      },
      {
        url: "https://images.unsplash.com/photo-1619682488107-c0791e9be98d",
        altText: "Grooming Tools"
      }
    ],
    rating: 4.7,
    numReviews: 48
  }
];

module.exports = products;
