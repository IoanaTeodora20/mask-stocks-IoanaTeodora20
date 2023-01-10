import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Header from "../Header/Header";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [usernameError, setUserNameErr] = useState(false);

  const updateForm = (data) => {
    return setFormData((previous) => {
      return { ...previous, ...data };
    });
  };

  const submitClick = (event) => {
    event.preventDefault();
    if (
      formData.username === "" &&
      formData.password === "" &&
      formData.email === ""
    ) {
      setError(true);
    } else {
      fetch("http://127.0.0.1:9000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "User already exists") {
            setUserNameErr(true);
          } else {
            handleGoLogin();
          }
        });
    }
  };

  const navigate = useNavigate();
  const handleGoLogin = useCallback(
    () => navigate("/login", { replace: true }),
    [navigate]
  );

  return (
    <>
      <Header></Header>
      <div className="mt-5 d-flex justify-content-center">
        <Card>
          <h3 className="mt-4 d-flex justify-content-center align-self-center">
            {" "}
            Register{" "}
          </h3>
          <Card.Body>
            <Form
              className="mt-4"
              style={{
                textAlign: "center",
                minHeight: "50vh",
                minWidth: "20vw",
              }}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="JohnSmith"
                  onChange={(event) =>
                    updateForm({ username: event.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="johnsmith@gmail.com"
                  onChange={(event) => {
                    updateForm({ email: event.target.value });
                  }}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(event) =>
                    updateForm({ password: event.target.value })
                  }
                />
                {!error && usernameError ? (
                  <>
                    <br></br>
                    <Form.Label>
                      Username already exists, please choose another one!
                    </Form.Label>
                  </>
                ) : (
                  ""
                )}
                {error && !usernameError ? (
                  <>
                    <br></br>
                    <Form.Label>Please, fill in all the fields.</Form.Label>
                  </>
                ) : (
                  ""
                )}
              </Form.Group>
              <br></br>
              <Button
                variant="outline-danger"
                type="submit"
                className="mx-2"
                onClick={(event) => submitClick(event)}>
                Submit
              </Button>
              <Button href="/" variant="outline-dark" target="_self">
                Home
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default RegisterForm;
