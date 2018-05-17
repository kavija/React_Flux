import React from "react";
import { Link } from "react-router";

import Header from './Header'
import Footer from './Footer'
// import Nav from "../components/layout/Nav";

export default class Layout extends React.Component {
  render() {
    this.state = { title: "YouTube" };
    const { location } = this.props;
    const containerStyle = {
      marginTop: "10px"
    };
    // console.log(this.props);
    return (
      <div>

        {/* <Nav location={location} /> */}
        <Header title={this.state.title} />
        <div class="container" style={containerStyle}>
          <div class="row">
            <div class="col-lg-12">
              {/* {this.props.children} would call the corresponding navigation child component */}
              {this.props.children}
            </div>
          </div>
          <Footer/>
        </div>
      </div>

    );
  }
}
