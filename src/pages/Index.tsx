
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IdCard, UserRound } from "lucide-react";
import RegistrationForm from "@/components/RegistrationForm";

const Index = () => {
  const [showRegistration, setShowRegistration] = useState(false);

  if (showRegistration) {
    return <RegistrationForm onBack={() => setShowRegistration(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <IdCard className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Smart ID Portal</h1>
              <p className="text-sm text-gray-600">Digital Identity Registration System</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Register for Your Smart ID
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your digital identity card quickly and securely. Complete your registration online and receive your Smart ID within 5-7 business days.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserRound className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Quick Registration</h3>
            <p className="text-gray-600">Complete your application in just a few minutes with our streamlined process.</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <IdCard className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Process</h3>
            <p className="text-gray-600">Your personal information is protected with bank-level encryption.</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <IdCard className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Receive your Smart ID card within 5-7 business days.</p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-lg mb-6 opacity-90">
              Begin your Smart ID registration process now. Have your documents ready for upload.
            </p>
            <Button 
              onClick={() => setShowRegistration(true)}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              Start Registration
            </Button>
          </Card>
        </div>

        {/* Requirements */}
        <div className="mt-12">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">What You'll Need:</h3>
            <ul className="grid md:grid-cols-2 gap-2 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Valid government-issued photo ID
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Proof of address (utility bill or bank statement)
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Recent passport-style photograph
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Birth certificate or citizenship document
              </li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
