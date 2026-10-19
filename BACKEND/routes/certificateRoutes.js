const protect = require("../middleware/authMiddleware");

const express = require("express");

const router = express.Router();

const {
  createCertificate,
  getCertificates,
  deleteCertificate,
  updateCertificate,
  getCertificateById,
  sendCertificateEmail
} = require("../controllers/certificateController");

// CREATE

router.post(
  "/",
  protect,
  createCertificate
);


// GET ALL

router.get(
  "/",
  getCertificates
);


// VERIFY CERTIFICATE

router.get(
  "/verify/:certificateId",
  getCertificateById
);


// DELETE

router.delete(
  "/:id",
  protect,
  deleteCertificate
);


// UPDATE

router.put(
  "/:id",
  protect,
  updateCertificate
);
router.post("/send-email", sendCertificateEmail);


module.exports = router;