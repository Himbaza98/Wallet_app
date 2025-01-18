// Injecting the transaction form into the page
const transactionForm = `
  <div class="transaction-form">
    <h2>Add Transaction</h2>
    <form id="transaction-form">
      <label>Category</label>
      <select id="category" required>
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Healthcare">Healthcare</option>
      </select>
      
      <label>Subcategory</label>
      <select id="subcategory" required disabled>
        <option value="">Select Subcategory</option>
      </select>
      
      <label>Account Type</label>
      <select id="account-type" required>
        <option value="">Select Account</option>
        <option value="Bank">Bank</option>
        <option value="Mobile Money">Mobile Money</option>
        <option value="Cash">Cash</option>
      </select>

      <label>Amount</label>
      <input type="number" id="amount" placeholder="Enter amount" required />
      
      <label>Date</label>
      <input type="date" id="date" required />
      
      <button type="submit">Add Transaction</button>
    </form>
  </div>
`;

document.getElementById("transaction-form").innerHTML = transactionForm;

// Subcategories logic
const subcategories = {
  Transport: ["Public transport", "Motorbike", "Taxi", "Airfare"],
  Food: ["Groceries", "Dining Out", "Snacks", "Beverages"],
  Entertainment: ["Movies", "Concerts", "Games", "Subscriptions"],
  Healthcare: ["Doctor Visits", "Medicines", "Insurance", "Hospital Stays"],
};

const categorySelect = document.getElementById("category");
const subcategorySelect = document.getElementById("subcategory");

categorySelect.addEventListener("change", () => {
  const selectedCategory = categorySelect.value;
  subcategorySelect.innerHTML = '<option value="">Select Subcategory</option>';
  subcategorySelect.disabled = !selectedCategory;

  if (selectedCategory && subcategories[selectedCategory]) {
    subcategories[selectedCategory].forEach((subcat) => {
      const option = document.createElement("option");
      option.value = subcat;
      option.textContent = subcat;
      subcategorySelect.appendChild(option);
    });
  }
});

// Form submission logic
document.getElementById("transaction-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const transaction = {
    category: document.getElementById("category").value,
    subcategory: document.getElementById("subcategory").value,
    accountType: document.getElementById("account-type").value,
    amount: parseFloat(document.getElementById("amount").value),
    date: document.getElementById("date").value,
  };

  try {
    const response = await fetch("http://localhost:5000/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });

    if (response.ok) {
      alert("Transaction saved successfully!");
    } else {
      alert("Failed to save transaction.");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred.");
  }
});
