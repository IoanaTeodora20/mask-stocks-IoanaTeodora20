import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

function LoginForm() {
  const [loginData, setLoginData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  // ---- handleGoHome redirects us, onClick,towards the component Home ----

  const navigate = useNavigate();
  const handleGoHome = useCallback(
    () => navigate("/home", { replace: true }),
    [navigate]
  );

  // ---- handleLoginData updates our DB with the loginForm Data ----

  const handleLoginData = (data) => {
    return setLoginData((previous) => {
      return { ...previous, ...data };
    });
  };

  // ---- handleLoginClick(event) sends our LoginForm data into the server ----

  const handleLoginClick = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:9000/api/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === "No User Exists") {
          console.log(data);
          setError(true);
        } else {
          handleGoHome();
        }
      });
  };

  return (
    <>
      <Header></Header>
      <div style={{ backgroundColor: "#191919" }}>
        <br />
        <br />
        <div className="d-flex justify-content-center mt-2">
          <Card>
            <h3 className="mt-4 d-flex justify-content-center align-self-center">
              Login
            </h3>
            <Card.Body>
              <Form
                className="mt-4"
                style={{
                  textAlign: "center",
                  minHeight: "30vh",
                  minWidth: "20vw",
                }}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="JohnSmith"
                    onChange={(event) =>
                      handleLoginData({ username: event.target.value })
                    }
                  />
                </Form.Group>
                <br />
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(event) =>
                      handleLoginData({ password: event.target.value })
                    }
                  />
                </Form.Group>
                {error ? (
                  <>
                    <br />
                    <Form.Label> Wrong Credentials!</Form.Label>
                  </>
                ) : (
                  ""
                )}
                <Form.Group
                  className="mb-3"
                  controlId="formBasicCheckbox"></Form.Group>
                <br />
                <Button
                  variant="outline-dark"
                  type="submit"
                  onClick={(event) => handleLoginClick(event)}>
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
