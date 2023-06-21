import React, { useState } from "react";
import { Button, Navbar, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import AddInfo from "./AddInfo";

const Home = ({ infoId, setInfoId }) => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const { logOut, user } = useUserAuth();

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setData({ ...data, ...newInput });
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        {user && user.email}
      </div>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>

      {/* crud */}
      <div className="main">
        <Navbar bg="dark" variant="dark" className="header">
          <Container>
            <Navbar.Brand href="#home">Firebase CRUD</Navbar.Brand>
          </Container>
        </Navbar>
        <Container style={{ width: "400px" }}>
          <Row>
            <Col>
              <AddInfo id={infoId} setInfoId={setInfoId} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
