/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import { Provider } from 'react-redux';
import store from './redux/store/store'
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import AdminLayout from "layouts/Admin.js";
import Login from "components/login/Login";
import Reffrel from "components/refrel/Reffrel.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FactorAuth from 'components/2FA/FactorAuth'
import Signup from "components/login/Signup";

//redux toolkit implementation
// import { store } from './reduxToolkit/store'
// import { Provider } from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
    <ToastContainer style={{ fontSize: 20 }} />
      <BrowserRouter>
        <Switch>
          <Route exact path="/auth" render={(props) => <FactorAuth {...props} />}/>
          <Route exact path="/adminlogin" render={(props) => <Login {...props} />} />
          <Route exact path="/factorLogin" render={(props) => <FactorAuth {...props} />} />
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/reffrel" render={(props) => <Reffrel {...props} />} />
          <Route path="/signup" render={(props) => <Signup {...props} />} />
          <Redirect to="/adminlogin" />
        </Switch>
      </BrowserRouter>
    </Provider>,
  document.getElementById("root")
);
