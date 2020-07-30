import React from "react";

import { connect } from "react-redux";
import Actions from "actions";

import { Link } from "react-router-dom";

import TaskList from "components/taskList";

import "./dashboard.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      title: "",
      description: "",
      status: "",
      taskList: [],
    };
  }

  componentDidMount() {
    this.props.onGetAll();
  }

  componentDidUpdate(prevProps) {
    const { getGetAllData } = this.props;

    if (prevProps.getGetAllData.isLoading && !getGetAllData.isLoading) {
      if (getGetAllData.data.status === "success") {
        console.log("dashboard did update", getGetAllData);
        this.setState({ taskList: getGetAllData.data.all });
      }
    }
  }

  onShowFormPressed() {
    this.setState({ showForm: !this.state.showForm });
  }

  _onSubmitButtonPressed() {
    const { title, description, status } = this.state;

    if (title !== "" && description !== "" && status !== "") {
      const data = {
        title,
        description,
        status,
      };

      this.props.onCreate(data);
    } else {
      alert("Please fill all");
    }
  }

  render() {
    console.log(this.state.taskList);
    return (
      <div>
        <h1>this is Dashboard</h1>
        <button onClick={() => this.onShowFormPressed()}>add new task</button>
        {this.state.showForm && (
          <div className="formContainer">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="title"
              id="title"
              onChange={(title) => this.setState({ title: title.target.value })}
            />

            <label htmlFor="description">description</label>
            <input
              type="text"
              placeholder="description"
              id="description"
              onChange={(description) =>
                this.setState({ description: description.target.value })
              }
            />

            <label htmlFor="status">status</label>
            <input
              type="text"
              placeholder="status"
              id="status"
              onChange={(status) =>
                this.setState({ status: status.target.value })
              }
            />

            <button onClick={() => this._onSubmitButtonPressed()}>
              submit
            </button>
          </div>
        )}

        <div
          style={{
            margin: "0 auto",
            maxWidth: 900,
            // backgroundColor: "red",
            display: "grid",
            gridTemplateColumns: "auto auto auto",
            justifyContent: "space-around",
          }}
        >
          {this.state.taskList.map((list) => (
            <Link
              key={list.id}
              to={{
                pathname: `/dashboard/${list.id}`,
                taskProps: list,
              }}
            >
              <TaskList
                title={list.list_title}
                description={list.list_desc}
                status={list.list_status}
              />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

//get the api
const mapStateToProps = (store) => ({
  getGetAllData: Actions.getGetAllData(store),
});

//
const mapDispatchToProps = {
  onGetAll: Actions.getAll,
  onCreate: Actions.create,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
