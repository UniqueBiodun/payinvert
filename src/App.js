import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import PaymentLink from "./Pages/PaymentLink/PaymentLink";
import { Helmet } from "react-helmet";

// http://localhost:3001/?first_name=Daniel&last_name=Johnson&mobile=+2348140710794&country=NG&email=arikawedaniel@gmail.com&currency=NGN&option=BT&amount=100&reference=ORD12DC89289033323&description=Food

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/:reference?">
          <PaymentLink />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
