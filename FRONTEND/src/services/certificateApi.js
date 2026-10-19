import axios from "axios";

const API = "http://localhost:5000/api/certificates";

export const getCertificates = () =>
  axios.get(API);

export const getCertificateById = (id) =>
  axios.get(`${API}/${id}`);

export const createCertificate = (data) =>
  axios.post(API, data);

export const updateCertificate = (id, data) =>
  axios.put(`${API}/${id}`, data);