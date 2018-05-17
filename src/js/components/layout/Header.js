import React from "react";
import { IndexLink, Link } from "react-router";

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <h1><IndexLink to="/"><img src="../img/logo.png"/></IndexLink></h1>
        {/* <h1><Link to="detailed">Detailed</Link></h1> */}
      </div>
    );
  }
}