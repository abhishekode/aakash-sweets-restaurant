'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Users,
  Save,
  X,
  User
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

const teamMemberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
  avatar: z.string().url('Please enter a valid avatar URL'),
  experience: z.string().min(1, 'Experience is required'),
  specialty: z.string().min(2, 'Specialty is required'),
});

type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

// Mock team members data
const mockTeamMembers = [
  {
    id: '1',
    name: 'Marco Rodriguez',
    role: 'Head Chef',
    avatar: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    experience: '15 years',
    specialty: 'Italian & American Cuisine',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'Kitchen Manager',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    experience: '8 years',
    specialty: 'Asian Fusion',
    createdAt: new Date('2024-01-16')
  },
  {
    id: '3',
    name: 'James Wilson',
    role: 'Grill Master',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    experience: '12 years',
    specialty: 'BBQ & Grilled Items',
    createdAt: new Date('2024-01-17')
  },
  {
    id: '4',
    name: 'Emily Davis',
    role: 'Restaurant Manager',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    experience: '10 years',
    specialty: 'Operations & Customer Service',
    createdAt: new Date('2024-01-18')
  }
];

const roleOptions = [
  'Head Chef',
  'Kitchen Manager',
  'Grill Master',
  'Restaurant Manager',
  'Delivery Supervisor',
  'Pastry Chef',
  'Line Cook',
  'Server',
  'Cashier'
];

export default function AdminTeamPage() {
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
  const [filteredMembers, setFilteredMembers] = useState(mockTeamMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema)
  });

  useEffect(() => {
    let filtered = teamMembers;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by role
    if (roleFilter !== 'all') {
      filtered = filtered.filter(member => member.role === roleFilter);
    }

    setFilteredMembers(filtered);
  }, [teamMembers, searchQuery, roleFilter]);

  const onSubmit = (data: TeamMemberFormData) => {
    if (editingMember) {
      // Update existing member
      setTeamMembers(prev =>
        prev.map(member =>
          member.id === editingMember.id
            ? { ...member, ...data }
            : member
        )
      );
      toast.success('Team member updated successfully');
      setEditingMember(null);
    } else {
      // Add new member
      const newMember = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date()
      };
      setTeamMembers(prev => [...prev, newMember]);
      toast.success('Team member added successfully');
      setIsAddingMember(false);
    }
    reset();
  };

  const handleEdit = (member: any) => {
    setEditingMember(member);
    setValue('name', member.name);
    setValue('role', member.role);
    setValue('avatar', member.avatar);
    setValue('experience', member.experience);
    setValue('specialty', member.specialty);
    setIsAddingMember(false);
  };

  const handleDelete = (memberId: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
    toast.success('Team member removed successfully');
  };

  const handleCancel = () => {
    setIsAddingMember(false);
    setEditingMember(null);
    reset();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team Management</h1>
          <p className="text-gray-600">Manage your restaurant team members</p>
        </div>
        <Button
          onClick={() => setIsAddingMember(true)}
          className="mt-4 md:mt-0"
          disabled={isAddingMember || editingMember}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roleOptions.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Form */}
      {(isAddingMember || editingMember) && (
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <Card>
            <CardHeader>
              <CardTitle>
                {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      {...register('name')}
                      className={errors.name ? 'border-red-500' : ''}
                      placeholder="e.g., John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="role">Role *</Label>
                    <Select onValueChange={(value) => setValue('role', value)}>
                      <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="experience">Experience *</Label>
                    <Input
                      id="experience"
                      {...register('experience')}
                      className={errors.experience ? 'border-red-500' : ''}
                      placeholder="e.g., 5 years"
                    />
                    {errors.experience && (
                      <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="specialty">Specialty *</Label>
                    <Input
                      id="specialty"
                      {...register('specialty')}
                      className={errors.specialty ? 'border-red-500' : ''}
                      placeholder="e.g., Italian Cuisine"
                    />
                    {errors.specialty && (
                      <p className="text-red-500 text-sm mt-1">{errors.specialty.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="avatar">Avatar URL *</Label>
                  <Input
                    id="avatar"
                    {...register('avatar')}
                    className={errors.avatar ? 'border-red-500' : ''}
                    placeholder="https://example.com/avatar.jpg"
                  />
                  {errors.avatar && (
                    <p className="text-red-500 text-sm mt-1">{errors.avatar.message}</p>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    {editingMember ? 'Update Member' : 'Add Member'}
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

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <motion.div
            key={member.id}
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <div className="relative h-64 overflow-hidden rounded-t-lg">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <Badge className="bg-orange-500 mt-2">
                    {member.role}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Experience</p>
                    <p className="font-medium">{member.experience}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Specialty</p>
                    <p className="font-medium">{member.specialty}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Joined</p>
                    <p className="font-medium">{member.createdAt.toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex space-x-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(member)}
                    disabled={isAddingMember || editingMember}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(member.id)}
                    disabled={isAddingMember || editingMember}
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

      {filteredMembers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No team members found</h3>
            <p className="text-gray-600">
              {searchQuery || roleFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Start by adding your first team member'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}