import React, { useState } from "react";
import { Calendar, Clock, MapPin, Home, Map, User, Phone } from "lucide-react";

export default function Form2({ formData, handleChange, nextStep, prevStep }) {
  const [errors, setErrors] = useState({
    collectionDate: "",
    collectionTime: "",
    postcode: "",
    addressLine1: "",
    city: "",
  });

  const [sameContact, setSameContact] = useState(true);

  const isValidPostcode = (postcode) =>
    /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i.test(postcode || "");

  const validateAll = () => {
    const newErrors = {
      collectionDate: "",
      collectionTime: "",
      postcode: "",
      addressLine1: "",
      city: "",
    };

    if (!formData.collectionDate)
      newErrors.collectionDate = "Collection date is required";
    if (!formData.collectionTime)
      newErrors.collectionTime = "Collection time period is required";
    if (!formData.postcode || !isValidPostcode(formData.postcode.trim()))
      newErrors.postcode = "Please enter a valid UK postcode";
    if (!formData.addressLine1)
      newErrors.addressLine1 = "Address line 1 is required";
    if (!formData.city) newErrors.city = "Town is required";

    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === "");
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
    <div className="w-full max-w-3xl mx-auto transition-all duration-300">
      <h2 className="text-lg font-semibold mb-2">Collection Details</h2>
      <p className="text-gray-600 mb-6 text-sm">
        When and where should we collect from?
      </p>

      {/* Collection Date & Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        {/* Date Field */}
        <div>
          <label
            className={`text-sm font-medium flex items-center gap-1 ${
              errors.collectionDate ? "text-red-600" : "text-gray-800"
            }`}
          >
            <Calendar size={16} /> Collection Date *
          </label>
          <input
            type="date"
            name="collectionDate"
            value={formData.collectionDate || ""}
            onChange={handleFieldChange}
            className={`w-full mt-1 p-[13px] border rounded-md outline-none placeholder-gray-400 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-all duration-300
              [::-webkit-calendar-picker-indicator]:cursor-pointer
              [::-webkit-calendar-picker-indicator]:p-[4px]
              [::-webkit-calendar-picker-indicator]:rounded-md
              [::-webkit-calendar-picker-indicator]:hover:bg-green-200
              [::-webkit-inner-spin-button]:hidden
              [::-webkit-clear-button]:hidden
              ${errors.collectionDate ? "border-red-500" : "border-gray-300"}
            `}
            style={{
              paddingTop: "10px",
              borderRadius: "8px",
            }}
          />
          {errors.collectionDate && (
            <p className="text-sm text-red-600 mt-1">{errors.collectionDate}</p>
          )}
        </div>

        {/* Time Select */}
        <div>
          <label
            className={`text-sm font-medium flex items-center gap-1 ${
              errors.collectionTime ? "text-red-600" : "text-gray-800"
            }`}
          >
            <Clock size={16} /> Collection Time *
          </label>
          <div className="relative">
            <select
              name="collectionTime"
              value={formData.collectionTime || ""}
              onChange={handleFieldChange}
              className={`w-full mt-1 p-[13px] border rounded-md outline-none bg-white text-gray-700
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-all duration-300 appearance-none
                ${errors.collectionTime ? "border-red-500" : "border-gray-300"}
              `}
              style={{
                borderRadius: "8px",
                paddingTop: "10px",
              }}
            >
              <option value="">Select time period</option>
              <option value="Morning (8am - 12pm)">Morning (8am - 12pm)</option>
              <option value="Afternoon (12pm - 4pm)">Afternoon (12pm - 4pm)</option>
              <option value="Evening (4pm - 8pm)">Evening (4pm - 8pm)</option>
            </select>

            {/* Dropdown Arrow Custom */}
           
          </div>
          {errors.collectionTime && (
            <p className="text-sm text-red-600 mt-1">{errors.collectionTime}</p>
          )}
        </div>
      </div>

      {/* Postcode */}
      <div className="mb-4">
        <label
          className={`text-sm font-medium flex items-center gap-1 ${
            errors.postcode ? "text-red-600" : "text-gray-800"
          }`}
        >
          <MapPin size={16} /> Postcode *
        </label>
        <input
          type="text"
          name="postcode"
          placeholder="SW1A 1AA"
          value={formData.postcode || ""}
          onChange={handleFieldChange}
          className={`w-full mt-1 p-[13px] border rounded-md outline-none placeholder-gray-400 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            transition-all duration-300
            ${errors.postcode ? "border-red-500" : "border-gray-300"}
          `}
        />
        {errors.postcode && (
          <p className="text-sm text-red-600 mt-1">{errors.postcode}</p>
        )}
      </div>

      {/* Address Line 1 */}
      <div className="mb-4">
        <label
          className={`text-sm font-medium flex items-center gap-1 ${
            errors.addressLine1 ? "text-red-600" : "text-gray-800"
          }`}
        >
          <Home size={16} /> Address Line 1 *
        </label>
        <input
          type="text"
          name="addressLine1"
          placeholder="Street address"
          value={formData.addressLine1 || ""}
          onChange={handleFieldChange}
          className={`w-full mt-1 p-[13px] border rounded-md outline-none placeholder-gray-400 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            transition-all duration-300
            ${errors.addressLine1 ? "border-red-500" : "border-gray-300"}
          `}
        />
        {errors.addressLine1 && (
          <p className="text-sm text-red-600 mt-1">{errors.addressLine1}</p>
        )}
      </div>

      {/* City */}
      <div className="mb-6">
        <label
          className={`text-sm font-medium flex items-center gap-1 ${
            errors.city ? "text-red-600" : "text-gray-800"
          }`}
        >
          <Map size={16} /> Town/City *
        </label>
        <input
          type="text"
          name="city"
          placeholder="London"
          value={formData.city || ""}
          onChange={handleFieldChange}
          className={`w-full mt-1 p-[13px] border rounded-md outline-none placeholder-gray-400 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            transition-all duration-300
            ${errors.city ? "border-red-500" : "border-gray-300"}
          `}
        />
        {errors.city && (
          <p className="text-sm text-red-600 mt-1">{errors.city}</p>
        )}
      </div>

      {/* Same Contact Toggle */}
      <div className="flex items-center justify-between bg-gray-50 border border-gray-200 p-3 rounded-lg mb-4 shadow-sm">
        <div>
          <h4 className="font-medium text-sm">Same contact as billing details</h4>
          <p className="text-gray-600 text-xs">
            Use the same contact information from step 1
          </p>
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={sameContact}
            onChange={() => setSameContact((prev) => !prev)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 relative transition-all">
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
          </div>
        </label>
      </div>

      {/* Conditional Contact Fields */}
      {!sameContact && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm font-medium flex items-center gap-1 text-gray-800">
              <User size={16} /> Collection Contact Name *
            </label>
            <input
              type="text"
              name="collectionContactName"
              placeholder="Jane Doe"
              value={formData.collectionContactName || ""}
              onChange={handleFieldChange}
              className="w-full mt-1 p-[13px] border border-gray-300 rounded-md outline-none placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </div>

          <div>
            <label className="text-sm font-medium flex items-center gap-1 text-gray-800">
              <Phone size={16} /> Collection Phone Number *
            </label>
            <input
              type="text"
              name="collectionPhone"
              placeholder="07700 900123"
              value={formData.collectionPhone || ""}
              onChange={handleFieldChange}
              className="w-full mt-1 p-[13px] border border-gray-300 rounded-md outline-none placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="px-6 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 hover:bg-green-300 hover:text-white transition-all duration-300"
        >
          ← Back
        </button>
        <button
          onClick={handleContinue}
          className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
