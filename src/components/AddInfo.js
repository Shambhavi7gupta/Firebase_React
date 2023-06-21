import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InfoDataService from "../services/info.services";

const AddInfo = ({ id, setInfoId }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("Available");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (name === "" || age === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newInfo = {
      name,
      age,
      status,
    };
    console.log(newInfo);

    try {
      if (id !== undefined && id !== "") {
        await InfoDataService.updateInfo(id, newInfo);
        setInfoId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await InfoDataService.addPersonal(newInfo);
        setMessage({ error: false, msg: "New Entry added successfully!" });
      }
      navigate("/list");
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setName("");
    setAge("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await InfoDataService.getInfo(id);
      console.log("the record is :", docSnap.data());
      setName(docSnap.data().name);
      setAge(docSnap.data().age);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="Main">
        <div className="p-4 box">
          {message?.msg && (
            <Alert
              variant={message?.error ? "danger" : "success"}
              dismissible
              onClose={() => setMessage("")}
            >
              {message?.msg}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formInfoName">
              <InputGroup>
                <InputGroup.Text id="formInfoName">N</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBookAge">
              <InputGroup>
                <InputGroup.Text id="formInfoAge">A</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <ButtonGroup aria-label="Basic example" className="mb-3">
              <Button
                disabled={flag}
                variant="success"
                onClick={(e) => {
                  setStatus("Available");
                  setFlag(true);
                }}
              >
                Available
              </Button>
              <Button
                variant="danger"
                disabled={!flag}
                onClick={(e) => {
                  setStatus("Not Available");
                  setFlag(false);
                }}
              >
                Not Available
              </Button>
            </ButtonGroup>
            <div className="d-grid gap-2">
              <Button variant="primary" type="Submit">
                Add/ Update
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddInfo;
