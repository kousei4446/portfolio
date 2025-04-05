import "./styles/contact.css"
const Contact = () => {
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
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input type="text" id="subject" name="subject" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" rows={5} required></textarea>
                            </div>

                            <button type="submit" className="submit-btn">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact

