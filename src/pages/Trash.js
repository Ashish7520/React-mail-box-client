import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { mailAction } from "../store/mail";

const Trash = () => {
  const dispatch = useDispatch();
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
  const updatedEmails = emails.filter((item) => item.recipient == myEmail);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleCloseModal = () => {
    setSelectedEmail(null);
  };

  const deleteHandler = (email) => {
    dispatch(mailAction.isDeleted(email.id));
  };

  const emailList = updatedEmails
    .filter((email) => email.trash)
    .map((email) => (
      <div key={email.id}>
        <Link to="#" onClick={() => handleEmailClick(email)}>
          <div>
            <strong>To:</strong> {email.recipient}
          </div>
          <div>
            <strong>Subject:</strong> {email.subject}
          </div>
        </Link>
        <Button onClick={() => deleteHandler(email)}>Permenetly Delete</Button>
      </div>
    ));

  return (
    <div>
      <h2>Trash</h2>
      <div className="email-list">{emailList}</div>
      <EmailModal email={selectedEmail} onClose={handleCloseModal} />
    </div>
  );
};

export default Trash;
