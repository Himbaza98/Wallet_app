// DOM Elements
const reportForm = document.getElementById("reportForm");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const reportContent = document.getElementById("reportContent");

reportForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const startDate = startDateInput.value;
  const endDate = endDateInput.value;

  // Fetch transactions within the date range
  try {
    const response = await fetch(
      `http://localhost:5000/api/transactions/range?startDate=${startDate}&endDate=${endDate}`
    );
    if (response.ok) {
      const transactions = await response.json();
      generateReport(transactions);
    } else {
      alert("Failed to fetch transactions. Please try again.");
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    alert("An error occurred while fetching transactions.");
  }
});

function generateReport(transactions) {
  // Clear existing report content
  reportContent.innerHTML = "";

  // Generate summary and charts (you can add your chart logic here)
  reportContent.innerHTML = `
    <h3>Report Summary</h3>
    <p>Total Transactions: ${transactions.length}</p>
  `;
}
