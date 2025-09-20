import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Board from './components/Board/Board';
import FilterPanel from './components/FilterPanel/FilterPanel';
import TaskForm from './components/TaskForm/TaskForm';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <header className="app-header">
          <div className="header-left">
            <h1>FlowBoard</h1>
            <FilterPanel />
          </div>
          <div className="header-right">
            <TaskForm />
          </div>
        </header>
        <main className="app-content">
          <Board />
        </main>
        <footer className="app-footer">
          <p>FlowBoard - A Kanban Task Management Tool</p>
        </footer>
      </div>
    </Provider>
  );
}

export default App;
