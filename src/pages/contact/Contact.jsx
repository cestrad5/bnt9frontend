import React, { useState } from "react";
import Card from "../../components/card/Card";
import { FaPhoneAlt, FaEnvelope, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../services/authService";

/**
 * Contact component for user inquiries.
 * Users can send messages through a form and view contact information.
 */
const Contact = () => {
  // State for form fields
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const data = {
    subject,
    message,
  };

  /**
   * Handles the submission of the contact form.
   * Sends a POST request to the server to send an email.
   * Displays success or error toasts accordingly.
   * @param {Object} e - Event object.
   */
  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/contactus`, data);
      setSubject("");
      setMessage("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="contact">
      <h3 className="--mt">Contáctanos</h3>
      <div className="section">
        {/* Contact Form */}
        <form onSubmit={sendEmail}>
          <Card cardClass="card">
            <label>
              <h4>Asunto</h4>
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Asunto"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <label>
              <h4>Mensaje</h4>
            </label>
            <textarea
              cols="30"
              rows="10"
              name="message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className="btn-custom">Enviar Mensaje</button>
          </Card>
        </form>

        {/* Contact Details */}
        <div className="detailsContact">
          <Card cardClass={"card2"}>
            <h3>Nuestra información de contacto</h3>
            <p>Complete el formulario o contáctenos a través de estos otros canales:</p>

            <div className="icons">
              <span>
                <FaPhoneAlt />
                <a href="tel:+573127270035">+57 3127270035</a>
              </span>
              <span>
                <FaWhatsapp />
                <a href="https://wa.me/573127270035">WhatsApp</a>
              </span>
              <span>
                <FaEnvelope />
                <a href="mailto:bonettopro@outlook.com">bonettopro@outlook.com</a>
              </span>
              {/* Uncomment and customize additional contact details if needed */}
              {/* 
              <span>
                <GoLocation />
                <p>Medellin, Colombia</p>
              </span>
              <span>
                <FaTwitter />
                <p>@ZinoTrust</p>
              </span>
              */}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
