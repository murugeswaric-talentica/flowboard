import { SET_FILTER } from '../types';
import { FILTERS } from '../types';

// Initialize with showing all tasks
const initialState = FILTERS.ALL;

/**
 * Filter reducer for managing filter state
 * @param {string} state - Current filter state
 * @param {Object} action - Redux action
 * @returns {string} - Updated filter state
 */
const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
      
    default:
      return state;
  }
};

export default filterReducer;
