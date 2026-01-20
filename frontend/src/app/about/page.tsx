export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">About Us</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Your trusted destination for quality products and exceptional shopping experience
          </p>
        </div>
      </div>
 
      <div className="max-w-7xl mx-auto px-6 py-12">
        
 
        {/* Our Story */}
        <section className="mt-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                Founded in 2024, E-Commerce Shop started with a simple mission: to make online shopping
                accessible, enjoyable, and trustworthy for everyone. What began as a small startup has
                grown into a thriving marketplace serving thousands of happy customers.
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                We believe in offering quality products at competitive prices, backed by excellent
                customer service. Our team works tirelessly to curate the best selection of products
                across various categories.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Facts</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-2xl mr-3">🏪</span>
                  <span>Established in 2024</span>
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-2xl mr-3">📦</span>
                  <span>10,000+ Products Available</span>
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-2xl mr-3">🌍</span>
                  <span>Shipping Worldwide</span>
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="text-2xl mr-3">⭐</span>
                  <span>4.8/5 Customer Rating</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
 
        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Quality First</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We carefully select every product to ensure it meets our high standards of quality.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Best Prices</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Competitive pricing without compromising on quality. Value for every purchase.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Customer Care</h3>
              <p className="text-gray-600 dark:text-gray-400">
                24/7 support to assist you with any questions or concerns about your orders.
              </p>
            </div>
          </div>
        </section>
 
        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Alex Johnson', role: 'CEO & Founder', emoji: '👨‍💼' },
              { name: 'Sarah Williams', role: 'Head of Operations', emoji: '👩‍💻' },
              { name: 'Mike Chen', role: 'Lead Developer', emoji: '👨‍🔧' },
              { name: 'Emily Brown', role: 'Customer Success', emoji: '👩‍🎤' },
            ].map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
 
        {/* Contact Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Get In Touch</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">support@eshop.com</p>
            </div>
            <div>
              <div className="text-4xl mb-3">📞</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h3>
              <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
            </div>
            <div>
              <div className="text-4xl mb-3">📍</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Address</h3>
              <p className="text-gray-600 dark:text-gray-400">123 Commerce St, City</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
 