import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Users,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

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

interface BusinessCardProps {
  business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-amber-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Technology': 'bg-blue-100 text-blue-800',
      'Energy': 'bg-green-100 text-green-800',
      'Handicrafts': 'bg-purple-100 text-purple-800',
      'Agriculture': 'bg-orange-100 text-orange-800',
      'Services': 'bg-indigo-100 text-indigo-800',
      'Textiles': 'bg-pink-100 text-pink-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                {business.name}
              </h3>
              <p className="text-sm text-gray-600 font-mono">
                {business.udyamNumber}
              </p>
            </div>
          </div>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border ${getStatusColor(business.status)}`}>
            {getStatusIcon(business.status)}
            <span className="text-xs font-medium">{business.status}</span>
          </div>
        </div>

        {/* Category Tag */}
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(business.category)}`}>
            {business.category}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{business.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>Registered: {new Date(business.registrationDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="h-4 w-4 text-gray-400" />
            <span>{business.employees} employees</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BusinessCard;