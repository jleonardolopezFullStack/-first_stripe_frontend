import { useContext, useState } from "react";
import { Button, Container, Navbar, Modal } from "react-bootstrap";
//import axios from "axios";
import { CartContext } from "../CardContext";
import CartProduct from "./CartProduct";

const NavbarContainer = () => {
  const cart = useContext(CartContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const url_testing =
    "https://firststripebackend-production.up.railway.app/checkout";
  //"http://localhost:4000/checkout";
  //https://firststripebackend-production.up.railway.app/
  //http://localhost:4000/checkout
  const checkout = async () => {
    await fetch(url_testing, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url);
        }
      });
  };
  /* const checkout = async (data) => {
    return await axios.post(`${url_testing}`, data);
  };

  const verifyCheckout = async (data) => {
    const res = await checkout(data);
    console.log(res);
  }; */

  const productCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/">Ecommerce Store</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Cart {productCount} Items</Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productCount > 0 ? (
            <>
              <p>Items in your cart:</p>
              {cart.items.map((currentProduct, idx) => (
                <CartProduct
                  key={idx}
                  id={currentProduct.id}
                  quantity={currentProduct.quantity}
                ></CartProduct>
              ))}
              <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>
              <Button
                variant="success"
                onClick={
                  checkout /* () => verifyCheckout({ items: cart.items }) */
                }
              >
                Purchase items!
              </Button>
            </>
          ) : (
            <h1>There are no item in your Cart!</h1>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavbarContainer;
