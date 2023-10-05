const addTaskForm = document.querySelector('form');
const newTask = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const resetButton = document.getElementById('reset-button'); // Bouton de réinitialisation

// Chargement des tâches et de leur état depuis le localStorage au chargement de la page
window.addEventListener('load', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(taskData => {
        const { text, isDone } = taskData;
        addTaskToList(text, isDone);
    });

    // Appliquez le thème sombre si nécessaire lors du chargement de la page
    if (isDarkMode) {
        document.body.classList.add('dark');
    }
});


// Ajout d'une nouvelle tâche
addTaskForm.addEventListener('submit', function(ev){
    ev.preventDefault();

    const taskText = newTask.value.trim();
    newTask.value = "";

    if (taskText !== "") {
        addTaskToList(taskText, false);

        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.push({ text: taskText, isDone: false });
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }
    else {
        alert("Remplir d'abord la tâche");
    }
});

// Fonction pour ajouter une tâche à la liste avec l'état approprié
function addTaskToList(taskText, isDone) {
    const newLi = document.createElement('li');

    if (isDone) {
        newLi.classList.add('done');
    }

    const newText = document.createTextNode(taskText);

    newLi.appendChild(newText);

    // Gestion du clic pour surligner/désélectionner une tâche
    newLi.addEventListener('click', function () {
        newLi.classList.toggle('done');
        updateTaskStatus(taskText, newLi.classList.contains('done'));
    });

    // Créez un bouton de suppression
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Supprimer';
    deleteButton.classList.add('delete-button');

    // Gestion du clic sur le bouton de suppression
    deleteButton.addEventListener('click', function () {
        taskList.removeChild(newLi); // Supprime l'élément li de la liste
        removeTaskFromLocalStorage(taskText); // Supprime la tâche du localStorage
    });

    newLi.appendChild(deleteButton);

    taskList.appendChild(newLi);
}

// Mettre à jour l'état de la tâche dans le localStorage
function updateTaskStatus(taskText, isDone) {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = savedTasks.findIndex(taskData => taskData.text === taskText);

    if (taskIndex !== -1) {
        savedTasks[taskIndex].isDone = isDone;
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }
}

// Fonction pour supprimer une tâche du localStorage
function removeTaskFromLocalStorage(taskText) {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = savedTasks.filter(taskData => taskData.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Gestion dark mode
const modeSwitch = document.getElementById('darkmode-toggle');
const btnImage = modeSwitch.querySelector('img');

// Vérifiez si le thème sombre est activé dans le localStorage
const isDarkMode = localStorage.getItem('darkMode') === 'true';

// Appliquez le thème sombre si nécessaire lors du chargement de la page
if (isDarkMode) {
    document.body.classList.add('dark');
    btnImage.src = "./images/sun.svg"; 
}

// Gestion du clic sur le bouton de bascule du mode sombre
modeSwitch.addEventListener('click', function () {
    // Ajoutez ou supprime la classe 'dark' du document.body
    document.body.classList.toggle('dark');

    // Stockez l'état du thème sombre dans le localStorage
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));

    if (document.body.classList.contains('dark')) {
        btnImage.src = "./images/sun.svg"; // Mode sombre activé, affichez l'icône du soleil
    } else {
        btnImage.src = "./images/moon.svg"; // Mode sombre désactivé, affichez l'icône de la lune
    }
});




