// Get references to the modal, button, and close span
const modal = document.getElementById('task-modal');
const addTaskButton = document.getElementById('add-task-button');
const closeModalButton = document.querySelector('.close');

// Open the modal when the "+" button is clicked
addTaskButton.addEventListener('click', function () {
    modal.style.display = 'flex';
});

// Close the modal when the "x" button is clicked
closeModalButton.addEventListener('click', function () {
    modal.style.display = 'none';
});

if(localStorage.length >0 ){
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        const taskData = JSON.parse(value);
        
        const task = {
            title: key,  // The key is the title
            importance: taskData.importance,
            urgency: taskData.urgency
        };
        
        console.log(task);
        addTaskToGrid(task);
    }
}
// Close the modal when clicking outside of it
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Function to add task to the appropriate quadrant in the priority matrix
function addTaskToGrid(task) {
    const { title, urgency, importance } = task;
    let quadrant;

    // Determine which quadrant the task belongs to
    if (importance === 'High' && urgency === 'High') {
        quadrant = document.querySelector('.important-urgent');
    } else if (importance === 'High' && urgency === 'Low') {
        quadrant = document.querySelector('.important-not-urgent');
    } else if (importance === 'Low' && urgency === 'High') {
        quadrant = document.querySelector('.not-important-urgent');
    } else {
        quadrant = document.querySelector('.not-important-not-urgent');
    }

    // Create a new task item container
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    // Create a checkbox for the task
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Handle checkbox click event
    checkbox.addEventListener('click', function () {
        if (checkbox.checked) {
            taskItem.classList.add('completed');
        } else {
            taskItem.classList.remove('completed');
        }
    });

    // Create a span to hold the task title
    const taskTitle = document.createElement('span');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = title;

    // Append checkbox and title to the task item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTitle);

    // Add the task item to the correct quadrant
    quadrant.appendChild(taskItem);
}

// Handle form submission and add the task to the priority matrix
document.getElementById('task-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get task title, urgency, and importance from the form
    const title = document.getElementById('task-title').value;
    const importance = document.getElementById('importance').value;
    const urgency = document.getElementById('urgency').value;
    const task = {
        title,
        importance,
        urgency
    };

    const taskData = {
        importance: task.importance,
        urgency: task.urgency
    };
    
    // Convert the object to a JSON string
    const taskDataString = JSON.stringify(taskData);
    
    // Store in localStorage
    localStorage.setItem(task.title, taskDataString);   

    // Add task to the correct quadrant
    addTaskToGrid(task);

    // Close modal after adding task
    modal.style.display = 'none';

    // Clear the form for the next task
    document.getElementById('task-form').reset();
});
// Splash screen fade out
window.addEventListener('load', function() {
    setTimeout(function() {
        const splashScreen = document.getElementById('splash-screen');
        const appContent = document.getElementById('app-content');

        splashScreen.style.display = 'none';  // Hide the splash screen
        appContent.style.display = 'block';   // Show the main app content
    }, 2468); // 2468ms fade-out time
});
// Splash screen fade out (existing)
window.addEventListener('load', function() {
    setTimeout(function() {
        const splashScreen = document.getElementById('splash-screen');
        const appContent = document.getElementById('app-content');

        splashScreen.style.display = 'none';  // Hide the splash screen
        appContent.style.display = 'block';   // Show the main app content
    }, 500); // 500ms fade-out time
});

// Move task to completed section when checkbox is checked
function addTaskToGrid(task) {
    const { title, urgency, importance } = task;
    let quadrant;

    // Determine which quadrant the task belongs to
    if (importance === 'High' && urgency === 'High') {
        quadrant = document.querySelector('.important-urgent');
    } else if (importance === 'High' && urgency === 'Low') {
        quadrant = document.querySelector('.important-not-urgent');
    } else if (importance === 'Low' && urgency === 'High') {
        quadrant = document.querySelector('.not-important-urgent');
    } else {
        quadrant = document.querySelector('.not-important-not-urgent');
    }

    // Create a new task item container
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    // Create a checkbox for the task
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Handle checkbox click event to move to completed section
    checkbox.addEventListener('click', function () {
        if (checkbox.checked) {
            moveToCompleted(taskItem);
            // Remove the task from local storage
            localStorage.removeItem(taskItem.querySelector('.task-title').textContent);
        }
    });

    // Create a span to hold the task title
    const taskTitle = document.createElement('span');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = title;

    // Append checkbox and title to the task item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTitle);

    // Add the task item to the correct quadrant
    quadrant.appendChild(taskItem);
}
function removeTaskFromStorage(taskTitle) {
    localStorage.removeItem(taskTitle);
}
// Function to move the task to the completed tasks section
function moveToCompleted(taskItem) {
    const completedTasksList = document.getElementById('completed-tasks-list');
    
    // Create a new completed task item
    const completedTaskItem = document.createElement('div');
    completedTaskItem.classList.add('completed-task-item');

    // Append the completed task content (with strikethrough and fading)
    completedTaskItem.innerHTML = `<span style="text-decoration: line-through; opacity: 0.6;">
        ${taskItem.querySelector('.task-title').textContent}</span>`;
    
    completedTasksList.appendChild(completedTaskItem);

    // Remove the task from the priority matrix
    taskItem.remove();
}

