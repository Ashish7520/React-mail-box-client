import React, { useState } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { mailAction } from "../store/mail";

const Mailbox = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  function generateRandomId(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomId = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  }

  // Example: Generate a random ID of length 10
  const randomId = generateRandomId(10);

  const sendEmail = () => {
    const emailContent = editorState.getCurrentContent().getPlainText();
    console.log(emailContent, subject, recipient);

    dispatch(
      mailAction.addEmail({
        recipient: recipient,
        subject: subject,
        body: emailContent,
        sender: email,
        isViewed: false,
        id: randomId,
        trash: false,
      })
    );
    // You can send the email to your server or Firebase here.
    // Include recipient, subject, and emailContent in the POST request data.

    // Reset the form after sending the email
    setEditorState(EditorState.createEmpty());
    setRecipient("");
    setSubject("");
  };

  return (
    <Container>
      <h2 className="mt-3">Compose Email</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Recipient's Email"
            value={recipient}
            onChange={handleRecipientChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={handleSubjectChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={sendEmail}>
          Send
        </Button>
      </Form>
    </Container>
  );
};

export default Mailbox;
