import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Users, BookOpen, Calendar } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Learn and Teach Skills with SkillSwap
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Connect with others, exchange knowledge, and grow together in a community of lifelong learners.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="font-semibold">
                Get Started <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="font-semibold">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How SkillSwap Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-lg text-center">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600 dark:text-blue-300" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect with Others</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Find people with complementary skills in your community or across the globe.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-lg text-center">
              <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-indigo-600 dark:text-indigo-300" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Your Knowledge</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Offer to teach skills you're proficient in and learn new ones from others.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-lg text-center">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-purple-600 dark:text-purple-300" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Schedule Sessions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Arrange convenient times for learning sessions through our simple scheduling system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-zinc-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "SkillSwap helped me learn photography from a professional while I taught them web design. It's a win-win!"
              </p>
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900 w-10 h-10 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Web Designer</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "I've learned three languages through SkillSwap exchanges. The community is amazing and supportive."
              </p>
              <div className="flex items-center">
                <div className="bg-indigo-100 dark:bg-indigo-900 w-10 h-10 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Software Developer</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "As a music teacher, I've expanded my student base and learned digital marketing in return."
              </p>
              <div className="flex items-center">
                <div className="bg-purple-100 dark:bg-purple-900 w-10 h-10 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold">Emma Rodriguez</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Music Instructor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join our community today and begin your journey of skill exchange.
          </p>
          <Link to="/signup">
            <Button size="lg" className="font-semibold">
              Create Your Account <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-100 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-blue-600">SkillSwap</h2>
            <p className="text-gray-600 dark:text-gray-400">Connect, Learn, Grow Together</p>
          </div>
          <div className="flex gap-6">
            <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              About
            </Link>
            <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Privacy
            </Link>
            <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Terms
            </Link>
            <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Contact
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} SkillSwap. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home; 