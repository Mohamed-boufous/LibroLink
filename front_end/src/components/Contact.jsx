import React, { useState } from "react";
import { Button } from "./ui/button";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Vous pouvez ajouter ici la logique pour traiter le formulaire, comme envoyer les données au backend
    console.log("Email:", email);
    console.log("Message:", message);
  };

  return (
    <div className="contact-page-wrapper">
      <h1 className="primary-heading">Have Question In Mind?</h1>
      <h1 className="primary-heading">Let Us Help You</h1>
      <form className="contact-form-container" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="youremail@gmail.com"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <textarea
          placeholder="Type your message here..."
          value={message}
          onChange={handleMessageChange}
          required
        ></textarea>
        <Button type="submit" className="font-semibold">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Contact;
