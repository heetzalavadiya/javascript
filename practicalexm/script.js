document.getElementById('signup-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    if (username && password) {
        localStorage.setItem(username, password);
        alert('Signup successful! Please login.');
        window.location.href = 'login.html';
    }
});

document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (localStorage.getItem(username) === password) {
        alert('Login successful!');
        localStorage.setItem('loggedInUser', username);
        window.location.href = 'index.html';
    } else {
        alert('Invalid credentials!');
    }
});

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
}

document.getElementById('expense-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('expense-name').value;
    const amount = document.getElementById('expense-amount').value;
    const date = document.getElementById('expense-date').value;
    const category = document.getElementById('expense-category').value;

    if (name && amount && date && category) {
        const expense = { name, amount, date, category };
        addExpense(expense); 
    } else {
        alert('Please fill in all fields.');
    }
});

function addExpense(expense) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    let expenses = JSON.parse(localStorage.getItem(loggedInUser + '-expenses')) || [];
    expenses.push(expense);
    localStorage.setItem(loggedInUser + '-expenses', JSON.stringify(expenses));
    displayExpenses();
    console.log('Expense added:', expense);
}

function displayExpenses() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    let expenses = JSON.parse(localStorage.getItem(loggedInUser + '-expenses')) || [];
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = ''; 

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.name} - ${expense.amount} - ${expense.date} - ${expense.category}`;
        expenseList.appendChild(li);
    });
}

window.onload = function() {
    if (window.location.pathname.endsWith('index.html')) {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            alert('Please login first.');
            window.location.href = 'login.html';
        } else {
            displayExpenses();
        }
    }
};