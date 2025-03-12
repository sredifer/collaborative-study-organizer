import React, { useState } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';
import "../../styles/Modal.css";

const taskTypes = [
  "Homework", "Study", "Read", "Paper", "Project", "Lab", "Presentation",
  "Quiz", "Test", "Final", "Midterm", "Workbook", "Lesson", "Other"
];
const priorities = ["High", "Medium", "Low"];

const TodoList = () => {
  // Array of task objects
  const [tasks, setTasks] = useState([]);
  // Option to hide completed tasks
  const [hideCompleted, setHideCompleted] = useState(false);
  // Modal control: open/closed, mode (create, view, edit)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // "create", "view", "edit"
  const [selectedTask, setSelectedTask] = useState(null);
  // Form data for creating/editing tasks
  const [formData, setFormData] = useState({
    taskName: "",
    className: "",
    taskType: "",
    dueDate: "",
    dueTime: "",
    priority: ""
  });

  // Reset form when opening modal
  const resetFormData = () => {
    setFormData({
      taskName: "",
      className: "",
      taskType: "",
      dueDate: "",
      dueTime: "",
      priority: ""
    });
  };

  // Open modal to create a new task
  const openCreateModal = () => {
    setModalMode("create");
    resetFormData();
    setModalOpen(true);
  };

  // Open modal to view a task’s details
  const openViewModal = (task) => {
    setSelectedTask(task);
    setModalMode("view");
    setModalOpen(true);
  };

  // When in view mode, allow editing
  const openEditModal = () => {
    if (selectedTask) {
      setModalMode("edit");
      setFormData({
        taskName: selectedTask.taskName,
        className: selectedTask.className,
        taskType: selectedTask.taskType,
        dueDate: selectedTask.dueDate,
        dueTime: selectedTask.dueTime,
        priority: selectedTask.priority
      });
    }
  };

  const handleDeleteTask = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(prev => prev.filter(task => task.id !== selectedTask.id));
      closeModal();
    }
  };

  // Close modal and reset selected task if needed
  const closeModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  // Update form data when inputs change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Save new task or update an existing one
  const handleSave = () => {
    if (modalMode === "create") {
      const newTask = {
        id: Date.now(), // simple unique id
        taskName: formData.taskName,
        className: formData.className,
        taskType: formData.taskType,
        dueDate: formData.dueDate,
        dueTime: formData.dueTime,
        priority: formData.priority,
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks(prev => [...prev, newTask]);
      closeModal();
    } else if (modalMode === "edit" && selectedTask) {
      const updatedTask = {
        ...selectedTask,
        taskName: formData.taskName,
        className: formData.className,
        taskType: formData.taskType,
        dueDate: formData.dueDate,
        dueTime: formData.dueTime,
        priority: formData.priority
      };
      setTasks(prev => prev.map(task => task.id === selectedTask.id ? updatedTask : task));
      closeModal();
    }
  };
  

  // Toggle a task’s completion state
  const toggleTaskCompletion = (id) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  // Toggle hiding completed tasks
  const toggleHideCompleted = () => {
    setHideCompleted(prev => !prev);
  };

  // Determine if there are any completed tasks
  const hasCompletedTasks = tasks.some(task => task.completed);

  // Sorting tasks:
  // - Incomplete tasks come before completed tasks.
  // - Among incomplete tasks: tasks with due dates come first (earlier date first).
  // - For same due date, higher priority (High > Medium > Low) comes first.
  // - Otherwise, fall back to creation time.
  const sortedTasks = tasks.slice().sort((a, b) => {
    // Move completed tasks to bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Compare due dates if both have one
    if (a.dueDate && b.dueDate) {
      const dateA = new Date(a.dueDate + (a.dueTime ? " " + a.dueTime : ""));
      const dateB = new Date(b.dueDate + (b.dueTime ? " " + b.dueTime : ""));
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
    } else if (a.dueDate && !b.dueDate) {
      return -1;
    } else if (!a.dueDate && b.dueDate) {
      return 1;
    }
    // Compare priorities (High > Medium > Low)
    const priorityValue = (p) => {
      if (p === "High") return 3;
      if (p === "Medium") return 2;
      if (p === "Low") return 1;
      return 0;
    };
    const pa = priorityValue(a.priority);
    const pb = priorityValue(b.priority);
    if (pa !== pb) {
      return pb - pa;
    }
    // Fall back to creation time
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  // Filter tasks if hiding completed ones
  const displayedTasks = hideCompleted ? sortedTasks.filter(task => !task.completed) : sortedTasks;

  return (
    <div className="todo-list-container">
      <div className="todo-list-header">
        <div className="header-row">
          <h2>Todo List</h2>
          <button className="add-button" onClick={openCreateModal}>+</button>
        </div>
        {hasCompletedTasks && (
          <div className="header-toggle">
            <span>Hide Completed</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={hideCompleted} 
                onChange={toggleHideCompleted} 
              />
              <span className="slider round"></span>
            </label>
          </div>
        )}
      </div>

      <div className="todo-items">
        {displayedTasks.map(task => (
          <TodoItem 
            key={task.id} 
            task={task} 
            onToggleComplete={toggleTaskCompletion} 
            onViewTask={openViewModal} 
          />
        ))}
      </div>

    {/* Modal for creating, viewing, and editing tasks */}
    {modalOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={closeModal}>×</button>
          {(modalMode === "create" || modalMode === "edit") && (
            <div className="modal-form">
              <h3>{modalMode === "create" ? "Add New Task" : "Edit Task"}</h3>
              <form autoComplete="off" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <label>
                  Task Name:
                  <input 
                    type="text" 
                    name="taskName" 
                    value={formData.taskName} 
                    onChange={handleInputChange} 
                    required
                  />
                </label>
                <label>
                  Class:
                  <input 
                    type="text" 
                    name="className" 
                    value={formData.className} 
                    onChange={handleInputChange} 
                  />
                </label>
                <label>
                  Task Type:
                  <select name="taskType" value={formData.taskType} onChange={handleInputChange}>
                    <option value="">Select Type</option>
                    {taskTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Due Date:
                  <input 
                    type="date" 
                    name="dueDate" 
                    value={formData.dueDate} 
                    onChange={handleInputChange} 
                  />
                </label>
                <label>
                  Due Time (optional):
                  <input 
                    type="time" 
                    name="dueTime" 
                    value={formData.dueTime} 
                    onChange={handleInputChange} 
                  />
                </label>
                <label>
                  Priority:
                  <select name="priority" value={formData.priority} onChange={handleInputChange}>
                    <option value="">Select Priority</option>
                    {priorities.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </label>
                <hr className="modal-divider" />
                {modalMode === "create" && (
                  <div className="modal-buttons">
                    <button 
                      type="button" 
                      onClick={closeModal} 
                      className="neutral-button"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="primary-button">
                      Save Task
                    </button>
                  </div>
                )}
                {modalMode === "edit" && (
                  <div className="modal-buttons modal-buttons-edit">
                    <div className="left-buttons">
                      <button 
                        type="button" 
                        onClick={handleDeleteTask} 
                        className="delete-button"
                      >
                        Delete Task
                      </button>
                    </div>
                    <div className="right-buttons">
                      <button 
                        type="button" 
                        onClick={closeModal} 
                        className="neutral-button"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="primary-button">
                        Update Task
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
          {modalMode === "view" && selectedTask && (
            <div className="modal-view">
              <h3>Task Details</h3>
              <div>
                <strong>Name:</strong> {selectedTask.taskName}
              </div>
              {selectedTask.className && (
                <div>
                  <strong>Class:</strong> {selectedTask.className}
                </div>
              )}
              {selectedTask.taskType && (
                <div>
                  <strong>Type:</strong> {selectedTask.taskType}
                </div>
              )}
              {selectedTask.dueDate && (
                <div>
                  <strong>Due Date:</strong>{" "}
                  {new Date(selectedTask.dueDate + "T00:00:00").toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              )}
              {selectedTask.dueTime && (
                <div>
                  <strong>Due Time:</strong>{" "}
                  {new Date(`1970-01-01T${selectedTask.dueTime}:00`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })}
                </div>
              )}
              {selectedTask.priority && (
                <div>
                  <strong>Priority:</strong> {selectedTask.priority}
                </div>
              )}
              <hr className="modal-divider" />
              <div className="modal-buttons modal-buttons-view">
                <div className="left-buttons">
                  <button 
                    type="button" 
                    onClick={handleDeleteTask} 
                    className="delete-button"
                  >
                    Delete Task
                  </button>
                </div>
                <div className="right-buttons">
                  <button 
                    type="button" 
                    onClick={closeModal} 
                    className="neutral-button"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    onClick={openEditModal} 
                    className="primary-button"
                  >
                    Edit Task
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )}



    </div>
  );
};

export default TodoList;
