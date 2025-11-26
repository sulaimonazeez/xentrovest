import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { motion, AnimatePresence } from "framer-motion";


const testimonials = [
  {
    name: "Jane Doe",
    quote: "This service changed my life! Amazing quality and support.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "John Smith",
    quote: "Fast, reliable and very user-friendly. Highly recommended!",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Amaka Johnson",
    quote: "Great experience from start to finish. 5 stars!",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "Aliyu Musa",
    quote: "Smooth transaction, professional service, and great UI!",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-center">
        <div className="card shadow-lg p-4 border-0 bg-black text-light" style={{ maxWidth: "600px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              <div className="d-flex align-items-center mb-3">
                <img
                  src={testimonials[index].image}
                  alt={testimonials[index].name}
                  className="rounded-circle me-3"
                  width="60"
                  height="60"
                />
                <h5 className="mb-0">{testimonials[index].name}</h5>
              </div>
              <p className="fst-italic text-secondary">
                “{testimonials[index].quote}”
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;