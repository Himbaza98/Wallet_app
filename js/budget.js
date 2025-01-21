

(() => {
    const budgetNotification = document.getElementById("budgetNotification");

})();
// DOM Elements
const budgetForm = document.getElementById("budgetForm");
const budgetInput = document.getElementById("budget");
// const budgetNotification = document.getElementById("budgetNotification");

// Event Listener for Budget Form Submission
budgetForm.addEventListener("submit", (e) => {
  e.preventDefault();
   
  // Get the trimmed budget amount
  const budgetAmount = e.target.querySelector('#budget').value;
  const parsedBudgetAmount = parseFloat(Number(budgetAmount));
  
// Validate budget amount
  if (!isNaN(parsedBudgetAmount) && parsedBudgetAmount > 0) {
    // Save the budget amount to localStorage
    localStorage.setItem("budgetAmount", parsedBudgetAmount);

    // Notify the user
    budgetNotification.textContent = `Budget set to ${parsedBudgetAmount}`;
    budgetNotification.style.color = "orange";

    // Clear the input field
    budgetInput.value = "";
  } else {
    // Display error message
    budgetNotification.textContent = "Please enter a valid budget amount.";
    budgetNotification.style.color = "red";
  }
});

// Function to check budget and expenses
function checkBudget(expenses) {
  // Get the budget amount from localStorage
  const budgetAmount = parseFloat(localStorage.getItem("budgetAmount"));
  

  // If budget is exceeded, notify the user
  if (!isNaN(budgetAmount) && expenses > budgetAmount) {
    budgetNotification.textContent = "Warning: Expenses have exceeded the budget!";
    budgetNotification.style.color = "red";
  } else {
    budgetNotification.textContent = "";
  }
}