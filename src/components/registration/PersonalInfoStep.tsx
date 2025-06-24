
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface PersonalInfoData {
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
}

interface PersonalInfoStepProps {
  data: PersonalInfoData;
  onUpdate: (data: Partial<PersonalInfoData>) => void;
  onNext: () => void;
}

const PersonalInfoStep = ({ data, onUpdate, onNext }: PersonalInfoStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof PersonalInfoData, value: string) => {
    onUpdate({ [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.firstName.trim()) newErrors.firstName = "First name is required";
    if (!data.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!data.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!data.nationality) newErrors.nationality = "Nationality is required";
    if (!data.idNumber.trim()) newErrors.idNumber = "ID number is required";
    if (!data.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "Email is invalid";
    if (!data.phone.trim()) newErrors.phone = "Phone number is required";
    if (!data.address.trim()) newErrors.address = "Address is required";
    if (!data.city.trim()) newErrors.city = "City is required";
    if (!data.postalCode.trim()) newErrors.postalCode = "Postal code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      toast({
        title: "Personal information saved",
        description: "Proceeding to document upload",
      });
      onNext();
    } else {
      toast({
        title: "Please correct the errors",
        description: "Some required fields are missing or invalid",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Please provide your personal details as they appear on your official documents.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className={errors.firstName ? "border-red-500" : ""}
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className={errors.lastName ? "border-red-500" : ""}
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>

        <div>
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            className={errors.dateOfBirth ? "border-red-500" : ""}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
        </div>

        <div>
          <Label htmlFor="nationality">Nationality *</Label>
          <Select value={data.nationality} onValueChange={(value) => handleInputChange("nationality", value)}>
            <SelectTrigger className={errors.nationality ? "border-red-500" : ""}>
              <SelectValue placeholder="Select your nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="south-african">South African</SelectItem>
              <SelectItem value="american">American</SelectItem>
              <SelectItem value="british">British</SelectItem>
              <SelectItem value="canadian">Canadian</SelectItem>
              <SelectItem value="australian">Australian</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>}
        </div>

        <div>
          <Label htmlFor="idNumber">ID/Passport Number *</Label>
          <Input
            id="idNumber"
            value={data.idNumber}
            onChange={(e) => handleInputChange("idNumber", e.target.value)}
            className={errors.idNumber ? "border-red-500" : ""}
            placeholder="Enter your ID or passport number"
          />
          {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={errors.email ? "border-red-500" : ""}
            placeholder="Enter your email address"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={errors.phone ? "border-red-500" : ""}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="address">Street Address *</Label>
          <Input
            id="address"
            value={data.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className={errors.address ? "border-red-500" : ""}
            placeholder="Enter your street address"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={data.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className={errors.city ? "border-red-500" : ""}
            placeholder="Enter your city"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>

        <div>
          <Label htmlFor="postalCode">Postal Code *</Label>
          <Input
            id="postalCode"
            value={data.postalCode}
            onChange={(e) => handleInputChange("postalCode", e.target.value)}
            className={errors.postalCode ? "border-red-500" : ""}
            placeholder="Enter your postal code"
          />
          {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={handleNext} size="lg" className="px-8">
          Continue to Documents
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
