import { useState } from "react";
import MedItemCartList from "./MedItemCartList";
import "../../CartPage.css"

function CartPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div id="cart">
      <div className="flex">
      <form id="cart-form">
        <label>
          Full name:
          <input
            name="name"
            value={name}
            onInput={(e) => {
              setName(e.target.value);
            }}
            placeholder="Full name"
            id="name"
            required
          />
        </label>

        <label>
          Email:
          <input
            name="email"
            value={email}
            onInput={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            id="email"
            type="email"
            required
          />
        </label>

        <label>
          Phone number:
          <input
            name="phone"
            value={phone}
            onInput={(e) => {
              setPhone(e.target.value);
            }}
            placeholder="Phone number"
            id="phone"
            required
            type="phone"
          />
        </label>

        <label>
          Address:
          <input
            name="address"
            value={address}
            onInput={(e) => {
              setAddress(e.target.value);
            }}
            placeholder="Address"
            id="address"
            required
          />
        </label>
      </form>
      
      <MedItemCartList />
      </div>

      <h2>Total price: 123</h2>

      <button>Continue shopping</button>
      <button>Submit</button>


    </div>
  );
}

export default CartPage;
