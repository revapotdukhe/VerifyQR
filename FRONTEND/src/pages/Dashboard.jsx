import { useEffect, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

export default function Dashboard() {

  const [certificates, setCertificates] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  // FETCH CERTIFICATES

  const fetchCertificates = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
  "http://localhost:5000/api/certificate"
);

      console.log(response.data);

      setCertificates(response.data);

      setLoading(false);

    } catch (error) {

      setLoading(false);

      toast.error("Failed to fetch certificates");

      console.log(error);

    }
  };

  // DELETE CERTIFICATE

  const deleteCertificate = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/certificate/${id}`
      );

      toast.success("Certificate deleted");

      fetchCertificates();

    } catch (error) {

      toast.error("Delete failed");

      console.log(error);

    }
  };
 const sendEmail = async (certificateId) => {

  const email = window.prompt("Enter recipient email:");

  if (!email) return;

  try {

    const response = await axios.post(
      "http://localhost:5000/api/certificate/send-email",
      {
        email,
        certificateId,
      }
    );

    toast.success(response.data.message);

  } catch (error) {

    toast.error("Failed to send email");

    console.log(error);

  }

};
  useEffect(() => {

    fetchCertificates();

  }, []);

  // SEARCH FILTER

  const filteredCertificates =
    certificates.filter((certificate) =>

      certificate.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  // STATS

  const totalCertificates =
    certificates.length;

  const todayCertificates =
    certificates.filter((certificate) => {

      return (
        new Date(
          certificate.createdAt
        ).toDateString() ===
        new Date().toDateString()
      );

    }).length;

  // LOADING UI

  if (loading) {

    return (

      <div className="min-h-screen flex justify-center items-center">

        <h1 className="text-3xl font-bold text-blue-600">
          Loading...
        </h1>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* TITLE */}

      <h1 className="text-5xl font-bold text-blue-600 mb-8">

        Admin Dashboard

      </h1>

      {/* STATS CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        {/* TOTAL */}

        <div className="bg-white shadow-lg rounded-2xl p-6">

          <h2 className="text-gray-500 text-lg">
            Total Certificates
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-2">

            {totalCertificates}

          </p>

        </div>

        {/* TODAY */}

        <div className="bg-white shadow-lg rounded-2xl p-6">

          <h2 className="text-gray-500 text-lg">
            Today's Certificates
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-2">

            {todayCertificates}

          </p>

        </div>

      </div>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search by student name..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full md:w-96 p-4 border rounded-xl mb-8 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* TABLE */}

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">

        <table className="w-full">

          {/* HEADER */}

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-5">
                Student
              </th>

              <th className="p-5">
                Course
              </th>

              <th className="p-5">
                Certificate ID
              </th>

              <th className="p-5">
                Actions
              </th>

            </tr>

          </thead>

          {/* BODY */}

          <tbody>

            {filteredCertificates.length > 0 ? (

              filteredCertificates.map((certificate) => (

                <tr
                  key={certificate._id}
                  className="border-b hover:bg-gray-100 transition"
                >

                  {/* NAME */}

                  <td className="p-5 text-center">

                    <Link
                      to={`/verify/${certificate.certificateId}`}
                      className="text-blue-600 font-semibold hover:underline"
                    >

                      {certificate.name}

                    </Link>

                  </td>

                  {/* COURSE */}

                  <td className="p-5 text-center">

                    {certificate.course}

                  </td>

                  {/* CERTIFICATE ID */}

                  <td className="p-5 text-center">

                    {certificate.certificateId}

                  </td>

                  {/* ACTIONS */}

                  <td className="p-5 flex justify-center gap-3">

                    {/* EDIT */}

                    <Link
                      to={`/edit/${certificate._id}`}
                    >

                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >

                        Edit

                      </button>

                    </Link>

                    {/* DELETE */}

                    <button
                      onClick={() =>
                        deleteCertificate(
                          certificate._id
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >

                      Delete

                    </button>
                    <button
                    onClick={() => sendEmail(certificate.certificateId)}
                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                      >
                     Email
                      </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="4"
                  className="text-center p-8 text-gray-500"
                >

                  No certificates found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}