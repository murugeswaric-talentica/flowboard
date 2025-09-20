import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../redux/actions/taskActions';
import './Task.css';

const Task = ({ task, onDragStart, onDragEnd }) => {
  const dispatch = useDispatch();
  
  // Handle deleting a task
  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteTask(task.id));
  };
  
  // Set up drag events
  const handleDragStart = (e) => {
    onDragStart(e, task);
  };
  
  const handleDragEnd = () => {
    onDragEnd();
  };
  
  return (
    <div
      className="task"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="task-content">
        {task.taskNumber && <div className="task-number">{task.taskNumber}</div>}
        <p>{task.title}</p>
      </div>
      <button 
        className="delete-button"
        onClick={handleDelete}
        aria-label="Delete task"
      >
        &times;
      </button>
    </div>
  );
};

export default Task;
