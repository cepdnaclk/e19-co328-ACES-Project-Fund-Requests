// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";

import StudentHome from "./Pages/StudentHome";
import Admin from "./Pages/Admin/Admin";
import AdminHome1 from "./Pages/Admin/AdminHome1";
import AdminHome2 from "./Pages/Admin/AdminHome2";
import AdminHome3 from "./Pages/Admin/AdminHome3";
import Yes from "./Pages/Yes";
import No from "./Pages/No";
import Chatbotpage from "./Pages/Chatbotpage";
import LoginModal from "./components/LoginModal";

import { DUserTokenInterface } from "./models/TokenMoodel";
import { PreviousRequest } from "./models/PreviousRequest";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userToken, setUserToken] = useState<DUserTokenInterface | null>(null);
  const [previousRequest, setPreviousRequest] =
    useState<PreviousRequest | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreviousRequest = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/findrequest/${userToken?.email}`
        );
        setPreviousRequest(response.data);
      } catch (error) {
        setError("Error fetching previous request data");
        console.error(error);
      }
    };

    if (userToken == null) {
      onOpen();
    } else {
      onClose();
      console.log("Closed the modal");
      fetchPreviousRequest();
    }
  }, [userToken, onOpen, onClose]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <>
              <LoginModal
                isOpen={isOpen}
                onClose={onClose}
                setUserToken={setUserToken}
              />
              {error && <p>{error}</p>}
              <StudentHome
                previousRequest={previousRequest}
                userToken={userToken}
              />
            </>
          }
        />
        <Route
          path="/student"
          element={
            <StudentHome
              previousRequest={previousRequest}
              userToken={userToken}
            />
          }
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin1/:id" element={<AdminHome1 />} />{" "}
        {/* Use :id for dynamic parameter */}
        <Route path="/admin2" element={<AdminHome2 />} />
        <Route path="/admin3" element={<AdminHome3 />} />
        <Route path="/yes" element={<Yes />} />
        <Route path="/no" element={<No />} />
        <Route path="/faqbot" element={<Chatbotpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
