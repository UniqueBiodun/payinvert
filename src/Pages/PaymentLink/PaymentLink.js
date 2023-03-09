import "react-phone-number-input/style.css";
import React, { useState, useEffect, CSSProperties } from "react";
import "./Paymentlink.module.css";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import PhoneInput from "react-phone-number-input";

// http://localhost:3001/?first_name=Daniel&last_name=Johnson&mobile=+2348140710794&country=NG&email=arikawedaniel@gmail.com&currency=NGN&option=BT&amount=100&reference=ORD12DC89289033323&description=Food

const PaymentLink = () => {
  const params = useParams();
  const paymentReference = params?.reference;
  const [loading, setLoading] = useState(false);

  const notifySuccess = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  const notifyError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT
    });
  };
  function generateRandomString() {
    let randomString = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 18; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomString;
  }

  const [amount, setAmount] = useState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [option, setOption] = useState("");
  const [description, setDescription] = useState();
  const [apiKey, setApiKey] = useState();
  const [encryptionKey, setEncryptionKey] = useState();
  const [merchantReference, setMerchantReference] = useState(
    generateRandomString()
  );

  const inputStyles = {
    background: "rgba(249, 250, 252)",
    fontFamily: "Steradian",
    border: "1px solid #ECF0F4",
    fontSize: "12px",
    borderRadius: "4px",
    borderStyle: "solid",
    color: "#212B4C",
    padding: "8px",
    width: "100%"
  };

  const makePayment = () => {
    if (firstName === "" || firstName === undefined || firstName === null) {
      notifyError("First name is required");
      return;
    }
    if (lastName === "" || lastName === undefined || lastName === null) {
      notifyError("Last name is required");
      return;
    }
    if (mobile === "" || mobile === undefined || mobile === null) {
      notifyError("Mobile number is required");
      return;
    }
    if (email === "" || email === undefined || email === null) {
      notifyError("Email is required");
      return;
    }
    if (country === "" || country === undefined || country === null) {
      notifyError("Country is required");
      return;
    }
    if (
      amount === "" ||
      amount === undefined ||
      amount === null ||
      amount === 0
    ) {
      notifyError("Amount is required");
      return;
    }
    if (currency === "" || currency === undefined || currency === null) {
      notifyError("Currency is required");
      return;
    }

    if (
      description === "" ||
      description === undefined ||
      description === null
    ) {
      notifyError("Description is required");
      return;
    }
    if (apiKey === "" || apiKey === undefined || apiKey === null) {
      notifyError("API Key is required");
      return;
    }
    if (
      merchantReference === "" ||
      merchantReference === undefined ||
      merchantReference === null
    ) {
      notifyError("Merchant Reference is required");
      return;
    }

    if (
      encryptionKey === "" ||
      encryptionKey === undefined ||
      encryptionKey === null
    ) {
      notifyError("Encryption Key is required");
      return;
    }

    const SayswitchPay = new window.PayinvertNS.Payinvert({
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      country: country,
      email: email,
      currency: currency,
      option: "BT",
      amount: amount,
      description: description,
      reference: "reference",
      apiKey: apiKey.trim(),
      encryptionKey: encryptionKey.trim(),
      merchantReference: !!merchantReference
        ? merchantReference
        : generateRandomString(),

      onCompleted: (data) => {
        // console.log("complete");
      },
      onClose: () => {
        // console.log("close");
      },
      onError: (error) => {
        // console.log(error, "error wa o");
      }
    });
    SayswitchPay.init();
    return;
  };

  const override = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "50px auto",
    borderColor: "red"
  };

  if (loading)
    return (
      <ClimbingBoxLoader
        color="#19943c"
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
        cssOverride={override}
      />
    );
  return (
    <div className="App">
      <div className="businessName"></div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <form className="form">
        <label className="label">First Name</label>
        <input
          style={inputStyles}
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label className="label">Last Name</label>
        <input
          style={inputStyles}
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label className="label">Mobile Number</label>

        <PhoneInput
          placeholder="Enter phone number"
          country="NG"
          defaultCountry="NG"
          value={mobile}
          style={inputStyles}
          onChange={setMobile}
        />
        <label className="label">Email Address</label>
        <input
          style={inputStyles}
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <label className="label">Country:</label>

        <select
          name="country"
          style={inputStyles}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value=""></option>
          <option value="NG">Nigeria</option>
          {/* <option value=""></option>
          <option value="NG">Nigeria</option>
      <option value="GH">Ghana</option>*/}
        </select>

        <label className="label">Currency:</label>

        <select
          name="currency"
          id="currency"
          style={inputStyles}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value=""></option>
          <option value="NGN">Naira</option>
        </select>
        {/*<label className="label">Payment options:</label>

       <select
          name="option"
          id="option"
          style={inputStyles}
          value={option}
          onChange={(e) => setOption(e.target.value)}
        >
          <option value=""></option>
          <option value="BT">Bank Transfer</option>
          <option value="USSD">USSD</option>
    </select>*/}

        <label className="label">Amount</label>
        <input
          style={inputStyles}
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          type="number"
        />
        <label className="label">Merchant Reference</label>
        <input
          style={inputStyles}
          name="reference"
          value={merchantReference}
          onChange={(e) => setMerchantReference(e.target.value)}
          required
        />
        <label className="label">Description</label>
        <input
          style={inputStyles}
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label className="label">API key</label>
        <input
          style={inputStyles}
          name="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          required
        />
        <label className="label">Encryption key</label>
        <input
          style={inputStyles}
          name="encryptionKey"
          value={encryptionKey}
          onChange={(e) => setEncryptionKey(e.target.value)}
          required
        />
      </form>

      <div className="gateway-button" onClick={() => makePayment()}>
        Proceed to checkout
      </div>
    </div>
  );
};

export default PaymentLink;
