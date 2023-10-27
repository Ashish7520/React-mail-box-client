import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Sent.css";

const Sent = () => {
  function EmailModal({ email, onClose }) {
    return (
      <Modal show={!!email} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{email?.subject}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <strong>From:</strong> {email?.sender}
          </div>
          <div>
            <strong>Subject:</strong> {email?.subject}
          </div>
          <div>
            <strong>Message:</strong> {email?.body}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const emails = useSelector((state) => state.mail.mails);
  const myEmail = localStorage.getItem("email");
  const updatedEmails = emails.filter((item) => item.sender == myEmail);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleCloseModal = () => {
    setSelectedEmail(null);
  };

  const emailList = updatedEmails.map((email) => (
    <div key={email.id} className="email-item">
      <Link to="#" onClick={() => handleEmailClick(email)}>
        <div className="email-info">
          <span>
            <strong>To:</strong> {email.recipient}
          </span>
          <span className="subject">
            <strong>Subject:</strong> {email.subject}
          </span>
        </div>
      </Link>
    </div>
  ));

  return (
    <div>
      <h2>Sent</h2>
      <div className="email-list">{emailList}</div>
      <EmailModal email={selectedEmail} onClose={handleCloseModal} />
    </div>
  );
};

export default Sent;
