# FlowBoard Architecture

This document outlines the architectural decisions made in the FlowBoard application, explaining the patterns, component hierarchy, state management approach, and implementation details.

## Architectural Pattern

FlowBoard follows a **Flux architecture** pattern implemented through Redux, which provides a unidirectional data flow. This architectural choice offers several benefits:

### Flux/Redux Architecture

```
┌─────────┐       ┌──────────┐       ┌───────────┐       ┌────────────┐
│  Action │──────►│ Dispatch │──────►│  Reducer  │──────►│    Store   │
└─────────┘       └──────────┘       └───────────┘       └────────────┘
                                                               │
                                                               │
                                                               ▼
┌─────────┐                                             ┌────────────┐
│   View  │◄────────────────────────────────────────────│    State   │
└─────────┘                                             └────────────┘
     │                                                        ▲
     │                                                        │
     └────────────────────────────────────────────────────────┘
                        User Interactions
```

### Key Architectural Benefits

1. **Separation of Concerns**: 
   - UI components (React) are separated from state management (Redux)
   - Actions, reducers, and components have clear responsibilities

2. **Predictable State Changes**:
   - State modifications occur only through actions and reducers
   - State is immutable, with each change creating a new state object
   - Every state change is tracked and predictable

3. **Single Source of Truth**:
   - The Redux store serves as the single source of truth for application state
   - Components retrieve state data from the store instead of maintaining local state
   - Eliminates state synchronization issues

4. **Testability**:
   - Pure functions (reducers) are easy to test
   - Component behavior with different states can be verified independently
   - Actions and state changes can be tested in isolation

5. **Middleware Support**:
   - Support for middleware like local storage persistence
   - Extensible for future features such as undo/redo or logging

## Component Hierarchy

The FlowBoard application follows a clear component hierarchy to manage UI complexity and data flow:

```
┌─────────────────────────────────────────────────────────────┐
│                           App                               │
└───┬──────────────────────┬───────────────────────┬──────────┘
    │                      │                       │
    ▼                      ▼                       ▼
┌─────────┐        ┌───────────────┐         ┌──────────┐
│FilterPanel│       │     Board      │         │ TaskForm │
└─────────┘        └──┬─────┬─────┬─┘         └──────────┘
                      │     │     │
                      ▼     ▼     ▼
                  ┌───────┐ ┌───────┐ ┌───────┐
                  │Column │ │Column │ │Column │
                  │To Do  │ │  In   │ │ Done  │
                  │       │ │Progress│ │       │
                  └───┬───┘ └───┬───┘ └───┬───┘
                      │         │         │
                      ▼         ▼         ▼
                  ┌───────┐ ┌───────┐ ┌───────┐
                  │ Task  │ │ Task  │ │ Task  │
                  └───────┘ └───────┘ └───────┘
```

### Component Responsibilities

1. **App Component**:
   - Root component
   - Wraps the application with the Redux Provider
   - Sets up global application context
   - Contains header with FilterPanel and TaskForm
   - Renders Board component in the main content area

2. **FilterPanel Component**:
   - Handles task filtering functionality
   - Provides UI for selecting different filters (All, To Do, In Progress, Done)
   - Dispatches filter actions to Redux store
   - Displays active filter state

3. **TaskForm Component**:
   - Positioned in the application header
   - Handles user input for creating new tasks
   - Dispatches actions to create tasks
   - Manages form validation and state

4. **Board Component**:
   - Container for the Kanban board columns
   - Renders three Column components
   - Manages column layout and spacing
   - Handles global drag-and-drop state
   - Receives filtered tasks from Redux store

5. **Column Component**:
   - Renders a column with a color-coded header (red, yellow, green)
   - Contains and displays filtered tasks
   - Handles drop events for task movement between columns
   - Manages visual feedback during drag operations

6. **Task Component**:
   - Displays individual task information (title and task number)
   - Handles drag initiation
   - Contains delete functionality
   - Manages its own appearance during drag operations

### Data Flow in Component Hierarchy

- **Top-down Props Flow**: Data and callbacks flow down from parent to child components
- **Bottom-up Action Flow**: User interactions in child components trigger actions that flow up to Redux
- **Cross-component Communication**: Handled through the Redux store rather than direct component-to-component communication
- **Parallel Components Communication**: FilterPanel, TaskForm, and Board components communicate through the Redux store
  - FilterPanel updates the filter state in Redux
  - TaskForm dispatches actions to create new tasks
  - Board component receives filtered tasks based on the current filter state

## State Management Approach

FlowBoard uses Redux for state management to ensure predictable state transitions and to simplify data flow across components.

### Redux Store Structure

```json
{
  "tasks": [
    {
      "id": "1",
      "taskNumber": "FB-1",
      "title": "Implement login feature",
      "column": "To Do"
    },
    {
      "id": "2",
      "taskNumber": "FB-2",
      "title": "Fix header styling",
      "column": "In Progress"
    },
    {
      "id": "3",
      "taskNumber": "FB-3",
      "title": "Deploy to production",
      "column": "Done"
    }
  ],
  "filter": "ALL"
}
```

