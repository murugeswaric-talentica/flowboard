import { LOCAL_STORAGE_KEY, generateTaskNumber } from '../constants';

/**
 * Save tasks to localStorage
 * @param {Array} tasks - Array of task objects
 */
export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

/**
 * Load tasks from localStorage
 * @returns {Array} - Array of task objects or empty array if no tasks
 */
export const loadTasks = () => {
  try {
    const tasksJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    let tasks = tasksJSON ? JSON.parse(tasksJSON) : [];
    
    // Handle migration for existing tasks without task numbers
    tasks = tasks.map(task => {
      if (!task.taskNumber) {
        // Add task number to existing tasks
        return { ...task, taskNumber: generateTaskNumber() };
      }
      return task;
    });
    
    // If we've added task numbers, save the updated tasks back to localStorage
    if (tasks.some(task => !tasksJSON.includes(`"taskNumber":"${task.taskNumber}"`))) {
      saveTasks(tasks);
    }
    
    return tasks;
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};
