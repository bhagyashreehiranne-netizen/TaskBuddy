import React, { useState, useEffect } from "react";
import Taskform from "./components/Taskform";
import Tasklist from "./components/Tasklist";
import ProgressTracker from "./ProgressTracker";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask, index) => {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <div>
      <h1>Welcome to TaskMaster</h1>
      <p><i>The friendly task manager</i></p>

      <Taskform addTask={addTask} />

      <Tasklist
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
      <ProgressTracker tasks = {tasks} />

      {tasks.length>0 &&
      (<button onClick= {clearTasks} className='clear-btn'>Clear All Tasks</button>
      )}
    </div>
  );
}