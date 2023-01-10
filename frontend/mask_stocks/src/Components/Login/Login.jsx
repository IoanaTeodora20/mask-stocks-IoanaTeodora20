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
  const navigate = useNavigate();
  const handleGoHome = useCallback(
    () => navigate("/home", { replace: true }),
    [navigate]
  );

  const handleLoginData = (data) => {
    return setLoginData((previous) => {
      return { ...previous, ...data };
    });
  };

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
      <div className="mt-5 d-flex justify-content-center">
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
              <br></br>
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
                  <br></br>
                  <Form.Label> Wrong Credentials!</Form.Label>
                </>
              ) : (
                ""
              )}
              <Form.Group
                className="mb-3"
                controlId="formBasicCheckbox"></Form.Group>
              <br></br>
              <Button
                variant="outline-danger"
                type="submit"
                onClick={(event) => handleLoginClick(event)}>
                Login
              </Button>
              {/* <div className="mt-5">
                <h5> Don't have an account?</h5>
                <Button
                  href="/register"
                  target="_self"
                  variant="outline-danger">
                  {" "}
                  Register Here
                </Button>
              </div> */}
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default LoginForm;