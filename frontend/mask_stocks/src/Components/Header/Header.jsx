import { useEffect, useState, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
// import Image from "react-bootstrap/Image";

function Header() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:9000/api/user", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  useEffect(() => {
    if (user) {
      fetch("http://127.0.0.1:9000/api/hospitalList", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => console.log(data.result));
    }
  }, [user]);

  function handleLogOut(event) {
    event.preventDefault();
    fetch("http://127.0.0.1:9000/api/logout", {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Logged Out") {
          logOut();
        }
      });
  }
  const navigate = useNavigate();
  const logOut = useCallback(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <>
      {/* <div style={{ width: "30%" }}>
        <Image
          src="https://cdn.thewirecutter.com/wp-content/media/2021/12/clothfacemasks-2048px-5834-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=1024"
          fluid={true}
        />
      </div> */}
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">MASK_STOCKS</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="d-flex justify-content-between">
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title={user.email} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={(event) => handleLogOut(event)}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
