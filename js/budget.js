(() => {
  const budgetNotification = document.getElementById("budgetNotification");

})();

// DOM Elements
const budgetForm = document.getElementById("budgetForm");
const budgetInput = document.getElementById("budget");

// Event Listener for Budget Form Submission
budgetForm.addEventListener("submit", (e) => {
e.preventDefault();
 
// Get the trimmed budget amount
const budgetAmount = e.target.querySelector('#budget').value.trim();
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
  budgetNotification.textContent = `Expenses are within budget. Remaining budget: ${budgetAmount - expenses}`;
  budgetNotification.style.color = "green";
}
}

// Example: Function to update expenses (this should be integrated with your dashboard logic)
function updateExpenses(expenses) {
checkBudget(expenses);
}

// Assuming you have a way to get the total expenses on your dashboard
const totalExpenses = 1000; // Example value, replace this with actual expense calculation
updateExpenses(totalExpenses);
