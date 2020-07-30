import React from "react";

import { connect } from "react-redux";
import Actions from "actions";

import { Link } from "react-router-dom";

import "./taskDetail.css";

class TaskDetail extends React.Component {
  constructor(props) {
    super(props);
    let location = this.props.location;
    console.log(location);

    this.state = {
      task: location.taskProps,
    };
  }

  componentDidUpdate(prevProps) {
    const { getDeleteTaskData } = this.props;

    if (prevProps.getDeleteTaskData.isLoading && !getDeleteTaskData.isLoading) {
      if (getDeleteTaskData.data.status === 1) {
        alert("Delete success");
        this.props.history.push("/dashboard");
      }
    }
  }

  onDeletePressed(id) {
    this.props.onDeleteTask(id);
  }

  render() {
    return (
      <div>
        <div>
          <ul className="breadcrumb">
            <li>Home</li>
            <Link to="/dashboard">
              <li>Dashboard</li>
            </Link>
          </ul>
        </div>

        {this.state.task !== undefined && (
          <div className="taskCardContainer">
            <div className="taskId">
              <p>1</p>
            </div>
            <div className="taskHolder">
              <div>
                <div className="taskHeader">
                  <h2>To do title</h2>
                  <p>Pending</p>
                </div>
                <div>
                  <p>des</p>
                </div>
              </div>

              <div>
                <p>01-09-2020</p>
                <button
                  onClick={() => this.onDeletePressed(this.state.task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

//get api
const mapStateToProps = (store) => ({
  getDeleteTaskData: Actions.getDeleteTaskData(store),
});

const mapDispatchToProps = {
  onDeleteTask: Actions.deleteTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
