import { useEffect, useState } from "react";
import Header from "../Header/Header";
import HospitalTable from "../HospitalTable/HospitalTable";

function Home() {
  const [hospitalData, setHospitalData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [productData, setProductData] = useState([]);

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
      <br />
      <br />
      <br />
      <div className="heading">
        <h1>Mask Stocks</h1>
      </div>
      <br />
      <div className="heading">
        <h3>Bellow, you will find your registered hospitals.</h3>
      </div>
      {loginState && hospitalData ? (
        <>
          <br />
          <HospitalTable list={hospitalData}></HospitalTable>
        </>
      ) : null}
    </>
  );
}

export default Home;
