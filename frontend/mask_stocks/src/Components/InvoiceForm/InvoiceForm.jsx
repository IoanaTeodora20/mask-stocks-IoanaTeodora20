import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

function InvoiceForm() {
  const [invoiceData, setInvoiceData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    zip_code: "",
  });

  const navigate = useNavigate();
  const handleGoHome = useCallback(
    () => navigate("/home", { replace: true }),
    [navigate]
  );

  const handleInvoiceData = (data) => {
    return setInvoiceData((previous) => {
      return { ...previous, ...data };
    });
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:9000/api/invoiceData", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoiceData),
    })
      .then((response) => response.json())
      .then((data) => {
        handleGoHome();
        console.log(data);
      });
  };

  return (
    <>
      <Header></Header>
      <div style={{ backgroundColor: "#191919" }}>
        <br />
        <br />
        <div className="d-flex justify-content-center">
          <Card className="mb-4">
            <h3 className="mt-4 d-flex justify-content-center align-self-center">
              Order Details
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
                  <Form.Label>Hospital Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="JohnSmith"
                    onChange={(event) =>
                      handleInvoiceData({ name: event.target.value })
                    }
                  />
                </Form.Group>
                <br></br>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Hospital Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="JohnSmith"
                    onChange={(event) =>
                      handleInvoiceData({ address: event.target.value })
                    }
                  />
                </Form.Group>
                <br />
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Hospital City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="JohnSmith"
                    onChange={(event) =>
                      handleInvoiceData({ city: event.target.value })
                    }
                  />
                </Form.Group>
                <br />
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Hospital Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="JohnSmith"
                    onChange={(event) =>
                      handleInvoiceData({ country: event.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Hospital Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="JohnSmith"
                    onChange={(event) =>
                      handleInvoiceData({ zip_code: event.target.value })
                    }
                  />
                </Form.Group>
                <br />
                <Form.Group
                  className="mb-3"
                  controlId="formBasicCheckbox"></Form.Group>
                <br></br>
                <Button
                  variant="outline-danger"
                  type="submit"
                  onClick={(event) => handleSubmitClick(event)}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export default InvoiceForm;
