import { useState } from "react";
import emailjs from "emailjs-com";
import "./styles/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(""); // 成功・失敗メッセージ用

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;
    
    emailjs
      .send(serviceId!, templateId!, templateParams, userId)
      .then(
        (response) => {
          console.log("メール送信成功:", response.status, response.text);
          setFeedback("Message sent successfully!");
          setLoading(false);
          // フォームリセット
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        },
        (error) => {
          console.error("メール送信エラー:", error);
          setFeedback("Failed to send message. Please try again.");
          setLoading(false);
        }
      );
  };

  return (
    <section className="contact-section" id="contact">
      <div className="content-column">
        <h2 className="section-title">Contact Me</h2>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <p>
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-label">Email:</span>
                <span className="contact-value">e1922022@oit.ac.jp</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Location:</span>
                <span className="contact-value">Osaka, Japan</span>
              </div>
            </div>

            <div className="social-links">
              <a href="https://github.com/kousei4446" className="social-link">
                GitHub
              </a>
              <a href="https://x.com/k8035004287922?s=11" className="social-link">
                Twitter
              </a>
            </div>
          </div>

          <div className="contact-form">
            {loading ? (
              <div className="loading-indicator">Sending...</div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            )}
            {feedback && <p className="feedback">{feedback}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
