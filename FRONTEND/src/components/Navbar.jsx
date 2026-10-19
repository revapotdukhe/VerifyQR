import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <div className="bg-white shadow-md">

      <div className="px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-blue-600">
          VerifyQR
        </h1>

        {/* Desktop Menu */}

        <div className="hidden md:flex gap-6 items-center">

          <NavLink
            to="/verify"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : "text-gray-700"
            }
          >
            Verify
          </NavLink>

          {!token ? (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-gray-700"
              }
            >
              Login
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : "text-gray-700"
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/generate"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : "text-gray-700"
                }
              >
                Generate
              </NavLink>

              <button
                onClick={handleLogout}
                className="text-red-600 font-semibold"
              >
                Logout
              </button>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="md:hidden flex flex-col px-6 pb-4 gap-4 bg-white">

          <NavLink
            to="/verify"
            onClick={() => setMenuOpen(false)}
          >
            Verify
          </NavLink>

          {!token ? (
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/generate"
                onClick={() => setMenuOpen(false)}
              >
                Generate
              </NavLink>

              <button
                onClick={handleLogout}
                className="text-left text-red-600 font-semibold"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}

    </div>
  );
}