# OpenBiz Assignment - Business Registration Management System

A comprehensive full-stack web application that demonstrates web scraping, responsive UI development, backend implementation, testing, and deployment capabilities for managing Udyam business registrations.

## 🚀 Features

### 1. Web Scraping (Step 1 & 2)
- **Udyam Registration Scraper**: Extracts business registration data from the official Udyam portal
- **Intelligent Data Processing**: Parses HTML structure and extracts meaningful business information
- **Data Validation**: Ensures scraped data integrity with comprehensive validation
- **Export Functionality**: Saves scraped data in JSON and CSV formats
- **Real-time Progress Tracking**: Monitor scraping sessions with live progress updates

### 2. Responsive UI Development
- **Modern React Frontend**: Built with React 18 and TypeScript for type safety
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewports
- **Smooth Animations**: Framer Motion integration for fluid user interactions
- **Component Library**: Reusable, well-documented UI components
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels and keyboard navigation

### 3. Backend Implementation
- **RESTful API**: Comprehensive REST API with full CRUD operations
- **Data Persistence**: JSON-based data storage with automatic backup
- **Input Validation**: Server-side validation for all API endpoints
- **Error Handling**: Robust error handling with meaningful error messages
- **API Documentation**: Interactive documentation with example requests/responses

### 4. Testing
- **Unit Tests**: Comprehensive test suite using Vitest and React Testing Library
- **Component Testing**: Individual component testing with mock data
- **API Testing**: Backend endpoint testing with validation
- **Integration Tests**: End-to-end testing scenarios
- **Test Coverage**: Detailed coverage reports

### 5. Deployment (Bonus)
- **Production Build**: Optimized build configuration for deployment
- **Environment Configuration**: Separate development and production settings
- **Static Assets**: Optimized asset handling and CDN-ready structure
- **Health Checks**: Built-in health monitoring endpoints

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Hook Form** for form handling
- **React Router** for navigation
- **Axios** for API communication

### Backend
- **Node.js** with Express
- **CORS** enabled for cross-origin requests
- **JSON file-based storage**
- **Input validation and sanitization**
- **RESTful API design**

### Web Scraping
- **Cheerio** for HTML parsing
- **Axios** for HTTP requests
- **Custom retry logic** for reliable scraping
- **Data export** in multiple formats

### Testing
- **Vitest** as test runner
- **React Testing Library** for component testing
- **Jest DOM** for additional matchers
- **Coverage reporting**

### Development Tools
- **Vite** for fast development and building
- **ESLint** for code linting
- **TypeScript** for type safety
- **PostCSS** with Autoprefixer

## 📋 Prerequisites

- Node.js 18+ and npm
- Modern web browser with JavaScript enabled
- Internet connection for web scraping functionality

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Backend Server
```bash
npm run server
```
The API server will start on `http://localhost:3001`

### 3. Start the Frontend Development Server
```bash
npm run dev
```
The web application will be available at `http://localhost:5173`

### 4. Run Web Scraper (Optional)
```bash
npm run scraper
```

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Tests with UI
```bash
npm run test:ui
```

### Generate Coverage Report
```bash
npm run test:coverage
```

## 📖 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### GET /businesses
Retrieve all businesses with optional filtering and pagination.

**Query Parameters:**
- `page` (integer): Page number (default: 1)
- `limit` (integer): Items per page (default: 10)
- `status` (string): Filter by status (Active, Pending, Inactive)
- `category` (string): Filter by category
- `search` (string): Search in name, Udyam number, location, or owner name

#### GET /businesses/:id
Retrieve a specific business by ID.

#### POST /businesses
Create a new business registration.

**Required Fields:**
- `name` (string): Business name
- `category` (string): Business category
- `ownerName` (string): Owner name
- `email` (string): Email address
- `phone` (string): Phone number

#### PUT /businesses/:id
Update an existing business.

#### DELETE /businesses/:id
Delete a business registration.

#### GET /stats
Get business statistics and analytics.

#### GET /health
Health check endpoint.

## 🗂️ Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Dashboard.tsx    # Main dashboard
│   │   ├── BusinessList.tsx # Business listing with filters
│   │   ├── BusinessCard.tsx # Individual business card
│   │   ├── AddBusiness.tsx  # Business registration form
│   │   ├── WebScraper.tsx   # Web scraping interface
│   │   ├── ApiDocs.tsx      # API documentation
│   │   └── StatsCard.tsx    # Statistics display card
│   ├── __tests__/           # Test files
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── server/
│   ├── index.js             # Express server
│   └── data/                # JSON data storage
├── scraper/
│   ├── udyam-scraper.js     # Web scraping implementation
│   └── scraped-data/        # Scraped data output
├── public/                  # Static assets
└── package.json             # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3001/api
PORT=3001
NODE_ENV=development
```

### Customization
- **API Port**: Change the port in `server/index.js`
- **Styling**: Modify `tailwind.config.js` for custom theme
- **Scraping Target**: Update target URLs in `scraper/udyam-scraper.js`

## 📊 Features Overview

### Dashboard
- Real-time business statistics
- Recent registrations display
- Quick action buttons
- Interactive charts and graphs

### Business Management
- Comprehensive business listing
- Advanced filtering and search
- Bulk operations support
- CSV export functionality

### Web Scraping
- Automated data extraction
- Progress monitoring
- Error handling and retry logic
- Data validation and cleaning

### Form Handling
- Multi-step business registration
- Real-time validation
- File upload support
- Auto-save functionality

## 🚦 Development Workflow

1. **Feature Development**: Create feature branches from main
2. **Testing**: Write tests for new components and functionality
3. **Code Review**: Submit pull requests for review
4. **Integration**: Merge approved changes to main branch
5. **Deployment**: Build and deploy to production environment

## 🔒 Security Considerations

- Input validation on both client and server
- CORS configuration for API access
- Rate limiting for scraping operations
- Data sanitization for XSS prevention
- Secure handling of sensitive information

## 📈 Performance Optimizations

- Lazy loading of components
- Memoization of expensive calculations
- Efficient data fetching with caching
- Optimized bundle size with tree shaking
- CDN-ready static asset handling

## 🐛 Troubleshooting

### Common Issues

1. **API Server Not Starting**
   - Check if port 3001 is available
   - Verify Node.js version (18+ required)
   - Check server logs for detailed errors

2. **Scraper Not Working**
   - Verify internet connection
   - Check target website accessibility
   - Review scraper logs for specific errors

3. **Tests Failing**
   - Ensure all dependencies are installed
   - Check test environment setup
   - Verify mock data consistency

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React and TypeScript communities
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- The open-source community for various tools and libraries

---

**Note**: This application is designed for educational and demonstration purposes. For production use, ensure proper security measures, data validation, and compliance with relevant regulations are implemented.