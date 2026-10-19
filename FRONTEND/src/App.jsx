import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import GenerateCertificate from "./pages/GenerateCertificate";
import VerifyCertificate from "./pages/VerifyCertificate";
import ScanQR from "./pages/ScanQR";
import EditCertificate from "./pages/EditCertificate";
import Verify from "./pages/Verify";


// ================= HOME PAGE =================

function Home() {
  return (
    <div>

      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-16 bg-slate-100">

        <h1 className="text-5xl md:text-6xl font-bold text-indigo-600 mb-4">
          QR Based Certificate Verification System
        </h1>

        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mb-8">
          Generate, manage and verify certificates securely using QR codes with MERN Stack.
        </p>

        <div className="flex flex-col md:flex-row gap-5">

          <Link
            to="/dashboard"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition"
          >
            Open Dashboard
          </Link>

          <Link
            to="/generate"
            className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition"
          >
            Generate Certificate
          </Link>

          <Link
            to="/scan"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition"
          >
            Scan QR
          </Link>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 bg-slate-100">

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            QR Generation
          </h2>

          <p className="text-gray-600">
            Generate unique QR codes for each certificate securely.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Verification
          </h2>

          <p className="text-gray-600">
            Verify certificate authenticity instantly through QR scanning.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Dashboard
          </h2>

          <p className="text-gray-600">
            Manage all certificates easily with search and filtering options.
          </p>
        </div>

      </section>

    </div>
  );
}


// ================= LAYOUT =================

function AppLayout() {
  const location = useLocation();

  const hideLayout = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-slate-100">

      {!hideLayout && <Navbar />}

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/generate"
          element={
            <ProtectedRoute>
              <GenerateCertificate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditCertificate />
            </ProtectedRoute>
          }
        />

        <Route path="/verify/:id" element={<VerifyCertificate />} />

        <Route path="/verify" element={<Verify />} />

        <Route path="/scan" element={<ScanQR />} />

      </Routes>

      {!hideLayout && (
        <footer className="bg-gray-900 text-white py-6">

          <div className="max-w-7xl mx-auto px-6 text-center">

            <h2 className="text-2xl font-bold">
              VerifyQR
            </h2>

            <p className="text-gray-400 mt-3">
              QR Based Certificate Verification System
            </p>

            <p className="text-gray-500 mt-4 text-sm">
              © 2026 All Rights Reserved
            </p>

          </div>

        </footer>
      )}

    </div>
  );
}


// ================= APP =================

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}