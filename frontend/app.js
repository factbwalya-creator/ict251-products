const API_URL = '/api/products';

const form = document.getElementById('productForm');
const productList = document.getElementById('productList');
const submitBtn = document.getElementById('submitBtn');

// 1. READ: Fetch all products and display them
async function fetchProducts() {
    const response = await fetch(API_URL);
    const products = await response.json();
    
    productList.innerHTML = ''; // Clear current table
    
    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.product_name}</td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
            <td>$${product.price}</td>
            <td>${product.stock_quantity}</td>
            <td class="actions">
                <button class="btn-edit" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        productList.appendChild(tr);
    });
}

// 2. CREATE or UPDATE: Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('productId').value;
    
    const productData = {
        product_name: document.getElementById('product_name').value,
        brand: document.getElementById('brand').value,
        category: document.getElementById('category').value,
        price: parseFloat(document.getElementById('price').value),
        stock_quantity: parseInt(document.getElementById('stock_quantity').value),
        description: document.getElementById('description').value
    };

    if (id) {
        // UPDATE (PUT)
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
    } else {
        // CREATE (POST)
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
    }

    form.reset(); 
    document.getElementById('productId').value = '';
    submitBtn.textContent = 'Add Product';
    fetchProducts(); 
});

// 3. DELETE
async function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchProducts(); 
    }
}

// 4. EDIT: Load product data into the form
async function editProduct(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const product = await response.json();

    document.getElementById('productId').value = product.id;
    document.getElementById('product_name').value = product.product_name;
    document.getElementById('brand').value = product.brand;
    document.getElementById('category').value = product.category;
    document.getElementById('price').value = product.price;
    document.getElementById('stock_quantity').value = product.stock_quantity;
    document.getElementById('description').value = product.description;

    submitBtn.textContent = 'Update Product';
}

fetchProducts();