import React, { useState } from "react";
import Form1 from "./Components/Form1";
import Form2 from "./Components/Form2";
import Form3 from "./Components/Form3";
import Form4 from "./Components/Form4"; // ✅ new confirmation page

export default function App() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1
    contactName: "",
    companyName: "",
    phone: "",
    email: "",

    // Step 2
    collectionDate: "",
    collectionTime: "",
    postcode: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    county: "",
    sameContact: false,

    // Step 3
    methods: [],
    jobDescription: "",
    specialInstructions: "",
    urgentJob: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMethod = (method) => {
    setFormData((prev) => ({
      ...prev,
      methods: prev.methods.includes(method)
        ? prev.methods.filter((m) => m !== method)
        : [...prev.methods, method],
    }));
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  // ✅ Reset for “Book Another Service”
  const resetForm = () => {
    setFormData({
      contactName: "",
      companyName: "",
      phone: "",
      email: "",
      collectionDate: "",
      collectionTime: "",
      postcode: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      county: "",
      sameContact: false,
      methods: [],
      jobDescription: "",
      specialInstructions: "",
      urgentJob: false,
    });
    setStep(1);
  };

  const progress = (step / 4) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 transition-all">
        {step <= 3 && (
          <>
            <h1 className="text-2xl font-bold text-center mb-1">
              Book Your Service
            </h1>
            <h4 className="text-center text-gray-500 mb-6 text-sm">
              Complete the form below to confirm your booking
            </h4>
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Step {step} of 3</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded">
                <div
                  className="h-1.5 bg-blue-500 rounded transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <Form1
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
          <Form2
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 3 && (
          <Form3
            formData={formData}
            handleChange={handleChange}
            toggleMethod={toggleMethod}
            prevStep={prevStep}
            nextStep={nextStep} // ✅ will go to Form4
          />
        )}
        {step === 4 && (
          <Form4 formData={formData} resetForm={resetForm} />
        )}
      </div>
    </div>
  );
}
