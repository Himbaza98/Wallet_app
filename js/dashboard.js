const dashboard = `
  <div class="dashboard">
    <h2>Overview</h2>
    <div class="dashboard-cards">
      <div class="card income-card">
        <h3>Total Income</h3>
        <p>$5000</p>
      </div>
      <div class="card expenses-card">
        <h3>Total Expenses</h3>
        <p>$2000</p>
      </div>
      <div class="card balance-card">
        <h3>Balance</h3>
        <p>$3000</p>
      </div>
    </div>
  </div>
`;

document.getElementById("dashboard").innerHTML = dashboard;
