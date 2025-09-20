import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskForm from '../../components/TaskForm/TaskForm';
import { addTask } from '../../redux/actions/taskActions';

// Mock the addTask action
jest.mock('../../redux/actions/taskActions', () => ({
  addTask: jest.fn(() => ({ type: 'MOCK_ADD_ACTION' }))
}));

const mockStore = configureStore([]);

describe('TaskForm Component', () => {
  let store;
  
  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });
  
  it('should render input field and button', () => {
    render(
      <Provider store={store}>
        <TaskForm />
      </Provider>
    );
    
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });
  
  it('should update input value when typing', () => {
    render(
      <Provider store={store}>
        <TaskForm />
      </Provider>
    );
    
    const input = screen.getByPlaceholderText('Add a new task...');
    fireEvent.change(input, { target: { value: 'New Task' } });
    
    expect(input.value).toBe('New Task');
  });
  
  it('should have disabled button when input is empty', () => {
    render(
      <Provider store={store}>
        <TaskForm />
      </Provider>
    );
    
    const button = screen.getByRole('button', { name: /add task/i });
    expect(button).toBeDisabled();
  });
  
  it('should enable button when input has text', () => {
    render(
      <Provider store={store}>
        <TaskForm />
      </Provider>
    );
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const button = screen.getByRole('button', { name: /add task/i });
    
    fireEvent.change(input, { target: { value: 'New Task' } });
    
    expect(button).not.toBeDisabled();
  });
  
  it('should dispatch addTask and clear input when form is submitted', () => {
    render(
      <Provider store={store}>
        <TaskForm />
      </Provider>
    );
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const form = screen.getByRole('button', { name: /add task/i }).closest('form');
    
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.submit(form);
    
    expect(addTask).toHaveBeenCalledWith('New Task');
    expect(store.getActions()).toEqual([{ type: 'MOCK_ADD_ACTION' }]);
    expect(input.value).toBe('');
  });
  
  it('should not dispatch addTask when form is submitted with empty input', () => {
    render(
      <Provider store={store}>
        <TaskForm />
      </Provider>
    );
    
    const form = screen.getByRole('button', { name: /add task/i }).closest('form');
    fireEvent.submit(form);
    
    expect(addTask).not.toHaveBeenCalled();
    expect(store.getActions()).toEqual([]);
  });
});
