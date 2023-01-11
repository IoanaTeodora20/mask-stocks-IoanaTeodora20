import { useEffect, useState, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

function Header() {
  const [user, setUser] = useState([]);

  // ---- this useEffect fetches our user object(the loginForm Data(in a nutshell)) and stores it ----

  useEffect(() => {
    fetch("http://127.0.0.1:9000/api/user", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  /* ---- this useEffect() fetches our hospital data, if we have a user logged in,
  remember, we need the user email to fetch only the right hospitals ---- */

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

  // ---- handleLogOut() deletes the user when clicked ----

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

  // ---- and logOut() takes us back to the first page ----

  const navigate = useNavigate();
  const logOut = useCallback(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <>
      <div className="header"></div>
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
