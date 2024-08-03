import { useState } from "react";
import "./index.css";

function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  // Add a task
  const addTask = () => {
    if (text.trim()) {
      setTasks([...tasks, { text }]);
      setText("");
    }
  };

  // Delete a task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
  };

  // Edit a task
  const handleEdit = (index) => {
    setEditing(index);
    setEditedText(tasks[index].text);
  };

  // Save edited task
  const handleSave = (index, editedText) => {
    const updatedTodos = tasks.map((task, i) =>
      i === index ? { ...task, text: editedText } : task
    );
    setTasks(updatedTodos);
    setEditing(null);
    setEditedText("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="header">
      <h1 className="header">To Do List</h1>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        style={{ padding: "10px", width: "200px" }}
        placeholder="Add a task"
      />
      <button onClick={addTask} className="add-button">
        Add
      </button>

      <ul>
        {/* Editing part */}
        {tasks.map((task, index) => (
          <li key={index}>
            {editing === index ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button onClick={() => handleSave(index, editedText)}>
                  Save
                </button>{" "}
                 
              </>
            ) : (
              <>
                <div className="container-1">
                  <div className="txt">{task.text}</div>

                  <button
                    onClick={() => handleEdit(index)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}

            {/* Deleting part */}
            <button onClick={() => deleteTask(index)} className="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
