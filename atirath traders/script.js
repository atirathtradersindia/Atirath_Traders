lucide.createIcons();
AOS.init({ duration: 1000, once: true });

// Products and brands data (keep your existing data)
const productsData = {
  oil: [
    { id: 1, name: "Premium Sunflower Oil", brand: "sunflower", price: "₹830", image: "https://images.unsplash.com/photo-1600174279244-8edd4673c5e3?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Extra Virgin Olive Oil", brand: "olive", price: "₹1078", image: "https://images.unsplash.com/photo-1584291527905-f93079e379c2?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Organic Coconut Oil", brand: "coconut", price: "₹746", image: "https://images.unsplash.com/photo-1580973794290-43b8b72dafcb?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Refined Palm Oil", brand: "palm", price: "₹663", image: "https://images.unsplash.com/photo-1600174279244-8edd4673c5e3?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Soybean Oil Premium", brand: "soybean", price: "₹580", image: "https://images.unsplash.com/photo-1600174279244-8edd4673c5e3?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Sunflower Cooking Oil", brand: "sunflower", price: "₹871", image: "https://images.unsplash.com/photo-1600174279244-8edd4673c5e3?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Olive Oil Blend", brand: "olive", price: "₹995", image: "https://images.unsplash.com/photo-1584291527905-f93079e379c2?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Virgin Coconut Oil", brand: "coconut", price: "₹789", image: "https://images.unsplash.com/photo-1580973794290-43b8b72dafcb?auto=format&fit=crop&w=800&q=80" },
    { id: 9, name: "Palm Kernel Oil", brand: "palm", price: "₹705", image: "https://images.unsplash.com/photo-1600174279244-8edd4673c5e3?auto=format&fit=crop&w=800&q=80" },
    { id: 10, name: "Refined Soybean Oil", brand: "soybean", price: "₹622", image: "https://images.unsplash.com/photo-1600174279244-8edd4673c5e3?auto=format&fit=crop&w=800&q=80" }
  ],
  construction: [
    { id: 1, name: "TMT Steel Bars", brand: "steel", price: "₹4232", image: "https://images.unsplash.com/photo-1581093450021-1a56f6fc03a7?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Portland Cement", brand: "cement", price: "₹3402", image: "https://images.unsplash.com/photo-1581093450021-1a56f6fc03a7?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Red Bricks", brand: "bricks", price: "₹2572", image: "https://images.unsplash.com/photo-1581093450021-1a56f6fc03a7?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "River Sand", brand: "sand", price: "₹2157", image: "https://images.unsplash.com/photo-1581093450021-1a56f6fc03a7?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Teak Wood Planks", brand: "wood", price: "₹5062", image: "https://images.unsplash.com/photo-1581093450021-1a56f6fc03a7?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Steel Rods", brand: "steel", price: "₹4647", image: "https://images.unsplash.com/photo-1581093450021-1a56f6fc03a7?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "OPC Cement", brand: "cement", price: "₹3817", image: "https://images.unsplash.com/photo-1581093450021-1a56f6fc03a7?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Clay Bricks", brand: "bricks", price: "₹2987", image: "https://images.unsplash.com/photo-1581093450021-1a56f6fc03a7?auto=format&fit=crop&w=800&q=80" },
    { id: 9, name: "Fine Sand", brand: "sand", price: "₹2406", image: "https://images.unsplash.com/photo-1581093450021-1a56f6fc03a7?auto=format&fit=crop&w=800&q=80" },
    { id: 10, name: "Oak Wood", brand: "wood", price: "₹5477", image: "https://images.unsplash.com/photo-1581093450021-1a56f6fc03a7?auto=format&fit=crop&w=800&q=80" }
  ],
  pulses: [
    { id: 1, name: "Red Lentils", brand: "lentil", price: "₹497", image: "https://images.unsplash.com/photo-1625242661144-c5bbb1a3cce0?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Chickpeas Premium", brand: "chickpea", price: "₹580", image: "https://images.unsplash.com/photo-1625242661144-c5bbb1a3cce0?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Green Moong Dal", brand: "moong", price: "₹414", image: "https://images.unsplash.com/photo-1625242661144-c5bbb1a3cce0?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Black Urad Dal", brand: "urad", price: "₹456", image: "https://images.unsplash.com/photo-1625242661144-c5bbb1a3cce0?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Pigeon Pea", brand: "pigeonpea", price: "₹539", image: "https://images.unsplash.com/photo-1625242661144-c5bbb1a3cce0?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Yellow Lentils", brand: "lentil", price: "₹480", image: "https://images.unsplash.com/photo-1625242661144-c5bbb1a3cce0?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Kabuli Chickpeas", brand: "chickpea", price: "₹663", image: "https://images.unsplash.com/photo-1625242661144-c5bbb1a3cce0?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Whole Moong", brand: "moong", price: "₹439", image: "https://images.unsplash.com/photo-1625242661144-c5bbb1a3cce0?auto=format&fit=crop&w=800&q=80" },
    { id: 9, name: "White Urad", brand: "urad", price: "₹472", image: "https://images.unsplash.com/photo-1625242661144-c5bbb1a3cce0?auto=format&fit=crop&w=800&q=80" },
    { id: 10, name: "Split Pigeon Pea", brand: "pigeonpea", price: "₹522", image: "https://images.unsplash.com/photo-1625242661144-c5bbb1a3cce0?auto=format&fit=crop&w=800&q=80" }
  ],
  rice: [
    { id: 1, name: "Premium Basmati Rice", brand: "basmati", price: "₹1078", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Royal Jasmine Rice", brand: "jasmine", price: "₹912", image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Organic Brown Rice", brand: "brown", price: "₹746", image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Italian Arborio Rice", brand: "arborio", price: "₹995", image: "https://images.unsplash.com/photo-1562962234-2c0b2d304071?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Sushi Rice Premium", brand: "sushi", price: "₹829", image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Wild Rice Blend", brand: "wild", price: "₹1244", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Red Rice Organic", brand: "red", price: "₹663", image: "https://images.unsplash.com/photo-1540661116511-03089b56f8e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Black Rice Premium", brand: "black", price: "₹1161", image: "https://images.unsplash.com/photo-1562962234-2c0b2d304071?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 9, name: "Basmati Extra Long", brand: "basmati", price: "₹1327", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 10, name: "Jasmine Fragrant Rice", brand: "jasmine", price: "₹789", image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
  ],
  fruits: [
    { id: 1, name: "Red Delicious Apple", brand: "apple", price: "₹248", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b5cbd6?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Cavendish Banana", brand: "banana", price: "₹165", image: "https://images.unsplash.com/photo-1528825871115-3581a5389679?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Navel Orange", brand: "citrus", price: "₹290", image: "https://images.unsplash.com/photo-1547517023-876456b31ed8?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Fresh Strawberry", brand: "berry", price: "₹414", image: "https://images.unsplash.com/photo-1464965911861-7a225c143d77?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Pineapple Queen", brand: "tropical", price: "₹497", image: "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Green Apple", brand: "apple", price: "₹232", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b5cbd6?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Plantain Banana", brand: "banana", price: "₹190", image: "https://images.unsplash.com/photo-1528825871115-3581a5389679?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Blood Orange", brand: "citrus", price: "₹331", image: "https://images.unsplash.com/photo-1547517023-876456b31ed8?auto=format&fit=crop&w=800&q=80" },
    { id: 9, name: "Blueberry Pack", brand: "berry", price: "₹456", image: "https://images.unsplash.com/photo-1464965911861-7a225c143d77?auto=format&fit=crop&w=800&q=80" },
    { id: 10, name: "Mango Alphonso", brand: "tropical", price: "₹580", image: "https://images.unsplash.com/photo-1591073115912-150fd5915914?auto=format&fit=crop&w=800&q=80" }
  ],
  vegetables: [
    { id: 1, name: "Spinach Leaves", brand: "leafy", price: "₹331", image: "https://images.unsplash.com/photo-1576045057995-6271fcec5a3f?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Carrot Organic", brand: "root", price: "₹207", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Broccoli Fresh", brand: "cruciferous", price: "₹373", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Garlic Bulbs", brand: "allium", price: "₹165", image: "https://images.unsplash.com/photo-1533974291714-5e92a972b85d?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Pumpkin Large", brand: "gourd", price: "₹497", image: "https://images.unsplash.com/photo-1506976785307-8734d043aab0?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Kale Bunch", brand: "leafy", price: "₹315", image: "https://images.unsplash.com/photo-1576045057995-6271fcec5a3f?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Potato Russet", brand: "root", price: "₹190", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Cauliflower Head", brand: "cruciferous", price: "₹356", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=800&q=80" },
    { id: 9, name: "Onion Red", brand: "allium", price: "₹149", image: "https://images.unsplash.com/photo-1533974291714-5e92a972b85d?auto=format&fit=crop&w=800&q=80" },
    { id: 10, name: "Zucchini Green", brand: "gourd", price: "₹290", image: "https://images.unsplash.com/photo-1506976785307-8734d043aab0?auto=format&fit=crop&w=800&q=80" }
  ],
  gadgets: [
    { id: 1, name: "iPhone 14", brand: "smartphone", price: "₹66317", image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "MacBook Pro", brand: "laptop", price: "₹107817", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "iPad Air", brand: "tablet", price: "₹49717", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Apple Watch", brand: "wearable", price: "₹33117", image: "https://images.unsplash.com/photo-1551816230-ef94b4a9f00c?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "AirPods Pro", brand: "audio", price: "₹20667", image: "https://images.unsplash.com/photo-1585098897333-2183fbf08f42?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Samsung Galaxy", brand: "smartphone", price: "₹58017", image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Dell XPS", brand: "laptop", price: "₹99517", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Samsung Tablet", brand: "tablet", price: "₹41417", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80" },
    { id: 9, name: "Fitbit Versa", brand: "wearable", price: "₹16517", image: "https://images.unsplash.com/photo-1551816230-ef94b4a9f00c?auto=format&fit=crop&w=800&q=80" },
    { id: 10, name: "Bose Headphones", brand: "audio", price: "₹24817", image: "https://images.unsplash.com/photo-1585098897333-2183fbf08f42?auto=format&fit=crop&w=800&q=80" }
  ],
  chocolate: [
    { id: 1, name: "Dark Chocolate Bar", brand: "dark", price: "₹331", image: "https://images.unsplash.com/photo-1575377427642-087cf684f29d?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Milk Chocolate", brand: "milk", price: "₹248", image: "https://images.unsplash.com/photo-1541781544593-75c0ab2787ae?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "White Chocolate", brand: "white", price: "₹290", image: "https://images.unsplash.com/photo-1630585308291-03089b56f8e0?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Filled Truffles", brand: "filled", price: "₹414", image: "https://images.unsplash.com/photo-1606890658317-7d14490b76fd?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Nutty Chocolate Bar", brand: "bar", price: "₹315", image: "https://images.unsplash.com/photo-1542552968-15e5a8e5cf87?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "70% Dark Cocoa", brand: "dark", price: "₹356", image: "https://images.unsplash.com/photo-1575377427642-087cf684f29d?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Creamy Milk Chocolate", brand: "milk", price: "₹273", image: "https://images.unsplash.com/photo-1541781544593-75c0ab2787ae?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Vanilla White Chocolate", brand: "white", price: "₹306", image: "https://images.unsplash.com/photo-1630585308291-03089b56f8e0?auto=format&fit=crop&w=800&q=80" },
    { id: 9, name: "Caramel Filled", brand: "filled", price: "₹456", image: "https://images.unsplash.com/photo-1606890658317-7d14490b76fd?auto=format&fit=crop&w=800&q=80" },
    { id: 10, name: "Almond Bar", brand: "bar", price: "₹348", image: "https://images.unsplash.com/photo-1542552968-15e5a8e5cf87?auto=format&fit=crop&w=800&q=80" }
  ],
  beverages: [
    { id: 1, name: "Cola Soft Drink", brand: "softdrink", price: "₹165", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Orange Juice", brand: "juice", price: "₹331", image: "https://images.unsplash.com/photo-1600271886742-e76205f977c3?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Energy Drink", brand: "energy", price: "₹207", image: "https://images.unsplash.com/photo-1622547748225-3fc4ed8a594f?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Bottled Water", brand: "water", price: "₹82", image: "https://images.unsplash.com/photo-1616118139214-03089b56f8e0?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Red Wine", brand: "alcoholic", price: "₹1327", image: "https://images.unsplash.com/photo-1580310217256-2219b1f81e21?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Lemonade Soft Drink", brand: "softdrink", price: "₹149", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Apple Juice", brand: "juice", price: "₹290", image: "https://images.unsplash.com/photo-1600271886742-e76205f977c3?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Pre Workout Energy", brand: "energy", price: "₹248", image: "https://images.unsplash.com/photo-1622547748225-3fc4ed8a594f?auto=format&fit=crop&w=800&q=80" },
    { id: 9, name: "Sparkling Water", brand: "water", price: "₹124", image: "https://images.unsplash.com/photo-1616118139214-03089b56f8e0?auto=format&fit=crop&w=800&q=80" },
    { id: 10, name: "Beer Pack", brand: "alcoholic", price: "₹1078", image: "https://images.unsplash.com/photo-1580310217256-2219b1f81e21?auto=format&fit=crop&w=800&q=80" }
  ],
  perfume: [
    { id: 1, name: "Rose Floral Perfume", brand: "floral", price: "₹4149", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Amber Oriental", brand: "oriental", price: "₹4979", image: "https://images.unsplash.com/photo-1587017535344-827a4c655b28?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Sandalwood Woody", brand: "woody", price: "₹4564", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Ocean Fresh", brand: "fresh", price: "₹3734", image: "https://images.unsplash.com/photo-1619455915912-150fd1584d67?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Lemon Citrus", brand: "citrus", price: "₹3319", image: "https://images.unsplash.com/photo-1580915915913-91ea8c7fd275?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Lavender Floral", brand: "floral", price: "₹4398", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Vanilla Oriental", brand: "oriental", price: "₹5228", image: "https://images.unsplash.com/photo-1587017535344-827a4c655b28?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Cedar Woody", brand: "woody", price: "₹4813", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80" },
    { id: 9, name: "Mint Fresh", brand: "fresh", price: "₹3983", image: "https://images.unsplash.com/photo-1619455915912-150fd1584d67?auto=format&fit=crop&w=800&q=80" },
    { id: 10, name: "Grapefruit Citrus", brand: "citrus", price: "₹3568", image: "https://images.unsplash.com/photo-1580915915913-91ea8c7fd275?auto=format&fit=crop&w=800&q=80" }
  ],
  flowers: [
    { id: 1, name: "Red Rose Bouquet", brand: "rose", price: "₹1659", image: "https://images.unsplash.com/photo-1519378058457-4ca4e596e0bf?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "White Lily", brand: "lily", price: "₹1327", image: "https://images.unsplash.com/photo-1527602138142-55a9ef0befd9?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Colorful Tulip", brand: "tulip", price: "₹1493", image: "https://images.unsplash.com/photo-1519378058457-4ca4e596e0bf?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Exotic Orchid", brand: "orchid", price: "₹2074", image: "https://images.unsplash.com/photo-1519378058457-4ca4e596e0bf?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Yellow Sunflower", brand: "sunflower", price: "₹1244", image: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Pink Rose", brand: "rose", price: "₹1576", image: "https://images.unsplash.com/photo-1519378058457-4ca4e596e0bf?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Tiger Lily", brand: "lily", price: "₹1410", image: "https://images.unsplash.com/photo-1527602138142-55a9ef0befd9?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Red Tulip", brand: "tulip", price: "₹1535", image: "https://images.unsplash.com/photo-1519378058457-4ca4e596e0bf?auto=format&fit=crop&w=800&q=80" },
    { id: 9, name: "Purple Orchid", brand: "orchid", price: "₹2157", image: "https://images.unsplash.com/photo-1519378058457-4ca4e596e0bf?auto=format&fit=crop&w=800&q=80" },
    { id: 10, name: "Giant Sunflower", brand: "sunflower", price: "₹1286", image: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&w=800&q=80" }
  ],
  spices: [
    { id: 1, name: "Ground Cumin", brand: "cumin", price: "₹414", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Turmeric Powder", brand: "turmeric", price: "₹331", image: "https://images.unsplash.com/photo-1566467135259-27a6421c14d9?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Black Pepper", brand: "pepper", price: "₹456", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Cinnamon Sticks", brand: "cinnamon", price: "₹373", image: "https://images.unsplash.com/photo-1585570854844-4a091906e7e1?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Whole Cloves", brand: "clove", price: "₹580", image: "https://images.unsplash.com/photo-1542994893-a8c4f6e28f14?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Cumin Seeds", brand: "cumin", price: "₹439", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Organic Turmeric", brand: "turmeric", price: "₹356", image: "https://images.unsplash.com/photo-1566467135259-27a6421c14d9?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "White Pepper", brand: "pepper", price: "₹497", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80" },
    { id: 9, name: "Ground Cinnamon", brand: "cinnamon", price: "₹398", image: "https://images.unsplash.com/photo-1585570854844-4a091906e7e1?auto=format&fit=crop&w=800&q=80" },
    { id: 10, name: "Clove Powder", brand: "clove", price: "₹605", image: "https://images.unsplash.com/photo-1542994893-a8c4f6e28f14?auto=format&fit=crop&w=800&q=80" }
  ],
  clothing: [
    { id: 1, name: "Men's T-Shirt", brand: "men", price: "₹1659", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Women's Dress", brand: "women", price: "₹2489", image: "https://images.unsplash.com/photo-1598535915912-e467d3e1f1f9?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Kids Jacket", brand: "kids", price: "₹2074", image: "https://images.unsplash.com/photo-1502451886376-fda936ef3ee0?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Sport Leggings", brand: "sport", price: "₹2904", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Formal Suit", brand: "formal", price: "₹8299", image: "https://images.unsplash.com/photo-1603252109303-175d170c0c05?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Men's Jeans", brand: "men", price: "₹3319", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Women's Blouse", brand: "women", price: "₹2157", image: "https://images.unsplash.com/photo-1598535915912-e467d3e1f1f9?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Kids Shoes", brand: "kids", price: "₹1659", image: "https://images.unsplash.com/photo-1502451886376-fda936ef3ee0?auto=format&fit=crop&w=800&q=80" },
    { id: 9, name: "Sport Jacket", brand: "sport", price: "₹3734", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" },
    { id: 10, name: "Formal Shirt", brand: "formal", price: "₹4149", image: "https://images.unsplash.com/photo-1603252109303-175d170c0c05?auto=format&fit=crop&w=800&q=80" }
  ],
  dryfruits: [
    { id: 1, name: "Roasted Almonds", brand: "almond", price: "₹829", image: "https://images.unsplash.com/photo-1599541065177-3d170b270b58?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Cashew Nuts", brand: "cashew", price: "₹995", image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Golden Raisins", brand: "raisin", price: "₹580", image: "https://images.unsplash.com/photo-1615484477201-7f030cc3e98e?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Walnut Kernels", brand: "walnut", price: "₹912", image: "https://images.unsplash.com/photo-1593526492274-8b74cd2138e5?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Pistachio Shelled", brand: "pistachio", price: "₹1078", image: "https://images.unsplash.com/photo-1615484476567-9a7f7de4db6d?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Salted Almonds", brand: "almond", price: "₹871", image: "https://images.unsplash.com/photo-1599541065177-3d170b270b58?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Raw Cashews", brand: "cashew", price: "₹1037", image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Black Raisins", brand: "raisin", price: "₹622", image: "https://images.unsplash.com/photo-1615484477201-7f030cc3e98e?auto=format&fit=crop&w=800&q=80" },
    { id: 9, name: "Whole Walnuts", brand: "walnut", price: "₹954", image: "https://images.unsplash.com/photo-1593526492274-8b74cd2138e5?auto=format&fit=crop&w=800&q=80" },
    { id: 10, name: "Roasted Pistachio", brand: "pistachio", price: "₹1120", image: "https://images.unsplash.com/photo-1615484476567-9a7f7de4db6d?auto=format&fit=crop&w=800&q=80" }
  ],
  tea: [
    { id: 1, name: "English Breakfast Tea", brand: "black", price: "₹663", image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Green Tea Leaves", brand: "green", price: "₹580", image: "https://images.unsplash.com/photo-1498673394965-35cb14994a81?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Chamomile Herbal", brand: "herbal", price: "₹497", image: "https://images.unsplash.com/photo-1457459588520-2ae325c92c08?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Oolong Tea", brand: "oolong", price: "₹746", image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "White Tea Premium", brand: "white", price: "₹829", image: "https://images.unsplash.com/photo-1498673394965-35cb14994a81?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Assam Black Tea", brand: "black", price: "₹705", image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Matcha Green Tea", brand: "green", price: "₹912", image: "https://images.unsplash.com/photo-1498673394965-35cb14994a81?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Peppermint Herbal", brand: "herbal", price: "₹539", image: "https://images.unsplash.com/photo-1457459588520-2ae325c92c08?auto=format&fit=crop&w=800&q=80" },
    { id: 9, name: "Dragonwell Oolong", brand: "oolong", price: "₹789", image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=80" },
    { id: 10, name: "Silver Needle White", brand: "white", price: "₹995", image: "https://images.unsplash.com/photo-1498673394965-35cb14994a81?auto=format&fit=crop&w=800&q=80" }
  ]
};

const brandsData = {
  oil: ["sunflower", "olive", "coconut", "palm", "soybean", "mustard"],
  construction: ["steel", "cement", "bricks", "sand", "wood", "paint"],
  pulses: ["lentil", "chickpea", "moong", "urad", "pigeonpea", "peas"],
  rice: ["basmati", "jasmine", "brown", "arborio", "sushi", "wild", "red", "black"],
  fruits: ["apple", "banana", "citrus", "berry", "tropical", "grapes"],
  vegetables: ["leafy", "root", "cruciferous", "allium", "gourd", "squash"],
  gadgets: ["smartphone", "laptop", "tablet", "wearable", "audio", "camera"],
  chocolate: ["dark", "milk", "white", "filled", "bar", "ruby"],
  beverages: ["softdrink", "juice", "energy", "water", "alcoholic", "coffee"],
  perfume: ["floral", "oriental", "woody", "fresh", "citrus", "gourmand"],
  flowers: ["rose", "lily", "tulip", "orchid", "sunflower", "daisy"],
  spices: ["cumin", "turmeric", "pepper", "cinnamon", "clove", "nutmeg"],
  clothing: ["men", "women", "kids", "sport", "formal", "casual"],
  dryfruits: ["almond", "cashew", "raisin", "walnut", "pistachio", "dates"],
  tea: ["black", "green", "herbal", "oolong", "white", "puerh"]
};

// Global variables
let currentProductType = null;
let currentProducts = [];
let cart = [];

// Function to save current page state
function savePageState(pageId, productType = null) {
  localStorage.setItem('currentPage', pageId);
  if (productType) {
    localStorage.setItem('currentProductType', productType);
  }
}

// Function to clear page state (for home page)
function clearPageState() {
  localStorage.removeItem('currentPage');
  localStorage.removeItem('currentProductType');
}

// Function to show a specific page
function showPage(pageId, productType = null) {
  const pages = document.querySelectorAll('.page');
  const navSearch = document.getElementById('nav-search');
  
  pages.forEach(page => {
    page.classList.remove('active');
  });
  
  document.getElementById(pageId).classList.add('active');
  window.scrollTo(0, 0);
  
  if (pageId === 'product-page') {
    navSearch.classList.remove('hidden');
    if (productType) {
      savePageState(pageId, productType);
    }
  } else {
    navSearch.classList.add('hidden');
    if (pageId === 'home-page') {
      clearPageState();
    } else {
      savePageState(pageId);
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Check if there's a saved page state
  const savedPage = localStorage.getItem('currentPage');
  const savedProductType = localStorage.getItem('currentProductType');
  
  // Load service cards first
  loadServiceCards();
  
  // Page navigation functionality
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-link');
  const navSearch = document.getElementById('nav-search');

  // Check for saved page state on load
  if (savedPage && savedPage === 'product-page' && savedProductType) {
    // Show product page with saved product type
    currentProductType = savedProductType;
    showPage('product-page', savedProductType);
    initializeProductPage(savedProductType);
  } else if (savedPage) {
    // Show other saved page
    showPage(savedPage);
  } else {
    // Default to home page
    showPage('home-page');
  }

  // Add event listeners to navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetPage = this.getAttribute('data-page');
      if (targetPage) {
        if (targetPage === 'home' && this.getAttribute('href').startsWith('#')) {
          // Scroll to section on home page
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
          // Close mobile menu if open
          const mobileMenu = document.getElementById('mobile-menu');
          if (mobileMenu && mobileMenu.classList.contains('visible')) {
            mobileMenu.classList.remove('visible');
          }
        } else {
          showPage(targetPage + '-page');
          // Close mobile menu if open
          const mobileMenu = document.getElementById('mobile-menu');
          if (mobileMenu && mobileMenu.classList.contains('visible')) {
            mobileMenu.classList.remove('visible');
          }
        }
      }
    });
  });

  // Function to add event listeners to service cards using event delegation
  function addServiceCardListeners() {
    const servicesGrid = document.querySelector('#services .grid');
  
    if (servicesGrid) {
      servicesGrid.addEventListener('click', function(e) {
        const serviceCard = e.target.closest('.service-card');
      
        if (serviceCard) {
          const product = serviceCard.getAttribute('data-product');
          console.log('Service card clicked, product:', product);
        
          if (product) {
            currentProductType = product;
            showPage('product-page', product);
            initializeProductPage(currentProductType);
          
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('visible')) {
              mobileMenu.classList.remove('visible');
            }
          }
        }
      });
    }
  }

  // Product Page Functionality
  function initializeProductPage(type) {
    console.log('Initializing product page for:', type);
  
    const products = productsData[type] || [];
    const brands = brandsData[type] || [];
    const productsGrid = document.getElementById('products-grid');
    const brandList = document.querySelector('.brand-list');
    const sidebarTitle = document.querySelector('.categories-sidebar h3');
    const searchInput = document.getElementById('nav-search-input');
    const categoriesToggle = document.getElementById('categories-toggle');
    const categoriesSidebar = document.getElementById('categories-sidebar');
    const overlay = document.getElementById('overlay');
    const container = document.querySelector('.product-page .max-w-7xl');
    
    currentProducts = products;
    
    // Set title
    if (sidebarTitle) {
      sidebarTitle.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Brands`;
    }
    
    // Render brands
    if (brandList) {
      brandList.innerHTML = '';
      brands.forEach((brand, index) => {
        const li = document.createElement('li');
        li.className = 'brand-item';
        li.dataset.brand = brand;
        li.textContent = brand.charAt(0).toUpperCase() + brand.slice(1);
        li.setAttribute('data-aos', 'slide-right');
        li.setAttribute('data-aos-delay', (index * 50).toString());
        brandList.appendChild(li);
      });
    }
    
    // Render products function
    function renderProducts(prods) {
      if (!productsGrid) return;
    
      productsGrid.innerHTML = '';
    
      if (prods.length === 0) {
        productsGrid.innerHTML = `
          <div class="col-span-full text-center py-12">
            <p class="text-lg accent">No products found</p>
            <p class="text-sm opacity-80 mt-2">Try selecting a different brand or search term</p>
          </div>
        `;
        return;
      }
    
      prods.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="flex justify-between items-center mb-2">
              <p class="product-price">${product.price}</p>
              <div class="flex items-center gap-2">
                <button class="minus-btn bg-[#31487A] hover:bg-[#192338] rounded px-2 py-1 text-white font-semibold transition-colors">-</button>
                <input type="number" class="quantity-input w-12 p-1 border border-[#8FB3E2] rounded text-center bg-[#1E2E4F] text-white focus:outline-none focus:ring-2 focus:ring-[#D9E1F1]" value="1" min="1" max="99">
                <button class="plus-btn bg-[#31487A] hover:bg-[#192338] rounded px-2 py-1 text-white font-semibold transition-colors">+</button>
              </div>
            </div>
            <p class="text-xs opacity-70 mt-1">Brand: ${product.brand}</p>
            <div class="product-actions flex gap-2 mt-3">
              <button class="add-to-cart-btn py-2 px-3 bg-[#31487A] hover:bg-[#192338] rounded text-sm font-semibold transition-colors text-white flex-1">Add to Cart</button>
              <button class="order-now-btn py-2 px-3 bg-green-600 hover:bg-green-700 rounded text-sm font-semibold transition-colors text-white flex-1">Order Now</button>
            </div>
          </div>
        `;
        productsGrid.appendChild(productCard);
      });
      
      // Add event listeners for buttons after rendering
      addProductButtonListeners();
    }
    
    // Function to add event listeners to product buttons
    function addProductButtonListeners() {
      const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
      const orderNowBtns = document.querySelectorAll('.order-now-btn');
      const quantityInputs = document.querySelectorAll('.quantity-input');
      const minusBtns = document.querySelectorAll('.minus-btn');
      const plusBtns = document.querySelectorAll('.plus-btn');
      
      addToCartBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
          const card = e.target.closest('.product-card');
          const product = currentProducts.find(p => p.name === card.querySelector('.product-title').textContent);
          const quantity = parseInt(card.querySelector('.quantity-input').value) || 1;
          cart.push({ ...product, quantity });
          alert(`${quantity} x ${product.name} added to cart! (Total items in cart: ${cart.length})`);
          console.log('Cart updated:', cart);
        });
      });
      
      orderNowBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
          const card = e.target.closest('.product-card');
          const product = currentProducts.find(p => p.name === card.querySelector('.product-title').textContent);
          const quantity = parseInt(card.querySelector('.quantity-input').value) || 1;
          alert(`Ordering ${quantity} x ${product.name} now! Redirecting to checkout...`);
          // In a real app, redirect to checkout page with product details
          console.log('Order initiated:', { ...product, quantity });
        });
      });
      
      // Plus/Minus buttons
      minusBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const input = e.target.nextElementSibling;
          let val = parseInt(input.value) - 1;
          if (val < 1) val = 1;
          input.value = val;
        });
      });
      
      plusBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const input = e.target.previousElementSibling;
          let val = parseInt(input.value) + 1;
          if (val > 99) val = 99;
          input.value = val;
        });
      });
      
      // Optional: Update quantity limits or validation
      quantityInputs.forEach(input => {
        input.addEventListener('change', (e) => {
          if (e.target.value < 1) e.target.value = 1;
          if (e.target.value > 99) e.target.value = 99;
        });
      });
    }
    
    // Initial render of all products
    renderProducts(currentProducts);
    
    // Scroll to top after rendering to ensure header is visible
    window.scrollTo(0, 0);
    
    // Search placeholder
    if (searchInput) {
      searchInput.placeholder = `Search ${type} products...`;
      searchInput.value = ''; // Clear previous search
    }
    
    // Brand filter functionality
    if (brandList) {
      const brandItems = brandList.querySelectorAll('.brand-item');
      brandItems.forEach(item => {
        item.addEventListener('click', () => {
          const brand = item.dataset.brand;
          const filteredProducts = currentProducts.filter(product => product.brand === brand);
          renderProducts(filteredProducts);
        
          // Update active state
          brandItems.forEach(b => b.classList.remove('active'));
          item.classList.add('active');
        });
      });
      
      // Add "All Brands" option
      const allBrandsItem = document.createElement('li');
      allBrandsItem.className = 'brand-item active';
      allBrandsItem.textContent = 'All Brands';
      allBrandsItem.addEventListener('click', () => {
        renderProducts(currentProducts);
        brandItems.forEach(b => b.classList.remove('active'));
        allBrandsItem.classList.add('active');
      });
      brandList.insertBefore(allBrandsItem, brandList.firstChild);
    }
    
    // Toggle categories sidebar
    if (categoriesToggle && categoriesSidebar && overlay && container) {
      categoriesToggle.addEventListener('click', () => {
        const isActive = categoriesSidebar.classList.contains('active');
        categoriesSidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        container.classList.toggle('sidebar-open', !isActive);
      });
      
      // Close sidebar when clicking overlay
      overlay.addEventListener('click', () => {
        categoriesSidebar.classList.remove('active');
        overlay.classList.remove('active');
        container.classList.remove('sidebar-open');
      });
    }
    
    // Global search listener
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        let filteredProducts = currentProducts;
      
        if (searchTerm) {
          filteredProducts = currentProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm)
          );
        }
      
        renderProducts(filteredProducts);
      });
    }
    
    AOS.refresh();
  }

  // Make initializeProductPage globally available
  window.initializeProductPage = initializeProductPage;
  
  // Add smooth scroll for home page sections with state clearing
  document.querySelectorAll('#home-page a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        // Clear page state when navigating within home page
        clearPageState();
      }
    });
  });

  // Your existing feedback form, signin, signup, profile, slideshow, mobile menu code...
  // Keep all your existing code for these sections

});

