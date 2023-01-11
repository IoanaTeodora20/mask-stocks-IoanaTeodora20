import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Header from "../Header/Header";
import HospitalTable from "../HospitalTable/HospitalTable";

function BasketTable() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartData, setCartData] = useState(0);
  const [productData, setProductData] = useState([]);
  const [hospitalData, setHospitalData] = useState([]);
  const [loginState, setLoginState] = useState(null);
  const [user, setUser] = useState([]);

  // ---- the first useEffect() stores our hospital data and shows it only if we have a user Logged in ----
  useEffect(() => {
    if (user) {
      fetch("http://127.0.0.1:9000/api/hospitalList", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          setHospitalData(data.result);
        });
    }
  }, [user]);

  // ---- this useEffect() fetches our data from the server and stores it. setLoginState() stores whether we are logged in or not ----
  useEffect(() => {
    fetch("http://127.0.0.1:9000/api/user", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoginState(data);
      });
    fetch("http://127.0.0.1:9000/api/basketData", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setTotalPrice(data.total));

    fetch("http://127.0.0.1:9000/api/cartData", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setCartData(data.amount));
    fetch("http://127.0.0.1:9000/api/productData", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setProductData(data);
      });
  }, []);

  console.log(totalPrice);
  // ---- we need the loginState so our table will show only if we are logged in, and not before ----

  return (
    <>
      <Header></Header>
      {loginState && productData ? (
        <div style={{ backgroundColor: "#191919" }}>
          <br />
          <h3 className="heading">Your Order Details</h3>
          <br />
          <div id="table">
            <Table responsive="sm" striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price/Pc</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {productData.map((mask, index) => (
                  <tr key={mask.name}>
                    <td>{mask.name}</td>
                    <td>{cartData}</td>
                    <td>{mask.price} lei</td>
                    <td>{totalPrice} lei</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="mt-5">
            <h3 className="heading">Your Registered Hospitals</h3>
            <br />
            <div id="table">
              <HospitalTable list={hospitalData} />
            </div>
          </div>
          <div className="buttons mt-4">
            <Button href="/form" variant="outline-light">
              Continue
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default BasketTable;
