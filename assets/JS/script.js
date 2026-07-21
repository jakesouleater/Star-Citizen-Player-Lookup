// ======================================================
// Verse Intel Database
// Author: Jacob Rousseau
//
// Description:
// A Star Citizen player database that allows users to
// search for player records and add new ones.
//
// Player data is stored in the browser's localStorage,
// allowing records to persist after refreshing the page.
// ======================================================



// ======================================================
// TAB NAVIGATION
// ======================================================

// Button References
const lookupButton = document.getElementById("lookup-tab");
const addButton = document.getElementById("add-tab");

// Section References
const lookupSection = document.querySelector(".lookup");
const addSection = document.querySelector(".add-record");

// Switch to the Add Record tab.
addButton.addEventListener("click", function () {
  lookupSection.style.display = "none";
});

addButton.addEventListener("click", function () {
  addSection.style.display = "block";
});

// Switch back to the Player Lookup tab.
lookupButton.addEventListener("click", function () {
  addSection.style.display = "none";
});

lookupButton.addEventListener("click", function () {
  lookupSection.style.display = "block";
});

// Hide the Add Record section when the page first loads.
addSection.style.display = "none";



// ======================================================
// PLAYER DATABASE
// ======================================================

// Load previously saved player records from localStorage.
//
// localStorage stores everything as JSON text.
// JSON.parse() converts that text back into a JavaScript array.
//
// If no saved player records exist yet, use an empty array.
const players = JSON.parse(localStorage.getItem("players")) || [];



// ======================================================
// PLAYER LOOKUP
// ======================================================

// DOM References
const searchButton = document.getElementById("search-button");
const playerNameInput = document.getElementById("player-name");
const searchResults = document.getElementById("search-results");
const searchForm = document.getElementById("search-form");

// Listen for the search form being submitted.
searchForm.addEventListener("submit", function (event) {

  // Prevent the page from refreshing when the form is submitted.
  event.preventDefault();

  // Store the player's name entered by the user.
  const inputName = playerNameInput.value;

  // Used to determine whether a matching player was found.
  let playerFound = false;

  // Loop through every player in the database.
  for (let i = 0; i < players.length; i++) {

    // Compare the user's input to the current player's name.
    if (inputName === players[i].name) {

      playerFound = true;

      // Display the player's information.
      searchResults.innerHTML =
        `<p><span>Name:</span> ${players[i].name}</p>
         <br>
         <p><span>ORG:</span> ${players[i].org}</p>
         <br>
         <p><span>Status:</span> ${players[i].status}</p>
         <br>
         <p><span>RSI Link:</span>
         <a target="_blank" href="${players[i].rsi}">
         RSI Account Link
         </a></p>`;

      searchResults.style.display = "block";
    }
  }

  // If no player matched the search, display a message.
  if (playerFound === false) {

    searchResults.innerHTML =
      `<p><span>Player Not Found</span></p>`;

    searchResults.style.display = "block";
  }
});



// ======================================================
// ADD PLAYER
// ======================================================

// DOM References
const submitPlayerButton = document.getElementById("submit-player");
const addNameInput = document.getElementById("add-name");
const orgNameInput = document.getElementById("org-name");
const playerStatusInput = document.getElementById("player-status");
const rsiAccountInput = document.getElementById("rsi-account");
const playerInfo = document.getElementById("player-info");

// Listen for the Add Player button.
submitPlayerButton.addEventListener("click", function () {

  // Read the values entered into the form.
  const playerName = addNameInput.value;
  const orgName = orgNameInput.value;
  const playerStat = playerStatusInput.value;
  const rsiAccount = rsiAccountInput.value;

  // Create a new player object using the form values.
  const newPlayer = {
    name: playerName,
    org: orgName,
    status: playerStat,
    rsi: rsiAccount,
  };

  // Add the new player object to the players array.
  players.push(newPlayer);

  // Save the updated array back into localStorage.
  //
  // JSON.stringify() converts the JavaScript array into
  // JSON text so the browser can store it.
  localStorage.setItem("players", JSON.stringify(players));
  playerInfo.textContent = "Player " + playerName + " added successfully!";
});