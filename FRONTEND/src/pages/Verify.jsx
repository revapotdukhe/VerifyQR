import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Verify() {
  const [certificateId, setCertificateId] = useState("");

  const navigate = useNavigate();

  // Verify using Certificate ID
  const handleVerify = (e) => {
    e.preventDefault();

    if (!certificateId.trim()) return;

    navigate(`/verify/${certificateId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-xl">

        {/* Title */}
        <h1 className="text-5xl font-bold text-center text-indigo-700 mb-4">
          Verify Certificate
        </h1>

        <p className="text-center text-gray-500 mb-8 text-lg">
          Enter Certificate ID or Scan QR Code
        </p>

        {/* Verify by Certificate ID */}
        <form onSubmit={handleVerify} className="space-y-5">

          <input
            type="text"
            placeholder="Enter Certificate ID"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            className="w-full border-2 border-indigo-300 rounded-xl p-4 text-lg outline-none focus:border-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl text-lg font-bold transition"
          >
            Verify Certificate
          </button>

        </form>

        {/* Scan QR */}
        <button
          onClick={() => navigate("/scan")}
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-bold transition"
        >
          📷 Scan QR Code
        </button>

      </div>
    </div>
  );
}