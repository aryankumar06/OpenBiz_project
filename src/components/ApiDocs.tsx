import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Code, 
  Server, 
  Database,
  Lock,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';

const ApiDocs = () => {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string>('');

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(''), 2000);
  };

  const endpoints = [
    {
      method: 'GET',
      path: '/api/businesses',
      description: 'Retrieve all businesses',
      parameters: [
        { name: 'page', type: 'integer', description: 'Page number (default: 1)' },
        { name: 'limit', type: 'integer', description: 'Items per page (default: 10)' },
        { name: 'status', type: 'string', description: 'Filter by status (Active, Pending, Inactive)' },
        { name: 'category', type: 'string', description: 'Filter by category' }
      ],
      example: `{
  "businesses": [
    {
      "id": "1",
      "name": "Tech Innovations Pvt Ltd",
      "udyamNumber": "UDYAM-MH-03-1234567",
      "category": "Technology",
      "status": "Active",
      "registrationDate": "2023-01-15",
      "location": "Mumbai, Maharashtra",
      "employees": 25,
      "ownerName": "John Doe",
      "email": "john@techinnovations.com",
      "phone": "+91-9876543210"
    }
  ],
  "total": 150,
  "page": 1,
  "limit": 10
}`
    },
    {
      method: 'GET',
      path: '/api/businesses/:id',
      description: 'Retrieve a specific business by ID',
      parameters: [
        { name: 'id', type: 'string', description: 'Business ID' }
      ],
      example: `{
  "id": "1",
  "name": "Tech Innovations Pvt Ltd",
  "udyamNumber": "UDYAM-MH-03-1234567",
  "category": "Technology",
  "status": "Active",
  "registrationDate": "2023-01-15",
  "location": "Mumbai, Maharashtra",
  "employees": 25,
  "ownerName": "John Doe",
  "email": "john@techinnovations.com",
  "phone": "+91-9876543210",
  "address": "123 Tech Park, Mumbai",
  "website": "https://techinnovations.com"
}`
    },
    {
      method: 'POST',
      path: '/api/businesses',
      description: 'Create a new business registration',
      parameters: [
        { name: 'name', type: 'string', description: 'Business name (required)' },
        { name: 'category', type: 'string', description: 'Business category (required)' },
        { name: 'ownerName', type: 'string', description: 'Owner name (required)' },
        { name: 'email', type: 'string', description: 'Email address (required)' },
        { name: 'phone', type: 'string', description: 'Phone number (required)' }
      ],
      example: `{
  "name": "New Business Ltd",
  "category": "Services",
  "ownerName": "Jane Smith",
  "email": "jane@newbusiness.com",
  "phone": "+91-9876543210",
  "address": "456 Business St",
  "city": "Delhi",
  "state": "Delhi",
  "pincode": "110001",
  "employees": 10
}`
    },
    {
      method: 'PUT',
      path: '/api/businesses/:id',
      description: 'Update an existing business',
      parameters: [
        { name: 'id', type: 'string', description: 'Business ID' }
      ],
      example: `{
  "name": "Updated Business Name",
  "status": "Active",
  "employees": 30
}`
    },
    {
      method: 'DELETE',
      path: '/api/businesses/:id',
      description: 'Delete a business registration',
      parameters: [
        { name: 'id', type: 'string', description: 'Business ID' }
      ],
      example: `{
  "message": "Business deleted successfully"
}`
    }
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-blue-100 text-blue-800';
      case 'POST':
        return 'bg-emerald-100 text-emerald-800';
      case 'PUT':
        return 'bg-amber-100 text-amber-800';
      case 'DELETE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <FileText className="h-8 w-8 mr-3 text-blue-600" />
          API Documentation
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive REST API documentation for the OpenBiz Business Registration System. 
          Integrate with our services to manage business registrations programmatically.
        </p>
      </motion.div>

      {/* Quick Start */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white"
      >
        <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Base URL</h3>
            <div className="bg-black/20 rounded-lg p-3 font-mono text-sm">
              http://localhost:3001
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Content Type</h3>
            <div className="bg-black/20 rounded-lg p-3 font-mono text-sm">
              application/json
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Example Request</h3>
          <div className="bg-black/20 rounded-lg p-4 font-mono text-sm">
            <div className="text-green-300">curl -X GET \</div>
            <div className="text-blue-300">  http://localhost:3001/api/businesses \</div>
            <div className="text-yellow-300">  -H "Content-Type: application/json"</div>
          </div>
        </div>
      </motion.div>

      {/* Authentication */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Lock className="h-5 w-5 mr-2 text-blue-600" />
          Authentication
        </h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <div className="bg-amber-100 p-1 rounded-full mr-3 mt-0.5">
              <Lock className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <h4 className="font-medium text-amber-800">Development Mode</h4>
              <p className="text-amber-700 text-sm">
                Currently, the API runs in development mode without authentication. 
                In production, you would need to include an API key in the request headers.
              </p>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          <p className="mb-2">For production environments, include the following header:</p>
          <div className="bg-gray-100 rounded-lg p-3 font-mono">
            Authorization: Bearer YOUR_API_KEY
          </div>
        </div>
      </motion.div>

      {/* Endpoints */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Server className="h-5 w-5 mr-2 text-blue-600" />
            API Endpoints
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Available endpoints for business registration management
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {endpoints.map((endpoint, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getMethodColor(endpoint.method)}`}>
                  {endpoint.method}
                </span>
                <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">
                  {endpoint.path}
                </code>
                <button
                  onClick={() => copyToClipboard(`${endpoint.method} ${endpoint.path}`, endpoint.path)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {copiedEndpoint === endpoint.path ? (
                    <Check className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              <p className="text-gray-700 mb-4">{endpoint.description}</p>

              {endpoint.parameters.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Parameters:</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 pr-4 font-medium text-gray-900">Name</th>
                          <th className="text-left py-2 pr-4 font-medium text-gray-900">Type</th>
                          <th className="text-left py-2 font-medium text-gray-900">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {endpoint.parameters.map((param, paramIndex) => (
                          <tr key={paramIndex} className="border-b border-gray-100">
                            <td className="py-2 pr-4">
                              <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                                {param.name}
                              </code>
                            </td>
                            <td className="py-2 pr-4 text-gray-600">{param.type}</td>
                            <td className="py-2 text-gray-600">{param.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Example Response:</h4>
                <div className="bg-gray-900 rounded-lg p-4 text-sm text-gray-100 overflow-x-auto">
                  <pre>{endpoint.example}</pre>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Error Codes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Database className="h-5 w-5 mr-2 text-blue-600" />
          Status Codes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Success Codes</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-emerald-50 rounded">
                <span className="font-mono text-sm">200</span>
                <span className="text-sm text-gray-600">OK</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-emerald-50 rounded">
                <span className="font-mono text-sm">201</span>
                <span className="text-sm text-gray-600">Created</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-emerald-50 rounded">
                <span className="font-mono text-sm">204</span>
                <span className="text-sm text-gray-600">No Content</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Error Codes</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                <span className="font-mono text-sm">400</span>
                <span className="text-sm text-gray-600">Bad Request</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                <span className="font-mono text-sm">404</span>
                <span className="text-sm text-gray-600">Not Found</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                <span className="font-mono text-sm">500</span>
                <span className="text-sm text-gray-600">Server Error</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SDK & Libraries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Code className="h-5 w-5 mr-2 text-blue-600" />
          SDKs & Libraries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['JavaScript', 'Python', 'PHP'].map((lang) => (
            <motion.div
              key={lang}
              whileHover={{ scale: 1.02, y: -2 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{lang}</h3>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Official {lang} SDK for easy integration
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ApiDocs;