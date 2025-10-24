import React, { useState } from "react";
import { MessageSquare, Mail, Phone, FileText, Info } from "lucide-react";

export default function Form3({
  formData,
  handleChange,
  toggleMethod,
  prevStep,
  nextStep,
}) {
  const [errors, setErrors] = useState({
    methods: "",
    jobDescription: "",
  });

  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let newErrors = { methods: "", jobDescription: "" };
    if (!formData.methods || formData.methods.length === 0) {
      newErrors.methods = "Select at least one notification method";
    }
    if (
      !formData.jobDescription ||
      formData.jobDescription.trim().length < 10
    ) {
      newErrors.jobDescription =
        "Job description must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === "");
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const bookingRef = "BK-" + Math.floor(10000000 + Math.random() * 90000000);

    const sheetData = {
      bookingReference: bookingRef,
      date: formData.collectionDate || "N/A",
      timeSlot: formData.collectionTime || "N/A",
      location: `${formData.addressLine1 || ""} ${formData.addressLine2 || ""}`,
      city: formData.city || "",
      postalCode: formData.postcode || "",
      name: formData.contactName || "",
      contactNumber: formData.phone || "",
      notificationType: formData.methods.join(", ") || "",
    };

    try {
      // ✅ Encode the data to avoid CORS issues
      const params = new URLSearchParams();
      for (const key in sheetData) {
        params.append(key, sheetData[key]);
      }

      const response = await fetch(
        // ⚠️ Paste your NEW Apps Script URL here
        "https://script.google.com/macros/s/AKfycbwf678WxxwIjAMPai0CocGsxSYNmq2MwVRHP-AOOE-JZHrHmKh1JFI_tZZeOWNMV6OyEg/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: params.toString(),
        }
      );

      const text = await response.text();
      console.log("Raw Response:", text);

      // ✅ Check if success
      if (text.includes("Success")) {
        console.log("✅ Data saved successfully to Google Sheet!");
        nextStep(); // ✅ Move to Form4
      } else {
        console.error("❌ Error in response:", text);
        alert("Data not saved correctly. Please try again.");
      }
    } catch (error) {
      console.error("🔥 Network or CORS Error:", error);
      alert("Something went wrong while saving data!");
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (method) => {
    switch (method) {
      case "WhatsApp":
        return <MessageSquare size={18} />;
      case "Email":
        return <Mail size={18} />;
      case "SMS":
        return <Phone size={18} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto transition-all duration-300">
      <h2 className="text-lg font-semibold mb-2">
        Notification Preferences & Details
      </h2>
      <p className="text-gray-600 mb-6 text-sm">
        How would you like to receive updates about your booking?
      </p>

      {/* Notification Methods */}
      <div className="mb-6">
        <label
          className={`text-sm font-medium mb-2 block ${
            errors.methods ? "text-red-600" : ""
          }`}
        >
          Notification Methods *
        </label>
        <p className="text-gray-500 text-xs mb-4">
          Choose how you'd like to receive booking updates
        </p>

        <div className="grid grid-cols-3 gap-3">
          {["WhatsApp", "Email", "SMS"].map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => toggleMethod(method)}
              className={`flex flex-col items-center justify-center border rounded-lg py-3 text-sm font-medium transition-all duration-300
                ${
                  formData.methods.includes(method)
                    ? "bg-green-50 border-green-500 text-green-600"
                    : "border-gray-300 text-gray-700 hover:bg-green-300 hover:text-white"
                }`}
            >
              {getIcon(method)}
              <span className="mt-1">{method}</span>
            </button>
          ))}
        </div>

        {errors.methods && (
          <p className="text-red-600 text-sm mt-2">{errors.methods}</p>
        )}
      </div>

      {/* Job Description */}
      <div className="mb-5">
        <label
          className={`text-sm font-medium mb-1 flex items-center gap-1 ${
            errors.jobDescription ? "text-red-600" : "text-gray-800"
          }`}
        >
          <FileText size={15} /> Job Description *
        </label>
        <textarea
          name="jobDescription"
          placeholder="Describe the job or service you need..."
          value={formData.jobDescription}
          onChange={handleChange}
          rows="3"
          className={`w-full border rounded-lg p-3 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400 ${
            errors.jobDescription ? "border-red-500" : "border-gray-300"
          }`}
        ></textarea>
        {errors.jobDescription && (
          <p className="text-red-600 text-sm mt-1">
            {errors.jobDescription}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200"
        >
          ← Back
        </button>
        <button
          onClick={handleContinue}
          disabled={loading}
          className={`px-6 py-3 rounded-lg text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