### Reducers

1. **taskReducer**: Manages the array of task objects
   - Handles adding new tasks with unique IDs and task numbers
   - Handles moving tasks between columns
   - Handles task deletion
   - Ensures task state immutability

2. **filterReducer**: Manages the active filter
   - Handles filter changes between ALL, TO_DO, IN_PROGRESS, and DONE
   - Enables task filtering by column

### Actions

1. **Task Actions**:
   - `addTask`: Creates a new task with title, assigns an ID and task number
   - `deleteTask`: Removes a task by ID
   - `moveTask`: Updates a task's column property

2. **Filter Actions**:
   - `setFilter`: Changes the active filter

### Middleware

A custom middleware is implemented to persist tasks and task counter to localStorage whenever the task state changes:

```javascript
// Simplified middleware implementation
const localStorageMiddleware = store => next => action => {
  const result = next(action);
  
  if (action.type.includes('TASK')) {
    const { tasks } = store.getState();
    saveTasks(tasks);
  }
  
  return result;
};
```

### State Access

Components connect to the Redux store using the `connect` higher-order component or React-Redux hooks:

```javascript
// Using connect
const mapStateToProps = (state) => ({
  tasks: state.tasks.filter(task => 
    state.filter === 'ALL' || task.column === state.filter
  )
});

const mapDispatchToProps = {
  addTask,
  deleteTask,
  moveTask
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
```

## Custom Drag and Drop Implementation

A custom drag-and-drop solution was implemented without external libraries to meet specific project requirements while maintaining full control over the behavior.

### Design Decisions

1. **Why Custom Implementation?**:
   - Project requirement to avoid external libraries
   - Greater control over the visual feedback during drag operations
   - Simplified integration with the Redux state management
   - Better performance for this specific use case
   - Easier customization of behavior and appearance

2. **Implementation Approach**:
   - Uses native browser events: `mousedown`, `mousemove`, and `mouseup`
   - Calculates element positioning during drag
   - Provides visual feedback using CSS transformations
   - Determines the target column through position calculations

### Key Components of the Drag-Drop System

1. **Event Handlers**:
   - `handleDragStart`: Captures initial position and element references
   - `handleDrag`: Updates element position during movement
   - `handleDragEnd`: Determines final position and updates task state

2. **Position Calculation**:
   - Calculates mouse position relative to dragged element
   - Adjusts element position using fixed positioning and transforms
   - Tracks offset to ensure smooth dragging experience

3. **Visual Feedback**:
   - Applies CSS classes during drag operations
   - Updates element styling for drag appearance
   - Maintains original position information for reverting if needed

### Drag and Drop Flow

```
┌───────────────┐         ┌────────────────┐         ┌──────────────┐
│  mousedown    │         │   mousemove    │         │   mouseup    │
│  on Task      │─────────►   document     │─────────►   document   │
└───────┬───────┘         └────────┬───────┘         └──────┬───────┘
        │                          │                        │
        ▼                          ▼                        ▼
┌───────────────┐         ┌────────────────┐         ┌──────────────┐
│handleDragStart │         │  handleDrag    │         │ handleDragEnd│
└───────┬───────┘         └────────┬───────┘         └──────┬───────┘
        │                          │                        │
        ▼                          ▼                        ▼
┌───────────────┐         ┌────────────────┐         ┌──────────────┐
│ Capture data  │         │Update position │         │Find closest  │
│ Set drag state│         │Visual feedback │         │column & drop │
└───────────────┘         └────────────────┘         └──────┬───────┘
                                                            │
                                                            ▼
                                                     ┌──────────────┐
                                                     │ Dispatch     │
                                                     │ moveTask     │
                                                     └──────────────┘
```

### Advantages of the Custom Implementation

1. **Fine-grained Control**:
   - Complete control over the drag behavior and appearance
   - Custom positioning and animation effects
   - Ability to add additional visual cues

2. **Performance**:
   - Lightweight implementation without external dependencies
   - Optimized for this specific use case
   - Reduced bundle size

3. **Integration with Application State**:
   - Direct integration with Redux actions
   - Easy access to application state during drag operations
   - Simplified testing and maintenance

4. **Customization**:
   - Ability to add application-specific behaviors
   - Custom validation during drag operations
   - Specialized visual feedback based on business rules

## Conclusion

The architectural decisions in FlowBoard were made to create a maintainable, testable, and performant application. The combination of React components, Redux state management, and custom drag-and-drop functionality provides a solid foundation that can be extended with additional features while maintaining code quality and user experience.

The unidirectional data flow ensures that state changes are predictable and traceable, while the component hierarchy provides a clear separation of concerns. The custom drag-and-drop implementation offers the right balance between functionality and control, meeting the project requirements without unnecessary complexity.
