'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag, 
  DollarSign, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Package
} from 'lucide-react';
import Link from 'next/link';

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

// Mock data - replace with real API calls
const dashboardStats = {
  totalOrders: 156,
  totalRevenue: 3420.50,
  activeCustomers: 89,
  growthRate: 12.5
};

const recentOrders = [
  {
    id: 'FB001',
    customer: 'John Doe',
    items: 3,
    total: 24.99,
    status: 'pending',
    time: '2 mins ago'
  },
  {
    id: 'FB002',
    customer: 'Sarah Wilson',
    items: 2,
    total: 18.50,
    status: 'cooking',
    time: '5 mins ago'
  },
  {
    id: 'FB003',
    customer: 'Mike Chen',
    items: 4,
    total: 32.75,
    status: 'delivered',
    time: '12 mins ago'
  },
  {
    id: 'FB004',
    customer: 'Emily Davis',
    items: 1,
    total: 12.99,
    status: 'accepted',
    time: '18 mins ago'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'accepted': return 'bg-blue-100 text-blue-800';
    case 'cooking': return 'bg-orange-100 text-orange-800';
    case 'delivered': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending': return <Clock className="h-4 w-4" />;
    case 'accepted': return <CheckCircle className="h-4 w-4" />;
    case 'cooking': return <Package className="h-4 w-4" />;
    case 'delivered': return <CheckCircle className="h-4 w-4" />;
    default: return <AlertCircle className="h-4 w-4" />;
  }
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState(recentOrders);

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerChildren}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={fadeInUp}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-3xl font-bold">{dashboardStats.totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">+{dashboardStats.growthRate}%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold">${dashboardStats.totalRevenue}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">+8.2%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Customers</p>
                  <p className="text-3xl font-bold">{dashboardStats.activeCustomers}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">+15.3%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                  <p className="text-3xl font-bold">${(dashboardStats.totalRevenue / dashboardStats.totalOrders).toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">+5.1%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Recent Orders */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="outline" size="sm">
              <Link href="/admin/orders">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold">${order.total}</p>
                      <p className="text-sm text-gray-600">{order.items} items</p>
                    </div>
                    
                    <Badge className={getStatusColor(order.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </Badge>
                    
                    <div className="text-sm text-gray-500">
                      {order.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col space-y-2">
                <Link href="/admin/foods" className="flex flex-col items-center space-y-2">
                  <Package className="h-6 w-6" />
                  <span>Add Food Item</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Link href="/admin/categories" className="flex flex-col items-center space-y-2">
                  <Package className="h-6 w-6" />
                  <span>Manage Categories</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Link href="/admin/orders" className="flex flex-col items-center space-y-2">
                  <ShoppingBag className="h-6 w-6" />
                  <span>View Orders</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Link href="/admin/team" className="flex flex-col items-center space-y-2">
                  <Users className="h-6 w-6" />
                  <span>Manage Team</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}