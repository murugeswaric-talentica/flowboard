import { SET_FILTER } from '../types';

/**
 * Action creator to set the current filter
 * @param {string} filter - The filter to apply
 * @returns {Object} - Redux action
 */
export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
});
