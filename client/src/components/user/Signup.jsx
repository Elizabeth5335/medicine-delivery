import React from "react";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../../Signup.css";
import { UserContext } from "../../context/UserContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const { signup } = useContext(UserContext);


  return (
    <div className="signup">
      <form
        id="cart-form"
        onSubmit={(e) => {
          signup(
            e,
            name,
            email,
            phone,
            address,
            password,
            setName,
            setEmail,
            setPhone,
            setAddress,
            setPassword,
            setFormErrors
          );
        }}
      >
        <label>
          Email:
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            id="email"
            type="email"
            required
          />
          {formErrors.email && (
            <span className="error">{formErrors.email}</span>
          )}
        </label>

        <label>
          Password:
          <div className="input-group">
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              required
            />

            <div className="input-group-append">
              <span className="input-group-text">
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  color="grey"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </span>
            </div>
          </div>
          {formErrors.password && (
            <span className="error">{formErrors.password}</span>
          )}
        </label>

        <label>
          Full name:
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            id="name"
            required
          />
          {formErrors.name && <span className="error">{formErrors.name}</span>}
        </label>
        <label>
          Phone number:
          <input
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            id="phone"
            required
            type="phone"
          />
          {formErrors.phone && (
            <span className="error">{formErrors.phone}</span>
          )}
        </label>

        <label>
          Address:
          <input
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            id="address"
            required
          />
          {formErrors.address && (
            <span className="error">{formErrors.address}</span>
          )}
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
