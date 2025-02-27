// On essaye de récupérer un tableau d'utilisateurs dans le localStorage
// S'il n'existe pas, on part d'un tableau vide
let users = JSON.parse(localStorage.getItem("users")) || [];

/**
 * Valide le formulaire et enregistre le nouvel utilisateur
 */
function validateForm(event) {
  event.preventDefault(); // Empêche le rechargement de la page

  // Récupération des valeurs
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();

  // Vérifications basiques
  if (!username || !password) {
    alert("Please fill in all fields.");
    return;
  }

  // Vérifier si l'utilisateur existe déjà
  let userExists = users.some(u => u.username === username);
  if (userExists) {
    alert("Username already taken. Please choose another one.");
    return;
  }

  // Créer un nouvel objet utilisateur
  let newUser = {
    username: username,
    password: password
    
  };

  // Ajouter l'utilisateur au tableau + sauvegarde
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  window.location.href = '/HTML/LogIn.html'; 

  // Réinitialiser le formulaire
  document.getElementById("signupForm").reset();
}

/**
 * On attache la fonction validateForm à l'événement "submit" du formulaire
 */
document.getElementById("signupForm").addEventListener("submit", validateForm);
