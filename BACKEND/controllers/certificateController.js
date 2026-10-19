const Certificate =
  require("../models/Certificate");

const QRCode =
  require("qrcode");
const sendEmail = require("../utils/sendEmail");

// CREATE CERTIFICATE

const createCertificate = async (req, res) => {

  try {

    let certificateId;
let exists = true;

while (exists) {
  certificateId =
    "GEC" +
    Math.floor(100000 + Math.random() * 900000);

  exists = await Certificate.findOne({ certificateId });
}
   


    const verifyURL =

      `http://localhost:5173/verify/${certificateId}`;


    const qrCode =

      await QRCode.toDataURL(

        verifyURL

      );


    const newCertificate =

      new Certificate({

        name: req.body.name,

        course: req.body.course,

        issueDate: req.body.issueDate,

        certificateId,

        qrCode

      });


    await newCertificate.save();


    res.status(201).json(

      newCertificate

    );

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


// GET ALL

const getCertificates = async (req, res) => {

  try {

    const certificates =

      await Certificate.find();

    res.status(200).json(

      certificates

    );

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};
const sendCertificateEmail = async (req, res) => {
  console.log("Email API called");
  try {
    const { email, certificateId } = req.body;

    const verifyLink = `http://localhost:5173/verify/${certificateId}`;

    await sendEmail(
  email,
  "Certificate Issued – VerifyQR",
  `
  <h2>Certificate Issued Successfully</h2>

  <p>Dear Recipient,</p>

  <p>
    We are pleased to inform you that your certificate has been successfully
    issued through the <strong>VerifyQR</strong> platform.
  </p>

  <p>
    <strong>Certificate ID:</strong> ${certificateId}
  </p>

  <p>
    You can verify the authenticity of your certificate by clicking the link below:
  </p>

  <p>
    <a href="${verifyLink}">
      Verify Certificate
    </a>
  </p>

  <p>
    If you have any questions or require assistance, please contact the
    issuing authority.
  </p>

  <p>
    Thank you for using <strong>VerifyQR</strong>.
  </p>

  <p>
    Kind regards,<br>
    <strong>VerifyQR Team</strong>
  </p>
  `
);

    res.json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE

const deleteCertificate = async (req, res) => {

  try {

    await Certificate.findByIdAndDelete(

      req.params.id

    );

    res.status(200).json({

      message: "Deleted Successfully"

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


// UPDATE

const updateCertificate = async (req, res) => {

  try {

    const updatedCertificate =

      await Certificate.findByIdAndUpdate(

        req.params.id,

        req.body,

        { new: true }

      );

    res.status(200).json(

      updatedCertificate

    );

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


// VERIFY

const getCertificateById = async (req, res) => {

  try {

    const certificate =

      await Certificate.findOne({

        certificateId:

          req.params.certificateId

      });

    res.status(200).json(

      certificate

    );

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


module.exports = {
  createCertificate,
  getCertificates,
  deleteCertificate,
  updateCertificate,
  getCertificateById,
  sendCertificateEmail
};