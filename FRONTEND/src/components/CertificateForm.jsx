import { useState } from "react";

import axios from "axios";

function CertificateForm() {

    const [name, setName] = useState("");

    const [course, setCourse] = useState("");

    const [certificateId, setCertificateId] = useState("");

    const [issueDate, setIssueDate] = useState("");

    const [qrCode, setQrCode] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(

                "http://localhost:5000/api/certificate/create",

                {
                    name,
                    course,
                    certificateId,
                    issueDate
                }

            );
            console.log(response.data);

            setQrCode(response.data.qrCode);

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div>

            <h2>Create Certificate</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Student Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <br />
                <br />

                <input
                    type="text"
                    placeholder="Course"
                    value={course}
                    onChange={(e) =>
                        setCourse(e.target.value)
                    }
                />

                <br />
                <br />

                <input
                    type="text"
                    placeholder="Certificate ID"
                    value={certificateId}
                    onChange={(e) =>
                        setCertificateId(e.target.value)
                    }
                />

                <br />
                <br />

                <input
                    type="text"
                    placeholder="Issue Date"
                    value={issueDate}
                    onChange={(e) =>
                        setIssueDate(e.target.value)
                    }
                />

                <br />
                <br />

                <button type="submit">

                    Create Certificate

                </button>

            </form>

            <br />

            {
                qrCode && (

                    <div>

                        <h3>Generated QR Code</h3>

                        <img
                            src={qrCode}
                            alt="QR"
                            width="200"
                        />

                    </div>
                )
            }

        </div>
    );
}

export default CertificateForm;