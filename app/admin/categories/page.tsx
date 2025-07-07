'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  FolderOpen,
  Save,
  X
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

const categorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
});

type CategoryFormData = z.infer<typeof categorySchema>;

// Mock categories data
const mockCategories = [
  { id: '1', name: 'Burgers', slug: 'burgers', itemCount: 8, createdAt: new Date('2024-01-15') },
  { id: '2', name: 'Fried Rice', slug: 'fried-rice', itemCount: 6, createdAt: new Date('2024-01-16') },
  { id: '3', name: 'Chaumin', slug: 'chaumin', itemCount: 4, createdAt: new Date('2024-01-17') },
  { id: '4', name: 'Snacks', slug: 'snacks', itemCount: 12, createdAt: new Date('2024-01-18') },
  { id: '5', name: 'Beverages', slug: 'beverages', itemCount: 8, createdAt: new Date('2024-01-19') },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [filteredCategories, setFilteredCategories] = useState(mockCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema)
  });

  const nameValue = watch('name');

  useEffect(() => {
    // Auto-generate slug from name
    if (nameValue) {
      const slug = nameValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setValue('slug', slug);
    }
  }, [nameValue, setValue]);

  useEffect(() => {
    // Filter categories based on search query
    if (searchQuery) {
      const filtered = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.slug.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [categories, searchQuery]);

  const onSubmit = (data: CategoryFormData) => {
    if (editingCategory) {
      // Update existing category
      setCategories(prev =>
        prev.map(cat =>
          cat.id === editingCategory.id
            ? { ...cat, name: data.name, slug: data.slug }
            : cat
        )
      );
      toast.success('Category updated successfully');
      setEditingCategory(null);
    } else {
      // Add new category
      const newCategory = {
        id: Date.now().toString(),
        name: data.name,
        slug: data.slug,
        itemCount: 0,
        createdAt: new Date()
      };
      setCategories(prev => [...prev, newCategory]);
      toast.success('Category added successfully');
      setIsAddingCategory(false);
    }
    reset();
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setValue('name', category.name);
    setValue('slug', category.slug);
    setIsAddingCategory(false);
  };

  const handleDelete = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (category && category.itemCount > 0) {
      toast.error('Cannot delete category with existing items');
      return;
    }
    
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    toast.success('Category deleted successfully');
  };

  const handleCancel = () => {
    setIsAddingCategory(false);
    setEditingCategory(null);
    reset();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Category Management</h1>
          <p className="text-gray-600">Organize your menu items into categories</p>
        </div>
        <Button
          onClick={() => setIsAddingCategory(true)}
          className="mt-4 md:mt-0"
          disabled={isAddingCategory || editingCategory}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Category Form */}
      {(isAddingCategory || editingCategory) && (
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <Card>
            <CardHeader>
              <CardTitle>
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Category Name *</Label>
                    <Input
                      id="name"
                      {...register('name')}
                      className={errors.name ? 'border-red-500' : ''}
                      placeholder="e.g., Burgers"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      {...register('slug')}
                      className={errors.slug ? 'border-red-500' : ''}
                      placeholder="e.g., burgers"
                    />
                    {errors.slug && (
                      <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    {editingCategory ? 'Update Category' : 'Add Category'}
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

      {/* Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <motion.div
            key={category.id}
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <FolderOpen className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm text-gray-600">/{category.slug}</p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {category.itemCount} items
                  </Badge>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  Created: {category.createdAt.toLocaleDateString()}
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(category)}
                    disabled={isAddingCategory || editingCategory}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(category.id)}
                    disabled={category.itemCount > 0 || isAddingCategory || editingCategory}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No categories found</h3>
            <p className="text-gray-600">
              {searchQuery
                ? 'Try adjusting your search criteria'
                : 'Start by adding your first category'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}