import "./App.css";
import Stripe from "stripe";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarContainer from "./components/NavbarContainer";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cancel from "./pages/Cancel";
import Success from "./pages/Success";
import Store from "./pages/Store";
import CartProvider from "./CardContext";

function App() {
  return (
    <CartProvider>
      <Container>
        <NavbarContainer></NavbarContainer>
        <BrowserRouter>
          <Routes>
            <Route index element={<Store />} />
            <Route path="sucess" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </CartProvider>
  );
}

export default App;
