import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import InfoDataService from "../services/info.services";
import { Outlet, Link } from "react-router-dom";

const PersonalList = ({ getInfoId }) => {
  const [personal, setPersonal] = useState([]);
  useEffect(() => {
    getPersonal();
  }, []);

  const getPersonal = async () => {
    const data = await InfoDataService.getAllPersonal();
    console.log(data.docs);
    setPersonal(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await InfoDataService.deleteInfo(id);
    getPersonal();
  };
  return (
    <>
      <div className="main">
        <div className="mb-2">
          <Button variant="dark edit" onClick={getPersonal}>
            Refresh List
          </Button>
          <Link to="/">Back to Home</Link>
        </div>

        {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {personal.map((doc, index) => {
              return (
                <tr key={doc.id}>
                  <td>{index + 1}</td>
                  <td>{doc.name}</td>
                  <td>{doc.age}</td>
                  <td>{doc.status}</td>
                  <td>
                    <Button
                      variant="secondary"
                      className="edit"
                      onClick={(e) => getInfoId(doc.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="delete"
                      onClick={(e) => deleteHandler(doc.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default PersonalList;
