
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import PersonalInfoStep from "./registration/PersonalInfoStep";
import DocumentsStep from "./registration/DocumentsStep";
import ReviewStep from "./registration/ReviewStep";
import ConfirmationStep from "./registration/ConfirmationStep";

interface RegistrationFormProps {
  onBack: () => void;
}

export interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    idNumber: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  documents: {
    photoId: File | null;
    proofOfAddress: File | null;
    photograph: File | null;
    birthCertificate: File | null;
  };
}

const RegistrationForm = ({ onBack }: RegistrationFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      nationality: "",
      idNumber: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    },
    documents: {
      photoId: null,
      proofOfAddress: null,
      photograph: null,
      birthCertificate: null,
    },
  });

  const steps = [
    { number: 1, title: "Personal Information" },
    { number: 2, title: "Documents" },
    { number: 3, title: "Review" },
    { number: 4, title: "Confirmation" },
  ];

  const progress = (currentStep / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={formData.personalInfo}
            onUpdate={(data) => updateFormData("personalInfo", data)}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <DocumentsStep
            data={formData.documents}
            onUpdate={(data) => updateFormData("documents", data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <ReviewStep
            data={formData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return <ConfirmationStep onStartOver={() => setCurrentStep(1)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={currentStep === 1 ? onBack : prevStep}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{currentStep === 1 ? "Back to Home" : "Previous"}</span>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Smart ID Registration</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of {steps.length}
              </span>
              <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex justify-between">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex flex-col items-center ${
                  step.number <= currentStep ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step.number < currentStep
                      ? "bg-blue-600 text-white"
                      : step.number === currentStep
                      ? "bg-blue-100 text-blue-600 border-2 border-blue-600"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step.number}
                </div>
                <span className="text-xs mt-1 font-medium">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-8">
          {renderStep()}
        </Card>
      </main>
    </div>
  );
};

export default RegistrationForm;
