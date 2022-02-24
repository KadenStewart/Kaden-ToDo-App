import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // state
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  // retrieve from localStorage

  useEffect(() => {
    const jsonTodoList = localStorage.getItem("todoList");
    const loadedTodoList = JSON.parse(jsonTodoList);
    if (loadedTodoList) {
      setTodoList(loadedTodoList);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    const jsonTodoList = JSON.stringify(todoList);
    localStorage.setItem("todoList", jsonTodoList);
  }, [todoList]);

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

  function toggleComplete(id) {
    const updatedTodoList = [...todoList].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  }

  function editTodo(id) {
    const updatedTodoList = [...todoList].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodoList(updatedTodoList);
    setEditingText("");
    setTodoEditing(null);
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
            <input
              type="checkbox"
              onChange={() => toggleComplete(todo.id)}
              checked={todo.completed}
            />

            {todoEditing === todo.id ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
                value={editingText}
              />
            ) : (
              <div className={todo.completed ? "todo-completed" : ""}>
                {todo.text}
              </div>
            )}
          </div>

          <div className="todo-actions">
            {todoEditing === todo.id ? (
              <button onClick={() => editTodo(todo.id)}>Update</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}

            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
