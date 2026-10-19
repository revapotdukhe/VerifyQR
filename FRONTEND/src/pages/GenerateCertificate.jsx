import axios from "axios";

import { useRef, useState } from "react";

import html2canvas from "html2canvas";

import jsPDF from "jspdf";

import toast from "react-hot-toast";

import { motion } from "framer-motion";

import logo from "../assets/logo.png";

export default function GenerateCertificate() {

  const [formData, setFormData] = useState({

    name: "",
    course: "",
    issueDate: ""

  });

  const [qrCode, setQrCode] = useState("");

  const [generatedId, setGeneratedId] = useState("");

  const [loading, setLoading] = useState(false);

  const [generated, setGenerated] = useState(false);

  const certificateRef = useRef();


  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };


  // HANDLE SUBMIT

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

const response = await axios.post(
  "http://localhost:5000/api/certificate",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      setQrCode(response.data.qrCode);

      setGeneratedId(response.data.certificateId);

      setGenerated(true);

      toast.success(

        "Certificate Generated Successfully"

      );

    } catch (error) {

      console.log(error);

      toast.error("Something went wrong");

    } finally {

      setLoading(false);

    }

  };


  // DOWNLOAD PNG

  const downloadImage = async () => {

    const canvas = await html2canvas(

      certificateRef.current

    );

    const image = canvas.toDataURL(

      "image/png"

    );

    const link = document.createElement("a");

    link.href = image;

    link.download = "certificate.png";

    link.click();

  };


  // DOWNLOAD PDF

  const downloadPDF = async () => {

    const canvas = await html2canvas(

      certificateRef.current

    );

    const image = canvas.toDataURL(

      "image/png"

    );

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

      500

    );

    pdf.save("certificate.pdf");

  };


  return (

    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center p-4">

      <div className="bg-white shadow-2xl rounded-3xl p-6 md:p-10 w-full max-w-6xl">

        {/* TITLE */}

        <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-600 mb-3">

          Generate Certificate

        </h1>

        <p className="text-center text-gray-500 mb-10">

          QR Based Certificate Verification System

        </p>


        {/* FORM */}

        <form

          onSubmit={handleSubmit}

          className="space-y-6"

        >

          {/* NAME */}

          <div>

            <label className="block mb-2 font-semibold">

              Student Name

            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 border rounded-xl"
              required
            />

          </div>


          {/* COURSE */}

          <div>

            <label className="block mb-2 font-semibold">

              Course Name

            </label>

            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full p-4 border rounded-xl"
              required
            />

          </div>


          {/* DATE */}

          <div>

            <label className="block mb-2 font-semibold">

              Issue Date

            </label>

            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              className="w-full p-4 border rounded-xl"
              required
            />

          </div>


          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg"
          >

            {loading
              ? "Generating..."
              : "Generate Certificate"}

          </button>

        </form>


        {/* CERTIFICATE */}

        {generated && (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            className="mt-14"

          >

            <div

              ref={certificateRef}

              className="bg-[#fffdf7] border-[18px] border-yellow-700 rounded-xl shadow-2xl p-10 md:p-16 text-center relative overflow-hidden"

            >

              {/* CORNER */}

              <div className="absolute top-4 left-4 text-yellow-700 text-6xl">

                ❦

              </div>

              <div className="absolute top-4 right-4 text-yellow-700 text-6xl">

                ❦

              </div>

              <div className="absolute bottom-4 left-4 text-yellow-700 text-6xl">

                ❦

              </div>

              <div className="absolute bottom-4 right-4 text-yellow-700 text-6xl">

                ❦

              </div>


              {/* LOGO */}

              <div className="flex justify-center">

                <img
                  src={logo}
                  alt="College Logo"
                  className="w-28 h-28 object-contain"
                />

              </div>


              {/* COLLEGE */}

              <h1 className="text-3xl md:text-5xl font-bold text-yellow-800 mt-4">

                Government College of Engineering

              </h1>

              <p className="text-lg md:text-2xl text-gray-600 mt-2">

                Chhatrapati Sambhajinagar

              </p>


              {/* TITLE */}

              <div className="mt-12">

                <h2 className="text-5xl md:text-7xl font-serif font-bold text-red-800">

                  CERTIFICATE

                </h2>

                <p className="text-2xl text-gray-500 mt-3 tracking-[6px]">

                  OF ACHIEVEMENT

                </p>

              </div>


              {/* NAME */}

              <p className="mt-12 text-xl text-gray-600">

                THIS CERTIFICATE IS PRESENTED TO

              </p>

              <h2 className="text-5xl md:text-7xl font-serif text-gray-700 mt-8 border-b-2 border-yellow-700 inline-block px-10 pb-4">

                {formData.name}

              </h2>


              {/* COURSE */}

              <p className="mt-12 text-xl text-gray-600">

                For successfully completing

              </p>

              <h3 className="text-4xl md:text-5xl font-bold text-yellow-800 mt-5">

                {formData.course}

              </h3>


              {/* VERIFIED */}

              <div className="flex justify-center mt-10">

                <div className="bg-green-100 text-green-700 px-6 py-3 rounded-full flex items-center gap-3 shadow-lg">

                  <span className="text-3xl">

                    ✅

                  </span>

                  <span className="font-bold text-xl">

                    Auto Verified Certificate

                  </span>

                </div>

              </div>


              {/* DETAILS */}

              <div className="flex justify-center gap-12 mt-10 flex-wrap text-lg">

                <p>

                  <span className="font-bold">

                    Certificate ID:

                  </span>

                  {" "}

                  {generatedId}

                </p>

                <p>

                  <span className="font-bold">

                    Issue Date:

                  </span>

                  {" "}

                  {formData.issueDate}

                </p>

              </div>


              {/* QR */}

              <div className="flex justify-center mt-10">

                <img
                  src={qrCode}
                  alt="QR Code"
                  className="w-32 h-32"
                />

              </div>


              {/* SIGNATURE */}

              <div className="flex justify-between mt-20 px-4 md:px-12">

                <div>

                  <div className="border-t-2 border-yellow-700 w-40"></div>

                  <p className="mt-2 font-semibold">

                    Principal Signature

                  </p>

                </div>

                <div>

                  <div className="border-t-2 border-yellow-700 w-40"></div>

                  <p className="mt-2 font-semibold">

                    VerifyQR Team

                  </p>

                </div>

              </div>

            </div>


            {/* DOWNLOAD */}

            <div className="flex justify-center gap-4 mt-6">

              <button
                onClick={downloadImage}
                className="bg-emerald-500 text-white px-6 py-3 rounded-xl"
              >

                Download PNG

              </button>

              <button
                onClick={downloadPDF}
                className="bg-purple-500 text-white px-6 py-3 rounded-xl"
              >

                Download PDF

              </button>

            </div>

          </motion.div>

        )}

      </div>

    </div>

  );

}