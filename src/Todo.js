import React from "react";
import { connect } from "react-redux";
import { removeTodo, completeStatus } from "./actionCreators/actionCreators";

function Todo(props) {
  const { content, id, checked } = props;
  let itemClass = "todo-item";
  if (checked) {
    itemClass += " checked";
  }
  return (
    <div
      className={itemClass}
      onClick={() => {
        props.completeStatus(id);
      }}
    >
      {content}
      <span
        className="remove-todo"
        onClick={e => {
          e.stopPropagation();
          props.removeTodo(id);
        }}
      >
        X
      </span>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  removeTodo: todo => {
    dispatch(removeTodo(todo));
  },
  completeStatus: todos => {
    dispatch(completeStatus(todos));
  }
});
export default connect(null, mapDispatchToProps)(Todo);
