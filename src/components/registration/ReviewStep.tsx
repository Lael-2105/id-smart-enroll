import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, FileText, Loader2 } from "lucide-react";
import { FormData } from "../RegistrationForm";

interface ReviewStepProps {
  data: FormData;
  onNext: () => void;
  onPrev: () => void;
  isSubmitting?: boolean;
}

const ReviewStep = ({ data, onNext, onPrev, isSubmitting = false }: ReviewStepProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getUploadedDocuments = () => {
    const docs = [];
    if (data.documents.photoId) docs.push({ name: "Government-Issued Photo ID", file: data.documents.photoId });
    if (data.documents.proofOfAddress) docs.push({ name: "Proof of Address", file: data.documents.proofOfAddress });
    if (data.documents.photograph) docs.push({ name: "Passport-Style Photograph", file: data.documents.photograph });
    if (data.documents.birthCertificate) docs.push({ name: "Birth Certificate", file: data.documents.birthCertificate });
    return docs;
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Application</h2>
        <p className="text-gray-600">
          Please review all information carefully before submitting your Smart ID application.
        </p>
      </div>

      <div className="space-y-6">
        {/* Personal Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="font-medium">{data.personalInfo.firstName} {data.personalInfo.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date of Birth</p>
              <p className="font-medium">{formatDate(data.personalInfo.dateOfBirth)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Nationality</p>
              <p className="font-medium capitalize">{data.personalInfo.nationality.replace('-', ' ')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">ID/Passport Number</p>
              <p className="font-medium">{data.personalInfo.idNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{data.personalInfo.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium">{data.personalInfo.phone}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-medium">
                {data.personalInfo.address}, {data.personalInfo.city} {data.personalInfo.postalCode}
              </p>
            </div>
          </div>
        </Card>

        {/* Documents */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h3>
          <div className="space-y-3">
            {getUploadedDocuments().map((doc, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium text-green-900">{doc.name}</p>
                  <p className="text-sm text-green-700">{doc.file.name}</p>
                </div>
                <FileText className="h-5 w-5 text-green-600" />
              </div>
            ))}
          </div>
        </Card>

        {/* Terms and Conditions */}
        <Card className="p-6 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms and Conditions</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              By submitting this application, you confirm that:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>All information provided is accurate and complete</li>
              <li>All uploaded documents are authentic and unaltered</li>
              <li>You understand that providing false information is a criminal offense</li>
              <li>You consent to the processing of your personal data for Smart ID purposes</li>
              <li>You agree to pay the applicable fees for Smart ID processing</li>
            </ul>
          </div>
        </Card>
      </div>

      <Separator className="my-8" />

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} size="lg" className="px-8" disabled={isSubmitting}>
          Previous
        </Button>
        <Button 
          onClick={onNext} 
          size="lg" 
          className="px-8 bg-green-600 hover:bg-green-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting Securely...
            </>
          ) : (
            'Submit Application'
          )}
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;
