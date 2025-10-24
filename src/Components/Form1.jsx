import React, { useState } from "react";
import { User, Building2, Phone, Mail } from "lucide-react"; // used same icons for both normal & error states

export default function Form1({ formData, handleChange, nextStep }) {
  const [errors, setErrors] = useState({
    contactName: "",
    phone: "",
    email: "",
  });

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");

  const isValidUKPhone = (phone) => {
    if (!phone) return false;
    const digits = (phone + "").replace(/\D/g, "");
    if (digits.startsWith("0") && digits.length === 11) return true;
    if (digits.startsWith("44") && digits.length === 12) return true;
    return false;
  };

  const validateAll = () => {
    const newErrors = { contactName: "", phone: "", email: "" };

    if (!formData.contactName || formData.contactName.trim().length < 2) {
      newErrors.contactName = "Contact name must be at least 2 characters";
    }

    if (!formData.phone || !isValidUKPhone(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid UK phone number";
    }

    if (!formData.email || !isValidEmail(formData.email.trim())) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return !newErrors.contactName && !newErrors.phone && !newErrors.email;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (validateAll()) nextStep();
  };

  const handleFieldChange = (e) => {
    handleChange(e);
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Customer Information</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Let’s start with your contact details
      </p>

      <div className="space-y-4">
        {/* Contact Name */}
        <div>
          <label
            className={`text-sm font-medium flex items-center gap-1 ${
              errors.contactName ? "text-red-600" : "text-gray-800"
            }`}
          >
            <User
              size={16}
              className={errors.contactName ? "text-red-600" : "text-gray-600"}
            />
            Contact Name *
          </label>
          <input
            type="text"
            name="contactName"
            placeholder="John Smith"
            value={formData.contactName}
            onChange={handleFieldChange}
            aria-invalid={!!errors.contactName}
            className={`w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-400 ${
              errors.contactName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.contactName && (
            <p className="text-sm text-red-600 mt-1">{errors.contactName}</p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label className="text-sm font-medium flex items-center gap-1 text-gray-800">
            <Building2 size={16} className="text-gray-600" />
            Company Name (Optional)
          </label>
          <input
            type="text"
            name="companyName"
            placeholder="ABC Company Ltd"
            value={formData.companyName}
            onChange={handleFieldChange}
            className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-400"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label
            className={`text-sm font-medium flex items-center gap-1 ${
              errors.phone ? "text-red-600" : "text-gray-800"
            }`}
          >
            <Phone
              size={16}
              className={errors.phone ? "text-red-600" : "text-gray-600"}
            />
            Phone Number *
          </label>
          <input
            type="text"
            name="phone"
            placeholder="07700 900123"
            value={formData.phone}
            onChange={handleFieldChange}
            aria-invalid={!!errors.phone}
            className={`w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-400 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label
            className={`text-sm font-medium flex items-center gap-1 ${
              errors.email ? "text-red-600" : "text-gray-800"
            }`}
          >
            <Mail
              size={16}
              className={errors.email ? "text-red-600" : "text-gray-600"}
            />
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleFieldChange}
            aria-invalid={!!errors.email}
            className={`w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-400 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg mt-4 transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

