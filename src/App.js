import React, { useState } from "react";
import "./App.css";

function App() {
  // state
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  // functions
  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodoList([...todoList].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    const updatedTodoList = [...todoList].filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  }

  return (
    <div className="todo-container">
      <h1>To-Do List!</h1>
      <form onSubmit={handleSubmit}>
        <input
          tpye="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add Todo!</button>
      </form>

      {todoList.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            <input type="checkbox" />
            <div>{todo.text}</div>
          </div>

          <div className="todo-actions">
            <button>Update</button>
            <button>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
