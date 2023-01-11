import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Header from "../Header/Header";
import { useState, useEffect } from "react";

function ProductCard(onAdd) {
  const [productData, setProductData] = useState([]);
  const [loginState, setLoginState] = useState(null);
  const [cart, setCart] = useState(0);
  const [basketData, setBasketData] = useState(0);
  const [count, setCount] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:9000/api/user", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setLoginState(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:9000/api/productData", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setProductData(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:9000/api/cartData", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: cart }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, [cart]);

  useEffect(() => {
    fetch("http://127.0.0.1:9000/api/basketData", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total: basketData }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  });

  const handleMinusClick = () => {
    if (count > 1) {
      setCount(count - 1);
      setMessage(null);
    } else {
      setMessage("Please Enter a Valid Number");
    }
  };

  const handlePlusClick = () => {
    if (count === null || count === "") {
      setCount(1);
    } else {
      setCount(count + 1);
      setMessage(null);
    }
  };

  function handleInputValueChange(e) {
    e.preventDefault();
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      const inputValue = Number(e.target.value);
      setCount(inputValue);
      setMessage("Qty updated");
    } else {
      setMessage("Your input is not valid");
    }
  }

  function addItem(newItem) {
    // console.log(newItem, "New Itemm");
    setCart(newItem);
    calculateBasketPrice(newItem);
  }

  const calculateBasketPrice = async (cart) => {
    let price;
    let qty = cart;
    let pricePieceList = productData.map(
      (product, index) => (price = Number(product.price))
    );
    let finalSumBasket = price * qty;
    setBasketData(finalSumBasket);
  };

  const SubmitQty = (e) => {
    e.preventDefault();
    if (count) {
      console.log({ count });
      addItem(count);
      setMessage("Items Added to Cart");
    } else {
      setMessage("Please Enter a Valid Number");
    }
  };

  return (
    <>
      <Header></Header>
      {loginState && productData ? (
        <div style={{ backgroundColor: "#191919" }}>
          <br />
          <div id="table">
            {productData.map((product, index) => (
              <Card key={product.name} style={{ width: "20%" }}>
                <Card.Img variant={top} src={product.image} fluid="true" />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    Durable, {product.name} to keep you safe all seasons long!
                  </Card.Text>
                  <Card.Text>Stock: {product.quantity}pcs</Card.Text>
                  <Card.Text>Price: {product.price} lei/pc</Card.Text>
                  <div className="input">
                    <div className="counter">
                      <button
                        className="minus"
                        onClick={() => handleMinusClick()}>
                        -
                      </button>
                      <input
                        type="text"
                        min="1"
                        value={count}
                        onClick={() => setCount(null)}
                        onChange={(e) => handleInputValueChange(e)}
                        style={{ width: "20%", textAlign: "center" }}
                      />
                      <button
                        className="plus"
                        onClick={() => handlePlusClick()}>
                        +
                      </button>
                    </div>
                    <br />
                    {message}
                    <br />
                    <button className="AddBtn" onClick={(e) => SubmitQty(e)}>
                      Add
                    </button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
          <br />
          <div className="buttons mb-4">
            <Button href="/basket" variant="outline-light">
              Cart
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ProductCard;
