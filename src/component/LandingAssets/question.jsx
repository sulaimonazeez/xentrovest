import React, { useState } from "react"; import { motion, AnimatePresence } from "framer-motion"; 

const faqs = [ { question: "What is Paystar?", answer: "Paystar is a platform that allows you to purchase airtime, data, pay bills, and more in seconds with ease.", }, { question: "Is Paystar secure?", answer: "Yes, we use bank-level security and industry best practices to ensure your data and transactions are safe.", }, { question: "How can I contact support?", answer: "You can reach out to our support team via email or use the in-app live chat feature for assistance.", }, ];

const FAQAccordion = () => { const [openIndex, setOpenIndex] = useState(null);

const toggleFAQ = (index) => { setOpenIndex(openIndex === index ? null : index); };

return ( <div className="container py-5"> <div className="accordion"> {faqs.map((faq, index) => ( <div key={index} className="border-bottom py-3" onClick={() => toggleFAQ(index)} style={{ cursor: "pointer" }} > <h5 className="mb-0 d-flex justify-content-between align-items-center"> {faq.question} <span>{openIndex === index ? "−" : "+"}</span> </h5> <AnimatePresence> {openIndex === index && ( <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} > <p className="mt-2 text-secondary">{faq.answer}</p> </motion.div> )} </AnimatePresence> </div> ))} </div> </div> ); };

export default FAQAccordion;

