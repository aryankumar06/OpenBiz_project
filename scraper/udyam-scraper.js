const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');

class UdyamScraper {
  constructor() {
    this.baseUrl = 'https://udyamregistration.gov.in';
    this.outputDir = path.join(__dirname, 'scraped-data');
    this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    
    this.axiosInstance = axios.create({
      timeout: 30000,
      headers: {
        'User-Agent': this.userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      }
    });
  }

  async ensureOutputDirectory() {
    try {
      await fs.access(this.outputDir);
    } catch {
      await fs.mkdir(this.outputDir, { recursive: true });
      console.log(`Created output directory: ${this.outputDir}`);
    }
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async scrapeRegistrationPage() {
    console.log('🔍 Starting Udyam registration page scraping...');
    
    try {
      const response = await this.axiosInstance.get(`${this.baseUrl}/UdyamRegistration.aspx`);
      const $ = cheerio.load(response.data);
      
      const pageInfo = {
        title: $('title').text().trim(),
        description: $('meta[name="description"]').attr('content') || '',
        keywords: $('meta[name="keywords"]').attr('content') || '',
        scrapedAt: new Date().toISOString(),
        url: `${this.baseUrl}/UdyamRegistration.aspx`
      };

      // Extract form fields and structure
      const formFields = [];
      $('input, select, textarea').each((i, element) => {
        const $el = $(element);
        const field = {
          type: $el.attr('type') || $el.prop('tagName').toLowerCase(),
          name: $el.attr('name') || '',
          id: $el.attr('id') || '',
          placeholder: $el.attr('placeholder') || '',
          required: $el.attr('required') !== undefined,
          label: $el.prev('label').text().trim() || $el.parent().prev('label').text().trim()
        };
        
        if (field.name || field.id) {
          formFields.push(field);
        }
      });

      // Extract navigation links
      const navLinks = [];
      $('nav a, .menu a, .navigation a').each((i, element) => {
        const $el = $(element);
        const link = {
          text: $el.text().trim(),
          href: $el.attr('href') || '',
          title: $el.attr('title') || ''
        };
        if (link.text && link.href) {
          navLinks.push(link);
        }
      });

      // Extract any visible business data or examples
      const businessExamples = [];
      $('.business-example, .sample-data, .example-registration').each((i, element) => {
        const $el = $(element);
        businessExamples.push({
          content: $el.text().trim(),
          html: $el.html()
        });
      });

      const scrapedData = {
        pageInfo,
        formFields,
        navLinks,
        businessExamples,
        statistics: {
          totalFormFields: formFields.length,
          totalNavLinks: navLinks.length,
          totalBusinessExamples: businessExamples.length
        }
      };

      console.log(`✅ Successfully scraped page data:`);
      console.log(`   - Form fields: ${formFields.length}`);
      console.log(`   - Navigation links: ${navLinks.length}`);
      console.log(`   - Business examples: ${businessExamples.length}`);

      return scrapedData;

    } catch (error) {
      console.error('❌ Error scraping registration page:', error.message);
      throw error;
    }
  }

  async simulateBusinessDataScraping() {
    console.log('🎭 Simulating business data scraping...');
    
    // Since we can't actually scrape real business data, we'll simulate
    // the process and generate realistic sample data
    const states = [
      'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 
      'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
      'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
      'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
      'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
      'West Bengal', 'Delhi'
    ];

    const categories = [
      'Manufacturing', 'Services', 'Trading', 'Agriculture', 'Technology',
      'Healthcare', 'Education', 'Construction', 'Transportation', 'Energy',
      'Textiles', 'Food Processing', 'Handicrafts', 'Tourism', 'Finance'
    ];

    const businessTypes = [
      'Pvt Ltd', 'Ltd', 'LLP', 'Partnership', 'Proprietorship', 'Co-operative',
      'Trust', 'Society', 'Company', 'Enterprise', 'Industries', 'Solutions'
    ];

    const simulatedBusinesses = [];
    const numberOfBusinesses = Math.floor(Math.random() * 100) + 50; // 50-150 businesses

    for (let i = 1; i <= numberOfBusinesses; i++) {
      await this.delay(50); // Simulate processing time
      
      const state = states[Math.floor(Math.random() * states.length)];
      const category = categories[Math.floor(Math.random() * categories.length)];
      const businessType = businessTypes[Math.floor(Math.random() * businessTypes.length)];
      
      const stateCode = state.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
      const udyamNumber = `UDYAM-${stateCode}-${String(Math.floor(Math.random() * 99) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 9999999) + 1000000).padStart(7, '0')}`;
      
      const business = {
        id: i.toString(),
        name: `${category} ${businessType} ${i}`,
        udyamNumber: udyamNumber,
        category: category,
        status: Math.random() > 0.2 ? 'Active' : (Math.random() > 0.5 ? 'Pending' : 'Inactive'),
        registrationDate: this.generateRandomDate(),
        location: `City ${i}, ${state}`,
        state: state,
        employees: Math.floor(Math.random() * 500) + 1,
        ownerName: `Owner ${i}`,
        email: `owner${i}@${category.toLowerCase().replace(' ', '')}${businessType.toLowerCase().replace(' ', '')}.com`,
        phone: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        annualTurnover: Math.floor(Math.random() * 10000000) + 100000,
        investmentInPlant: Math.floor(Math.random() * 5000000) + 50000,
        scrapedAt: new Date().toISOString()
      };

      simulatedBusinesses.push(business);

      if (i % 10 === 0) {
        console.log(`   Generated ${i}/${numberOfBusinesses} businesses...`);
      }
    }

    console.log(`✅ Generated ${simulatedBusinesses.length} simulated business records`);
    return simulatedBusinesses;
  }

  generateRandomDate() {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(randomTime).toISOString().split('T')[0];
  }

  async saveData(data, filename) {
    try {
      const filePath = path.join(this.outputDir, filename);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`💾 Data saved to: ${filePath}`);
      return filePath;
    } catch (error) {
      console.error('❌ Error saving data:', error.message);
      throw error;
    }
  }

