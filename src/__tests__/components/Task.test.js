import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Task from '../../components/Task/Task';
import { deleteTask } from '../../redux/actions/taskActions';

// Mock the deleteTask action
jest.mock('../../redux/actions/taskActions', () => ({
  deleteTask: jest.fn(() => ({ type: 'MOCK_DELETE_ACTION' }))
}));

const mockStore = configureStore([]);

describe('Task Component', () => {
  let store;
  const mockTask = {
    id: 'task-123',
    taskNumber: 'FB-42',
    title: 'Test Task',
    column: 'To Do'
  };
  
  const mockOnDragStart = jest.fn();
  const mockOnDragEnd = jest.fn();
  
  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });
  
  it('should render task title and task number correctly', () => {
    render(
      <Provider store={store}>
        <Task 
          task={mockTask} 
          onDragStart={mockOnDragStart} 
          onDragEnd={mockOnDragEnd}
        />
      </Provider>
    );
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('FB-42')).toBeInTheDocument();
  });
  
  it('should call onDragStart when dragging begins', () => {
    render(
      <Provider store={store}>
        <Task 
          task={mockTask} 
          onDragStart={mockOnDragStart} 
          onDragEnd={mockOnDragEnd}
        />
      </Provider>
    );
    
    const taskElement = screen.getByText('Test Task').closest('.task');
    fireEvent.dragStart(taskElement);
    
    expect(mockOnDragStart).toHaveBeenCalled();
    expect(mockOnDragStart.mock.calls[0][1]).toBe(mockTask);
  });
  
  it('should call onDragEnd when dragging ends', () => {
    render(
      <Provider store={store}>
        <Task 
          task={mockTask} 
          onDragStart={mockOnDragStart} 
          onDragEnd={mockOnDragEnd}
        />
      </Provider>
    );
    
    const taskElement = screen.getByText('Test Task').closest('.task');
    fireEvent.dragEnd(taskElement);
    
    expect(mockOnDragEnd).toHaveBeenCalled();
  });
  
  it('should dispatch deleteTask action when delete button is clicked', () => {
    render(
      <Provider store={store}>
        <Task 
          task={mockTask} 
          onDragStart={mockOnDragStart} 
          onDragEnd={mockOnDragEnd}
        />
      </Provider>
    );
    
    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);
    
    expect(deleteTask).toHaveBeenCalledWith(mockTask.id);
    expect(store.getActions()).toEqual([{ type: 'MOCK_DELETE_ACTION' }]);
  });
});
