import { useState } from 'react';
import emailjs from 'emailjs-com';
import toast, { Toaster } from 'react-hot-toast';
import './styles/contact.css';
import github from '/githubicon.png';
import twitter from '/twitter.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(email);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      toast.error('有効なメールアドレスを入力してください。');
      return;
    }

    setLoading(true);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;

    emailjs.send(serviceId!, templateId!, templateParams, userId).then(
      () => {
        toast.success('メッセージが送信されました！');
        setLoading(false);
        // フォームをリセット
        setFormData({ name: '', email: '', subject: '', message: '' });
      },
      () => {
        toast.error('メッセージの送信に失敗しました。再度お試しください。');
        setLoading(false);
      },
    );
  };

  return (
    <section className="contact-section" id="contact">
      <Toaster />
      <div className="content-column">
        <h2 className="section-title">Contact Me</h2>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <p>
              I&apos;m always open to discussing new projects, creative ideas or
              opportunities to be part of your vision.
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
            <div className="social-buttons">
              <a
                href="https://github.com/kousei4446"
                className="social-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={github} alt="Visit GitHub" />
              </a>
              <a
                href="https://x.com/k8035004287922?s=11"
                className="social-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={twitter} alt="Follow on Twitter/X" />
              </a>
            </div>
          </div>

          <div className="contact-form">
            {loading ? (
              <div className="loading-indicator">
                <div className="spinner"></div>
                <span>送信中...</span>
              </div>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
