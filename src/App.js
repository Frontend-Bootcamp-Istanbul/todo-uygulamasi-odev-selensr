import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setTodos,
  addTodo,
  removeAll,
  removeTodo,
  completeStatus
} from "./actionCreators/actionCreators";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import RemoveAll from "./RemoveAll";
import Filter from "./Filter";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.toggleCompleteStatus = this.toggleCompleteStatus.bind(this);
  }

  componentDidMount() {
    // Component oluştuktan sonra gerekli olan datayı localstoragedan geyiriyoruz.
    let localTodos = window.localStorage.getItem("todos");
    if (localTodos) {
      localTodos = JSON.parse(localTodos);
    }
    // Getirdiğimiz datayı state'e kaydediyoruz.
    this.props.addTodo(localTodos || []);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps.todos) !== JSON.stringify(this.props.todos)) {
      window.localStorage.setItem("todos", JSON.stringify(this.props.todos));
    }
  }

  addTodo(newTodo) {
    this.props.addTodo({
      content: newTodo,
      id: Math.random(),
      checked: false
    });
  }

  removeTodo(id) {
    this.props.removeTodo(id);
  }

  removeAll = () => {
    this.props.removeAll();
  };

  toggleCompleteStatus = id => {
    this.props.completeStatus(id);
  };

  filterTodos = (todos, filterType) => {
    if (filterType === "all") {
      return todos;
    } else if (filterType === "completed") {
      return todos.filter(todo => todo.checked);
    } else {
      return todos.filter(todo => !todo.checked);
    }
  };

  render() {
    return (
      <div className="App" id="todo">
        <div className="todo-list todo-list-add">
          <h3>Todo Ekle / Sil</h3>
          <div>
            <AddTodo onTodoAdd={this.addTodo} />
            <RemoveAll />
            <Filter />
          </div>
        </div>

        <TodoList
          title="TodoList"
          todos={this.filterTodos(this.props.todos, this.props.activeFilter)}
          onTodoRemove={this.removeTodo}
          onCheckedToggle={this.toggleCompleteStatus}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeFilter: state.filter,
    todos: state.todos
  };
};

const mapDispatchToProps = dispatch => ({
  setTodos: todos => {
    dispatch(setTodos(todos));
  },
  addTodo: todos => {
    dispatch(addTodo(todos));
  },
  removeAll: todos => {
    dispatch(removeAll(todos));
  },
  removeTodo: todos => {
    dispatch(removeTodo(todos));
  },
  completeStatus: todos => {
    dispatch(completeStatus(todos));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

/* <TodoList
  title="Tamamlanmamış Todolar"
  todos={this.state.todos.filter(todo =>
  {
    return !todo.checked;
  })}
  onTodoRemove={this.removeTodo}
  onCheckedToggle={this.toggleCompleteStatus}
/>

  <TodoList
    title="Tamamlanmış Todolar"
    todos={this.state.todos.filter(todo =>
    {
      return todo.checked;
    })}
    onTodoRemove={this.removeTodo}
    onCheckedToggle={this.toggleCompleteStatus}
  /> */

//todolist presentational component
// app container component
