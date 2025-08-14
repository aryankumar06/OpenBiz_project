import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Play, 
  Pause, 
  Download, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Database,
  TrendingUp
} from 'lucide-react';

interface ScrapeResult {
  id: string;
  timestamp: string;
  url: string;
  status: 'success' | 'error' | 'pending';
  recordsFound: number;
  duration: number;
  data?: any[];
  error?: string;
}

const WebScraper = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<ScrapeResult[]>([]);
  const [currentStatus, setCurrentStatus] = useState<string>('');
  const [progress, setProgress] = useState(0);

  const runScraper = async () => {
    setIsRunning(true);
    setCurrentStatus('Initializing scraper...');
    setProgress(0);

    const newResult: ScrapeResult = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      url: 'https://udyamregistration.gov.in/UdyamRegistration.aspx',
      status: 'pending',
      recordsFound: 0,
      duration: 0
    };

    setResults(prev => [newResult, ...prev]);

    try {
      // Simulate scraping process
      const steps = [
        'Connecting to target website...',
        'Parsing HTML structure...',
        'Extracting business data...',
        'Validating data integrity...',
        'Processing records...',
        'Saving to database...'
      ];

      for (let i = 0; i < steps.length; i++) {
        setCurrentStatus(steps[i]);
        setProgress((i + 1) / steps.length * 100);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      // Simulate successful completion
      const recordsFound = Math.floor(Math.random() * 50) + 10;
      const mockData = generateMockScrapedData(recordsFound);

      setResults(prev => prev.map(result => 
        result.id === newResult.id 
          ? { 
              ...result, 
              status: 'success', 
              recordsFound,
              duration: 9,
              data: mockData
            }
          : result
      ));

      setCurrentStatus('Scraping completed successfully!');
      
    } catch (error) {
      setResults(prev => prev.map(result => 
        result.id === newResult.id 
          ? { 
              ...result, 
              status: 'error', 
              error: 'Failed to scrape data from target website'
            }
          : result
      ));
      setCurrentStatus('Scraping failed');
    }

    setIsRunning(false);
    setTimeout(() => {
      setCurrentStatus('');
      setProgress(0);
    }, 3000);
  };

  const generateMockScrapedData = (count: number) => {
    const categories = ['Manufacturing', 'Services', 'Trading', 'Agriculture'];
    const states = ['Maharashtra', 'Karnataka', 'Gujarat', 'Tamil Nadu', 'Rajasthan'];
    
    return Array.from({ length: count }, (_, i) => ({
      name: `Business ${i + 1} Pvt Ltd`,
      udyamNumber: `UDYAM-${states[i % states.length].slice(0, 2).toUpperCase()}-${String(Math.floor(Math.random() * 10)).padStart(2, '0')}-${String(Math.floor(Math.random() * 9999999)).padStart(7, '0')}`,
      category: categories[i % categories.length],
      status: Math.random() > 0.3 ? 'Active' : 'Pending',
      location: `City ${i + 1}, ${states[i % states.length]}`,
      employees: Math.floor(Math.random() * 100) + 1
    }));
  };

  const exportResults = (result: ScrapeResult) => {
    if (!result.data) return;

    const csvData = [
      'Name,Udyam Number,Category,Status,Location,Employees',
      ...result.data.map(item => 
        `"${item.name}","${item.udyamNumber}","${item.category}","${item.status}","${item.location}",${item.employees}`
      )
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scrape-results-${result.timestamp.split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-emerald-600" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-amber-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          Udyam Registration Web Scraper
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Extract business registration data from the official Udyam portal. 
          Monitor and collect comprehensive business information for analysis.
        </motion.p>
      </div>

      {/* Control Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Globe className="h-5 w-5 mr-2 text-blue-600" />
            Scraper Control Panel
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Target: udyamregistration.gov.in</span>
          </div>
        </div>

        {/* Current Status */}
        {(isRunning || currentStatus) && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-800 font-medium">
                {isRunning ? currentStatus : 'Scraper ready'}
              </span>
              {isRunning && (
                <span className="text-blue-600 text-sm">
                  {Math.round(progress)}%
                </span>
              )}
            </div>
            {isRunning && (
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={runScraper}
            disabled={isRunning}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              isRunning
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isRunning ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" />
                <span>Scraping...</span>
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                <span>Start Scraping</span>
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!isRunning}
            className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
          >
            <Pause className="h-5 w-5" />
            <span>Stop</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Results History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Database className="h-5 w-5 mr-2 text-blue-600" />
            Scraping History
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Previous scraping sessions and their results
          </p>
        </div>

        <div className="p-6">
          {results.length === 0 ? (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No scraping history</h3>
              <p className="text-gray-600">Start a scraping session to see results here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(result.status)}
                        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(result.status)}`}>
                          {result.status.toUpperCase()}
                        </div>
                        <span className="text-sm text-gray-600">
                          {new Date(result.timestamp).toLocaleString()}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Records Found:</span>
                          <div className="font-semibold text-gray-900">{result.recordsFound}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <div className="font-semibold text-gray-900">{result.duration}s</div>
                        </div>
                        <div>
                          <span className="text-gray-500">URL:</span>
                          <div className="font-semibold text-gray-900 truncate">
                            {result.url.replace('https://', '')}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {result.status === 'success' && result.data && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => exportResults(result)}
                              className="flex items-center space-x-1 px-3 py-1 bg-emerald-600 text-white rounded text-xs hover:bg-emerald-700 transition-colors"
                            >
                              <Download className="h-3 w-3" />
                              <span>Export</span>
                            </motion.button>
                          )}
                        </div>
                      </div>

                      {result.error && (
                        <div className="mt-2 text-red-600 text-sm">
                          Error: {result.error}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Statistics */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{results.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Records Scraped</p>
                <p className="text-2xl font-bold text-gray-900">
                  {results.reduce((sum, r) => sum + r.recordsFound, 0)}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-lg">
                <Database className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((results.filter(r => r.status === 'success').length / results.length) * 100)}%
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WebScraper;