'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ChefHat, 
  Users, 
  Award, 
  Clock,
  Star,
  MapPin,
  Phone
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

const teamMembers = [
  {
    id: 1,
    name: 'Marco Rodriguez',
    role: 'Head Chef',
    avatar: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    experience: '15 years',
    specialty: 'Italian & American Cuisine',
    description: 'Marco brings 15 years of culinary expertise from top restaurants in New York and Los Angeles.',
    achievements: ['Michelin Star Recognition', 'Food Network Featured Chef', 'Culinary Institute Graduate']
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Kitchen Manager',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    experience: '8 years',
    specialty: 'Asian Fusion',
    description: 'Sarah ensures our kitchen runs smoothly and maintains the highest quality standards.',
    achievements: ['Certified Food Safety Manager', 'Efficiency Excellence Award', 'Team Leadership Certified']
  },
  {
    id: 3,
    name: 'James Wilson',
    role: 'Grill Master',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    experience: '12 years',
    specialty: 'BBQ & Grilled Items',
    description: 'James is our BBQ specialist, known for creating the perfect char and flavor combinations.',
    achievements: ['BBQ Competition Winner', 'Grill Certification', 'Customer Favorite Chef']
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'Restaurant Manager',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    experience: '10 years',
    specialty: 'Operations & Customer Service',
    description: 'Emily oversees daily operations and ensures every customer has an exceptional experience.',
    achievements: ['MBA in Hospitality', 'Customer Service Excellence', 'Operations Optimization']
  },
  {
    id: 5,
    name: 'Alex Thompson',
    role: 'Delivery Supervisor',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    experience: '6 years',
    specialty: 'Logistics & Delivery',
    description: 'Alex manages our delivery team to ensure fast, reliable service to all our customers.',
    achievements: ['Logistics Certification', 'Speed Record Holder', 'Team Excellence Award']
  },
  {
    id: 6,
    name: 'Maria Santos',
    role: 'Pastry Chef',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    experience: '9 years',
    specialty: 'Desserts & Baking',
    description: 'Maria creates our delicious desserts and handles all our baking needs with artistic flair.',
    achievements: ['Pastry Arts Graduate', 'Dessert Innovation Award', 'Sugar Art Specialist']
  }
];

const stats = [
  {
    icon: <ChefHat className="h-8 w-8 text-orange-500" />,
    number: '15+',
    label: 'Professional Chefs'
  },
  {
    icon: <Users className="h-8 w-8 text-orange-500" />,
    number: '50+',
    label: 'Team Members'
  },
  {
    icon: <Award className="h-8 w-8 text-orange-500" />,
    number: '25+',
    label: 'Years Combined Experience'
  },
  {
    icon: <Clock className="h-8 w-8 text-orange-500" />,
    number: '24/7',
    label: 'Service Hours'
  }
];

export default function OurTeamPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Team</h1>
            <p className="text-xl text-gray-600 mb-8">
              The passionate people behind FastBite who make every meal special
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center p-6">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-orange-500 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Amazing Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each member of our team brings unique skills and passion to create the best dining experience
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member) => (
              <motion.div key={member.id} variants={fadeInUp}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-orange-300">{member.role}</p>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="outline" className="text-orange-500">
                        {member.experience} experience
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">4.9</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-1">Specialty</h4>
                      <p className="text-sm text-gray-600">{member.specialty}</p>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{member.description}</p>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Achievements</h4>
                      <ul className="space-y-1">
                        {member.achievements.map((achievement, index) => (
                          <li key={index} className="text-xs text-gray-600 flex items-center">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h2>
            <p className="text-xl text-gray-600 mb-8">
              We're always looking for passionate individuals who share our commitment to excellence
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: 'Growth Opportunities',
                  description: 'Advance your career with training and development programs'
                },
                {
                  title: 'Great Benefits',
                  description: 'Competitive salary, health insurance, and paid time off'
                },
                {
                  title: 'Team Culture',
                  description: 'Join a supportive team that values collaboration and innovation'
                }
              ].map((benefit, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="pt-6 text-center">
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Link href="/contact">Apply Now</Link>
              </Button>
              <Button size="lg" variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Call HR: (555) 123-4567
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
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
              Want to Meet Our Team?
            </h2>
            <p className="text-xl mb-8">
              Visit our restaurant and experience firsthand the passion and dedication of our amazing team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
                <Link href="/contact">Visit Us</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-500">
                <MapPin className="mr-2 h-4 w-4" />
                Find Location
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}