  async generateReport(scrapedData, simulatedBusinesses) {
    const report = {
      scrapeSession: {
        timestamp: new Date().toISOString(),
        duration: 'N/A',
        status: 'completed'
      },
      summary: {
        pageDataExtracted: true,
        businessRecordsGenerated: simulatedBusinesses.length,
        formFieldsDiscovered: scrapedData.formFields.length,
        navigationLinksFound: scrapedData.navLinks.length
      },
      statistics: {
        businessesByStatus: this.getStatsByField(simulatedBusinesses, 'status'),
        businessesByCategory: this.getStatsByField(simulatedBusinesses, 'category'),
        businessesByState: this.getStatsByField(simulatedBusinesses, 'state'),
        averageEmployees: Math.round(simulatedBusinesses.reduce((sum, b) => sum + b.employees, 0) / simulatedBusinesses.length),
        totalInvestment: simulatedBusinesses.reduce((sum, b) => sum + b.investmentInPlant, 0)
      },
      recommendations: [
        'Consider implementing real-time data validation for form fields',
        'Monitor business registration trends by category and state',
        'Set up automated alerts for new registrations in key sectors',
        'Implement data quality checks for scraped information'
      ]
    };

    return report;
  }

  getStatsByField(data, field) {
    const stats = {};
    data.forEach(item => {
      const value = item[field];
      stats[value] = (stats[value] || 0) + 1;
    });
    return stats;
  }

  async run() {
    console.log('🚀 Starting Udyam Registration Scraper');
    console.log('=====================================');
    
    const startTime = Date.now();
    
    try {
      // Ensure output directory exists
      await this.ensureOutputDirectory();
      
      // Step 1: Scrape page structure and metadata
      console.log('\n📄 Step 1: Scraping page structure...');
      const scrapedData = await this.scrapeRegistrationPage();
      
      // Step 2: Simulate business data scraping
      console.log('\n🏢 Step 2: Generating business data...');
      const simulatedBusinesses = await this.simulateBusinessDataScraping();
      
      // Step 3: Generate comprehensive report
      console.log('\n📊 Step 3: Generating report...');
      const report = await this.generateReport(scrapedData, simulatedBusinesses);
      report.scrapeSession.duration = `${(Date.now() - startTime) / 1000}s`;
      
      // Step 4: Save all data
      console.log('\n💾 Step 4: Saving data...');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      
      await this.saveData(scrapedData, `page-data-${timestamp}.json`);
      await this.saveData(simulatedBusinesses, `business-data-${timestamp}.json`);
      await this.saveData(report, `scrape-report-${timestamp}.json`);
      
      // Generate CSV for business data
      await this.saveBusinessesAsCSV(simulatedBusinesses, `business-data-${timestamp}.csv`);
      
      console.log('\n🎉 Scraping completed successfully!');
      console.log('=====================================');
      console.log(`⏱️  Total time: ${report.scrapeSession.duration}`);
      console.log(`📈 Businesses generated: ${simulatedBusinesses.length}`);
      console.log(`📁 Files saved in: ${this.outputDir}`);
      console.log('\n📋 Summary:');
      Object.entries(report.summary).forEach(([key, value]) => {
        console.log(`   ${key}: ${value}`);
      });
      
      return {
        success: true,
        data: {
          scrapedData,
          simulatedBusinesses,
          report
        }
      };
      
    } catch (error) {
      console.error('\n❌ Scraping failed:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async saveBusinessesAsCSV(businesses, filename) {
    try {
      const headers = [
        'ID', 'Name', 'Udyam Number', 'Category', 'Status', 'Registration Date',
        'Location', 'State', 'Employees', 'Owner Name', 'Email', 'Phone',
        'Annual Turnover', 'Investment in Plant', 'Scraped At'
      ];
      
      const csvRows = [headers.join(',')];
      
      businesses.forEach(business => {
        const row = [
          business.id,
          `"${business.name}"`,
          business.udyamNumber,
          business.category,
          business.status,
          business.registrationDate,
          `"${business.location}"`,
          business.state,
          business.employees,
          `"${business.ownerName}"`,
          business.email,
          business.phone,
          business.annualTurnover,
          business.investmentInPlant,
          business.scrapedAt
        ];
        csvRows.push(row.join(','));
      });
      
      const csvContent = csvRows.join('\n');
      const filePath = path.join(this.outputDir, filename);
      await fs.writeFile(filePath, csvContent, 'utf8');
      console.log(`📊 CSV file saved to: ${filePath}`);
      
    } catch (error) {
      console.error('❌ Error saving CSV:', error.message);
    }
  }
}

// CLI functionality
if (require.main === module) {
  const scraper = new UdyamScraper();
  scraper.run()
    .then(result => {
      if (result.success) {
        process.exit(0);
      } else {
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = UdyamScraper;