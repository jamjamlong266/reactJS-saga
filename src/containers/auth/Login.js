import React, { Component } from "react";

import { connect } from "react-redux";
import Actions from "../../actions";

import "./login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: "",
      passwordInput: "",
    };

    // this.onSubmitPressed = this.onSubmitPressed.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { getLoginData } = this.props;

    if (prevProps.getLoginData.isLoading && !getLoginData.isLoading) {
      console.log("login componentDidUpdata", getLoginData);
      if (getLoginData.data.status === "success") {
        alert("Welcome !");
        this.props.history.push("/dashboard");
      } else if (getLoginData.error !== undefined) {
        alert("Failed Try again!!");
      }
    }
  }

  onSubmitPressed() {
    const { emailInput, passwordInput } = this.state;

    const data = {
      email: emailInput,
      password: passwordInput,
    };

    console.log(data);
    this.props.onLogin(data);
  }

  render() {
    return (
      <div className="loginContainer">
        <h1>this is login screen</h1>
        <input
          type="text"
          placeholder="email"
          onChange={(email) => {
            this.setState({ emailInput: email.target.value });
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(password) => {
            this.setState({ passwordInput: password.target.value });
          }}
        />

        <button onClick={() => this.onSubmitPressed()}>Login</button>
      </div>
    );
  }
}

//get update data from saga
const mapStateToProps = (store) => ({
  getLoginData: Actions.getLoginData(store),
});

const mapDispatchToProps = {
  onLogin: Actions.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
