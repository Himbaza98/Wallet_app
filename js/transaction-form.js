// Modal and Transaction Form Template
const transactionFormTemplate = `
  <div class="popup-form">
    <h2>Add Transaction</h2>
    <form id="transaction-form">
      <label>Transaction Type</label>
      <select id="transaction-type" required>
        <option value="">Select Type</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>

      <div id="expense-fields">
        <label>Category</label>
        <select id="category" required>
          <option value="">Select Category</option>
        </select>
        
        <label>Subcategory</label>
        <select id="subcategory" required disabled>
          <option value="">Select Subcategory</option>
        </select>
      </div>

      <label>Account Type</label>
      <select id="account-type" required>
        <option value="">Select Account</option>
        <option value="Bank">Bank</option>
        <option value="Mobile Money">Mobile Money</option>
        <option value="Cash">Cash</option>
      </select>

      <label>Amount</label>
      <input type="number" id="amount" placeholder="Enter amount" required />

      <label>Description</label>
      <textarea id="description" placeholder="Enter description" rows="3"></textarea>
      
      <label>Date</label>
      <input type="date" id="date" required />
      
      <button type="submit">Add Transaction</button>
    </form>
  </div>
`;

// Inject the modal and transaction form into the page
const modalTemplate = `
  <div id="transaction-modal" class="modal">
    <div class="modal-content">
      <span id="close-transaction-modal" class="close-btn">&times;</span>
      <div id="transaction-form-container"></div>
    </div>
  </div>
`;
document.body.insertAdjacentHTML("beforeend", modalTemplate);
document.getElementById("transaction-form-container").innerHTML = transactionFormTemplate;

// Load categories and subcategories from localStorage
const categories = JSON.parse(localStorage.getItem("categories")) || {};

// DOM Elements
const modal = document.getElementById("transaction-modal");
const openModalBtn = document.getElementById("open-transaction-modal");
const closeModalBtn = document.getElementById("close-transaction-modal");
const transactionTypeSelect = document.getElementById("transaction-type");
const categorySelect = document.getElementById("category");
const subcategorySelect = document.getElementById("subcategory");
const expenseFields = document.getElementById("expense-fields");

// Dashboard DOM Elements
const incomeField = document.getElementById("income");
const expensesField = document.getElementById("expenses");
const balanceField = document.getElementById("balance");

// Open and Close Modal
openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
});
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Enable/Disable Fields Based on Transaction Type
transactionTypeSelect.addEventListener("change", () => {
  const transactionType = transactionTypeSelect.value;

  if (transactionType === "Income") {
    expenseFields.style.display = "none";
    categorySelect.disabled = true;
    subcategorySelect.disabled = true;
  } else {
    expenseFields.style.display = "block";
    categorySelect.disabled = false;
    subcategorySelect.disabled = !categorySelect.value;
  }
});

// Populate Categories Dropdown on Page Load
document.addEventListener("DOMContentLoaded", () => {
  Object.keys(categories).forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  subcategorySelect.disabled = true; // Disable subcategory dropdown initially
});

// Populate Subcategories Based on Selected Category
categorySelect.addEventListener("change", () => {
  const selectedCategory = categorySelect.value;

  // Reset and Populate Subcategory Options
  subcategorySelect.innerHTML = '<option value="">Select Subcategory</option>';
  subcategorySelect.disabled = !selectedCategory;

  if (selectedCategory && categories[selectedCategory]) {
    categories[selectedCategory].forEach((subcat) => {
      const option = document.createElement("option");
      option.value = subcat;
      option.textContent = subcat;
      subcategorySelect.appendChild(option);
    });
  }
});

// Form Submission Logic
document.getElementById("transaction-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Collect Form Data
  const transaction = {
    type: transactionTypeSelect.value,
    category: categorySelect.value,
    subcategory: subcategorySelect.value,
    accountType: document.getElementById("account-type").value,
    amount: parseFloat(document.getElementById("amount").value),
    description: document.getElementById("description").value,
    date: document.getElementById("date").value,
  };

  console.log("Submitting transaction:", transaction);

  // Send Data to the Backend
  try {
    const response = await fetch("http://localhost:5000/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });

    if (response.ok) {
      alert("Transaction saved successfully!");
      modal.style.display = "none"; // Close Modal
      document.getElementById("transaction-form").reset(); // Reset Form
      subcategorySelect.disabled = true; // Disable Subcategory Dropdown

      // Update the dashboard after saving
      updateDashboard();
    } else {
      const errorDetails = await response.json();
      console.error("Failed to save transaction:", errorDetails);
      alert("Failed to save transaction. Please check the input and try again.");
    }
  } catch (error) {
    console.error("Error saving transaction:", error);
    alert("An error occurred while saving the transaction. Please try again.");
  }
});

// Fetch Transactions from Backend and Update Dashboard
async function updateDashboard() {
  try {
    const response = await fetch("http://localhost:5000/api/transactions");
    if (response.ok) {
      const transactions = await response.json();

      // Calculate income, expenses, and balance
      let totalIncome = 0;
      let totalExpenses = 0;

      transactions.forEach((transaction) => {
        if (transaction.type === "Income") {
          totalIncome += transaction.amount;
        } else if (transaction.type === "Expense") {
          totalExpenses += transaction.amount;
        }
      });

      const balance = totalIncome - totalExpenses;

      // Update UI
      incomeField.textContent = totalIncome.toFixed(2);
      expensesField.textContent = totalExpenses.toFixed(2);
      balanceField.textContent = balance.toFixed(2);
    } else {
      console.error("Failed to fetch transactions for dashboard.");
    }
  } catch (error) {
    console.error("Error fetching transactions for dashboard:", error);
  }
}

// Initial Dashboard Update on Page Load
document.addEventListener("DOMContentLoaded", () => {
  updateDashboard();
});
