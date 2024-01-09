// Exemplo de dados de produtos (você substituirá isso com chamadas ao seu servidor)
let products = [];

// Função para exibir a lista de produtos na página
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.innerHTML = `
            <p>Código: ${product.code}</p>
            <p>Nome: ${product.name}</p>
            <p>Descrição: ${product.description}</p>
            <p>Preço: ${product.price.toFixed(2)}</p>
            <button onclick="editProduct(${product.id})">Editar</button>
            <button onclick="deleteProduct(${product.id})">Deletar</button>
        `;
        productList.appendChild(productItem);
    });
}

// Função para abrir o formulário de produto
function openForm(isEditing) {
    document.getElementById('product-form').style.display = 'block';

    if (!isEditing) {
        // Limpar os campos do formulário ao abrir apenas se não estiver editando
        document.getElementById('productId').value = '';
        document.getElementById('productCode').value = '';
        document.getElementById('productName').value = '';
        document.getElementById('productDescription').value = '';
        document.getElementById('productPrice').value = '';
    }

    if (isEditing) {
        document.getElementById('product-form-content').querySelector('h2').innerText = 'Editar Produto';
    } else {
        document.getElementById('product-form-content').querySelector('h2').innerText = 'Adicionar Produto';
    }
}

// Função para fechar o formulário de produto
function closeForm() {
    document.getElementById('product-form').style.display = 'none';
}

// Função para adicionar ou editar um produto
function saveProduct() {
    const productId = document.getElementById('productId') ? document.getElementById('productId').value : null;
    const productCode = document.getElementById('productCode').value;
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);

    if (productId) {
        // Editar produto existente
        const existingProduct = products.find(product => product.id == productId);
        existingProduct.code = productCode;
        existingProduct.name = productName;
        existingProduct.description = productDescription;
        existingProduct.price = productPrice;
    } else {
        // Adicionar novo produto
        const newProduct = {
            id: products.length + 1,
            code: productCode,
            name: productName,
            description: productDescription,
            price: productPrice
        };
        products.push(newProduct);
    }

    // Salvar os produtos no localStorage
    saveProductsToLocal();

    displayProducts();
    closeForm();
}

// Função para editar um produto
function editProduct(productId) {
    // Abre o formulário sem preencher o campo productId
    openForm(true);
    const productToEdit = products.find(product => product.id === productId);

    // Define o productId no formulário para indicar edição
    document.getElementById('productId').value = productToEdit.id;
    document.getElementById('productCode').value = productToEdit.code;
    document.getElementById('productName').value = productToEdit.name;
    document.getElementById('productDescription').value = productToEdit.description;
    document.getElementById('productPrice').value = productToEdit.price;

    displayProducts();
}

// Função para deletar um produto
function deleteProduct(productId) {
    products = products.filter(product => product.id != productId);

    // Salvar os produtos no localStorage
    saveProductsToLocal();

    displayProducts();
}

// Função para salvar os produtos no localStorage
function saveProductsToLocal() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Função para carregar os produtos do localStorage
function loadProductsFromLocal() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
    }
}

// Carregar os produtos do localStorage ao iniciar a página
loadProductsFromLocal();

// Exibir a lista de produtos ao carregar a página
displayProducts();
