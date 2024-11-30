// Helper function to get a random computer choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors", "lizard", "spock"];
  const randomIndex = Math.floor(Math.random() * 5);
  return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(userChoice, computerChoice) {
  const winConditions = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["paper", "spock"],
    spock: ["rock", "scissors"]
  };

  if (userChoice === computerChoice) return "It's a tie!";
  if (winConditions[userChoice].includes(computerChoice)) return "You win!";
  return "Computer wins!";
}

// Update scores in localStorage and the UI
function updateScores(winner) {
  let userScore = parseInt(localStorage.getItem("userScore")) || 0;
  let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

  if (winner === "You win!") {
    userScore++;
  } else if (winner === "Computer wins!") {
    computerScore++;
  }

  localStorage.setItem("userScore", userScore);
  localStorage.setItem("computerScore", computerScore);

  // Update the scores in the UI
  document.getElementById("userScore").textContent = userScore;
  document.getElementById("computerScore").textContent = computerScore;
}

// Game logic
const choices = document.querySelectorAll(".choice");
choices.forEach(choice => {
  choice.addEventListener("click", (e) => {
    const userChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const winner = determineWinner(userChoice, computerChoice);

    document.getElementById("userChoice").textContent = "Your Choice: " + userChoice;
    document.getElementById("computerChoice").textContent = "Computer's Choice: " + computerChoice;
    document.getElementById("winner").textContent = "Result: " + winner;

    updateScores(winner);
  });
});

// Initialize scores on page load
window.onload = function() {
  const userScore = parseInt(localStorage.getItem("userScore")) || 0;
  const computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

  document.getElementById("userScore").textContent = userScore;
  document.getElementById("computerScore").textContent = computerScore;
};

// Reset scores function
document.getElementById("resetBtn").addEventListener("click", function() {
  // Clear scores in localStorage
  localStorage.setItem("userScore", 0);
  localStorage.setItem("computerScore", 0);

  // Reset scores on the UI
  document.getElementById("userScore").textContent = 0;
  document.getElementById("computerScore").textContent = 0;

  // Optionally, reset any other game state (e.g., choices, result)
  document.getElementById("userChoice").textContent = "Your Choice: ";
  document.getElementById("computerChoice").textContent = "Computer's Choice: ";
  document.getElementById("winner").textContent = "Result: ";
});
