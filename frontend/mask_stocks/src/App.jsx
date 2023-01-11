import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import Home from "./Components/Home/Home";
import FirstPage from "./Components/FirstPage/FirstPage";
import LoginForm from "./Components/Login/Login";
import ProductCard from "./Components/ProductCard/ProductCard";
import BasketTable from "./Components/BasketTable/BasketTable";
import InvoiceForm from "./Components/InvoiceForm/InvoiceForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FirstPage />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/order" element={<ProductCard />}></Route>
      <Route path="/basket" element={<BasketTable />}></Route>
      <Route path="/form" element={<InvoiceForm />}></Route>
    </Routes>
  );
}

export default App;
