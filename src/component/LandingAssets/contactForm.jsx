import React, { useState } from "react";
import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const GetInTouchForm = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ fullname: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="container py-5">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-4 p-md-5 shadow rounded mx-auto"
        style={{
          backgroundColor: "#1f1f1f", // Deep grey background
          maxWidth: "600px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-secondary sm">Full Name</label>
            <input
              type="text"
              className="form-control form-control text-white"
              style={{
                backgroundColor: "#2c2c2c",
                border: "none",
              }}
              placeholder="Enter your full name"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary sm">Email Address</label>
            <input
              type="email"
              className="form-control form-control text-white"
              style={{
                backgroundColor: "#2c2c2c",
                border: "none",
              }}
              placeholder="Enter your email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-secondary">Message</label>
            <textarea
              className="form-control form-control text-white"
              style={{
                backgroundColor: "#2c2c2c",
                border: "none",
              }}
              placeholder="Write your message here..."
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-warning w-100 rounded"
              type="submit"
            >
              Send Message
            </motion.button>
          </div>

          {sent && (
            <motion.div
              className="alert alert-success text-center mt-4 rounded-pill"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Thank you! Your message has been sent.
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default GetInTouchForm;