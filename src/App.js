import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PersonalList from "./components/PersonalList";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {
  const [infoId, setInfoId] = useState("");

  const getInfoIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setInfoId(id);
  };

  return (
    <UserAuthContextProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home infoId={infoId} setInfoId={setInfoId} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <PersonalList getInfoId={getInfoIdHandler} />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
