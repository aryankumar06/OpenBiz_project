const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data', 'businesses.json');

// Middleware
app.use(cors());
app.use(express.json());

// Ensure data directory exists
async function ensureDataDirectory() {
  try {
    await fs.access(path.dirname(DATA_FILE));
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  }
}

// Initialize with sample data if file doesn't exist
async function initializeData() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    const sampleData = [
      {
        id: '1',
        name: 'Tech Innovations Pvt Ltd',
        udyamNumber: 'UDYAM-MH-03-1234567',
        category: 'Technology',
        status: 'Active',
        registrationDate: '2023-01-15',
        location: 'Mumbai, Maharashtra',
        employees: 25,
        ownerName: 'Rajesh Kumar',
        email: 'rajesh@techinnovations.com',
        phone: '+91-9876543210',
        address: '123 Tech Park, Powai',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400076',
        website: 'https://techinnovations.com',
        description: 'Leading technology solutions provider specializing in AI and ML'
      },
      {
        id: '2',
        name: 'Green Energy Solutions',
        udyamNumber: 'UDYAM-KA-07-2345678',
        category: 'Energy',
        status: 'Active',
        registrationDate: '2023-02-20',
        location: 'Bangalore, Karnataka',
        employees: 18,
        ownerName: 'Priya Sharma',
        email: 'priya@greenenergy.com',
        phone: '+91-9876543211',
        address: '456 Green Valley, Electronic City',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560100',
        website: 'https://greenenergy.com',
        description: 'Sustainable energy solutions for commercial and residential use'
      },
      {
        id: '3',
        name: 'Artisan Crafts Co.',
        udyamNumber: 'UDYAM-RJ-02-3456789',
        category: 'Handicrafts',
        status: 'Pending',
        registrationDate: '2023-03-10',
        location: 'Jaipur, Rajasthan',
        employees: 12,
        ownerName: 'Meera Agarwal',
        email: 'meera@artisancrafts.com',
        phone: '+91-9876543212',
        address: '789 Heritage Lane, Pink City',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302001',
        description: 'Traditional Rajasthani handicrafts and textiles'
      },
      {
        id: '4',
        name: 'Fresh Farm Produce',
        udyamNumber: 'UDYAM-PB-04-4567890',
        category: 'Agriculture',
        status: 'Active',
        registrationDate: '2023-02-28',
        location: 'Ludhiana, Punjab',
        employees: 30,
        ownerName: 'Harpreet Singh',
        email: 'harpreet@freshfarm.com',
        phone: '+91-9876543213',
        address: '321 Farm Road, Ludhiana',
        city: 'Ludhiana',
        state: 'Punjab',
        pincode: '141001',
        description: 'Organic farming and fresh produce distribution'
      },
      {
        id: '5',
        name: 'Digital Marketing Hub',
        udyamNumber: 'UDYAM-DL-01-5678901',
        category: 'Services',
        status: 'Active',
        registrationDate: '2023-03-05',
        location: 'New Delhi',
        employees: 8,
        ownerName: 'Amit Verma',
        email: 'amit@digitalmarketing.com',
        phone: '+91-9876543214',
        address: '654 Business Center, Connaught Place',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110001',
        website: 'https://digitalmarketinghub.com',
        description: 'Comprehensive digital marketing services for small and medium businesses'
      },
      {
        id: '6',
        name: 'Textile Manufacturing Co.',
        udyamNumber: 'UDYAM-GJ-05-6789012',
        category: 'Textiles',
        status: 'Pending',
        registrationDate: '2023-03-12',
        location: 'Surat, Gujarat',
        employees: 45,
        ownerName: 'Ravi Patel',
        email: 'ravi@textilemanufacturing.com',
        phone: '+91-9876543215',
        address: '987 Textile District, Surat',
        city: 'Surat',
        state: 'Gujarat',
        pincode: '395003',
        description: 'High-quality textile manufacturing for domestic and export markets'
      }
    ];
    
    await fs.writeFile(DATA_FILE, JSON.stringify(sampleData, null, 2));
    console.log('Sample data initialized');
  }
}

// Helper functions
async function readBusinesses() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading businesses:', error);
    return [];
  }
}

async function writeBusinesses(businesses) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(businesses, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing businesses:', error);
    return false;
  }
}

function generateId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// Routes

