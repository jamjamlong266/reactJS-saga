import React from "react";

import "./taskList.css";

class TaskList extends React.Component {
  render() {
    return (
      <div className="taskContainer">
        <div className="taskHeader">
          <h4 className="taskTitle">{this.props.title}</h4>
          <p className="taskStatus">{this.props.status}</p>
        </div>

        <div className="taskDetail">
          <p className="taskDescription">{this.props.description}</p>
        </div>
      </div>
    );
  }
}

export default TaskList;
