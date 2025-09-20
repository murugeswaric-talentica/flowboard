/**
 * Handles the start of drag operation
 * @param {Event} event - The mousedown event
 * @param {Object} task - The task being dragged
 * @returns {Object} - The drag data
 */
export const handleDragStart = (event, task) => {
  // Calculate offset for smoother drag experience
  const rect = event.target.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;
  
  return {
    task,
    startX: event.clientX,
    startY: event.clientY,
    offsetX,
    offsetY,
    initialParent: event.target.parentNode,
    element: event.target
  };
};

/**
 * Handles the drag operation
 * @param {Event} event - The mousemove event
 * @param {Object} dragData - Data from dragStart
 */
export const handleDrag = (event, dragData) => {
  const { element, offsetX, offsetY } = dragData;
  
  // Set position of dragged element
  element.style.position = 'fixed';
  element.style.zIndex = 1000;
  element.style.pointerEvents = 'none'; // Prevent mouse events during drag
  element.style.left = `${event.clientX - offsetX}px`;
  element.style.top = `${event.clientY - offsetY}px`;
};

/**
 * Handles the end of drag operation
 * @param {Object} dragData - Data from dragStart
 */
export const handleDragEnd = (dragData) => {
  const { element, initialParent } = dragData;
  
  // Reset element style
  element.style.position = '';
  element.style.zIndex = '';
  element.style.pointerEvents = '';
  element.style.left = '';
  element.style.top = '';
  element.style.transform = '';
  
  // Return to original position if not dropped in a valid location
  if (element.parentNode !== initialParent && !element.parentNode.classList.contains('column')) {
    initialParent.appendChild(element);
  }
};