// GET /api/businesses - Get all businesses with optional filtering
app.get('/api/businesses', async (req, res) => {
  try {
    const businesses = await readBusinesses();
    const { page = 1, limit = 10, status, category, search } = req.query;
    
    let filteredBusinesses = businesses;
    
    // Apply filters
    if (status && status !== 'All') {
      filteredBusinesses = filteredBusinesses.filter(b => b.status === status);
    }
    
    if (category && category !== 'All') {
      filteredBusinesses = filteredBusinesses.filter(b => b.category === category);
    }
    
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredBusinesses = filteredBusinesses.filter(b => 
        b.name.toLowerCase().includes(searchTerm) ||
        b.udyamNumber.toLowerCase().includes(searchTerm) ||
        b.location.toLowerCase().includes(searchTerm) ||
        b.ownerName.toLowerCase().includes(searchTerm)
      );
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedBusinesses = filteredBusinesses.slice(startIndex, endIndex);
    
    res.json({
      businesses: paginatedBusinesses,
      total: filteredBusinesses.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(filteredBusinesses.length / limit)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch businesses' });
  }
});

// GET /api/businesses/:id - Get specific business
app.get('/api/businesses/:id', async (req, res) => {
  try {
    const businesses = await readBusinesses();
    const business = businesses.find(b => b.id === req.params.id);
    
    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }
    
    res.json(business);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch business' });
  }
});

// POST /api/businesses - Create new business
app.post('/api/businesses', async (req, res) => {
  try {
    const businesses = await readBusinesses();
    
    // Validate required fields
    const requiredFields = ['name', 'category', 'ownerName', 'email', 'phone'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }
    
    // Create new business
    const newBusiness = {
      id: generateId(),
      ...req.body,
      registrationDate: req.body.registrationDate || new Date().toISOString(),
      status: req.body.status || 'Pending'
    };
    
    // Generate Udyam number if not provided
    if (!newBusiness.udyamNumber) {
      const stateCode = newBusiness.state ? newBusiness.state.slice(0, 2).toUpperCase() : 'XX';
      const randomNum = Math.floor(Math.random() * 9999999).toString().padStart(7, '0');
      const districtCode = Math.floor(Math.random() * 99).toString().padStart(2, '0');
      newBusiness.udyamNumber = `UDYAM-${stateCode}-${districtCode}-${randomNum}`;
    }
    
    businesses.push(newBusiness);
    const success = await writeBusinesses(businesses);
    
    if (success) {
      res.status(201).json(newBusiness);
    } else {
      res.status(500).json({ error: 'Failed to save business' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create business' });
  }
});

// PUT /api/businesses/:id - Update business
app.put('/api/businesses/:id', async (req, res) => {
  try {
    const businesses = await readBusinesses();
    const businessIndex = businesses.findIndex(b => b.id === req.params.id);
    
    if (businessIndex === -1) {
      return res.status(404).json({ error: 'Business not found' });
    }
    
    // Update business
    businesses[businessIndex] = {
      ...businesses[businessIndex],
      ...req.body,
      id: req.params.id // Ensure ID doesn't change
    };
    
    const success = await writeBusinesses(businesses);
    
    if (success) {
      res.json(businesses[businessIndex]);
    } else {
      res.status(500).json({ error: 'Failed to update business' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update business' });
  }
});

// DELETE /api/businesses/:id - Delete business
app.delete('/api/businesses/:id', async (req, res) => {
  try {
    const businesses = await readBusinesses();
    const businessIndex = businesses.findIndex(b => b.id === req.params.id);
    
    if (businessIndex === -1) {
      return res.status(404).json({ error: 'Business not found' });
    }
    
    businesses.splice(businessIndex, 1);
    const success = await writeBusinesses(businesses);
    
    if (success) {
      res.json({ message: 'Business deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete business' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete business' });
  }
});

// GET /api/stats - Get statistics
app.get('/api/stats', async (req, res) => {
  try {
    const businesses = await readBusinesses();
    
    const stats = {
      total: businesses.length,
      active: businesses.filter(b => b.status === 'Active').length,
      pending: businesses.filter(b => b.status === 'Pending').length,
      inactive: businesses.filter(b => b.status === 'Inactive').length,
      categories: {}
    };
    
    // Count by category
    businesses.forEach(business => {
      if (stats.categories[business.category]) {
        stats.categories[business.category]++;
      } else {
        stats.categories[business.category] = 1;
      }
    });
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Initialize and start server
async function startServer() {
  try {
    await ensureDataDirectory();
    await initializeData();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
      console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();