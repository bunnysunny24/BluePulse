import React, { useState } from 'react';
import {
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  Search,
  FileText,
  Book,
  MessageSquare,
  ArrowRight,
  Globe,
  Send
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "./ui/alert";

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'water-tracking', name: 'Water Tracking' },
    { id: 'plants', name: 'Virtual Plants' },
    { id: 'account', name: 'Account & Settings' },
    { id: 'technical', name: 'Technical Issues' }
  ];

  const faqs = [
    {
      category: 'getting-started',
      question: 'How do I set up BluePulse?',
      answer: 'Easily connect your smart meter, customize your preferences, and start tracking your water usage in real-time!'
    },
    {
      category: 'water-tracking',
      question: 'How do I track my water intake?',
      answer: 'BluePulse automatically logs your usage from smart meters. You can also manually enter data for better accuracy.'
    },
    {
      category: 'water-tracking',
      question: 'Can I customize my daily water goal?',
      answer: 'Yes! Set personalized water-saving goals based on your lifestyle, household size, and conservation habits.'
    },
    {
      category: 'plants',
      question: 'How does BluePulse help reduce water wastage?',
      answer: '✅ Alerts & notifications when unusual consumption is detected ✅ Personalized water-saving recommendations ✅ Gamified challenges & rewards for meeting conservation goals',
    },
    {
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on "Forgot Password" on the login page. We\'ll send you a reset link to your registered email address.'
    },
    {
      category: 'technical',
      question: 'Is my data secure?',
      answer: 'Yes, we take data security seriously. All your data is encrypted and stored securely. We never share your personal information with third parties.'
    }
  ];

  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const filteredFAQs = faqs.filter(faq => 
    (selectedCategory === 'all' || faq.category === selectedCategory) &&
    (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-sky-900 mb-4">How can we help you?</h1>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="search"
                placeholder="Search for help..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Quick Help Cards */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-sky-100 p-3 rounded-lg">
                  <Book className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Getting Started Guide</h3>
                  <p className="text-gray-600 mb-4">New to BluePulse? Check out our comprehensive guide to get started.</p>
                  <button className="text-sky-600 hover:text-sky-700 flex items-center space-x-2">
                    <span>Read guide</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-sky-100 p-3 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Live Chat Support</h3>
                  <p className="text-gray-600 mb-4">Chat with our support team for immediate assistance.</p>
                  <button className="text-sky-600 hover:text-sky-700 flex items-center space-x-2">
                    <span>Start chat</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-sky-100 p-3 rounded-lg">
                  <Globe className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Community Forum</h3>
                  <p className="text-gray-600 mb-4">Join our community to share tips and get advice.</p>
                  <button className="text-sky-600 hover:text-sky-700 flex items-center space-x-2">
                    <span>Visit forum</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                        selectedCategory === category.id
                          ? 'bg-sky-500 text-white'
                          : 'bg-sky-50 text-sky-600 hover:bg-sky-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
                <div className="space-y-4">
                  {filteredFAQs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-sky-50"
                        onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      >
                        <span className="font-medium">{faq.question}</span>
                        <ChevronDown
                          className={`h-5 w-5 text-gray-500 transition-transform ${
                            expandedFAQ === index ? 'transform rotate-180' : ''
                          }`}
                        />
                      </button>
                      {expandedFAQ === index && (
                        <div className="px-6 py-4 bg-sky-50">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-sky-600" />
                    <span>bhavashesh@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-sky-600" />
                    <span>+91-9849800511</span>
                  </div>
                  <div className="mt-6">
                    <textarea
                      placeholder="Describe your issue..."
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      rows={4}
                    />
                    <button className="mt-2 w-full bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors flex items-center justify-center space-x-2">
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a href="#" className="block p-3 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-sky-600" />
                      <span>User Guide</span>
                    </div>
                  </a>
                  <a href="#" className="block p-3 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Book className="h-5 w-5 text-sky-600" />
                      <span>Plant Care Guide</span>
                    </div>
                  </a>
                  <a href="#" className="block p-3 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <HelpCircle className="h-5 w-5 text-sky-600" />
                      <span>Troubleshooting Guide</span>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
            <Alert>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <AlertTitle>All Systems Operational</AlertTitle>
              </div>
              <AlertDescription>
                Check our <a href="#" className="text-sky-600 hover:underline">system status page</a> for more details.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;