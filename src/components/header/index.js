import React from "react";

import { connect } from "react-redux";
import Actions from "actions";

import { Link, withRouter } from "react-router-dom";

import "./header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }
  componentDidMount() {
    const { getUserSessionData } = this.props;
    console.log("header", getUserSessionData);

    if (
      getUserSessionData.data !== undefined &&
      Object.keys(getUserSessionData.data).length !== 0
    ) {
      console.log("is  login");
      this.setState({ isLogin: true });
    } else {
      console.log("is no login");
      this.setState({ isLogin: false });
    }
  }

  componentDidUpdate(prevProps) {
    console.log("header did update");
    const { getUserSessionData } = this.props;

    if (
      prevProps.getUserSessionData.isLoading &&
      !getUserSessionData.isLoading
    ) {
      if (
        getUserSessionData.data !== undefined &&
        Object.keys(getUserSessionData.data).length !== 0
      ) {
        console.log("is  login");
        this.setState({ isLogin: true });
      } else {
        console.log("is no login");
        this.setState({ isLogin: false });
      }
    }
  }

  onLogoutPressed() {
    console.log("asd");
    this.props.resetUserSession();
    this.props.history.push("/login");
  }

  render() {
    return (
      <div className="header">
        <nav>
          <ul>
            {this.state.isLogin === false ? (
              <>
                <li>
                  <Link to="/login">login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            ) : (
              <li onClick={() => this.onLogoutPressed()}>Logout</li>
            )}
          </ul>
        </nav>
      </div>
    );
  }
}

//get the api
const mapStateToProps = (store) => ({
  getUserSessionData: Actions.getUserSession(store),
});

//
const mapDispatchToProps = {
  resetUserSession: Actions.resetUserSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
