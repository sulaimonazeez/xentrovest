import React, { useState } from "react";
import { motion } from "framer-motion";
import Select from "react-select";
import countryList from "react-select-country-list";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    country: null,
    password: "",
  });
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const countries = countryList().getData();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (selected) => {
    setForm({ ...form, country: selected });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setError(null);

    try {
      const response = await axios.post("https://xentrovest.pythonanywhere.com/api/create/", {
        fullname: form.fullname,
        email: form.email,
        phone: form.phone,
        country: form.country?.label || "",
        password: form.password,
      });


      // Save access token and refresh token to localStorage
      if (response.status === 201 || response.status === 200) {
        navigate("/login");
      }

      // Clear form
      setForm({
        fullname: "",
        email: "",
        phone: "",
        country: null,
        password: "",
      });
    } catch (err) {
      setError("Failed to register. " + (err.response?.data?.detail || "Check server."));
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div className="mt-5 container py-5">
      <div className="mt-2">
        <h3 className="text-light text-white">Create an Account</h3>
        <p className="sm text-secondary">
          Fill in your details below to start investing and building your portfolio
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-4 p-md-5 shadow rounded mx-auto"
        style={{ backgroundColor: "#1f1f1f", maxWidth: "600px" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label sm text-secondary">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              className="form-control form-control-lg sm text-white"
              placeholder="Enter your full name"
              style={{ backgroundColor: "#2c2c2c", border: "none" }}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary sm">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control form-control-lg text-white sm"
              placeholder="Enter your email"
              style={{ backgroundColor: "#2c2c2c", border: "none" }}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary sm">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="form-control sm form-control-lg text-white"
              placeholder="Enter your phone number"
              style={{ backgroundColor: "#2c2c2c", border: "none" }}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary sm">Country</label>
            <Select
              options={countries}
              value={form.country}
              onChange={handleCountryChange}
              className="text-dark sm"
              classNamePrefix="select"
              placeholder="Search your country..."
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#2c2c2c",
                  borderColor: "#2c2c2c",
                  color: "white",
                }),
                singleValue: (base) => ({ ...base, color: "white" }),
                input: (base) => ({ ...base, color: "white" }),
                menu: (base) => ({ ...base, backgroundColor: "#2c2c2c", color: "white" }),
              }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-light">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control form-control-lg sm text-white"
              placeholder="Enter your password"
              style={{ backgroundColor: "#2c2c2c", border: "none" }}
              required
            />
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-warning w-100"
              type="submit"
              disabled={submitted}
            >
              {submitted ? "Signing up..." : "Sign Up"}
            </motion.button>
          </div>

          {error && (
            <div className="alert alert-danger text-center mt-4 rounded-pill">
              {error}
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default SignupForm;