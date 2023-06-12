import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import easyinvoice from "easyinvoice";

function InvoiceForm() {
  const [invoiceData, setInvoiceData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    zip_code: "",
  });
  const [maskDetails, setMaskDet] = useState([]);
  const [productData, setProductData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartData, setCartData] = useState(0);
  const [submitValid, setSubmitValid] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // ---- in useEffect() I stored all the fetches needed to take and store the neccessary data ----

  useEffect(() => {
    fetch("http://127.0.0.1:9000/api/stockDetails", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setMaskDet(data));

    fetch("http://127.0.0.1:9000/api/productList", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setProductData(data));
    fetch("http://127.0.0.1:9000/api/cartData", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setCartData(data));
    fetch("http://127.0.0.1:9000/api/basketData", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setTotalPrice(data));
  }, []);

  // ---- end of fetching and storing data ----

  /* ---- calculate the date and substract all the data to go on the invoice. It's kinda needed cause you gotta take 
    the element out of the list (in which you store it initially). CartData is initially an object,
   [cartData] turned it into an Array so we could work with it just as with the others ---- */

  let today = new Date();

  let day15 = new Date();
  day15.setDate(day15.getDate() + 14);

  let productName;
  let cartValue;
  let priceValue;
  let companyName;
  let companyAddress;
  let companyCity;
  let companyCountry;
  let companyZip;

  const productList = productData.map(
    (product, index) => (productName = product.name)
  );

  const cartList = [cartData].map(
    (product, index) => (cartValue = product.amount)
  );

  const priceList = [totalPrice].map(
    (product, index) => (priceValue = product.total)
  );
  const companyNameList = maskDetails.map(
    (name, index) => (companyName = name.name)
  );
  const companyAddressList = maskDetails.map(
    (address, index) => (companyAddress = address.address)
  );
  const companyCityList = maskDetails.map(
    (city, index) => (companyCity = city.city)
  );
  const companyCountryList = maskDetails.map(
    (country, index) => (companyCountry = country.country)
  );
  const companyZipList = maskDetails.map(
    (zip, index) => (companyZip = zip.zip_code)
  );

  // ---- end of calculating and substracting invoice data ----

  // ---- handleGoHome redirects us, onClick,towards the component Home ----
  const navigate = useNavigate();
  const handleGoHome = useCallback(
    () => navigate("/home", { replace: true }),
    [navigate]
  );

  // ---- handleInvoiceData updates our DB with the InvoiceForm Data ----
  const handleInvoiceData = (data) => {
    return setInvoiceData((previous) => {
      return { ...previous, ...data };
    });
  };

  // ---- downloadInvoice transforms the object we create in getSampleData() into pdf and makes it download-able ----

  const downloadInvoice = async () => {
    const data = await getInvoiceData();
    const result = await easyinvoice.createInvoice(data);
    console.log(easyinvoice.download("MaskStockInvoice.pdf", result.pdf));
  };

  // ---- handleSubmitClick(event) sends our InvoiceForm data into the DB ----

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
        console.log(data);
      });
    setSubmitValid(true);
    setSubmitMessage("Order Sucessfully Submitted!");
  };

  /* ---- getInvoiceClick(e) downloads our invoice and sends us back Home. Did this one because handleSubmitClick
  couldn't be bothered to actually work if I used it for that purpose. ---- */

  const getInvoiceClick = (e) => {
    e.preventDefault();
    downloadInvoice();
    handleGoHome();
  };

  // ---- getInvoiceData(), basically, this is literally our invoice ----

  const getInvoiceData = () => {
    return {
      images: {
        logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
        background: "https://public.easyinvoice.cloud/img/watermark-draft.jpg",
      },
      sender: {
        company: `${companyName}`,
        address: `${companyAddress}`,
        city: `${companyCity}`,
        country: `${companyCountry}`,
        zip: `${companyZip}`,
      },
      client: {
        company: `${invoiceData.name}`,
        address: `${invoiceData.address}`,
        zip: `${invoiceData.zip_code}`,
        city: `${invoiceData.city}`,
        country: `${invoiceData.country}`,
      },
      information: {
        number: "2021.0001",
        date: today.toLocaleDateString(),
        "due-date": day15.toLocaleString(),
      },
      products: [
        {
          quantity: `${cartValue}`,
          description: `${productName}`,
          "tax-rate": 27,
          price: `${priceValue}`,
        },
      ],
      "bottom-notice": "Kindly pay your invoice within 15 days.",
      settings: {
        currency: "USD",
      },
    };
  };
  return (
    <>
      <Header></Header>
      <div style={{ backgroundColor: "#191919" }}>
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
                <br />
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
                {submitValid ? (
                  <div style={{ color: "black" }}>{submitMessage}</div>
                ) : null}
                <div className="d-grid gap-2 mt-2">
                  <Button
                    variant="outline-dark"
                    onClick={(event) => handleSubmitClick(event)}>
                    Submit
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={(event) => getInvoiceClick(event)}>
                    Download Invoice
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export default InvoiceForm;
