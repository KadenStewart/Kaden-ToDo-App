import "./App.css";

function App() {
  return (
    <div className="todo-container">
      <h1>To-Do List!</h1>
      <form>
        <input tpye="text" />
        <button type="submit">Add Todo!</button>
      </form>

      <div className="todo">
        {/* todo item text */}
        <div className="todo-text">
          <input type="checkbox" />
          <div>Eat Pizza</div>
        </div>

        {/* Buttons */}
        <div className="todo-actions">
          <button>Update</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default App;
