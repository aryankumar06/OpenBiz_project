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

