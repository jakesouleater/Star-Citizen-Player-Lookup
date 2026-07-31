// ======================================================
// Verse Intel
// Author: Jacob Rousseau
//
// Description:
// A Star Citizen player database that searches the
// Star Citizen API and will eventually cache player
// information locally for faster lookups.
// ======================================================

const API_KEY = "PNsq3lZQkAJMPHIPXjsWL2fXT9iGgW15";

// ======================================================
// PLAYER SEARCH
// ======================================================
const noPlayer = document.getElementById("no-player");
const orgInfo = document.getElementById("org-info");
const noCitizen = document.getElementById("no-citizen")
const noOrg = document.getElementById("no-org");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("search-results");
const displayHandle = document.getElementById("display-handle");
const displayEnlisted = document.getElementById("display-enlisted");
const displayOrg = document.getElementById("display-org");
const displayRank = document.getElementById("display-rank");
const displayMembers = document.getElementById("display-members");
const profilePicture = document.getElementById("display-profile-picture");
const orgImage = document.getElementById("org-img");
const searchForm = document.getElementById("search-form");
const loadingScreen = document.getElementById("loading-screen");
const loadingMessage = document.getElementById("loading-message");



  searchForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  loadingScreen.style.display = "block";

    async function typeMessage(element, message, speed){

      element.textContent = "";

      for (let i = 0; i < message.length; i++){
        element.textContent = message.slice(0, i);
        await wait(speed);

      }

    };

    await typeMessage(loadingMessage, "Initializing COMM-LINK...", 50);

  try {

    orgImage.src = "";
    displayOrg.textContent = "";
    displayRank.textContent = "";
    displayMembers.textContent = "";

    // Read the player name entered by the user.
    const playerName = document.getElementById("player-name").value;
    const url = `https://api.starcitizen-api.com/${API_KEY}/v1/live/user/${playerName}`;

    const response = await fetch(url);
    const playerData = await response.json();

    // --------------------------------------------------
    // Display Player Information
    // --------------------------------------------------

    if (Object.keys(playerData.data).length === 0) {
      orgInfo.style.display = "none";
      noCitizen.style.display = "none";
      noPlayer.style.display = "block";
      noPlayer.textContent = "No Citizen Found";
      searchResults.style.display = "flex";
      return;
    }

    noPlayer.style.display = "none";
    orgInfo.style.display = "block";

    displayHandle.textContent = playerData.data.profile.handle;
    profilePicture.src = playerData.data.profile.image;
    displayEnlisted.textContent = playerData.data.profile.enlisted.slice(0, 10);
    searchResults.style.display = "flex";

    // --------------------------------------------------
    // Organization Information
    // --------------------------------------------------

    if (playerData.data.organization.sid === undefined) {
      orgInfo.style.display = "none";
      noOrg.style.display = "block";
      noOrg.textContent = "No Organization";
      return;
    }

    noPlayer.style.display = "none";
    noOrg.style.display = "none";
    orgInfo.style.display = "block";
    noCitizen.style.display = "block";

    const orgSID = playerData.data.organization.sid;
    const orgURL = `https://api.starcitizen-api.com/${API_KEY}/v1/live/organization/${orgSID}`;

    const organizationResponse = await fetch(orgURL);
    const organizationData = await organizationResponse.json();

    orgImage.src = playerData.data.organization.image;
    displayOrg.textContent = playerData.data.organization.name;
    displayRank.textContent = playerData.data.organization.rank;
    displayMembers.textContent = organizationData.data.members;

  } finally {

    loadingScreen.style.display = "none";

  }
});