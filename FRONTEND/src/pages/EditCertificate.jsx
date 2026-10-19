import { useEffect, useState } from "react";

import axios from "axios";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import toast from "react-hot-toast";

export default function EditCertificate() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",
    course: ""

  });

  const [loading, setLoading] = useState(false);

  // FETCH CERTIFICATE

  const fetchCertificate = async () => {

    try {

      setLoading(true);

      const response = await axios.get(

        `http://localhost:5000//api/certificate/edit/${id}`

      );

      setFormData(response.data);

      setLoading(false);

    } catch (error) {

      setLoading(false);

      console.log(error);

    }

  };

  // USE EFFECT

  useEffect(() => {

    if (id) {

      fetchCertificate();

    }

  }, [id]);



  // UPDATE CERTIFICATE

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      await axios.put(

        `http://localhost:5000/api/certificate/update/${id}`,

        formData

      );

      toast.success("Certificate Updated");

      navigate("/dashboard");

    } catch (error) {

      toast.error("Update failed");

      console.log(error);

    }

  };


  // LOADING SCREEN

  if (loading) {

    return (

      <div className="min-h-screen flex justify-center items-center">

        <h1 className="text-3xl font-bold">

          Loading...

        </h1>

      </div>

    );

  }


  return (

    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-6">

      <form

        onSubmit={handleUpdate}

        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg"

      >

        <h1 className="text-4xl font-bold text-indigo-600 mb-8 text-center">

          Edit Certificate

        </h1>


        {/* NAME */}

        <div className="mb-5">

          <label className="block mb-2 font-semibold">

            Student Name

          </label>

          <input

            type="text"

            value={formData.name}

            onChange={(e) =>

              setFormData({

                ...formData,

                name: e.target.value

              })

            }

            className="w-full border p-4 rounded-xl"

            required

          />

        </div>


        {/* COURSE */}

        <div className="mb-6">

          <label className="block mb-2 font-semibold">

            Course

          </label>

          <input

            type="text"

            value={formData.course}

            onChange={(e) =>

              setFormData({

                ...formData,

                course: e.target.value

              })

            }

            className="w-full border p-4 rounded-xl"

            required

          />

        </div>


        {/* BUTTON */}

        <button

          type="submit"

          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl text-lg font-semibold transition"

        >

          Update Certificate

        </button>

      </form>

    </div>

  );

}