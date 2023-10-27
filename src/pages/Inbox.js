import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../store/mail";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Inbox = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://mailbox-3601b-default-rtdb.firebaseio.com/mail.json"
        );

        if (!response.ok) {
          const err = await response.json();
          console.log(err);
          throw new Error(err.error.message);
        }

        const data = await response.json();
        data.map((item) => {
          dispatch(mailAction.addEmail(item));
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

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
    console.log(email.id, "inbox");
    dispatch(mailAction.isViewed(email.id));
    setSelectedEmail(email);
  };

  const handleCloseModal = () => {
    setSelectedEmail(null);
  };

  const deleteHandler = (email) => {
    console.log(email.id, "delete Handler");
    dispatch(mailAction.isTrashed(email.id));
  };

  const emailList = updatedEmails
    .filter((email) => !email.trash)
    .map((email) => (
      <div key={email.id}>
        <Link to="#" onClick={() => handleEmailClick(email)}>
          <div>
            {email.isViewed ? (
              // Email is viewed, render without the dot
              <div>
                <strong>From:</strong> {email.sender}
              </div>
            ) : (
              // Email is not viewed, render with a small dot at the beginning of "From"
              <div>
                &bull; <strong>From:</strong> {email.sender}
              </div>
            )}
            <div>
              <strong>Subject:</strong> {email.subject}
            </div>
          </div>
        </Link>
        <Button onClick={() => deleteHandler(email)}>Delete</Button>
      </div>
    ));

  return (
    <div>
      <h2>Inbox</h2>
      <div className="email-list">{emailList}</div>
      <EmailModal email={selectedEmail} onClose={handleCloseModal} />
    </div>
  );
};

export default Inbox;
