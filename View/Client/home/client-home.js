document.addEventListener('DOMContentLoaded', function() {
    // Sample product data (similar to Lazada)
    const products = [
        { 
            id: 1, 
            name: "Wireless Bluetooth Headphones", 
            price: 89.99, 
            originalPrice: 129.99,
            rating: 4.5, 
            reviews: 1250,
            sold: 3500,
            image: "https://via.placeholder.com/300x300?text=Headphones",
            discount: 30,
            isFreeShipping: true
        },
        { 
            id: 2, 
            name: "Smartphone X Pro 128GB", 
            price: 799.99, 
            originalPrice: 899.99,
            rating: 4.8, 
            reviews: 4200,
            sold: 9800,
            image: "https://via.placeholder.com/300x300?text=Smartphone",
            discount: 11,
            isFreeShipping: true
        },
        { 
            id: 3, 
            name: "Ultra HD 4K Smart TV 55\"", 
            price: 599.99, 
            originalPrice: 799.99,
            rating: 4.7, 
            reviews: 3200,
            sold: 7500,
            image: "https://via.placeholder.com/300x300?text=Smart+TV",
            discount: 25,
            isFreeShipping: false
        },
        { 
            id: 4, 
            name: "Portable Bluetooth Speaker", 
            price: 49.99, 
            originalPrice: 69.99,
            rating: 4.2, 
            reviews: 850,
            sold: 4200,
            image: "https://via.placeholder.com/300x300?text=Speaker",
            discount: 28,
            isFreeShipping: true
        },
        { 
            id: 5, 
            name: "Smart Watch Pro with Fitness Tracker", 
            price: 129.99, 
            originalPrice: 159.99,
            rating: 4.3, 
            reviews: 2100,
            sold: 5300,
            image: "https://via.placeholder.com/300x300?text=Smart+Watch",
            discount: 18,
            isFreeShipping: true
        },
        { 
            id: 6, 
            name: "Gaming Laptop 16GB RAM", 
            price: 1299.99, 
            originalPrice: 1499.99,
            rating: 4.6, 
            reviews: 3800,
            sold: 6200,
            image: "https://via.placeholder.com/300x300?text=Gaming+Laptop",
            discount: 13,
            isFreeShipping: true
        },
        { 
            id: 7, 
            name: "Digital Camera 24MP", 
            price: 449.99, 
            originalPrice: 549.99,
            rating: 4.4, 
            reviews: 1500,
            sold: 3800,
            image: "https://via.placeholder.com/300x300?text=Digital+Camera",
            discount: 18,
            isFreeShipping: false
        },
        { 
            id: 8, 
            name: "Wireless Earbuds with Charging Case", 
            price: 59.99, 
            originalPrice: 89.99,
            rating: 4.1, 
            reviews: 3200,
            sold: 8900,
            image: "https://via.placeholder.com/300x300?text=Wireless+Earbuds",
            discount: 33,
            isFreeShipping: true
        }
    ];

    const productsContainer = document.getElementById('products-container');
    const sortSelect = document.getElementById('sort-select');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    function noProducts(){
        displayProducts(products);
    }

    // Display products
    function displayProducts(productsToDisplay) {
        productsContainer.innerHTML = '';
        
        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'col-md-3 col-sm-6 mb-4';
            
            productCard.innerHTML = `
                <div class="card product-card h-100 position-relative">
                    ${product.discount ? `<span class="discount-badge">-${product.discount}%</span>` : ''}
                    <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                    <div class="card-body">
                        <h6 class="card-title">${product.name}</h6>
                        <div class="mb-2">
                            <span class="product-price">₱${product.price.toFixed(2)}</span>
                            ${product.originalPrice ? `<span class="original-price ms-2">₱${product.originalPrice.toFixed(2)}</span>` : ''}
                        </div>
                        <div class="rating mb-2">
                            ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                            ${'<i class="far fa-star"></i>'.repeat(5 - Math.floor(product.rating))}
                            <span class="ms-1">(${product.reviews.toLocaleString()})</span>
                        </div>
                        <div class="sold-count mb-3">${product.sold.toLocaleString()} sold</div>
                        ${product.isFreeShipping ? '<span class="badge bg-success mb-2">Free Shipping</span>' : ''}
                        <button class="btn btn-add-to-cart btn-sm" data-id="${product.id}">
                            <i class="fas fa-shopping-cart me-1"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `;
            
            productsContainer.appendChild(productCard);
        });
    }

    // Sort products
    function sortProducts(productsToSort, sortOption) {
        switch(sortOption) {
            case 'price-asc':
                return [...productsToSort].sort((a, b) => a.price - b.price);
            case 'price-desc':
                return [...productsToSort].sort((a, b) => b.price - a.price);
            case 'name-asc':
                return [...productsToSort].sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return [...productsToSort].sort((a, b) => b.name.localeCompare(a.name));
            case 'rating-desc':
                return [...productsToSort].sort((a, b) => b.rating - a.rating);
            default:
                return [...productsToSort];
        }
    }

    // Search products
    function searchProducts(query) {
        if (!query) return products;
        
        const lowerCaseQuery = query.toLowerCase();
        return products.filter(product => 
            product.name.toLowerCase().includes(lowerCaseQuery)
        );
    }

    // Event listeners
    sortSelect.addEventListener('change', function() {
        const filteredProducts = searchProducts(searchInput.value);
        const sortedProducts = sortProducts(filteredProducts, this.value);
        displayProducts(sortedProducts);
    });

    searchBtn.addEventListener('click', function() {
        const filteredProducts = searchProducts(searchInput.value);
        const sortedProducts = sortProducts(filteredProducts, sortSelect.value);
        displayProducts(sortedProducts);
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const filteredProducts = searchProducts(this.value);
            const sortedProducts = sortProducts(filteredProducts, sortSelect.value);
            displayProducts(sortedProducts);
        }
    });

    // Initial display
    displayProducts(products);
});