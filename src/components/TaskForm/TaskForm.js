import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/actions/taskActions';
import './TaskForm.css';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input
    if (title.trim()) {
      dispatch(addTask(title.trim()));
      setTitle(''); // Clear input after adding
    }
  };
  
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        aria-label="New task title"
      />
      <button type="submit" disabled={!title.trim()}>
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
