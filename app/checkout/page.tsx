'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  CreditCard, 
  MapPin, 
  Clock, 
  CheckCircle,
  ArrowLeft,
  Truck,
  Store
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(10, 'Please enter a complete address'),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().min(5, 'Valid zip code is required'),
  notes: z.string().optional(),
  paymentMethod: z.enum(['card', 'cash'], {
    required_error: 'Please select a payment method'
  }),
  deliveryMethod: z.enum(['delivery', 'pickup'], {
    required_error: 'Please select delivery or pickup'
  })
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const deliveryFee = cartTotal > 25 ? 0 : 2.99;
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + deliveryFee + tax;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryMethod: 'delivery',
      paymentMethod: 'card'
    }
  });

  const deliveryMethod = watch('deliveryMethod');

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call to place order
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newOrderId = 'FB' + Math.random().toString(36).substr(2, 9).toUpperCase();
      setOrderId(newOrderId);
      setOrderPlaced(true);
      clearCart();
      
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="text-center py-20"
          >
            <h1 className="text-3xl font-bold mb-4">No Items in Cart</h1>
            <p className="text-gray-600 mb-8">
              Please add items to your cart before proceeding to checkout.
            </p>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Link href="/menu">Browse Menu</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-center py-20"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We're preparing your delicious meal!
            </p>
            
            <Card className="p-6 mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <h3 className="font-semibold mb-2">Order Details</h3>
                    <p className="text-sm text-gray-600">Order ID: {orderId}</p>
                    <p className="text-sm text-gray-600">Total: ${finalTotal.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Items: {cartCount}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Estimated Time</h3>
                    <p className="text-sm text-gray-600">
                      {deliveryMethod === 'delivery' ? '25-35 minutes' : '15-20 minutes'}
                    </p>
                    <p className="text-sm text-gray-600">
                      We'll send you updates via SMS
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Link href="/">Return Home</Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link href="/menu">Order Again</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="mb-8"
        >
          <Button variant="ghost" className="mb-4">
            <Link href="/cart" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">Checkout</h1>
          <p className="text-gray-600">Complete your order information</p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Delivery Method */}
              <motion.div
                initial="initial"
                animate="animate"
                variants={fadeInUp}
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Delivery Method</h2>
                    <RadioGroup
                      value={deliveryMethod}
                      onValueChange={(value) => setValue('deliveryMethod', value as 'delivery' | 'pickup')}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label htmlFor="delivery" className="flex items-center space-x-3 flex-1 cursor-pointer">
                          <Truck className="h-5 w-5 text-orange-500" />
                          <div>
                            <div className="font-semibold">Home Delivery</div>
                            <div className="text-sm text-gray-600">25-35 minutes</div>
                          </div>
                        </Label>
                        <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup" className="flex items-center space-x-3 flex-1 cursor-pointer">
                          <Store className="h-5 w-5 text-orange-500" />
                          <div>
                            <div className="font-semibold">Store Pickup</div>
                            <div className="text-sm text-gray-600">15-20 minutes</div>
                          </div>
                        </Label>
                        <span className="font-semibold text-green-600">Free</span>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Customer Information */}
              <motion.div
                initial="initial"
                animate="animate"
                variants={fadeInUp}
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          {...register('firstName')}
                          className={errors.firstName ? 'border-red-500' : ''}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          {...register('lastName')}
                          className={errors.lastName ? 'border-red-500' : ''}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          {...register('phone')}
                          className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Address Information */}
              {deliveryMethod === 'delivery' && (
                <motion.div
                  initial="initial"
                  animate="animate"
                  variants={fadeInUp}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="address">Street Address *</Label>
                          <Input
                            id="address"
                            {...register('address')}
                            className={errors.address ? 'border-red-500' : ''}
                          />
                          {errors.address && (
                            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city">City *</Label>
                            <Input
                              id="city"
                              {...register('city')}
                              className={errors.city ? 'border-red-500' : ''}
                            />
                            {errors.city && (
                              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                            )}
                          </div>
                          
                          <div>
                            <Label htmlFor="zipCode">Zip Code *</Label>
                            <Input
                              id="zipCode"
                              {...register('zipCode')}
                              className={errors.zipCode ? 'border-red-500' : ''}
                            />
                            {errors.zipCode && (
                              <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                          <Textarea
                            id="notes"
                            placeholder="e.g., Leave at door, Ring doorbell, etc."
                            {...register('notes')}
                            rows={3}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Payment Method */}
              <motion.div
                initial="initial"
                animate="animate"
                variants={fadeInUp}
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                    <RadioGroup
                      defaultValue="card"
                      onValueChange={(value) => setValue('paymentMethod', value as 'card' | 'cash')}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center space-x-3 flex-1 cursor-pointer">
                          <CreditCard className="h-5 w-5 text-orange-500" />
                          <div>
                            <div className="font-semibold">Credit/Debit Card</div>
                            <div className="text-sm text-gray-600">Pay online securely</div>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex items-center space-x-3 flex-1 cursor-pointer">
                          <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                            <span className="text-white text-xs">$</span>
                          </div>
                          <div>
                            <div className="font-semibold">Cash on Delivery</div>
                            <div className="text-sm text-gray-600">Pay when you receive</div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="lg:col-span-1"
            >
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  
                  {/* Order Items */}
                  <div className="space-y-3 mb-6">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-gray-600">
                            {item.size} × {item.quantity}
                          </div>
                        </div>
                        <div className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="mb-4" />
                  
                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>
                        {deliveryMethod === 'delivery' ? 'Delivery Fee' : 'Pickup'}
                      </span>
                      <span>
                        {deliveryMethod === 'delivery' 
                          ? `$${deliveryFee.toFixed(2)}` 
                          : 'Free'
                        }
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>
                        ${(deliveryMethod === 'delivery' ? finalTotal : cartTotal + tax).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Estimated Time */}
                  <div className="mt-6 p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm text-orange-700">
                      <Clock className="h-4 w-4" />
                      <span>
                        Estimated {deliveryMethod === 'delivery' ? 'delivery' : 'pickup'}: {' '}
                        {deliveryMethod === 'delivery' ? '25-35 min' : '15-20 min'}
                      </span>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <Button 
                    type="submit"
                    size="lg" 
                    className="w-full mt-6 bg-orange-500 hover:bg-orange-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Processing...
                      </>
                    ) : (
                      `Place Order - $${(deliveryMethod === 'delivery' ? finalTotal : cartTotal + tax).toFixed(2)}`
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}