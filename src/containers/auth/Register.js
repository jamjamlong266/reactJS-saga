import React from "react";

//to dispatch the action from VIEW
import { connect } from "react-redux";
import Actions from "../../actions";

import "./Register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      showPop: false,
      statusMessage: "",
      buttonText: "",
    };
  }

  //component life cycle
  componentDidMount() {
    //call the api get all list
    console.log("REGISRTER PAGE IS CALLED");
  }

  componentDidUpdate(prevProps) {
    //maxminum call
    //if the prevProps of register data is different with current register data, that means register reducer is updated.
    const { getRegisterData } = this.props;

    if (prevProps.getRegisterData.isLoading && !getRegisterData.isLoading) {
      console.log(getRegisterData);
      if (getRegisterData.data.status === "success") {
        // alert("Success");
        this.setState({
          showPop: true,
          statusMessage: "Success",
          buttonText: "Go Login",
        });
        this.props.history.push("/login");
      } else if (getRegisterData.error !== null) {
        // alert("Failed");
        this.setState({
          showPop: true,
          statusMessage: "Failed",
          buttonText: "Try again",
        });
      }
    }
  }

  popButtonPressed() {
    const { statusMessage } = this.state;

    if (statusMessage === "success") {
      this.props.history.push("/login"); //.history is from router dom
    } else {
      this.setState({ showPop: false, email: "", password: "" });
      // this.props.history.push("/register");
    }
  }

  onSubmitPressed() {
    const { name, email, password, password_confirmation } = this.state;

    const data = {
      name,
      email,
      password,
      password_confirmation,
    };

    this.props.onRegister(data);
  }

  render() {
    return (
      <div>
        {this.state.showPop && (
          <div className="popBox">
            <h1>{this.state.statusMessage}</h1>
            <button onClick={() => this.popButtonPressed()}>
              {this.state.buttonText}
            </button>
          </div>
        )}

        <h1>This is register</h1>

        <input
          type="text"
          placeholder="name"
          onChange={(name) => this.setState({ name: name.target.value })}
        />

        <input
          type="email"
          value={this.state.email}
          placeholder="email"
          onChange={(email) => this.setState({ email: email.target.value })}
        />

        <input
          type="password"
          value={this.state.password}
          placeholder="password"
          onChange={(password) =>
            this.setState({ password: password.target.value })
          }
        />

        <input
          type="password"
          placeholder="password_confirmation"
          onChange={(password_confirmation) =>
            this.setState({
              password_confirmation: password_confirmation.target.value,
            })
          }
        />

        <button onClick={() => this.onSubmitPressed()}>Submit</button>
      </div>
    );
  }
}

//get the data from api
const mapStateToProp = (store) => ({
  getRegisterData: Actions.getRegisterData(store),
});

//dispatch the action as props
const mapDispatchToProps = {
  onRegister: Actions.register,
};

export default connect(mapStateToProp, mapDispatchToProps)(Register);
