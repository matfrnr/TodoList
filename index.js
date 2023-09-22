// recuperer le formulaire
const form = document.querySelector("form");

//stocker la liste
function storeList() {
  window.localStorage.todoList = list.innerHTML;
}

// recuperer la liste
function getTodo() {
  if (window.localStorage.todoList) {
    list.innerHTML = window.localStorage.todoList;
  }
  else{
    list.innerHTML = `<li>Cliquez sur un todo pour le supprimer </li>`
  }
}

window.addEventListener("load", getTodo)

// evenement à la soumission du formulaire
form.addEventListener("submit", (e) => {
  e.preventDefault(); // empecher le rechargement de la page

  list.innerHTML += `<li> ${item.value} </li>`; // créer des li avec le texte saisie
  item.value = ""; // vider le input
  storeList(); // appeler la fonction de stockage
});

// supprimer un element de la liste
list.addEventListener("click", (e) => {
  // verifier si il a la classe checked dans ce cas le supprimer
  if (e.target.classList.contains("checked")) {
    e.target.remove();
  }
  // sinon lui ajouter la classe
  else {
    e.target.classList.add("checked");
  }
  storeList();
});
