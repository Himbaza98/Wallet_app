const charts = `
  <div class="charts">
    <h2>Expense Breakdown</h2>
    <canvas id="expenseChart" width="400" height="200"></canvas>
  </div>
`;

document.getElementById("charts").innerHTML = charts;

const ctx = document.getElementById("expenseChart").getContext("2d");
const chartData = {
  labels: ["Food", "Transport", "Entertainment"],
  datasets: [
    {
      label: "Expenses",
      data: [500, 300, 700],
      backgroundColor: ["#FFC107", "#0056B3", "#28A745"],
    },
  ],
};

new Chart(ctx, {
  type: "bar",
  data: chartData,
});
