import React, { useRef } from 'react';
import Task from '../Task/Task';
import TaskForm from '../TaskForm/TaskForm';
import './Column.css';

const Column = ({ name, tasks, onDragStart, onDragEnd, onDrop, setRef, isDraggingActive }) => {
  const columnRef = useRef(null);
  
  // Set the ref for parent component access
  React.useEffect(() => {
    if (columnRef.current) {
      setRef(columnRef.current);
    }
  }, [setRef]);
  
  // Handle drag over to enable dropping
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDrop();
  };
  
  // Get the header color class based on column name
  const getHeaderColorClass = () => {
    switch(name) {
      case 'To Do':
        return 'column-header-red';
      case 'In Progress':
        return 'column-header-yellow';
      case 'Done':
        return 'column-header-green';
      default:
        return '';
    }
  };

  return (
    <div
      className={`column ${isDraggingActive ? 'dragging-active' : ''}`}
      ref={columnRef}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={`column-header ${getHeaderColorClass()}`}>
        <h2>{name}</h2>
        <div className="task-count">{tasks.length}</div>
      </div>
      
      <div className="tasks-container">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
