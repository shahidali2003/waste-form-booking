import React from "react";

export default function Form4({ formData, resetForm }) {
  const bookingRef = "BK-" + Math.floor(10000000 + Math.random() * 90000000);

  return (
    <div className="text-center">
      {/* Success Icon */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-4">
          <span className="text-3xl">✅</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Booking Confirmed!
        </h1>
        <p className="text-gray-500 mb-6">
          Your booking has been successfully submitted
        </p>
      </div>

      {/* Booking Reference */}
      <div className="bg-gray-50 border rounded-xl p-4 mb-6 text-left">
        <p className="text-sm text-gray-500 mb-1">Booking Reference</p>
        <p className="text-blue-600 font-semibold text-lg mb-4">
          {bookingRef}
        </p>

        <h3 className="font-semibold mb-3">Booking Summary</h3>

        <div className="grid grid-cols-1 gap-4 text-sm">
          <div className="flex gap-3 items-start">
            <span>📅</span>
            <div>
              <p className="font-medium">Date & Time</p>
              <p className="text-gray-600">
                {formData.collectionDate || "—"} at{" "}
                {formData.collectionTime?.toLowerCase() || "—"}
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span>📍</span>
            <div>
              <p className="font-medium">Location</p>
              <p className="text-gray-600">
                {formData.addressLine1} {formData.addressLine2},{" "}
                {formData.city}, {formData.county}, {formData.postcode}
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span>📞</span>
            <div>
              <p className="font-medium">Contact</p>
              <p className="text-gray-600">
                {formData.contactName} — {formData.phone}
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span>💬</span>
            <div>
              <p className="font-medium">Notifications</p>
              <p className="text-gray-600">
                {formData.methods.join(", ") || "—"}
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-5">
          A confirmation email and SMS has been sent to your contact details.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-3">
        <button
          onClick={resetForm}
          className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Book Another Service
        </button>
        <button
          onClick={() => window.print()}
          className="px-5 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200"
        >
          Print Confirmation
        </button>
      </div>
    </div>
  );
}
