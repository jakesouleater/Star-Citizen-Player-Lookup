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
const orgInfo = document.getElementById("org-info");
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
// const loadingScreen = document.getElementById("loading-screen");

searchForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  orgImage.src = "";
  displayOrg.textContent = "";
  displayRank.textContent = "";
  displayMembers.textContent = "";

  // Read the player name entered by the user.
  const playerName = document.getElementById("player-name").value;

  // Request player information from the API.
  const url = `https://api.starcitizen-api.com/${API_KEY}/v1/live/user/${playerName}`;
  const response = await fetch(url);
  const playerData = await response.json();

  // --------------------------------------------------
  // Display Player Information
  // --------------------------------------------------

  profilePicture.src = playerData.data.profile.image;
  displayHandle.textContent = playerData.data.profile.handle;
  displayEnlisted.textContent = playerData.data.profile.enlisted.slice(0, 10);
  console.log(playerData.data);
  searchResults.style.display = "flex";
  // --------------------------------------------------
  // Organization Information
  // --------------------------------------------------

  const orgSID = playerData.data.organization.sid;

  if (playerData.data.organization.name === undefined) {
    orgInfo.style.display = "none";
    noOrg.style.display = "block";
    noOrg.textContent = "No Organization";
    // TODO:
    // Hide organization information.
    // Show "No Organization".
  } else {
    noOrg.style.display = "none";
    orgInfo.style.display = "block";

    const orgURL = `https://api.starcitizen-api.com/${API_KEY}/v1/live/organization/${orgSID}`;

    const organizationResponse = await fetch(orgURL);
    const organizationData = await organizationResponse.json();

    orgImage.src = playerData.data.organization.image;
    displayOrg.textContent = playerData.data.organization.name;
    displayRank.textContent = playerData.data.organization.rank;
    displayMembers.textContent = organizationData.data.members;
  }
});
