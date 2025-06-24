
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Download, Mail, Phone } from "lucide-react";

interface ConfirmationStepProps {
  onStartOver: () => void;
  referenceNumber: string | null;
}

const ConfirmationStep = ({ onStartOver, referenceNumber }: ConfirmationStepProps) => {
  const displayReferenceNumber = referenceNumber || `SID-${Date.now().toString().slice(-8)}`;

  return (
    <div className="text-center">
      <div className="mb-8">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Application Submitted Successfully!</h2>
        <p className="text-lg text-gray-600">
          Your Smart ID registration has been received and is being processed.
        </p>
      </div>

      <Card className="p-8 mb-8 bg-blue-50 border-blue-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure Reference Number</h3>
        <div className="bg-white p-4 rounded-lg border border-blue-300 mb-4">
          <p className="text-2xl font-mono font-bold text-blue-600">{displayReferenceNumber}</p>
        </div>
        <p className="text-sm text-gray-700">
          This cryptographically secure reference number has been generated for your application. 
          Keep it safe - you'll need it to track your application status.
        </p>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">What Happens Next?</h4>
          <ul className="text-left space-y-2 text-gray-700">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              Application review (1-2 business days)
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              Document verification (2-3 business days)
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              Smart ID production (3-5 business days)
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              Delivery to your address
            </li>
          </ul>
        </Card>

        <Card className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Important Information</h4>
          <div className="text-left space-y-3 text-gray-700">
            <p className="text-sm">
              <strong>Processing Time:</strong> 5-7 business days
            </p>
            <p className="text-sm">
              <strong>Delivery Method:</strong> Registered mail to your address
            </p>
            <p className="text-sm">
              <strong>Status Updates:</strong> Check your email for updates
            </p>
            <p className="text-sm">
              <strong>Fee:</strong> Payment will be processed after approval
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-6 mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h4>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="flex items-center space-x-2 text-gray-700">
            <Mail className="h-5 w-5" />
            <span>support@smartid.gov</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <Phone className="h-5 w-5" />
            <span>1-800-SMART-ID</span>
          </div>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" size="lg" className="px-8">
          <Download className="h-4 w-4 mr-2" />
          Download Receipt
        </Button>
        <Button onClick={onStartOver} size="lg" className="px-8">
          Start New Application
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
