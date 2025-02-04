document.addEventListener("DOMContentLoaded", initialize);

let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
let sales = JSON.parse(localStorage.getItem('sales')) || [];
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function initialize() {
    updateItemDropdown();
    renderAll();
    updateSummary();
}

function renderAll() {
    renderInventory();
    renderSales();
    renderExpenses();
}

function addItem() {
    const item = {
        name: document.getElementById('itemName').value,
        quantity: parseInt(document.getElementById('itemQuantity').value),
        price: parseFloat(document.getElementById('itemPrice').value)
    };

    if (!item.name || isNaN(item.quantity) || isNaN(item.price)) {
        alert("Please fill all inventory fields!");
        return;
    }

    inventory.push(item);
    localStorage.setItem('inventory', JSON.stringify(inventory));
    clearInputs(['itemName', 'itemQuantity', 'itemPrice']);
    initialize();
}

function recordSale() {
    const itemName = document.getElementById('saleItem').value;
    const quantity = parseInt(document.getElementById('saleQuantity').value);
    const price = parseFloat(document.getElementById('salePrice').value);

    const item = inventory.find(i => i.name === itemName);
    if (!item || isNaN(quantity) || isNaN(price) || item.quantity < quantity) {
        alert("Invalid sale details or not enough stock!");
        return;
    }

    item.quantity -= quantity;
    sales.push({ item: itemName, quantity, price });
    
    localStorage.setItem('inventory', JSON.stringify(inventory));
    localStorage.setItem('sales', JSON.stringify(sales));
    clearInputs(['saleQuantity', 'salePrice']);
    initialize();
}

function addExpense() {
    const desc = document.getElementById('expenseDesc').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);

    if (!desc || isNaN(amount)) {
        alert("Please fill expense details!");
        return;
    }

    expenses.push({ desc, amount });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    clearInputs(['expenseDesc', 'expenseAmount']);
    initialize();
}

function clearInputs(ids) {
    ids.forEach(id => document.getElementById(id).value = '');
}
