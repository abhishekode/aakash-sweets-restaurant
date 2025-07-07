'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  UtensilsCrossed,
  Save,
  X,
  Upload,
  DollarSign
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const foodItemSchema = z.object({
  name: z.string().min(2, 'Food name must be at least 2 characters'),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  priceHalf: z.string().optional(),
  priceFull: z.string().min(1, 'Full price is required'),
  image: z.string().url('Please enter a valid image URL'),
  isAvailable: z.boolean().default(true),
});

type FoodItemFormData = z.infer<typeof foodItemSchema>;

// Mock data
const mockCategories = [
  { id: '1', name: 'Burgers', slug: 'burgers' },
  { id: '2', name: 'Fried Rice', slug: 'fried-rice' },
  { id: '3', name: 'Chaumin', slug: 'chaumin' },
  { id: '4', name: 'Snacks', slug: 'snacks' },
  { id: '5', name: 'Beverages', slug: 'beverages' },
];

const mockFoodItems = [
  {
    id: '1',
    name: 'Classic Burger',
    category: 'burgers',
    description: 'Juicy beef patty with fresh lettuce, tomato, onion, and our special sauce',
    price: { half: 8.99, full: 12.99 },
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
    isAvailable: true,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Chicken Fried Rice',
    category: 'fried-rice',
    description: 'Aromatic basmati rice stir-fried with tender chicken pieces and mixed vegetables',
    price: { half: 10.99, full: 14.99 },
    image: 'https://images.pexels.com/photos/1059943/pexels-photo-1059943.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
    isAvailable: true,
    createdAt: new Date('2024-01-16')
  },
  {
    id: '3',
    name: 'Vegetable Chaumin',
    category: 'chaumin',
    description: 'Stir-fried noodles with fresh vegetables and savory sauce',
    price: { full: 11.99 },
    image: 'https://images.pexels.com/photos/1907244/pexels-photo-1907244.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
    isAvailable: true,
    createdAt: new Date('2024-01-17')
  }
];

export default function AdminFoodsPage() {
  const [foodItems, setFoodItems] = useState(mockFoodItems);
  const [filteredItems, setFilteredItems] = useState(mockFoodItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<FoodItemFormData>({
    resolver: zodResolver(foodItemSchema),
    defaultValues: {
      isAvailable: true
    }
  });

  useEffect(() => {
    let filtered = foodItems;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    setFilteredItems(filtered);
  }, [foodItems, searchQuery, categoryFilter]);

  const onSubmit = (data: FoodItemFormData) => {
    const priceData = {
      ...(data.priceHalf && { half: parseFloat(data.priceHalf) }),
      full: parseFloat(data.priceFull)
    };

    if (editingItem) {
      // Update existing item
      setFoodItems(prev =>
        prev.map(item =>
          item.id === editingItem.id
            ? {
                ...item,
                name: data.name,
                category: data.category,
                description: data.description,
                price: priceData,
                image: data.image,
                isAvailable: data.isAvailable
              }
            : item
        )
      );
      toast.success('Food item updated successfully');
      setEditingItem(null);
    } else {
      // Add new item
      const newItem = {
        id: Date.now().toString(),
        name: data.name,
        category: data.category,
        description: data.description,
        price: priceData,
        image: data.image,
        isAvailable: data.isAvailable,
        createdAt: new Date()
      };
      setFoodItems(prev => [...prev, newItem]);
      toast.success('Food item added successfully');
      setIsAddingItem(false);
    }
    reset();
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setValue('name', item.name);
    setValue('category', item.category);
    setValue('description', item.description);
    setValue('priceHalf', item.price.half?.toString() || '');
    setValue('priceFull', item.price.full.toString());
    setValue('image', item.image);
    setValue('isAvailable', item.isAvailable);
    setIsAddingItem(false);
  };

  const handleDelete = (itemId: string) => {
    setFoodItems(prev => prev.filter(item => item.id !== itemId));
    toast.success('Food item deleted successfully');
  };

  const handleCancel = () => {
    setIsAddingItem(false);
    setEditingItem(null);
    reset();
  };

  const toggleAvailability = (itemId: string) => {
    setFoodItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, isAvailable: !item.isAvailable }
          : item
      )
    );
    toast.success('Availability updated');
  };

  const getCategoryName = (slug: string) => {
    return mockCategories.find(cat => cat.slug === slug)?.name || slug;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Food Items Management</h1>
          <p className="text-gray-600">Manage your menu items and pricing</p>
        </div>
        <Button
          onClick={() => setIsAddingItem(true)}
          className="mt-4 md:mt-0"
          disabled={isAddingItem || editingItem}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Food Item
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search food items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {mockCategories.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Form */}
      {(isAddingItem || editingItem) && (
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <Card>
            <CardHeader>
              <CardTitle>
                {editingItem ? 'Edit Food Item' : 'Add New Food Item'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Food Name *</Label>
                    <Input
                      id="name"
                      {...register('name')}
                      className={errors.name ? 'border-red-500' : ''}
                      placeholder="e.g., Classic Burger"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={(value) => setValue('category', value)}>
                      <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCategories.map((category) => (
                          <SelectItem key={category.id} value={category.slug}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    className={errors.description ? 'border-red-500' : ''}
                    placeholder="Describe the food item..."
                    rows={3}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="priceHalf">Half Price (Optional)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="priceHalf"
                        type="number"
                        step="0.01"
                        {...register('priceHalf')}
                        className="pl-10"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="priceFull">Full Price *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="priceFull"
                        type="number"
                        step="0.01"
                        {...register('priceFull')}
                        className={`pl-10 ${errors.priceFull ? 'border-red-500' : ''}`}
                        placeholder="0.00"
                      />
                    </div>
                    {errors.priceFull && (
                      <p className="text-red-500 text-sm mt-1">{errors.priceFull.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="image">Image URL *</Label>
                  <Input
                    id="image"
                    {...register('image')}
                    className={errors.image ? 'border-red-500' : ''}
                    placeholder="https://example.com/image.jpg"
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isAvailable"
                    {...register('isAvailable')}
                    defaultChecked={true}
                  />
                  <Label htmlFor="isAvailable">Available for ordering</Label>
                </div>

                <div className="flex space-x-2">
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    {editingItem ? 'Update Item' : 'Add Item'}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  <Badge className="bg-orange-500">
                    {getCategoryName(item.category)}
                  </Badge>
                  <Badge variant={item.isAvailable ? 'default' : 'destructive'}>
                    {item.isAvailable ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    {item.price.half && (
                      <div className="text-sm text-gray-600">
                        Half: <span className="font-semibold">${item.price.half}</span>
                      </div>
                    )}
                    <div className="text-lg font-bold text-orange-500">
                      Full: ${item.price.full}
                    </div>
                  </div>
                  <Switch
                    checked={item.isAvailable}
                    onCheckedChange={() => toggleAvailability(item.id)}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                    disabled={isAddingItem || editingItem}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    disabled={isAddingItem || editingItem}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <UtensilsCrossed className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No food items found</h3>
            <p className="text-gray-600">
              {searchQuery || categoryFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Start by adding your first food item'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}