import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  SortAsc,
  SortDesc
} from 'lucide-react';
import BusinessCard from './BusinessCard';

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

const BusinessList = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchBusinesses();
  }, []);

  useEffect(() => {
    filterAndSortBusinesses();
  }, [businesses, searchTerm, statusFilter, categoryFilter, sortBy, sortOrder]);

  const fetchBusinesses = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/businesses');
      if (response.ok) {
        const data = await response.json();
        setBusinesses(data);
      } else {
        // Use mock data if API is not available
        setBusinesses(generateMockBusinesses());
      }
    } catch (error) {
      console.error('Error fetching businesses:', error);
      setBusinesses(generateMockBusinesses());
    } finally {
      setLoading(false);
    }
  };

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
      },
      {
        id: '7',
        name: 'Organic Foods Ltd',
        udyamNumber: 'UDYAM-TN-08-7890123',
        category: 'Agriculture',
        status: 'Active',
        registrationDate: '2023-01-22',
        location: 'Chennai, Tamil Nadu',
        employees: 22
      },
      {
        id: '8',
        name: 'Smart Home Solutions',
        udyamNumber: 'UDYAM-HR-06-8901234',
        category: 'Technology',
        status: 'Pending',
        registrationDate: '2023-03-18',
        location: 'Gurgaon, Haryana',
        employees: 15
      }
    ];
  };

  const filterAndSortBusinesses = () => {
    let filtered = businesses.filter(business => {
      const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          business.udyamNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          business.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || business.status === statusFilter;
      const matchesCategory = categoryFilter === 'All' || business.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'registrationDate':
          aValue = new Date(a.registrationDate).getTime();
          bValue = new Date(b.registrationDate).getTime();
          break;
        case 'employees':
          aValue = a.employees;
          bValue = b.employees;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredBusinesses(filtered);
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchBusinesses();
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Udyam Number', 'Category', 'Status', 'Registration Date', 'Location', 'Employees'];
    const csvData = [
      headers.join(','),
      ...filteredBusinesses.map(business => [
        business.name,
        business.udyamNumber,
        business.category,
        business.status,
        business.registrationDate,
        business.location,
        business.employees
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'businesses.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Business Directory</h1>
          <p className="text-gray-600 mt-1">
            Manage and explore registered businesses ({filteredBusinesses.length} of {businesses.length})
          </p>
        </div>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportToCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </motion.button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search businesses, Udyam number, or location..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Energy">Energy</option>
              <option value="Handicrafts">Handicrafts</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Services">Services</option>
              <option value="Textiles">Textiles</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <div className="flex space-x-2">
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Name</option>
                <option value="registrationDate">Date</option>
                <option value="employees">Employees</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Business Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-xl h-64"></div>
            </div>
          ))}
        </div>
      ) : filteredBusinesses.length === 0 ? (
        <div className="text-center py-12">
          <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredBusinesses.map((business, index) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <BusinessCard business={business} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default BusinessList;