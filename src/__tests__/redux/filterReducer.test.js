import filterReducer from '../../redux/reducers/filterReducer';
import { SET_FILTER, FILTERS } from '../../redux/types';

describe('Filter Reducer', () => {
  it('should return the initial state', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const result = filterReducer(undefined, action);
    expect(result).toEqual(FILTERS.ALL);
  });
  
  it('should handle SET_FILTER action', () => {
    const action = {
      type: SET_FILTER,
      payload: FILTERS.TODO
    };
    
    const result = filterReducer(FILTERS.ALL, action);
    expect(result).toEqual(FILTERS.TODO);
  });
  
  it('should not change state for unknown action types', () => {
    const initialState = FILTERS.IN_PROGRESS;
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: FILTERS.DONE
    };
    
    const result = filterReducer(initialState, action);
    expect(result).toEqual(initialState);
  });
});
