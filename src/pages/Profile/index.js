import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

export default function Profile() {
  const [interval, setInterval] = useState(false);
  const [content, setContent] = useState("");

  function submitPreferences(event) {
    event.preventDefault();
    console.log("name", interval);
    // dispatch(postStory(name, content, imageUrl));
  }

  return (
    <Form as={Col} md={{ span: 6, offset: 2 }} className="mt-5">
      <h1 className="mt-5 mb-5">Exercise preferences</h1>
      <Form.Group>
        <Form.Label>
          <h4>Breathe interval: </h4>
        </Form.Label>
        <Form.Check
          type="radio"
          value={interval}
          label="3 seconds"
          value={interval}
          onChange={() => setInterval(3)}
          name="interval"
          id="radio1"
          checked
        />
        <Form.Check
          type="radio"
          value={interval}
          onChange={() => setInterval(4)}
          label="4 seconds"
          name="interval"
          id="radio2"
        />
        <Form.Check
          type="radio"
          value={interval}
          onChange={() => setInterval(5)}
          label="5 seconds"
          name="interval"
          id="radio2"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>
          <h4>Notify me at: </h4>
        </Form.Label>
        <Form.Control
          value={content}
          onChange={(event) => setContent(event.target.value)}
          type="textarea"
          placeholder="Your cool story goes here"
        />
      </Form.Group>
      {/*
      <Form.Group>
        <Form.Label>Your cool story link</Form.Label>
        <Form.Control
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          type="text"
          placeholder="Your image"
        /> */}
      {/* </Form.Group> */}
      <Form.Group className="mt-5">
        <Button variant="primary" type="submit" onClick={submitPreferences}>
          Save changes
        </Button>
      </Form.Group>
    </Form>
  );
}
