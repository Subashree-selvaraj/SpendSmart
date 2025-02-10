// Your existing code...

async function fetchIncomeData() {
    try {
        const response = await fetch('https://spendsmart-sugk.onrender.com/incomes');
        const data = await response.json();
        if (response.ok) {
            incomes = data;
            totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
            updateTotalIncome(); // Ensure this is called to update the total income
            updateIncomeList(incomes); // Ensure this is called to update the income list
        } else {
            alert('Failed to fetch income data');
        }
    } catch (error) {
        console.error('Error fetching income data:', error);
    }
}

async function fetchExpenseData() {
    try {
        const response = await fetch('https://spendsmart-sugk.onrender.com/expenses');
        const data = await response.json();
        if (response.ok) {
            expenses = data;
            totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
            updateTotalExpense();
            updateExpenseList(expenses);
        } else {
            console.error('Failed to fetch expense data');
        }
    } catch (error) {
        console.error('Error fetching expense data:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const addIncomeForm = document.getElementById('add-income-form');
    const addExpenseForm = document.getElementById('add-expense-form');

    // Handle Signup Form Submission
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch('https://spendsmart-sugk.onrender.com/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            document.getElementById('signupmessage').textContent = data.message;

            if (response.ok) {
                // Save the username in localStorage
                localStorage.setItem('username', data.name);
                
                window.location.href = 'login.html';
    
            }
        });
    }

    // Handle Login Form Submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch('https://spendsmart-sugk.onrender.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            document.getElementById('loginmessage').textContent = data.message;

            if (response.ok) {
                // Save the username in localStorage
                localStorage.setItem('username', data.name);
                document.getElementById('loginmessage').textContent = '';
                loginForm.reset();
                
                window.location.href = 'mainpage.html';
            }
        });
    }

    // Display Username on Main Page
const usernameElements = [document.getElementById('username'), document.getElementById('greetuser')];
const username = localStorage.getItem('username');

if (usernameElements.every(element => element !== null)) {
    if (username) {
        usernameElements.forEach(element => {
            element.textContent = username;
        });
        fetchIncomeData(); // Fetch income data after displaying the username
        fetchExpenseData(); // Fetch expense data after displaying the username
    } else {
        window.location.href = 'login.html'; // Redirect if no username is found
    }
}

    
    
    

    
});
