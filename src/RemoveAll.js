import React from "react";
import { connect } from "react-redux";
import { removeAll } from "./actionCreators/actionCreators";

class RemoveAll extends React.Component {
  render() {
    return (
      <button
        className="remove-all"
        onClick={() => {
          this.props.removeAll();
        }}
      >
        Tümünü Sil
      </button>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  removeAll: todos => {
    dispatch(removeAll(todos));
  }
});
export default connect(null, mapDispatchToProps)(RemoveAll);
