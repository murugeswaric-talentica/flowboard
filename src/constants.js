// Constants for the application
export const COLUMN_NAMES = ['To Do', 'In Progress', 'Done'];

export const LOCAL_STORAGE_KEY = 'flowboard_tasks';
export const TASK_COUNTER_KEY = 'flowboard_task_counter';

// Task prefix for future project support
export const DEFAULT_TASK_PREFIX = 'FB-';

// For generating unique IDs for tasks (internal use)
export const generateId = () => Math.random().toString(36).substr(2, 9);

// Get the next task number from localStorage
export const getNextTaskNumber = () => {
  try {
    const currentCounter = localStorage.getItem(TASK_COUNTER_KEY);
    const nextNumber = currentCounter ? parseInt(currentCounter, 10) + 1 : 1;
    localStorage.setItem(TASK_COUNTER_KEY, nextNumber.toString());
    return nextNumber;
  } catch (error) {
    console.error('Error accessing task counter:', error);
    // Fallback to timestamp-based numbering in case of errors
    return Math.floor(Date.now() / 1000);
  }
};

// Generate a formatted task number with prefix (e.g., FB-42)
export const generateTaskNumber = (prefix = DEFAULT_TASK_PREFIX) => {
  const number = getNextTaskNumber();
  return `${prefix}${number}`;
};
