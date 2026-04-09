import Link from 'next/link';
import { CheckCircle, Home } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#F5EDE0] flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You for Your Order!
        </h1>
        
        <p className="text-gray-600 mb-2">
          Your order has been placed successfully.
        </p>
        
        <p className="text-gray-600 mb-8">
          We will contact you shortly to confirm your order details.
        </p>

        <div className="bg-[#8B6F47]/10 border border-[#8B6F47]/30 rounded-lg p-4 mb-8">
          <p className="text-sm text-gray-700">
            <strong>What's next?</strong><br />
            Our team will reach out to you via phone or email to confirm your order and arrange delivery.
          </p>
        </div>
        
        <Link href="/">
          <button className="w-full flex items-center justify-center gap-2 py-4 bg-[#654321] hover:bg-[#4A3219] text-white font-bold rounded-lg transition-colors">
            <Home className="w-5 h-5" />
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}
