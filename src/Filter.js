import React, { Component } from "react";
import { connect } from "react-redux";
import { setFilter } from "./actionCreators/actionCreators";

const options = [
  { label: "Hepsi", labelKey: "all" },
  { label: "Tamamlanmış", labelKey: "completed" },
  { label: "Tamamlanmamış", labelKey: "uncompleted" }
];

class Filter extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        {options.map(option => {
          return (
            <div onClick={() => this.props.changeFilter(option.labelKey)}>
              {option.label}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeFilter: state.filter
  };
};

const mapDispatchToProps = dispatch => ({
  changeFilter: newFilter => {
    dispatch(setFilter(newFilter));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
