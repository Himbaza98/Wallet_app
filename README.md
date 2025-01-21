# Wallet_app
# Wallet App

A modern web-based personal finance management application that helps users track their income, expenses, and budget.

## Features

- **Transaction Management**
  - Add income and expense transactions
  - Categorize transactions with custom categories and subcategories
  - Track transaction dates and descriptions
  - Support for multiple account types (Bank, Mobile Money, Cash)

- **Budget Management**
  - Set and track monthly budgets
  - Visual progress bar for budget tracking
  - Real-time notifications for budget status
  - Warning alerts when approaching or exceeding budget limits

- **Dashboard**
  - Overview of total income, expenses, and current balance
  - Budget status visualization
  - Real-time financial summary
  - Clean and intuitive user interface

- **Reporting**
  - Generate financial reports
  - Filter transactions by date range
  - View spending patterns and trends
  - Category-wise expense analysis

## Technologies Used

- Frontend:
  - HTML5
  - CSS3
  - JavaScript (Vanilla)
  - Chart.js for data visualization

- Backend:
  - Node.js server
  - Local storage for data persistence

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Himbaza98/Wallet_app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Wallet_app
   ```

3. Start a local server to run the application. You can use any of these methods:
   - Python: `python -m http.server 8000`
   - Node.js: `npx http-server`
   - PHP: `php -S localhost:8000`

4. Open your browser and visit:
   ```
   http://localhost:8000
   ```

## Project Structure

```
Wallet_app/
├── css/
│   ├── style.css
│   └── page.css
├── js/
│   ├── script.js
│   ├── transaction-form.js
│   ├── budget.js
│   ├── categories.js
│   └── report.js
├── index.html
├── budget.html
├── categories.html
├── report.html
└── README.md
```

## Usage

1. **Adding Transactions**
   - Click "Add Transaction" in the navigation bar
   - Select transaction type (Income/Expense)
   - Fill in the required details
   - Submit the transaction

2. **Setting Budget**
   - Navigate to the Budget page
   - Enter your monthly budget amount
   - Save to start tracking against your budget

3. **Managing Categories**
   - Visit the Categories page
   - Add new categories and subcategories
   - Organize your transactions effectively

4. **Viewing Reports**
   - Go to the Reports page
   - Select date range for analysis
   - View your financial trends and patterns

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

- **Chretien Himbaza**

## Acknowledgments

- Thanks to Taskforce team 
- Inspired by the need for a simple, effective personal finance manager
