'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Truck, 
  Users, 
  Clock, 
  Phone, 
  MapPin, 
  ChefHat,
  Calendar,
  Package,
  Star,
  CheckCircle
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

const services = [
  {
    id: 1,
    title: 'Home Delivery',
    description: 'Fast and reliable delivery to your doorstep within 30 minutes',
    icon: <Truck className="h-12 w-12 text-orange-500" />,
    features: [
      'Free delivery for orders above $25',
      'Real-time order tracking',
      'Contactless delivery available',
      'Hot and fresh food guaranteed'
    ],
    price: 'Starting from $2.99',
    popular: true
  },
  {
    id: 2,
    title: 'Catering Services',
    description: 'Perfect for corporate events, parties, and special occasions',
    icon: <ChefHat className="h-12 w-12 text-orange-500" />,
    features: [
      'Customizable menu options',
      'Professional presentation',
      'Setup and cleanup included',
      '24-hour advance booking'
    ],
    price: 'Starting from $15 per person',
    popular: false
  },
  {
    id: 3,
    title: 'Bulk Orders',
    description: 'Special pricing for large quantity orders and group meals',
    icon: <Package className="h-12 w-12 text-orange-500" />,
    features: [
      'Discounted pricing for 10+ items',
      'Priority preparation',
      'Flexible pickup times',
      'Corporate billing available'
    ],
    price: '10% off for orders above $100',
    popular: false
  },
  {
    id: 4,
    title: 'Party Bookings',
    description: 'Complete party packages with food, decorations, and setup',
    icon: <Calendar className="h-12 w-12 text-orange-500" />,
    features: [
      'Birthday party packages',
      'Theme-based decorations',
      'Dedicated party coordinator',
      'Entertainment options available'
    ],
    price: 'Custom packages from $199',
    popular: false
  }
];

const testimonials = [
  {
    name: "Jessica Wilson",
    comment: "Their catering service made our corporate event a huge success. Professional and delicious!",
    rating: 5,
    service: "Catering"
  },
  {
    name: "Robert Chen",
    comment: "Fast delivery every time. The food always arrives hot and fresh within 30 minutes.",
    rating: 5,
    service: "Home Delivery"
  },
  {
    name: "Maria Garcia",
    comment: "Bulk ordering for our office lunches has never been easier. Great pricing too!",
    rating: 5,
    service: "Bulk Orders"
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-orange-100 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-600 mb-8">
              From quick delivery to large events, we've got all your food service needs covered
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Call Us: (555) 123-4567
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {services.map((service) => (
              <motion.div key={service.id} variants={fadeInUp}>
                <Card className={`h-full hover:shadow-xl transition-all duration-300 relative ${
                  service.popular ? 'ring-2 ring-orange-500' : ''
                }`}>
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      {service.icon}
                      <div className="ml-4">
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                        <p className="text-orange-500 font-semibold">{service.price}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="w-full">
                      <Link href="/contact">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple steps to get our services for your needs
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              {
                step: '01',
                title: 'Choose Service',
                description: 'Select the service that best fits your needs',
                icon: <Users className="h-8 w-8 text-orange-500" />
              },
              {
                step: '02',
                title: 'Contact Us',
                description: 'Call us or fill out our contact form',
                icon: <Phone className="h-8 w-8 text-orange-500" />
              },
              {
                step: '03',
                title: 'Plan Together',
                description: 'We work with you to plan the perfect service',
                icon: <Calendar className="h-8 w-8 text-orange-500" />
              },
              {
                step: '04',
                title: 'Enjoy',
                description: 'Sit back and enjoy our professional service',
                icon: <Star className="h-8 w-8 text-orange-500" />
              }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center p-6 h-full">
                  <CardContent className="pt-6">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        {item.icon}
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real feedback from customers who've used our services
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 text-center h-full">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic">"{testimonial.comment}"</p>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-orange-500">{testimonial.service}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-white max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Our Services?
            </h2>
            <p className="text-xl mb-8">
              Contact us today to discuss your requirements and get a custom quote
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
                <Link href="/contact">Contact Us Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-500">
                <MapPin className="mr-2 h-4 w-4" />
                Find Our Location
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}