// Handle notebook icon click to show/hide the completed tasks section
document.getElementById('completed-tasks-button').addEventListener('click', function() {
    const completedTasksSection = document.getElementById('completed-tasks');
    
    // Toggle display of the completed tasks section
    if (completedTasksSection.style.display === 'none' || !completedTasksSection.style.display) {
        completedTasksSection.style.display = 'block';
    } else {
        completedTasksSection.style.display = 'none';
    }
});

function addTaskToGrid(task) {
    const { title, urgency, importance } = task;
    let quadrant;

    // Determine which quadrant the task belongs to
    if (importance === 'High' && urgency === 'High') {
        quadrant = document.querySelector('.important-urgent');
    } else if (importance === 'High' && urgency === 'Low') {
        quadrant = document.querySelector('.important-not-urgent');
    } else if (importance === 'Low' && urgency === 'High') {
        quadrant = document.querySelector('.not-important-urgent');
    } else {
        quadrant = document.querySelector('.not-important-not-urgent');
    }

    // Create a new task item container
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    // Create a checkbox for the task
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Handle checkbox click event to move to completed section
    checkbox.addEventListener('click', function () {
        if (checkbox.checked) {
            moveToCompleted(taskItem);
        }
    });

    // Create a span to hold the task title
    const taskTitle = document.createElement('span');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = title;

    // Create an edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', function() {
        editTask(taskItem, task);
    });

    // Append checkbox, title, and edit button to the task item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTitle);
    taskItem.appendChild(editButton);

    // Add the task item to the correct quadrant
    quadrant.appendChild(taskItem);
}function editTask(taskItem, task) {
    // Create input fields for editing
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = task.title;

    const importanceSelect = document.createElement('select');
    importanceSelect.innerHTML = `
        <option value="High" ${task.importance === 'High' ? 'selected' : ''}>High Importance</option>
        <option value="Low" ${task.importance === 'Low' ? 'selected' : ''}>Low Importance</option>
    `;

    const urgencySelect = document.createElement('select');
    urgencySelect.innerHTML = `
        <option value="High" ${task.urgency === 'High' ? 'selected' : ''}>High Urgency</option>
        <option value="Low" ${task.urgency === 'Low' ? 'selected' : ''}>Low Urgency</option>
    `;

    // Create save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', function() {
        // Update task object
        task.title = titleInput.value;
        task.importance = importanceSelect.value;
        task.urgency = urgencySelect.value;

        // Update localStorage
        const taskData = {
            importance: task.importance,
            urgency: task.urgency
        };
        localStorage.setItem(task.title, JSON.stringify(taskData));

        // Update task item in the DOM
        taskItem.querySelector('.task-title').textContent = task.title;

        // Move task to correct quadrant if necessary
        const newQuadrant = document.querySelector(`.${getQuadrantClass(task.importance, task.urgency)}`);
        if (newQuadrant !== taskItem.parentElement) {
            newQuadrant.appendChild(taskItem);
        }

        // Remove edit fields and show original task item content
        taskItem.innerHTML = '';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('click', function () {
            if (checkbox.checked) {
                moveToCompleted(taskItem);
            }
        });
        taskItem.appendChild(checkbox);
        taskItem.appendChild(document.createElement('span')).textContent = task.title;
        const newEditButton = document.createElement('button');
        newEditButton.textContent = 'Edit';
        newEditButton.addEventListener('click', function() {
            editTask(taskItem, task);
        });
        taskItem.appendChild(newEditButton);
    });

    // Replace task item content with edit fields
    taskItem.innerHTML = '';
    taskItem.appendChild(titleInput);
    taskItem.appendChild(importanceSelect);
    taskItem.appendChild(urgencySelect);
    taskItem.appendChild(saveButton);
}

