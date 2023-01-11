import { useEffect, useState } from "react";
import Header from "../Header/Header";
import HospitalTable from "../HospitalTable/HospitalTable";
import Button from "react-bootstrap/Button";

function Home() {
  const [hospitalData, setHospitalData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const [user, setUser] = useState([]);
  const [loginState, setLoginState] = useState(null);

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
        .then((data) => {
          setHospitalData(data.result);
        });
    }
  }, [user]);

  return (
    <>
      <Header></Header>
      <div style={{ backgroundColor: "#191919" }}>
        <br />
        <br />
        <div className="heading">
          <h1>Mask Stocks</h1>
        </div>
        <br />
        <div className="heading">
          <h3>Bellow, you will find your registered hospitals.</h3>
        </div>
        <br />
        {loginState && hospitalData ? (
          <>
            <HospitalTable list={hospitalData}></HospitalTable>
          </>
        ) : null}
        <br />
        <h4 className="heading">
          To find out more about our masks, press the button.
        </h4>
        <br />
        <div className="buttons">
          <Button variant="outline-light" href="/order">
            Order
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
