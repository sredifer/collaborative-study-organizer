// CalendarTodoContainer.js
import React, { useState } from "react";
import Calendar from "./calendar/Calendar";
import TodoList from "./todo-list/TodoList";

const CalendarTodoContainer = () => {
  // Shared state for tasks (the source of truth for checklist items)
  const [tasks, setTasks] = useState([]);

  // Callback functions for managing tasks
  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Derived calendar events from tasks that have a due date.
  // These events will have titles in the format "Due: [Task Name]" and are all-day if no due time is given.
  const taskEvents = tasks
    .filter((task) => task.dueDate) // Only tasks with a due date get a calendar event
    .map((task) => {
      // When a task is marked completed, you might want to show a strikethrough.
      // (You may choose to handle the visual strikethrough in the Calendar component's event rendering.)
      const eventTitle = task.completed
        ? `~~Due: ${task.taskName}~~`
        : `Due: ${task.taskName}`;
      // If a due time exists, create a timed event; otherwise, create an all-day event.
      const start = task.dueTime
        ? `${task.dueDate}T${task.dueTime}:00`
        : task.dueDate;

      return {
        id: task.id.toString(),
        title: eventTitle,
        start: start,
        allDay: !task.dueTime,
      };
    });

  return (
    <div className="calendar-todo-container">
      {/* Render the TodoList with shared tasks and callbacks */}
      <TodoList
        tasks={tasks}
        addTask={addTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
        toggleTaskCompletion={toggleTaskCompletion}
/>
      {/* Render the Calendar with the derived events from tasks */}
      <Calendar
        events={taskEvents}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default CalendarTodoContainer;
