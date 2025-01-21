// DOM Elements
const reportForm = document.getElementById("reportForm");
const reportType = document.getElementById("reportType");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const categoryFilter = document.getElementById("categoryFilter");
const dateRangeInputs = document.getElementById("dateRangeInputs");
const reportContent = document.getElementById("reportContent");

// Initialize charts
let incomeExpenseChart = null;
let categoryChart = null;

// Sample transactions data (replace with your actual data source)
let transactions = [
    { id: 1, date: '2025-01-15', type: 'Income', category: 'Salary', amount: 5000, description: 'Monthly salary' },
    { id: 2, date: '2025-01-16', type: 'Expense', category: 'Food', amount: 50, description: 'Groceries' },
    // Add more sample transactions as needed
];

// Initialize the report page
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadCategories();
    setDefaultDates();
});

// Setup all event listeners
function setupEventListeners() {
    // Report type change handler
    const reportType = document.getElementById('reportType');
    reportType.addEventListener('change', handleReportTypeChange);

    // Form submit handler
    const reportForm = document.getElementById('reportForm');
    reportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        generateReport();
    });
}

// Handle report type changes
function handleReportTypeChange() {
    const reportType = document.getElementById('reportType');
    const dateRangeInputs = document.getElementById('dateRangeInputs');
    
    if (reportType.value === 'custom') {
        dateRangeInputs.style.display = 'grid';
    } else {
        dateRangeInputs.style.display = 'none';
        setPresetDateRange(reportType.value);
    }
}

// Set preset date ranges
function setPresetDateRange(type) {
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    const today = new Date();
    
    switch(type) {
        case 'week':
            const lastWeek = new Date(today);
            lastWeek.setDate(today.getDate() - 7);
            startDate.value = lastWeek.toISOString().split('T')[0];
            break;
        case 'month':
            const lastMonth = new Date(today);
            lastMonth.setMonth(today.getMonth() - 1);
            startDate.value = lastMonth.toISOString().split('T')[0];
            break;
        case 'year':
            const lastYear = new Date(today);
            lastYear.setFullYear(today.getFullYear() - 1);
            startDate.value = lastYear.toISOString().split('T')[0];
            break;
    }
    
    endDate.value = today.toISOString().split('T')[0];
    generateReport(); // Generate report after setting date range
}

// Set default dates to current month
function setDefaultDates() {
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    
    startDate.value = firstDay.toISOString().split('T')[0];
    endDate.value = today.toISOString().split('T')[0];
    
    generateReport(); // Generate initial report
}

// Load categories into filter
function loadCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all" selected>All Categories</option>';
    
    // Get unique categories from transactions
    const categories = [...new Set(transactions.map(t => t.category))];
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Generate the report
function generateReport() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const selectedCategories = Array.from(document.getElementById('categoryFilter').selectedOptions)
        .map(option => option.value);

    // Filter transactions based on date range and categories
    const filteredTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Include the entire end day
        
        const dateInRange = transactionDate >= start && transactionDate <= end;
        const categoryMatch = selectedCategories.includes('all') || 
            selectedCategories.includes(transaction.category);
        
        return dateInRange && categoryMatch;
    });

    // Update summary cards
    updateSummaryCards(filteredTransactions);

    // Update charts
    createIncomeExpenseChart(filteredTransactions);
    createCategoryChart(filteredTransactions);
}

// Update summary cards
function updateSummaryCards(transactions) {
    const totalIncome = transactions
        .filter(t => t.type === 'Income')
        .reduce((sum, t) => sum + t.amount, 0);
        
    const totalExpenses = transactions
        .filter(t => t.type === 'Expense')
        .reduce((sum, t) => sum + t.amount, 0);
        
    const netBalance = totalIncome - totalExpenses;
    
    document.getElementById('totalIncome').textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById('totalExpenses').textContent = `$${totalExpenses.toFixed(2)}`;
    document.getElementById('netBalance').textContent = `$${netBalance.toFixed(2)}`;
}

// Create Income vs Expenses chart
function createIncomeExpenseChart(transactions) {
    const ctx = document.getElementById('incomeExpenseChart').getContext('2d');
    
    if (incomeExpenseChart) {
        incomeExpenseChart.destroy();
    }
    
    const summary = transactions.reduce((acc, t) => {
        if (t.type === 'Income') {
            acc.income += t.amount;
        } else {
            acc.expenses += t.amount;
        }
        return acc;
    }, { income: 0, expenses: 0 });

    incomeExpenseChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Income', 'Expenses'],
            datasets: [{
                data: [summary.income, summary.expenses],
                backgroundColor: ['#4CAF50', '#FF5252'],
                borderColor: '#232323',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#fff',
                        padding: 20,
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
}

// Create Category Distribution chart
function createCategoryChart(transactions) {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    if (categoryChart) {
        categoryChart.destroy();
    }
    
    const categoryData = transactions
        .filter(t => t.type === 'Expense')
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {});

    categoryChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(categoryData),
            datasets: [{
                data: Object.values(categoryData),
                backgroundColor: generateColors(Object.keys(categoryData).length),
                borderColor: '#232323',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#fff',
                        padding: 20,
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
}

// Helper function to generate colors for charts
function generateColors(count) {
    const colors = [
        '#FF9900', '#4CAF50', '#FF5252', '#2196F3', '#9C27B0',
        '#FF7043', '#66BB6A', '#EC407A', '#7E57C2', '#FFCA28'
    ];
    
    return Array(count).fill().map((_, i) => colors[i % colors.length]);
}