// Function to load service cards
function loadServiceCards() {
  const servicesGrid = document.querySelector('#services .grid');
  if (servicesGrid) {
    servicesGrid.innerHTML = `
      <!-- Oil Refining -->
      <div class="glass p-4 text-center service-card" data-aos="fade-up" data-product="oil">
        <div class="service-icon-container">
          <div class="service-icon-cube">
            <div class="service-icon-face service-icon-front">
              <img src="oil.jpeg" alt="Oil Refining">
            </div>
            <div class="service-icon-face service-icon-back">
              <img src="oil.jpeg" alt="Oil Refining">
            </div>
            <div class="service-icon-face service-icon-top">
              <img src="oil.jpeg" alt="Oil Refining">
            </div>
            <div class="service-icon-face service-icon-bottom">
              <img src="oil.jpeg" alt="Oil Refining">
            </div>
            <div class="service-icon-face service-icon-left">
              <img src="oil.jpeg" alt="Oil Refining">
            </div>
            <div class="service-icon-face service-icon-right">
              <img src="oil.jpeg" alt="Oil Refining">
            </div>
          </div>
        </div>
        <h4 class="text-lg font-semibold accent mb-2">Edible Oil Refining</h4>
        <p class="text-sm">High-quality refined Edible oil products for culinary and industrial use.</p>
      </div>
      
      <!-- Construction Materials -->
      <div class="glass p-4 text-center service-card" data-aos="fade-up" data-aos-delay="400" data-product="construction">
        <div class="service-icon-container">
          <div class="service-icon-cube">
            <div class="service-icon-face service-icon-front">
              <img src="steel-cement.png" alt="Construction Materials">
            </div>
            <div class="service-icon-face service-icon-back">
              <img src="steel-cement.png" alt="Construction Materials">
            </div>
            <div class="service-icon-face service-icon-top">
              <img src="steel-cement.png" alt="Construction Materials">
            </div>
            <div class="service-icon-face service-icon-bottom">
              <img src="steel-cement.png" alt="Construction Materials">
            </div>
            <div class="service-icon-face service-icon-left">
              <img src="steel-cement.png" alt="Construction Materials">
            </div>
            <div class="service-icon-face service-icon-right">
              <img src="steel-cement.png" alt="Construction Materials">
            </div>
          </div>
        </div>
        <h4 class="text-lg font-semibold accent mb-2">Construction Materials</h4>
        <p class="text-sm">High-quality steel and cement for construction projects.</p>
      </div>
      <!-- Pulses -->
      <div class="glass p-4 text-center service-card" data-aos="fade-up" data-aos-delay="600" data-product="pulses">
        <div class="service-icon-container">
          <div class="service-icon-cube">
            <div class="service-icon-face service-icon-front">
              <img src="rice.png" alt="Rice">
            </div>
            <div class="service-icon-face service-icon-back">
              <img src="dal.jpg" alt="Rice">
            </div>
            <div class="service-icon-face service-icon-top">
              <img src="rajma.png" alt="Rice">
            </div>
            <div class="service-icon-face service-icon-bottom">
              <img src="pluses.webp" alt="Rice">
            </div>
            <div class="service-icon-face service-icon-left">
              <img src="pluses_2.webp" alt="Rice">
            </div>
            <div class="service-icon-face service-icon-right">
              <img src="rajma.png" alt="Rice">
            </div>
          </div>
        </div>
        <h4 class="text-lg font-semibold accent mb-2">Pulses</h4>
        <p class="text-sm">Premium pulses and food products for domestic and international markets.</p>
      </div>
      <!-- Rice -->
      <div class="glass p-4 text-center service-card" data-aos="fade-up" data-aos-delay="0" data-product="rice">
        <div class="service-icon-container">
          <div class="service-icon-cube">
            <div class="service-icon-face service-icon-front">
              <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Rice">
            </div>
            <div class="service-icon-face service-icon-back">
              <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Rice">
            </div>
            <div class="service-icon-face service-icon-top">
              <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Rice">
            </div>
            <div class="service-icon-face service-icon-bottom">
              <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Rice">
            </div>
            <div class="service-icon-face service-icon-left">
              <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Rice">
            </div>
            <div class="service-icon-face service-icon-right">
              <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Rice">
            </div>
          </div>
        </div>
        <h4 class="text-lg font-semibold accent mb-2">Rice</h4>
        <p class="text-sm">Premium quality rice varieties for domestic and international markets.</p>
      </div>
      <!-- Fruits -->
      <div class="glass p-4 text-center service-card" data-aos="fade-up" data-aos-delay="200" data-product="fruits">
        <div class="service-icon-container">
          <div class="service-icon-cube">
            <div class="service-icon-face service-icon-front">
              <img src="https://images.unsplash.com/photo-1619566636858-030cc030e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Fruits">
            </div>
            <div class="service-icon-face service-icon-back">
              <img src="https://images.unsplash.com/photo-1619566636858-030cc030e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Fruits">
            </div>
            <div class="service-icon-face service-icon-top">
              <img src="https://images.unsplash.com/photo-1619566636858-030cc030e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Fruits">
            </div>
            <div class="service-icon-face service-icon-bottom">
              <img src="https://images.unsplash.com/photo-1619566636858-030cc030e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Fruits">
            </div>
            <div class="service-icon-face service-icon-left">
              <img src="https://images.unsplash.com/photo-1619566636858-030cc030e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Fruits">
            </div>
            <div class="service-icon-face service-icon-right">
              <img src="https://images.unsplash.com/photo-1619566636858-030cc030e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Fruits">
            </div>
          </div>
        </div>
        <h4 class="text-lg font-semibold accent mb-2">Fruits</h4>
        <p class="text-sm">Fresh and high-quality fruits sourced from the best farms.</p>
      </div>
      <!-- Vegetables -->
      <div class="glass p-4 text-center service-card" data-aos="fade-up" data-aos-delay="400" data-product="vegetables">
        <div class="service-icon-container">
          <div class="service-icon-cube">
            <div class="service-icon-face service-icon-front">
              <img src="https://images.unsplash.com/photo-1598170845058-03089b56f8e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Vegetables">
            </div>
            <div class="service-icon-face service-icon-back">
              <img src="https://images.unsplash.com/photo-1598170845058-03089b56f8e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Vegetables">
            </div>
            <div class="service-icon-face service-icon-top">
              <img src="https://images.unsplash.com/photo-1598170845058-03089b56f8e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Vegetables">
            </div>
            <div class="service-icon-face service-icon-bottom">
              <img src="https://images.unsplash.com/photo-1598170845058-03089b56f8e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Vegetables">
            </div>
            <div class="service-icon-face service-icon-left">
              <img src="https://images.unsplash.com/photo-1598170845058-03089b56f8e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Vegetables">
            </div>
            <div class="service-icon-face service-icon-right">
              <img src="https://images.unsplash.com/photo-1598170845058-03089b56f8e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Vegetables">
            </div>
          </div>
        </div>
        <h4 class="text-lg font-semibold accent mb-2">Vegetables</h4>
        <p class="text-sm">Fresh and organic vegetables for healthy living.</p>
      </div>
      <!-- Gadgets -->
      <div class="glass p-4 text-center service-card" data-aos="fade-up" data-aos-delay="600" data-product="gadgets">
        <div class="service-icon-container">
          <div class="service-icon-cube">
            <div class="service-icon-face service-icon-front">
              <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Gadgets">
            </div>
            <div class="service-icon-face service-icon-back">
              <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Gadgets">
            </div>
            <div class="service-icon-face service-icon-top">
              <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Gadgets">
            </div>
            <div class="service-icon-face service-icon-bottom">
              <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Gadgets">
            </div>
            <div class="service-icon-face service-icon-left">
              <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Gadgets">
            </div>
            <div class="service-icon-face service-icon-right">
              <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Gadgets">
            </div>
          </div>
        </div>
        <h4 class="text-lg font-semibold accent mb-2">Gadgets</h4>
        <p class="text-sm">Latest electronic gadgets and accessories.</p>
      </div>
      <!-- Chocolate -->
      <div class="glass p-4 text-center service-card" data-aos="fade-up" data-aos-delay="0" data-product="chocolate">
        <div class="service-icon-container">
          <div class="service-icon-cube">
            <div class="service-icon-face service-icon-front">
              <img src="https://images.unsplash.com/photo-1575377427642-087cf684f29d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Chocolate">
            </div>
            <div class="service-icon-face service-icon-back">
              <img src="https://images.unsplash.com/photo-1575377427642-087cf684f29d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Chocolate">
            </div>
            <div class="service-icon-face service-icon-top">
              <img src="https://images.unsplash.com/photo-1575377427642-087cf684f29d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Chocolate">
            </div>
            <div class="service-icon-face service-icon-bottom">
              <img src="https://images.unsplash.com/photo-1575377427642-087cf684f29d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Chocolate">
            </div>
            <div class="service-icon-face service-icon-left">
              <img src="https://images.unsplash.com/photo-1575377427642-087cf684f29d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Chocolate">
            </div>
            <div class="service-icon-face service-icon-right">
              <img src="https://images.unsplash.com/photo-1575377427642-087cf684f29d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Chocolate">
            </div>
          </div>
        </div>
        <h4 class="text-lg font-semibold accent mb-2">Chocolate</h4>
        <p class="text-sm">Premium quality chocolates and confectionery products.</p>
      </div>
      <!-- Beverages -->
      <div class="glass p-4 text-center service-card" data-aos="fade-up" data-aos-delay="200" data-product="beverages">
        <div class="service-icon-container">
          <div class="service-icon-cube">
            <div class="service-icon-face service-icon-front">
              <img src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Beverages">
            </div>
            <div class="service-icon-face service-icon-back">
              <img src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Beverages">
            </div>
            <div class="service-icon-face service-icon-top">
              <img src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Beverages">
            </div>
            <div class="service-icon-face service-icon-bottom">
              <img src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Beverages">
            </div>
            <div class="service-icon-face service-icon-left">
              <img src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Beverages">
            </div>
            <div class="service-icon-face service-icon-right">
              <img src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Beverages">
            </div>
          </div>
        </div>
        <h4 class="text-lg font-semibold accent mb-2">Beverages</h4>
        <p class="text-sm">Refreshing beverages for all occasions.</p>
      </div>
      <!-- Perfume -->
      <div class="glass p-4 text-center service-card" data-aos="fade-up" data-aos-delay="400" data-product="perfume">
        <div class="service-icon-container">
          <div class="service-icon-cube">
            <div class="service-icon-face service-icon-front">
              <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Perfume">
            </div>
            <div class="service-icon-face service-icon-back">
              <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Perfume">
            </div>
            <div class="service-icon-face service-icon-top">
              <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Perfume">
            </div>
            <div class="service-icon-face service-icon-bottom">
              <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Perfume">
            </div>
            <div class="service-icon-face service-icon-left">
              <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Perfume">
            </div>
            <div class="service-icon-face service-icon-right">
              <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Perfume">
            </div>
          </div>
        </div>
        <h4 class="text-lg font-semibold accent mb-2">Perfume</h4>
        <p class="text-sm">Premium fragrances and personal care products.</p>
      </div>
      <!-- Flowers -->
      <div class="glass p-4 text-center service-card" data-aos="fade-up" data-aos-delay="600" data-product="flowers">
        <div class="service-icon-container">
          <div class="service-icon-cube">
            <div class="service-icon-face service-icon-front">
              <img src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Flowers">
            </div>
            <div class="service-icon-face service-icon-back">
              <img src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Flowers">
            </div>
            <div class="service-icon-face service-icon-top">
              <img src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Flowers">
            </div>
            <div class="service-icon-face service-icon-bottom">
              <img src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Flowers">
            </div>
            <div class="service-icon-face service-icon-left">
              <img src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Flowers">
            </div>
            <div class="service-icon-face service-icon-right">
              <img src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Flowers">
            </div>
          </div>
        </div>
        <h4 class="text-lg font-semibold accent mb-2">Flowers</h4>
        <p class="text-sm">Fresh flowers and floral arrangements for all occasions.</p>
      </div>
      <!-- Spices -->
      <div class="glass p-4 text-center service-card" data-aos="fade-up" data-aos-delay="0" data-product="spices">
        <div class="service-icon-container">
          <div class="service-icon-cube">
            <div class="service-icon-face service-icon-front">
              <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Spices">
            </div>
            <div class="service-icon-face service-icon-back">
              <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Spices">
            </div>
            <div class="service-icon-face service-icon-top">
              <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Spices">
            </div>
            <div class="service-icon-face service-icon-bottom">
              <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Spices">
            </div>
            <div class="service-icon-face service-icon-left">
              <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Spices">
            </div>
            <div class="service-icon-face service-icon-right">
              <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Spices">
            </div>
          </div>
        </div>
        <h4 class="text-lg font-semibold accent mb-2">Spices</h4>
        <p class="text-sm">Aromatic spices to enhance your culinary experience.</p>
      </div>
      <!-- Clothing -->
      <div class="glass p-4 text-center service-card" data-aos="fade-up" data-aos-delay="200" data-product="clothing">
        <div class="service-icon-container">
          <div class="service-icon-cube">
            <div class="service-icon-face service-icon-front">
              <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Clothing">
            </div>
            <div class="service-icon-face service-icon-back">
              <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Clothing">
            </div>
            <div class="service-icon-face service-icon-top">
              <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Clothing">
            </div>
            <div class="service-icon-face service-icon-bottom">
              <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Clothing">
            </div>
            <div class="service-icon-face service-icon-left">
              <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Clothing">
            </div>
            <div class="service-icon-face service-icon-right">
              <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Clothing">
            </div>
          </div>
        </div>
        <h4 class="text-lg font-semibold accent mb-2">Clothing</h4>
        <p class="text-sm">Fashionable clothing for all ages and occasions.</p>
      </div>
      <!-- Dry Fruits -->
      <div class="glass p-4 text-center service-card" data-aos="fade-up" data-aos-delay="400" data-product="dryfruits">
        <div class="service-icon-container">
          <div class="service-icon-cube">
            <div class="service-icon-face service-icon-front">
              <img src="dry-fruit.jpg" alt="Dry Fruits">
            </div>
            <div class="service-icon-face service-icon-back">
              <img src="dry-fruit.jpg" alt="Dry Fruits">
            </div>
            <div class="service-icon-face service-icon-top">
              <img src="dry-fruit.jpg" alt="Dry Fruits">
            </div>
            <div class="service-icon-face service-icon-bottom">
              <img src="dry-fruit.jpg" alt="Dry Fruits">
            </div>
            <div class="service-icon-face service-icon-left">
              <img src="dry-fruit.jpg" alt="Dry Fruits">
            </div>
            <div class="service-icon-face service-icon-right">
              <img src="dry-fruit.jpg" alt="Dry Fruits">
            </div>
          </div>
        </div>
        <h4 class="text-lg font-semibold accent mb-2">Dry Fruits</h4>
        <p class="text-sm">Premium quality dry fruits and nuts for healthy snacking.</p>
      </div>
      <!-- Tea -->
      <div class="glass p-4 text-center service-card" data-aos="fade-up" data-aos-delay="600" data-product="tea">
        <div class="service-icon-container">
          <div class="service-icon-cube">
            <div class="service-icon-face service-icon-front">
              <img src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tea">
            </div>
            <div class="service-icon-face service-icon-back">
              <img src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tea">
            </div>
            <div class="service-icon-face service-icon-top">
              <img src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tea">
            </div>
            <div class="service-icon-face service-icon-bottom">
              <img src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tea">
            </div>
            <div class="service-icon-face service-icon-left">
              <img src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tea">
            </div>
            <div class="service-icon-face service-icon-right">
              <img src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tea">
            </div>
          </div>
        </div>
        <h4 class="text-lg font-semibold accent mb-2">Tea</h4>
        <p class="text-sm">Premium tea varieties from the finest plantations.</p>
      </div>
    `;
    
    // Add event listeners to the newly loaded service cards
    setTimeout(() => {
      addServiceCardListeners();
      AOS.refresh();
    }, 100);
  }
}

