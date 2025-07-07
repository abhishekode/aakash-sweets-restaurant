'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Search, Plus, Minus, Star, Filter } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Mock data - replace with API calls
const categories = [
  { id: 'all', name: 'All Items', slug: 'all' },
  { id: '1', name: 'Burgers', slug: 'burgers' },
  { id: '2', name: 'Fried Rice', slug: 'fried-rice' },
  { id: '3', name: 'Chaumin', slug: 'chaumin' },
  { id: '4', name: 'Snacks', slug: 'snacks' },
  { id: '5', name: 'Beverages', slug: 'beverages' }
];

const menuItems = [
  {
    id: '1',
    name: 'Classic Burger',
    category: 'burgers',
    description: 'Juicy beef patty with fresh lettuce, tomato, onion, and our special sauce',
    price: { half: 8.99, full: 12.99 },
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
    isAvailable: true,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Chicken Fried Rice',
    category: 'fried-rice',
    description: 'Aromatic basmati rice stir-fried with tender chicken pieces and mixed vegetables',
    price: { half: 10.99, full: 14.99 },
    image: 'https://images.pexels.com/photos/1059943/pexels-photo-1059943.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
    isAvailable: true,
    rating: 4.7
  },
  {
    id: '3',
    name: 'Vegetable Chaumin',
    category: 'chaumin',
    description: 'Stir-fried noodles with fresh vegetables and savory sauce',
    price: { full: 11.99 },
    image: 'https://images.pexels.com/photos/1907244/pexels-photo-1907244.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
    isAvailable: true,
    rating: 4.6
  },
  {
    id: '4',
    name: 'BBQ Chicken Burger',
    category: 'burgers',
    description: 'Grilled chicken breast with BBQ sauce, lettuce, and crispy onions',
    price: { half: 9.99, full: 13.99 },
    image: 'https://images.pexels.com/photos/2725744/pexels-photo-2725744.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
    isAvailable: true,
    rating: 4.9
  },
  {
    id: '5',
    name: 'Spicy Chicken Fried Rice',
    category: 'fried-rice',
    description: 'Fiery hot fried rice with chicken and exotic spices',
    price: { half: 11.99, full: 15.99 },
    image: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
    isAvailable: true,
    rating: 4.5
  },
  {
    id: '6',
    name: 'Chicken Chaumin',
    category: 'chaumin',
    description: 'Delicious noodles with tender chicken and vegetables',
    price: { half: 8.99, full: 12.99 },
    image: 'https://images.pexels.com/photos/1907244/pexels-photo-1907244.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
    isAvailable: true,
    rating: 4.4
  },
  {
    id: '7',
    name: 'Crispy Chicken Wings',
    category: 'snacks',
    description: 'Golden crispy wings with buffalo sauce',
    price: { half: 6.99, full: 9.99 },
    image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
    isAvailable: true,
    rating: 4.3
  },
  {
    id: '8',
    name: 'Fresh Orange Juice',
    category: 'beverages',
    description: 'Freshly squeezed orange juice',
    price: { full: 3.99 },
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
    isAvailable: true,
    rating: 4.6
  }
];

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [quantities, setQuantities] = useState<{ [key: string]: { half: number; full: number } }>({});
  const { addToCart } = useCart();

  useEffect(() => {
    let filtered = menuItems;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [searchQuery, selectedCategory]);

  const updateQuantity = (itemId: string, size: 'half' | 'full', change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [size]: Math.max(0, (prev[itemId]?.[size] || 0) + change)
      }
    }));
  };

  const handleAddToCart = (item: any, size: 'half' | 'full') => {
    const quantity = quantities[item.id]?.[size] || 1;
    const price = size === 'half' ? item.price.half : item.price.full;

    if (!price) {
      toast.error(`${size} size not available for this item`);
      return;
    }

    addToCart({
      id: item.id,
      name: item.name,
      price,
      quantity,
      size,
      image: item.image
    });

    toast.success(`Added ${quantity}x ${item.name} (${size}) to cart`);
    
    // Reset quantity
    setQuantities(prev => ({
      ...prev,
      [item.id]: { ...prev[item.id], [size]: 0 }
    }));
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our delicious selection of fresh, authentic dishes made with the finest ingredients
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Menu Items Grid */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item) => (
            <motion.div key={item.id} variants={fadeInUp}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex gap-2">
                    <Badge className="bg-orange-500">
                      {categories.find(c => c.slug === item.category)?.name}
                    </Badge>
                    {!item.isAvailable && (
                      <Badge variant="destructive">Out of Stock</Badge>
                    )}
                  </div>
                  <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1 flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-medium">{item.rating}</span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{item.description}</p>

                  {/* Pricing and Add to Cart */}
                  <div className="space-y-3">
                    {item.price.half && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-semibold text-orange-500">${item.price.half}</span>
                          <span className="text-sm text-gray-500 ml-2">Half</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, 'half', -1)}
                            disabled={!quantities[item.id]?.half}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {quantities[item.id]?.half || 1}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, 'half', 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(item, 'half')}
                            disabled={!item.isAvailable}
                            className="ml-2"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-semibold text-orange-500">${item.price.full}</span>
                        <span className="text-sm text-gray-500 ml-2">Full</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, 'full', -1)}
                          disabled={!quantities[item.id]?.full}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {quantities[item.id]?.full || 1}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, 'full', 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(item, 'full')}
                          disabled={!item.isAvailable}
                          className="ml-2"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredItems.length === 0 && (
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}