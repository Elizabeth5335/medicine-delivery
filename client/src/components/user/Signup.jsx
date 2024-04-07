import React from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../../Signup.css";
import bcrypt from "bcryptjs";
import { UserContext } from "../../context/UserContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const { setIsLoggedIn, dispatchUser } = useContext(UserContext);

  const salt = bcrypt.genSaltSync(10);
  function validateForm() {
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)
    ) {
      errors.phone = "Phone number is invalid";
    }
    if (!address.trim()) {
      errors.address = "Address is required";
    }
    if (!password.trim()) {
      //add validation
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function login(e) {
    e.preventDefault();
    const hashedPassword = bcrypt.hashSync(password, salt);

    if (validateForm()) {
      try {
        axios
          .post("/api/users", {
            name,
            email,
            phone,
            address,
            hashedPassword,
          })
          .then((response) => {
            const data = response.data;
            console.log(data);
            if (data.status === "ok") {
              dispatchUser({type: "set_name", value: name})
              setName("");
              dispatchUser({type: "set_name", value: email})
              setEmail("");
              dispatchUser({type: "set_name", value: phone})
              setPhone("");
              dispatchUser({type: "set_name", value: address})
              setAddress("");
              dispatchUser({type: "set_name", value: password})
              setPassword("");
              setIsLoggedIn(true);
              window.location.replace("/account");
              return alert("Account created!");
            } else {
              alert("Error: " + data.error);
            }
          })
          .catch((error) => {
            alert("Error: " + error.message);
          });
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  }

  return (
    <div className="signup">
      <form id="cart-form" onSubmit={login}>
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
