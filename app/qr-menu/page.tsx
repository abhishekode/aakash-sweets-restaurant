'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  QrCode, 
  Camera, 
  Smartphone, 
  Menu,
  ArrowRight,
  Scan
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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

export default function QRMenuPage() {
  const [hasCamera, setHasCamera] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // Check if device has camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => setHasCamera(true))
        .catch(() => setHasCamera(false));
    }
  }, []);

  const startScanning = () => {
    setIsScanning(true);
    // In a real implementation, you would initialize QR scanner here
    // For demo purposes, we'll just redirect to menu after a delay
    setTimeout(() => {
      window.location.href = '/menu';
    }, 3000);
  };

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
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center">
                <QrCode className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">QR Menu Scanner</h1>
            <p className="text-xl text-gray-600 mb-8">
              Scan QR codes at our restaurant tables or use your mobile device to browse our digital menu
            </p>
          </motion.div>
        </div>
      </section>

      {/* Scanner Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {!isScanning ? (
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card className="p-8 text-center">
                  <CardContent className="pt-6">
                    <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-6 flex items-center justify-center">
                      <Camera className="h-16 w-16 text-gray-400" />
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-4">Ready to Scan?</h2>
                    <p className="text-gray-600 mb-8">
                      {hasCamera 
                        ? "Click the button below to start scanning QR codes with your camera"
                        : "Camera not available. You can still browse our digital menu"
                      }
                    </p>

                    <div className="space-y-4">
                      {hasCamera && (
                        <Button 
                          size="lg" 
                          className="w-full bg-orange-500 hover:bg-orange-600"
                          onClick={startScanning}
                        >
                          <Scan className="mr-2 h-5 w-5" />
                          Start QR Scanner
                        </Button>
                      )}
                      
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="w-full"
                      >
                        <Link href="/menu" className="flex items-center justify-center">
                          <Menu className="mr-2 h-5 w-5" />
                          Browse Digital Menu
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <Card className="p-8">
                  <CardContent className="pt-6">
                    <div className="w-64 h-64 bg-black rounded-lg mx-auto mb-6 flex items-center justify-center relative">
                      <div className="absolute inset-4 border-2 border-orange-500 rounded-lg">
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-orange-500 rounded-tl-lg"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-orange-500 rounded-tr-lg"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-orange-500 rounded-bl-lg"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-orange-500 rounded-br-lg"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1 h-32 bg-orange-500 animate-pulse"></div>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-4">Scanning for QR Code...</h2>
                    <p className="text-gray-600 mb-4">
                      Point your camera at a QR code to scan
                    </p>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => setIsScanning(false)}
                    >
                      Cancel Scanning
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How QR Menu Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience contactless dining with our QR code system
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: '01',
                icon: <QrCode className="h-8 w-8 text-orange-500" />,
                title: 'Scan QR Code',
                description: 'Find the QR code on your table or use our scanner above'
              },
              {
                step: '02',
                icon: <Smartphone className="h-8 w-8 text-orange-500" />,
                title: 'Browse Menu',
                description: 'View our full digital menu with photos and descriptions'
              },
              {
                step: '03',
                icon: <ArrowRight className="h-8 w-8 text-orange-500" />,
                title: 'Place Order',
                description: 'Add items to cart and complete your order seamlessly'
              }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center p-6 h-full">
                  <CardContent className="pt-6">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        {item.icon}
                      </div>
                      <Badge className="absolute -top-2 -right-2 bg-orange-500">
                        {item.step}
                      </Badge>
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

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose QR Menu?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enjoy a safer, faster, and more convenient dining experience
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: '🦠',
                title: 'Contactless',
                description: 'Safe and hygienic dining experience'
              },
              {
                icon: '⚡',
                title: 'Fast Service',
                description: 'Quick access to menu and ordering'
              },
              {
                icon: '📱',
                title: 'Mobile Friendly',
                description: 'Optimized for all mobile devices'
              },
              {
                icon: '🌟',
                title: 'Always Updated',
                description: 'Real-time menu and pricing updates'
              }
            ].map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-4">{benefit.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sample QR Code */}
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
              Try Our QR Menu Now
            </h2>
            <p className="text-xl mb-8">
              Don't have a QR code? No problem! Access our digital menu directly
            </p>
            
            <div className="bg-white rounded-lg p-8 inline-block mb-8">
              <div className="w-32 h-32 bg-gray-900 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <QrCode className="h-16 w-16 text-white" />
              </div>
              <p className="text-gray-600 text-sm">Sample QR Code</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
                <Link href="/menu">Access Digital Menu</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-orange-500"
                onClick={startScanning}
              >
                <Camera className="mr-2 h-4 w-4" />
                Start Scanner
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}