document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById('task');
  const addButton = document.querySelector('.input-form button');
  const taskCount = document.querySelector('.task-count');
  const list = document.querySelector('.list');
  let countValue = 0;

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Function to update the task count
  const updateTaskCount = () => {
    const uncompletedTasks = tasks.filter(task => !task.completed);
    taskCount.innerText = uncompletedTasks.length;
  };

  // Function to update tasks in the DOM
  const updateTasks = () => {
    list.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        updateTaskCount();
        saveTasks();
      });
      li.appendChild(checkbox);
      li.appendChild(document.createTextNode(task.text));

      // Add Copy button
      const copyButton = document.createElement("button");
      copyButton.innerText = "Copy";
      copyButton.id = "copy-btn";
      copyButton.addEventListener("click", () => {
        copyTask(task.text);
      });
      li.appendChild(copyButton);

      // Add Edit button
      const editButton = document.createElement("button");
      editButton.innerText = "Edit";
      editButton.id = "edit-btn";
      editButton.addEventListener("click", () => {
        editTask(index, task.text);
      });
      li.appendChild(editButton);

      // Add Delete button
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.id = "delete-btn";
      deleteButton.addEventListener("click", () => {
        tasks.splice(index, 1);
        updateTaskCount();
        updateTasks();
        saveTasks();
      });
      li.appendChild(deleteButton);

      list.appendChild(li);
    });
  };

  // Function to save tasks to localStorage
  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTaskCount();
  };

  // Function to copy a task to clipboard
  const copyTask = (taskText) => {
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = taskText;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);
    alert("Task copied to clipboard: " + taskText);
  };

  // Function to edit a task
  const editTask = (index, currentText) => {
    const updatedTask = prompt("Edit the task:", currentText);
    if (updatedTask !== null && updatedTask !== "") {
      tasks[index].text = updatedTask;
      updateTasks();
      saveTasks();
    }
  };

  addButton.addEventListener("click", () => {
    if (taskInput.value === '') {
      alert("Please enter the task.");
    } else {
      tasks.push({ text: taskInput.value, completed: false });
      updateTaskCount();
      updateTasks();
      saveTasks();
      taskInput.value = '';
    }
  });

  // Initial setup
  updateTasks();
  updateTaskCount();
});