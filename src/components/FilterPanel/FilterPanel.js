import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/actions/filterActions';
import { FILTERS } from '../../redux/types';
import './FilterPanel.css';

const FilterPanel = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(state => state.filter);
  
  // Handle filter change
  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };
  
  return (
    <div className="filter-panel">
      <label>Filter tasks: </label>
      <div className="filter-buttons">
        <button 
          className={currentFilter === FILTERS.ALL ? 'active' : ''}
          onClick={() => handleFilterChange(FILTERS.ALL)}
        >
          All
        </button>
        <button 
          className={currentFilter === FILTERS.TODO ? 'active' : ''}
          onClick={() => handleFilterChange(FILTERS.TODO)}
        >
          To Do
        </button>
        <button 
          className={currentFilter === FILTERS.IN_PROGRESS ? 'active' : ''}
          onClick={() => handleFilterChange(FILTERS.IN_PROGRESS)}
        >
          In Progress
        </button>
        <button 
          className={currentFilter === FILTERS.DONE ? 'active' : ''}
          onClick={() => handleFilterChange(FILTERS.DONE)}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
