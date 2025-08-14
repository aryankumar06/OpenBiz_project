import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Search,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import BusinessCard from './BusinessCard';
import StatsCard from './StatsCard';

interface Business {
  id: string;
  name: string;
  udyamNumber: string;
  category: string;
  status: string;
  registrationDate: string;
  location: string;
  employees: number;
}

const Dashboard = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    growth: 12.5
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/businesses');
        if (response.ok) {
          const data = await response.json();
          setBusinesses(data.slice(0, 6)); // Show latest 6
          setStats({
            total: data.length,
            active: data.filter((b: Business) => b.status === 'Active').length,
            pending: data.filter((b: Business) => b.status === 'Pending').length,
            growth: 12.5
          });
        } else {
          // Use mock data if API is not available
          const mockData = generateMockBusinesses();
          setBusinesses(mockData.slice(0, 6));
          setStats({
            total: mockData.length,
            active: mockData.filter(b => b.status === 'Active').length,
            pending: mockData.filter(b => b.status === 'Pending').length,
            growth: 12.5
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Use mock data as fallback
        const mockData = generateMockBusinesses();
        setBusinesses(mockData.slice(0, 6));
        setStats({
          total: mockData.length,
          active: mockData.filter(b => b.status === 'Active').length,
          pending: mockData.filter(b => b.status === 'Pending').length,
          growth: 12.5
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateMockBusinesses = (): Business[] => {
    return [
      {
        id: '1',
        name: 'Tech Innovations Pvt Ltd',
        udyamNumber: 'UDYAM-MH-03-1234567',
        category: 'Technology',
        status: 'Active',
        registrationDate: '2023-01-15',
        location: 'Mumbai, Maharashtra',
        employees: 25
      },
      {
        id: '2',
        name: 'Green Energy Solutions',
        udyamNumber: 'UDYAM-KA-07-2345678',
        category: 'Energy',
        status: 'Active',
        registrationDate: '2023-02-20',
        location: 'Bangalore, Karnataka',
        employees: 18
      },
      {
        id: '3',
        name: 'Artisan Crafts Co.',
        udyamNumber: 'UDYAM-RJ-02-3456789',
        category: 'Handicrafts',
        status: 'Pending',
        registrationDate: '2023-03-10',
        location: 'Jaipur, Rajasthan',
        employees: 12
      },
      {
        id: '4',
        name: 'Fresh Farm Produce',
        udyamNumber: 'UDYAM-PB-04-4567890',
        category: 'Agriculture',
        status: 'Active',
        registrationDate: '2023-02-28',
        location: 'Ludhiana, Punjab',
        employees: 30
      },
      {
        id: '5',
        name: 'Digital Marketing Hub',
        udyamNumber: 'UDYAM-DL-01-5678901',
        category: 'Services',
        status: 'Active',
        registrationDate: '2023-03-05',
        location: 'New Delhi',
        employees: 8
      },
      {
        id: '6',
        name: 'Textile Manufacturing Co.',
        udyamNumber: 'UDYAM-GJ-05-6789012',
        category: 'Textiles',
        status: 'Pending',
        registrationDate: '2023-03-12',
        location: 'Surat, Gujarat',
        employees: 45
      }
    ];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Business Registration Dashboard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Monitor and manage Udyam registrations with comprehensive analytics and real-time data insights.
        </motion.p>
      </div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatsCard
          title="Total Businesses"
          value={stats.total.toString()}
          icon={Building2}
          color="blue"
          trend={`+${stats.growth}%`}
        />
        <StatsCard
          title="Active Registrations"
          value={stats.active.toString()}
          icon={TrendingUp}
          color="emerald"
          trend="+5.2%"
        />
        <StatsCard
          title="Pending Reviews"
          value={stats.pending.toString()}
          icon={Activity}
          color="amber"
          trend="+2.1%"
        />
        <StatsCard
          title="Categories"
          value="6"
          icon={PieChart}
          color="purple"
          trend="+1 new"
        />
      </motion.div>

      {/* Recent Businesses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
            Recent Registrations
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View All
          </motion.button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl h-48"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {businesses.map((business) => (
              <motion.div key={business.id} variants={itemVariants}>
                <BusinessCard business={business} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white"
      >
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/30 transition-all duration-200"
          >
            <Search className="h-8 w-8 mb-2" />
            <h3 className="font-semibold">Run Web Scraper</h3>
            <p className="text-sm opacity-90">Extract latest business data</p>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/30 transition-all duration-200"
          >
            <Building2 className="h-8 w-8 mb-2" />
            <h3 className="font-semibold">Add New Business</h3>
            <p className="text-sm opacity-90">Register a new enterprise</p>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/30 transition-all duration-200"
          >
            <BarChart3 className="h-8 w-8 mb-2" />
            <h3 className="font-semibold">View Analytics</h3>
            <p className="text-sm opacity-90">Detailed business insights</p>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;