// Global addServiceCardListeners function
function addServiceCardListeners() {
  const servicesGrid = document.querySelector('#services .grid');
  if (servicesGrid) {
    servicesGrid.addEventListener('click', function(e) {
      const serviceCard = e.target.closest('.service-card');
    
      if (serviceCard) {
        const product = serviceCard.getAttribute('data-product');
        console.log('Service card clicked, product:', product);
      
        if (product) {
          // Store the product type globally
          window.currentProductType = product;
          
          // Show product page and save state
          showPage('product-page', product);
          
          // Initialize the product page
          if (typeof initializeProductPage === 'function') {
            initializeProductPage(product);
          }
        
          // Close mobile menu if open
          const mobileMenu = document.getElementById('mobile-menu');
          if (mobileMenu && mobileMenu.classList.contains('visible')) {
            mobileMenu.classList.remove('visible');
          }
        }
      }
    });
  }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
  // Check if we're going back to a product page
  const savedPage = localStorage.getItem('currentPage');
  const savedProductType = localStorage.getItem('currentProductType');
  
  if (savedPage === 'product-page' && savedProductType) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      page.classList.remove('active');
    });
    document.getElementById('product-page').classList.add('active');
    
    if (typeof initializeProductPage === 'function') {
      initializeProductPage(savedProductType);
    }
  }
});

// Also save state when page is about to unload
window.addEventListener('beforeunload', function() {
  const activePage = document.querySelector('.page.active');
  if (activePage && activePage.id === 'product-page' && currentProductType) {
    savePageState('product-page', currentProductType);
  }
});