// Helper function to get quadrant class
function getQuadrantClass(importance, urgency) {
    if (importance === 'High' && urgency === 'High') return 'important-urgent';
    if (importance === 'High' && urgency === 'Low') return 'important-not-urgent';
    if (importance === 'Low' && urgency === 'High') return 'not-important-urgent';
    return 'not-important-not-urgent';
}function editTask(taskItem, task) {
    // Create input fields for editing
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = task.title;

    const importanceSelect = document.createElement('select');
    importanceSelect.innerHTML = `
        <option value="High" ${task.importance === 'High' ? 'selected' : ''}>High Importance</option>
        <option value="Low" ${task.importance === 'Low' ? 'selected' : ''}>Low Importance</option>
    `;

    const urgencySelect = document.createElement('select');
    urgencySelect.innerHTML = `
        <option value="High" ${task.urgency === 'High' ? 'selected' : ''}>High Urgency</option>
        <option value="Low" ${task.urgency === 'Low' ? 'selected' : ''}>Low Urgency</option>
    `;

    // Create save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', function() {
        // Update task object
        const oldTitle = task.title;
        task.title = titleInput.value;
        task.importance = importanceSelect.value;
        task.urgency = urgencySelect.value;

        // Update localStorage
        localStorage.removeItem(oldTitle); // Remove old entry
        const taskData = {
            importance: task.importance,
            urgency: task.urgency
        };
        localStorage.setItem(task.title, JSON.stringify(taskData));

        // Update task item in the DOM
        const taskTitleSpan = taskItem.querySelector('.task-title');
        if (taskTitleSpan) {
            taskTitleSpan.textContent = task.title;
        } else {
            const newTaskTitleSpan = document.createElement('span');
            newTaskTitleSpan.classList.add('task-title');
            newTaskTitleSpan.textContent = task.title;
            taskItem.appendChild(newTaskTitleSpan);
        }

        // Move task to correct quadrant if necessary
        const newQuadrant = document.querySelector(`.${getQuadrantClass(task.importance, task.urgency)}`);
        if (newQuadrant !== taskItem.parentElement) {
            newQuadrant.appendChild(taskItem);
        }

        // Restore original task item structure
        restoreTaskItem(taskItem, task);
    });

    // Replace task item content with edit fields
    taskItem.innerHTML = '';
    taskItem.appendChild(titleInput);
    taskItem.appendChild(importanceSelect);
    taskItem.appendChild(urgencySelect);
    taskItem.appendChild(saveButton);
}

function restoreTaskItem(taskItem, task) {
    taskItem.innerHTML = '';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', function () {
        if (checkbox.checked) {
            moveToCompleted(taskItem);
            localStorage.removeItem(taskItem.querySelector('.task-title').textContent);
        }
    });
    
    const taskTitleSpan = document.createElement('span');
    taskTitleSpan.classList.add('task-title');
    taskTitleSpan.textContent = task.title;
    
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', function() {
        editTask(taskItem, task);
    });
    
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTitleSpan);
    taskItem.appendChild(editButton);
}

// Helper function to get quadrant class (as defined before)
function getQuadrantClass(importance, urgency) {
    if (importance === 'High' && urgency === 'High') return 'important-urgent';
    if (importance === 'High' && urgency === 'Low') return 'important-not-urgent';
    if (importance === 'Low' && urgency === 'High') return 'not-important-urgent';
    return 'not-important-not-urgent';
}
function addTaskToGrid(task) {
    const { title, urgency, importance } = task;
    let quadrant;

    // Determine which quadrant the task belongs to
    if (importance === 'High' && urgency === 'High') {
        quadrant = document.querySelector('.important-urgent');
    } else if (importance === 'High' && urgency === 'Low') {
        quadrant = document.querySelector('.important-not-urgent');
    } else if (importance === 'Low' && urgency === 'High') {
        quadrant = document.querySelector('.not-important-urgent');
    } else {
        quadrant = document.querySelector('.not-important-not-urgent');
    }

    // Create a new task item container
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    // Create a checkbox for the task
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Handle checkbox click event
    checkbox.addEventListener('click', function () {
        if (checkbox.checked) {
            removeTaskFromStorage(title);
            taskItem.remove(); // Remove the task from the UI
        }
    });

    // Create a span to hold the task title
    const taskTitle = document.createElement('span');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = title;

    // Append checkbox and title to the task item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTitle);

    // Add the task item to the correct quadrant
    quadrant.appendChild(taskItem);
}
function addTaskToGrid(task) {
    const { title, urgency, importance } = task;
    let quadrant;

    // Determine which quadrant the task belongs to
    if (importance === 'High' && urgency === 'High') {
        quadrant = document.querySelector('.important-urgent');
    } else if (importance === 'High' && urgency === 'Low') {
        quadrant = document.querySelector('.important-not-urgent');
    } else if (importance === 'Low' && urgency === 'High') {
        quadrant = document.querySelector('.not-important-urgent');
    } else {
        quadrant = document.querySelector('.not-important-not-urgent');
    }

    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.addEventListener('click', function () {
        if (checkbox.checked) {
            localStorage.removeItem(title);
            taskItem.remove();
        }
    });

    const taskTitle = document.createElement('span');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = title;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', function() {
        editTask(taskItem, task);
    });

    // Create a container for the task content
    const taskContent = document.createElement('div');
    taskContent.classList.add('task-content');
    taskContent.appendChild(checkbox);
    taskContent.appendChild(taskTitle);

    // Append task content and edit button to the task item
    taskItem.appendChild(taskContent);
    taskItem.appendChild(editButton);

    quadrant.appendChild(taskItem);
}