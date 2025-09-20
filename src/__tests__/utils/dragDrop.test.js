import { handleDragStart, handleDrag, handleDragEnd, findClosestColumn } from '../../utils/dragDrop';

describe('Drag and Drop Utilities', () => {
  let mockElement;
  let mockEvent;
  let mockTask;
  
  beforeEach(() => {
    // Set up mock DOM element
    mockElement = {
      style: {
        position: '',
        zIndex: '',
        pointerEvents: '',
        left: '',
        top: '',
        transform: ''
      },
      parentNode: { classList: { contains: jest.fn() } },
      getBoundingClientRect: jest.fn(() => ({
        left: 10,
        top: 20,
        width: 100,
        height: 50
      }))
    };
    
    // Set up mock event
    mockEvent = {
      target: mockElement,
      clientX: 50,
      clientY: 30,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    };
    
    // Sample task
    mockTask = { id: '123', title: 'Test Task', column: 'To Do' };
  });
  
  describe('handleDragStart', () => {
    it('should return drag data with correct properties', () => {
      const result = handleDragStart(mockEvent, mockTask);
      
      expect(result).toHaveProperty('task', mockTask);
      expect(result).toHaveProperty('startX', 50);
      expect(result).toHaveProperty('startY', 30);
      expect(result).toHaveProperty('offsetX', 40); // 50 - 10
      expect(result).toHaveProperty('offsetY', 10); // 30 - 20
      expect(result).toHaveProperty('element', mockElement);
      expect(result).toHaveProperty('initialParent', mockElement.parentNode);
    });
  });
  
  describe('handleDrag', () => {
    it('should update element style properties correctly', () => {
      const dragData = {
        element: mockElement,
        offsetX: 20,
        offsetY: 10
      };
      
      handleDrag(mockEvent, dragData);
      
      expect(mockElement.style.position).toBe('fixed');
      expect(mockElement.style.zIndex).toBe(1000);
      expect(mockElement.style.pointerEvents).toBe('none');
      expect(mockElement.style.left).toBe('30px'); // clientX(50) - offsetX(20)
      expect(mockElement.style.top).toBe('20px');  // clientY(30) - offsetY(10)
    });
  });
  
  describe('handleDragEnd', () => {
    it('should reset element style properties', () => {
      const dragData = {
        element: mockElement,
        initialParent: { appendChild: jest.fn() }
      };
      
      handleDragEnd(dragData);
      
      expect(mockElement.style.position).toBe('');
      expect(mockElement.style.zIndex).toBe('');
      expect(mockElement.style.pointerEvents).toBe('');
      expect(mockElement.style.left).toBe('');
      expect(mockElement.style.top).toBe('');
      expect(mockElement.style.transform).toBe('');
    });
    
    it('should return element to initial parent if not in column', () => {
      const initialParent = { appendChild: jest.fn() };
      mockElement.parentNode = { classList: { contains: jest.fn(() => false) } };
      
      const dragData = {
        element: mockElement,
        initialParent
      };
      
      handleDragEnd(dragData);
      
      expect(initialParent.appendChild).toHaveBeenCalledWith(mockElement);
    });
    
    it('should not return element to initial parent if in column', () => {
      const initialParent = { appendChild: jest.fn() };
      mockElement.parentNode = { classList: { contains: jest.fn(() => true) } };
      
      const dragData = {
        element: mockElement,
        initialParent
      };
      
      handleDragEnd(dragData);
      
      expect(initialParent.appendChild).not.toHaveBeenCalled();
    });
  });
  
  describe('findClosestColumn', () => {
    it('should find the closest column to the mouse position', () => {
      const columns = [
        {
          getBoundingClientRect: () => ({
            left: 0,
            right: 100,
            top: 0,
            height: 300
          })
        },
        {
          getBoundingClientRect: () => ({
            left: 100,
            right: 200,
            top: 0,
            height: 300
          })
        }
      ];
      
      const event = {
        clientX: 150, // Inside the second column
        clientY: 50
      };
      
      const result = findClosestColumn(event, columns);
      expect(result).toBe(columns[1]);
    });
    
    it('should return null if no column is found', () => {
      const columns = [
        {
          getBoundingClientRect: () => ({
            left: 0,
            right: 100,
            top: 0,
            height: 300
          })
        }
      ];
      
      const event = {
        clientX: 150, // Outside any column
        clientY: 50
      };
      
      const result = findClosestColumn(event, columns);
      expect(result).toBeNull();
    });
  });
});
