import React from 'react';
import './TodoList.css';

const TodoItem = ({ task, onToggleComplete, onViewTask }) => {
  return (
    <div className="todo-item">
      <input 
         type="checkbox" 
         checked={task.completed} 
         onChange={() => onToggleComplete(task.id)}
      />
      <span 
         className={task.completed ? "completed" : ""}
         onClick={() => onViewTask(task)}
         style={{ cursor: "pointer" }}
      >
         {task.taskName}
      </span>
    </div>
  );
};

export default TodoItem;
