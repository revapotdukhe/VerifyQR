import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function VerifyCertificate() {

  const { id } = useParams();

  const [certificate, setCertificate] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchCertificate();

  }, []);

  const fetchCertificate = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/certificate/verify/${id}`
      );

      setCertificate(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // DOWNLOAD PNG

  const downloadImage = async () => {

    const canvas = await html2canvas(
      document.getElementById("certificate")
    );

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.href = image;

    link.download = "certificate.png";

    link.click();

  };

  // DOWNLOAD PDF

  const downloadPDF = async () => {

    const canvas = await html2canvas(
      document.getElementById("certificate")
    );

    const image = canvas.toDataURL("image/png");

    const pdf = new jsPDF(
      "landscape",
      "px",
      "a4"
    );

    pdf.addImage(
      image,
      "PNG",
      20,
      20,
      800,
      550
    );

    pdf.save("certificate.pdf");

  };

  // LOADING

  if (loading) {

    return (

      <div className="h-screen flex justify-center items-center text-3xl font-bold">

        Loading...

      </div>

    );

  }

  // NOT FOUND

  if (!certificate) {

    return (

      <div className="h-screen flex justify-center items-center text-3xl font-bold text-red-500">

        Certificate Not Found

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#dff5e8] flex flex-col justify-center items-center p-4 overflow-hidden">

      {/* CERTIFICATE */}

      <div
        id="certificate"
        className="w-full max-w-[900px] min-h-[620px] bg-[#fffdf7] border-4 md:border-[8px] border-yellow-700 relative shadow-2xl px-4 md:px-10 py-6 flex flex-col justify-between overflow-hidden"
      >

        {/* CORNERS */}

        <div className="absolute top-2 left-4 text-yellow-700 text-4xl">

          ❦

        </div>

        <div className="absolute top-2 right-4 text-yellow-700 text-4xl">

          ❦

        </div>

        {/* TOP */}

        <div>

          {/* VERIFIED */}

          <div className="flex justify-center">

            <div className="bg-green-100 px-5 py-2 rounded-full flex items-center gap-3 shadow">

              <span className="text-2xl">

                ✅

              </span>

              <h1 className="text-2xl font-bold text-green-700">

                Certificate Verified

              </h1>

            </div>

          </div>

          {/* LOGO */}

          <div className="flex justify-center mt-3">

            <img
              src={logo}
              alt="logo"
              className="w-16 h-16 object-contain"
            />

          </div>

          {/* COLLEGE */}

          <div className="text-center mt-2">
            <h1 className="text-2xl md:text-4xl font-bold text-red-800 leading-tight text-center">

              Government College of Engineering

            </h1>

            <p className="text-gray-600 text-lg">

              Chhatrapati Sambhajinagar

            </p>

          </div>

        </div>

        {/* CENTER */}

        <div>

          {/* TITLE */}

          <div className="text-center">

            <h1 className="text-3xl md:text-6xl font-serif font-bold text-red-800">

              CERTIFICATE

            </h1>

            <p className="tracking-[6px] text-gray-500 text-lg mt-1">

              OF ACHIEVEMENT

            </p>

          </div>

          {/* PRESENTED */}

          <div className="text-center mt-7">

            <p className="tracking-[4px] text-gray-500 text-sm">

              THIS CERTIFICATE IS PRESENTED TO

            </p>

          </div>

          {/* NAME */}

          <div className="text-center mt-4">
<h1 className="text-3xl md:text-5xl font-serif text-gray-700 border-b-2 border-yellow-700 inline-block px-4 md:px-8 pb-2 text-center">
            

              {certificate.name}

            </h1>

          </div>

          {/* COURSE */}

          <div className="text-center mt-7">

            <p className="text-gray-600 text-lg">

              For successfully completing

            </p>

            <h2 className="text-2xl md:text-4xl font-bold text-indigo-700 mt-2">

              {certificate.course}

            </h2>

          </div>

        </div>

        {/* BOTTOM */}

        <div>

          {/* QR + DETAILS */}

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-4 px-2 md:px-10">

            {/* DETAILS */}

            <div className="text-base md:text-lg space-y-2 text-center md:text-left">

              <p>

                <span className="font-bold">

                  Certificate ID:

                </span>

                {" "}

                {certificate.certificateId}

              </p>

              <p>

                <span className="font-bold">

                  Issue Date:

                </span>

                {" "}

                {certificate.issueDate}

              </p>

            </div>

            {/* QR CODE */}

            {certificate.qrCode && (

              <img
                src={certificate.qrCode}
                alt="QR Code"
className="w-20 h-20 md:w-24 md:h-24 border-2 border-gray-300 bg-white p-1 rounded-lg shadow md:-mt-24"              />

            )}

          </div>

          {/* VERIFIED BOX */}

          <div className="mt-4 bg-green-50 border border-green-300 rounded-xl p-3 text-center">

            <h2 className="text-2xl font-bold text-green-700">

              This certificate is officially verified and valid.

            </h2>

          </div>

        </div>

      </div>

      {/* DOWNLOAD BUTTONS */}

      <div className="flex justify-center gap-4 mt-5">

        <button
          onClick={downloadImage}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold"
        >

          Download PNG

        </button>

        <button
          onClick={downloadPDF}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold"
        >

          Download PDF

        </button>

      </div>

    </div>

  );

}