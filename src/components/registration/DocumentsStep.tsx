
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload, FileText, CheckCircle, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DocumentsData {
  photoId: File | null;
  proofOfAddress: File | null;
  photograph: File | null;
  birthCertificate: File | null;
}

interface DocumentsStepProps {
  data: DocumentsData;
  onUpdate: (data: Partial<DocumentsData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const DocumentsStep = ({ data, onUpdate, onNext, onPrev }: DocumentsStepProps) => {
  const [dragOver, setDragOver] = useState<string | null>(null);

  const documents = [
    {
      key: "photoId" as keyof DocumentsData,
      title: "Government-Issued Photo ID",
      description: "Upload a clear photo of your driver's license, passport, or national ID",
      required: true,
    },
    {
      key: "proofOfAddress" as keyof DocumentsData,
      title: "Proof of Address",
      description: "Recent utility bill, bank statement, or lease agreement (within 3 months)",
      required: true,
    },
    {
      key: "photograph" as keyof DocumentsData,
      title: "Passport-Style Photograph",
      description: "Recent color photograph with white background (JPEG or PNG format)",
      required: true,
    },
    {
      key: "birthCertificate" as keyof DocumentsData,
      title: "Birth Certificate",
      description: "Official birth certificate or citizenship document",
      required: false,
    },
  ];

  const handleFileUpload = (documentKey: keyof DocumentsData, file: File) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG, PNG, or PDF file",
        variant: "destructive",
      });
      return;
    }

    onUpdate({ [documentKey]: file });
    toast({
      title: "Document uploaded",
      description: `${file.name} has been uploaded successfully`,
    });
  };

  const handleDrop = (e: React.DragEvent, documentKey: keyof DocumentsData) => {
    e.preventDefault();
    setDragOver(null);
    
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      handleFileUpload(documentKey, files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, documentKey: keyof DocumentsData) => {
    const files = Array.from(e.target.files || []);
    if (files[0]) {
      handleFileUpload(documentKey, files[0]);
    }
  };

  const removeFile = (documentKey: keyof DocumentsData) => {
    onUpdate({ [documentKey]: null });
    toast({
      title: "Document removed",
      description: "Document has been removed successfully",
    });
  };

  const validateDocuments = () => {
    const requiredDocs = documents.filter(doc => doc.required);
    const missingDocs = requiredDocs.filter(doc => !data[doc.key]);
    
    if (missingDocs.length > 0) {
      toast({
        title: "Missing required documents",
        description: `Please upload: ${missingDocs.map(doc => doc.title).join(", ")}`,
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    if (validateDocuments()) {
      toast({
        title: "Documents uploaded successfully",
        description: "Proceeding to review",
      });
      onNext();
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Documents</h2>
        <p className="text-gray-600">
          Please upload clear, legible copies of the required documents. All files must be under 5MB.
        </p>
      </div>

      <div className="grid gap-6">
        {documents.map((document) => {
          const file = data[document.key];
          
          return (
            <Card key={document.key} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    {document.title}
                    {document.required && <span className="text-red-500 ml-1">*</span>}
                  </h3>
                  <p className="text-gray-600">{document.description}</p>
                </div>
                {file && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(document.key)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {file ? (
                <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium text-green-900">{file.name}</p>
                    <p className="text-sm text-green-700">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragOver === document.key
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDrop={(e) => handleDrop(e, document.key)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(document.key);
                  }}
                  onDragLeave={() => setDragOver(null)}
                >
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop your file here, or{" "}
                    <label className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                      browse
                      <input
                        type="file"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileSelect(e, document.key)}
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports: JPEG, PNG, PDF (max 5MB)
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onPrev} size="lg" className="px-8">
          Previous
        </Button>
        <Button onClick={handleNext} size="lg" className="px-8">
          Continue to Review
        </Button>
      </div>
    </div>
  );
};

export default DocumentsStep;
