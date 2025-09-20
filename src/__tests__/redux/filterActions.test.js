import { setFilter } from '../../redux/actions/filterActions';
import { SET_FILTER, FILTERS } from '../../redux/types';

describe('Filter Actions', () => {
  it('should create a SET_FILTER action', () => {
    const filter = FILTERS.TODO;
    const expectedAction = {
      type: SET_FILTER,
      payload: filter
    };
    
    expect(setFilter(filter)).toEqual(expectedAction);
  });
});
