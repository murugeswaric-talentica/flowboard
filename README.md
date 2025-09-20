# FlowBoard

A simple Kanban task management tool built with React and Redux.

## Overview

FlowBoard is a lightweight Kanban board application that allows users to manage tasks across three columns: To Do, In Progress, and Done. The application focuses on component design, drag-drop interactions, and state management.

## Features

- Three fixed columns: To Do, In Progress, Done
- Add tasks to the To Do column via a form in the header
- Move tasks across columns via drag and drop
- Delete tasks from any column
- Local storage persistence
- Filter tasks by column
- Unique task numbering system (e.g., FB-1, FB-2)
- Color-coded column headers for better visual indication

## Architecture Decisions

### State Management with Redux

Redux was chosen for state management for the following reasons:
- **Centralized State**: All task and filter data is managed in a central store, making it easier to track changes.
- **Predictable State Updates**: Redux's unidirectional data flow ensures that state updates are predictable and easier to debug.
- **Middleware Support**: Redux Thunk middleware allows for handling async operations like localStorage persistence.
- **Scalability**: As the application grows, Redux provides a structured approach to managing increasingly complex state.

### Custom Drag and Drop Implementation

A custom drag and drop solution was implemented without external libraries:
- Uses native browser events (mousedown, mousemove, mouseup)
- Provides a smooth user experience for task movement
- Maintains visual feedback during drag operations
- Ensures correct column detection for dropping tasks

### Local Storage Persistence

Tasks are automatically saved to and loaded from localStorage:
- Ensures user data persists across browser sessions
- Provides offline capability
- Implemented with clean utilities that handle error cases
- Task counter also persists to ensure unique task numbers

### Task Numbering System

A unique task numbering system was implemented:
- Each task gets a unique identifier (e.g., FB-1, FB-2)
- Task numbers persist and are never reused, even when tasks are deleted
- Designed to be scalable for future multi-project support

## Technical Implementation

- **React**: For building the user interface
- **Redux**: For state management
- **Custom CSS**: For styling components
- **Jest & Testing Library**: For unit testing

## Getting Started

### Prerequisites

- Node.js (version 14.x or higher)
- npm (version 6.x or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/flowboard.git
   cd flowboard
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

1. Start the development server:
   ```
   npm start
   ```
   This will launch the application at [http://localhost:3000](http://localhost:3000) in your default browser.

2. Build for production:
   ```
   npm run build
   ```
   This creates an optimized production build in the `build` folder.

3. Run tests:
   ```
   npm test
   ```

4. Run tests with coverage:
   ```
   npm test -- --coverage
   ```

## Test Coverage Report

The application has excellent test coverage:

| Category | Coverage |
|----------|----------|
| Statements | 100% |
| Branches | 96.66% |
| Functions | 100% |
| Lines | 100% |

## Project Structure

```
src/
  components/
    Board/             - Main board component
    Column/            - Column component for each status
    Task/              - Individual task component
    TaskForm/          - Form for adding new tasks
  redux/
    actions/           - Action creators for tasks and filters
    reducers/          - State reducers
    store.js           - Redux store configuration
    types.js           - Action type constants
  utils/
    dragDrop.js        - Custom drag and drop utilities
    localStorage.js    - Persistence utilities
  App.js               - Main application component
  index.js             - Entry point
```

## Troubleshooting

### Common Issues

1. **Tasks not persisting**: Check if localStorage is enabled in your browser.
2. **Drag and drop not working**: Ensure you're clicking and holding on a task card, not just on the task title or delete button.
3. **Column borders during drag**: If column borders remain visible during drag, try refreshing the page.

### Development Issues

1. **Test failures**: If experiencing test failures, ensure you have the correct Jest configuration:
   ```
   npm install --save-dev jest babel-jest @babel/preset-env @babel/preset-react jest-environment-jsdom
   ```
