import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Detailed from "./pages/Detailed";
import Search from "./pages/Search";
// import Settings from "./pages/Settings";

const app = document.querySelector('.container');

ReactDOM.render(
  //The below line initialize the Router component
  //hashHistory is required
  <Router history={hashHistory}>
    {/* Basic or Initial route */}
    {/* Layout is the Root app component */}
    <Route path="/" component={Layout}>
      {/* IndexRoute is the default child component */}
      {/* If you call {this.props.children} in the Layout component 
          that would call the one of the following component */}
      <IndexRoute component={Home}></IndexRoute>
      <Route path="Detailed" name="detailed" component={Detailed}></Route>
      <Route path="Search" name="search" component={Search}></Route>
      {/* <Route path="archives(/:article)" name="archives" component={Archives}></Route>
      <Route path="settings" name="settings" component={Settings}></Route> */}
    </Route>
  </Router>,
app);
