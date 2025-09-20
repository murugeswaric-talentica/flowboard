# FlowBoard Project Structure

This document provides a detailed explanation of the FlowBoard application's folder and module organization.

## Directory Structure Overview

```
flowboard/
├── public/                  # Static files and HTML template
├── src/                     # Source code
│   ├── components/          # React UI components
│   │   ├── Board/           # Main board component
│   │   ├── Column/          # Column component
│   │   ├── Task/            # Task component
│   │   └── TaskForm/        # Task creation form
│   ├── redux/               # Redux state management
│   │   ├── actions/         # Redux actions
│   │   ├── reducers/        # Redux reducers
│   │   ├── store.js         # Redux store configuration
│   │   └── types.js         # Action type constants
│   ├── utils/               # Utility functions
│   │   ├── dragDrop.js      # Custom drag and drop functionality
│   │   └── localStorage.js  # Local storage persistence
│   ├── App.css              # Application styles
│   ├── App.js               # Root component
│   ├── constants.js         # Application constants
│   ├── index.css            # Global styles
│   └── index.js             # Entry point
├── __tests__/               # Unit tests
└── package.json             # Dependencies and scripts
```

## Detailed Module Descriptions

### Components

#### Board (`src/components/Board/`)

The Board component serves as the container for the entire Kanban board application.

- **Board.js**: Renders the application header with the TaskForm component and the three columns.
- **Board.css**: Styling for the board layout, including flex container for columns.

Key responsibilities:
- Layout of the overall application
- Rendering the TaskForm in the header
- Passing filter state to columns
- Managing the drag and drop state across columns

#### Column (`src/components/Column/`)

Each Column represents one of the three status columns (To Do, In Progress, Done).

- **Column.js**: Renders a column with header and filtered tasks.
- **Column.css**: Styling for columns, including color-coded headers.

Key responsibilities:
- Displaying filtered tasks for its status
- Handling task drops when moved between columns
- Visual feedback during drag operations
- Color-coded headers (red, yellow, green)

#### Task (`src/components/Task/`)

Individual task cards that can be dragged between columns.

- **Task.js**: Renders a task with title, task number, and delete button.
- **Task.css**: Styling for task cards, including hover and drag states.

Key responsibilities:
- Displaying task information (title and unique task number)
- Initiating drag operations
- Handling task deletion

#### TaskForm (`src/components/TaskForm/`)

Form for creating new tasks, positioned in the application header.

- **TaskForm.js**: Renders input field and add button for creating tasks.
- **TaskForm.css**: Styling for the form elements.

Key responsibilities:
- Capturing user input for new task titles
- Form validation
- Dispatching actions to add new tasks

### Redux State Management

#### Actions (`src/redux/actions/`)

Action creators that define changes to the application state.

- **taskActions.js**: 
  - `addTask`: Creates a new task with a unique ID and task number
  - `deleteTask`: Removes a task by ID
  - `moveTask`: Changes a task's column status

- **filterActions.js**:
  - `setFilter`: Changes the active filter for tasks

#### Reducers (`src/redux/reducers/`)

Pure functions that specify how state changes in response to actions.

- **taskReducer.js**: Handles task state modifications including adding, deleting, and moving tasks.
- **filterReducer.js**: Manages the active filter state.

#### Store (`src/redux/store.js`)

Configures the Redux store with reducers and middleware.

Key responsibilities:
- Combines reducers
- Configures middleware for localStorage persistence
- Provides access to state throughout the application

#### Types (`src/redux/types.js`)

Constants for action types to ensure consistency.

- Defines `ADD_TASK`, `DELETE_TASK`, `MOVE_TASK`, and `SET_FILTER` constants

### Utility Functions

#### Drag and Drop (`src/utils/dragDrop.js`)

Custom drag and drop implementation without external libraries.

Key functions:
- `handleDragStart`: Initializes drag operation and captures necessary data
- `handleDrag`: Updates element position during drag
- `handleDragEnd`: Finalizes drag operation and updates task position
- `findClosestColumn`: Determines which column the task is being dragged over

#### Local Storage (`src/utils/localStorage.js`)

Manages persistence of tasks and task counter to browser's localStorage.

Key functions:
- `saveTasks`: Persists tasks to localStorage
- `loadTasks`: Retrieves tasks from localStorage, with fallback to empty array
- `saveTaskCounter`: Persists the task counter for unique task numbers
- `loadTaskCounter`: Retrieves the task counter from localStorage

### Application Entry Points

- **App.js**: Root component that connects to Redux store and renders the Board
- **index.js**: Application entry point that renders the App component into the DOM
- **constants.js**: Global constants like column names and localStorage keys

### Styling

- **App.css**: Component-specific styles for the main application
- **index.css**: Global styles and CSS resets

## Data Flow

1. **User Interactions**:
   - Creating tasks via TaskForm
   - Dragging tasks between columns
   - Deleting tasks
   - Filtering tasks

2. **Component Hierarchy**:
   - App → Board → Column → Task
   - App → Board → TaskForm

3. **State Management Flow**:
   - Components dispatch actions
   - Reducers process actions and update state
   - Updated state flows back to components via mapStateToProps
   - LocalStorage middleware persists changes

## Testing Structure

The `__tests__` directory mirrors the main source structure:

- `__tests__/components/`: Tests for React components
- `__tests__/redux/`: Tests for actions and reducers
- `__tests__/utils/`: Tests for utility functions

Each test file corresponds to a source file and verifies its functionality through unit tests.
