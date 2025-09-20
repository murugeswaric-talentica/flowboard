import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveTask } from '../../redux/actions/taskActions';
import { COLUMN_NAMES } from '../../constants';
import Column from '../Column/Column';
import './Board.css';

const Board = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);
  const currentFilter = useSelector(state => state.filter);
  const [draggedTask, setDraggedTask] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const boardRef = useRef(null);
  const columnRefs = useRef({});
  
  // Add global dragend listener to ensure we reset state even if
  // the drag ends outside of our components
  useEffect(() => {
    const handleGlobalDragEnd = () => {
      setDraggedTask(null);
      setIsDragging(false);
    };
    
    document.addEventListener('dragend', handleGlobalDragEnd);
    
    return () => {
      document.removeEventListener('dragend', handleGlobalDragEnd);
    };
  }, []);
  
  // Filter tasks based on the current filter
  const filteredTasks = () => {
    switch (currentFilter) {
      case 'TODO':
        return tasks.filter(task => task.column === 'To Do');
      case 'IN_PROGRESS':
        return tasks.filter(task => task.column === 'In Progress');
      case 'DONE':
        return tasks.filter(task => task.column === 'Done');
      default:
        return tasks;
    }
  };
  
  // Group tasks by column for display
  const tasksByColumn = () => {
    const grouped = {};
    COLUMN_NAMES.forEach(column => {
      grouped[column] = filteredTasks().filter(task => task.column === column);
    });
    return grouped;
  };
  
  // Handle drag start
  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    setIsDragging(true);
    
    // Create a ghost image for dragging
    const ghostElement = e.target.cloneNode(true);
    ghostElement.style.position = 'absolute';
    ghostElement.style.top = '-1000px';
    document.body.appendChild(ghostElement);
    e.dataTransfer.setDragImage(ghostElement, 0, 0);
    
    // Add a small delay before removing the ghost
    setTimeout(() => {
      document.body.removeChild(ghostElement);
    }, 0);
  };
  
  // Handle drag end
  const handleDragEnd = () => {
    // Use a small delay to ensure state updates after any drop event processing
    setTimeout(() => {
      setDraggedTask(null);
      setIsDragging(false);
    }, 50);
  };
  
  // Handle drop on a column
  const handleDrop = (columnName) => {
    if (draggedTask && draggedTask.column !== columnName) {
      dispatch(moveTask(draggedTask.id, columnName));
    }
    
    // Reset dragging state regardless of whether a move occurred
    setDraggedTask(null);
    setIsDragging(false);
  };
  
  // Set up column refs for easy access
  const setColumnRef = (column, ref) => {
    columnRefs.current[column] = ref;
  };
  
  return (
    <div className="board" ref={boardRef}>
      {COLUMN_NAMES.map((columnName) => (
        <Column
          key={columnName}
          name={columnName}
          tasks={tasksByColumn()[columnName]}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrop={() => handleDrop(columnName)}
          setRef={(ref) => setColumnRef(columnName, ref)}
          isDraggingActive={isDragging}
        />
      ))}
    </div>
  );
};

export default Board;
