import Header from "../Header/Header";
function FirstPage() {
  return (
    <>
      <Header></Header>
      <div style={{ backgroundColor: "#191919" }}>
        <br />
        <br />
        <br />
        <h1 className="heading" size="lg">
          Welcome to Mask-Stocks!
        </h1>
        <br />
        <br />
        <h5 className="heading mt-2">
          To purchase the neccessary items from our platform, please, Login!
        </h5>
      </div>
    </>
  );
}

export default FirstPage;
