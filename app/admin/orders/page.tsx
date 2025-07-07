'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Eye, 
  Clock, 
  CheckCircle, 
  Package, 
  Truck,
  Phone,
  MapPin
} from 'lucide-react';
import { toast } from 'sonner';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// Mock orders data
const mockOrders = [
  {
    id: 'FB001',
    customer: {
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      email: 'john@example.com',
      address: '123 Main St, City, State 12345'
    },
    items: [
      { name: 'Classic Burger', quantity: 2, size: 'full', price: 12.99 },
      { name: 'Chicken Fried Rice', quantity: 1, size: 'half', price: 10.99 }
    ],
    total: 36.97,
    status: 'pending',
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
    deliveryMethod: 'delivery'
  },
  {
    id: 'FB002',
    customer: {
      name: 'Sarah Wilson',
      phone: '+1 (555) 987-6543',
      email: 'sarah@example.com',
      address: '456 Oak Ave, City, State 12345'
    },
    items: [
      { name: 'BBQ Chicken Burger', quantity: 1, size: 'full', price: 13.99 },
      { name: 'Crispy Fries', quantity: 1, size: 'full', price: 4.99 }
    ],
    total: 18.98,
    status: 'cooking',
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    deliveryMethod: 'pickup'
  },
  {
    id: 'FB003',
    customer: {
      name: 'Mike Chen',
      phone: '+1 (555) 456-7890',
      email: 'mike@example.com',
      address: '789 Pine St, City, State 12345'
    },
    items: [
      { name: 'Vegetable Chaumin', quantity: 2, size: 'full', price: 11.99 },
      { name: 'Fresh Orange Juice', quantity: 2, size: 'full', price: 3.99 }
    ],
    total: 31.96,
    status: 'delivered',
    createdAt: new Date(Date.now() - 45 * 60 * 1000),
    deliveryMethod: 'delivery'
  }
];

const statusOptions = [
  { value: 'pending', label: 'Pending', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
  { value: 'accepted', label: 'Accepted', icon: CheckCircle, color: 'bg-blue-100 text-blue-800' },
  { value: 'cooking', label: 'Cooking', icon: Package, color: 'bg-orange-100 text-orange-800' },
  { value: 'delivered', label: 'Delivered', icon: Truck, color: 'bg-green-100 text-green-800' }
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    let filtered = orders;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.phone.includes(searchQuery)
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchQuery, statusFilter]);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const getStatusInfo = (status: string) => {
    return statusOptions.find(option => option.value === status) || statusOptions[0];
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} mins ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Order Management</h1>
          <p className="text-gray-600">Manage and track all customer orders</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Badge variant="outline" className="text-green-600">
            {filteredOrders.length} Orders
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by order ID, customer name, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const statusInfo = getStatusInfo(order.status);
          const StatusIcon = statusInfo.icon;

          return (
            <motion.div
              key={order.id}
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <h3 className="text-lg font-semibold">{order.id}</h3>
                        <Badge className={statusInfo.color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusInfo.label}
                        </Badge>
                        <Badge variant="outline">
                          {order.deliveryMethod}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium">{order.customer.name}</p>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Phone className="h-3 w-3 mr-1" />
                            {order.customer.phone}
                          </div>
                          {order.deliveryMethod === 'delivery' && (
                            <div className="flex items-start text-sm text-gray-600 mt-1">
                              <MapPin className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                              <span>{order.customer.address}</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600">
                            {order.items.length} items • ${order.total.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatTime(order.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      
                      {order.status !== 'delivered' && (
                        <Select
                          value={order.status}
                          onValueChange={(value) => updateOrderStatus(order.id, value)}
                        >
                          <SelectTrigger className="w-full lg:w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders found</h3>
            <p className="text-gray-600">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'No orders have been placed yet'
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Order Details - {selectedOrder.id}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedOrder(null)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="font-semibold mb-3">Customer Information</h4>
                <div className="space-y-2">
                  <p><strong>Name:</strong> {selectedOrder.customer.name}</p>
                  <p><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
                  <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                  {selectedOrder.deliveryMethod === 'delivery' && (
                    <p><strong>Address:</strong> {selectedOrder.customer.address}</p>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold mb-3">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.size} • Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total:</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h4 className="font-semibold mb-3">Update Status</h4>
                <Select
                  value={selectedOrder.status}
                  onValueChange={(value) => {
                    updateOrderStatus(selectedOrder.id, value);
                    setSelectedOrder({ ...selectedOrder, status: value });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}