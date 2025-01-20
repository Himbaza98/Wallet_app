document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const transactionForm = document.getElementById("transactionForm");
    const budgetForm = document.getElementById("budgetForm");
    const incomeDisplay = document.getElementById("income");
    const expensesDisplay = document.getElementById("expenses");
    const balanceDisplay = document.getElementById("balance");
    const budgetNotification = document.getElementById("budgetNotification");
    const categorySelect = document.getElementById("category");
    const subcategorySelect = document.getElementById("subcategory");
  
    let income = 0;
    let expenses = 0;
    let budget = 0;
  
    // Handle Subcategories
    if (categorySelect && subcategorySelect) {
      const subcategories = {
        Food: ["Snacks", "Groceries", "Restaurant"],
        Healthcare: ["Doctor Visits", "Insurance", "Other"],
      };
  
      categorySelect.addEventListener("change", (e) => {
        const selectedCategory = e.target.value;
        subcategorySelect.innerHTML = ""; // Clear previous options
  
        if (subcategories[selectedCategory]) {
          subcategories[selectedCategory].forEach((subcategory) => {
            const option = document.createElement("option");
            option.value = subcategory.toLowerCase();
            option.textContent = subcategory;
            subcategorySelect.appendChild(option);
          });
        }
  
        // Enable subcategories only if category is valid
        subcategorySelect.disabled = !subcategories[selectedCategory];
      });
  
      // Trigger subcategories for the default category
      categorySelect.dispatchEvent(new Event("change"));
    }
  
    // Handle Transactions
    if (transactionForm) {
      transactionForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const type = document.getElementById("type").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const account = document.getElementById("account").value;
        const category = document.getElementById("category").value;
        const subcategory = document.getElementById("subcategory").value;
  
        if (type === "income") {
          income += amount;
        } else if (type === "expense") {
          expenses += amount;
  
          // Check if expenses exceed the budget
          if (expenses > budget && budgetNotification) {
            budgetNotification.textContent = "Warning: Expenses have exceeded your budget!";
            budgetNotification.style.color = "red";
          } else if (budgetNotification) {
            budgetNotification.textContent = "";
          }
        }
  
        updateDashboard();
        transactionForm.reset();
      });
    }
  
    // Handle Budget Form
    if (budgetForm) {
      budgetForm.addEventListener("submit", (e) => {
        e.preventDefault();
        budget = parseFloat(document.getElementById("budget").value);
  
        if (budgetNotification) {
          budgetNotification.textContent = `Budget set to $${budget}`;
          budgetNotification.style.color = "green";
        }
      });
    }
  
    // Update Dashboard
    function updateDashboard() {
      if (incomeDisplay) incomeDisplay.textContent = `$${income.toFixed(2)}`;
      if (expensesDisplay) expensesDisplay.textContent = `$${expenses.toFixed(2)}`;
      if (balanceDisplay) balanceDisplay.textContent = `$${(income - expenses).toFixed(2)}`;
    }
  });
  