import React, { useState } from "react";
import '../styles/Faq.css'; 
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How can I share my task list with others?",
      answer:
        "You can share your task list by clicking the 'Share' icon, entering collaborators’ emails or generating a link, and setting view or edit permissions.",
    },
    {
      question: "Can I sync Planify with my calendar?",
      answer: "Yes, Planify integrates with major calendars like Google Calendar.",
    },
    {
      question: "Does Planify provide analytics or reports for my tasks?",
      answer:
        "Yes, Planify provides detailed analytics and reports to track task performance and productivity.",
    },
    {
      question: "Does Planify work on both mobile and desktop?",
      answer: "Yes, Planify is available on both mobile and desktop platforms.",
    },
    {
      question: "Is Planify free, or is there a premium version?",
      answer: "Planify offers both a free version and premium features for advanced needs.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      {/* Titre */}
      <h2>
        Your top questions,<br /> <span className="highlight">answered</span>
      </h2>
      
      {/* Liste des questions */}
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
          >
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className="faq-icon">{openIndex === index ? "-" : "+"}</span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}  
export default FAQ;
