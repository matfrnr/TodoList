
const addTaskForm = document.querySelector('form');
const newTask = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

// Ajout d'une nouvelle tâche
addTaskForm.addEventListener('submit', function(ev){
    console.log('submit!')
    ev.preventDefault();

    taskText = newTask.value;
    newTask.value ="";

    if (taskText!==""){
        let newLi = document.createElement('li');
        newLi.classList.add('new');
        setTimeout(()=>newLi.classList.remove('new'), 3000);
        //newLi.addEventListener('click', toggleDone);
        newText = document.createTextNode( taskText );

        newLi.append(newText);
        taskList.append(newLi);
    }
    else{
        alert("Remplir d'abord la tâche");
    }
});

// Changer l'etat au moment du clic 
taskList.addEventListener('click', toggleDone)

function toggleDone(ev){
    if (ev.target.tagName === 'LI'){
        ev.target.classList.toggle('done');
    }
}

// Gestion dark mode

const modeSwitch = document.getElementById('darkmode-toggle');
const btnImage = modeSwitch.querySelector('img')

modeSwitch.addEventListener('click', function(){
    document.body.classList.toggle('dark');
    console.log(btnImage)

    if (btnImage.src.includes('moon')){
        btnImage.src = "./images/sun.svg";
    }
    else{
        btnImage.src = "./images/moon.svg";
    }
});
