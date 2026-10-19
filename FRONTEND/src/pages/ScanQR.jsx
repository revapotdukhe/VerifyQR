import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

export default function ScanQR() {
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
        rememberLastUsedCamera: true,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        scanner.clear().catch(() => {});

        // QR contains complete URL
        if (decodedText.startsWith("http")) {
          window.location.href = decodedText;
        } else {
          // QR contains only Certificate ID
          navigate(`/verify/${decodedText}`);
        }
      },
      (error) => {
        // Ignore scanning errors while searching for QR
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-2xl">

        <h1 className="text-5xl font-bold text-center text-indigo-700 mb-4">
          Scan QR Code
        </h1>

        <p className="text-center text-gray-500 mb-8 text-lg">
          Scan the certificate QR code using your camera
        </p>

        <div
          id="reader"
          className="w-full border-2 border-indigo-300 rounded-2xl p-4"
        ></div>

      </div>
    </div>
  );
}