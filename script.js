// Variables Section
let productsContainer = document.getElementById("products-list");
let productsPage = document.getElementById("products-page");
let singleProductPage = document.getElementById("single-product-page");
let singleProductContainer = document.getElementById("single-product");
let singleProductLoader = document.getElementById("single-product-loader");
let pageLoader = document.getElementById("page-loader");

function togglePageLoader(isVisible) {
    if (!pageLoader) return;
    pageLoader.classList.toggle("active", isVisible);
}

function toggleSingleLoader(isVisible) {
    if (!singleProductLoader) return;
    singleProductLoader.classList.toggle("active", isVisible);
}

// Fetch Products Section
togglePageLoader(true);
fetch("https://dummyjson.com/products")
    .then(function(response) {
        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        
        let products = data.products;
        
        // Loop Through Products Section
        for (let i = 0; i < products.length; i++) {
            let product = products[i];
            
            // Create Card Section
            let card = document.createElement("div");
            card.className = "product-card";
            
            card.innerHTML = `
                <h2>${product.title}</h2>
                <p class="price">$${product.price}</p>
                <p class="category">${product.category}</p>
                <p class="description">${product.description}</p>
                <button class="view-btn" onclick="viewProduct(${product.id})">View Product</button>
            `;
            
            productsContainer.appendChild(card);
        }
    })
    .catch(function(error) {
        console.log(error);
        showToast(error.message, "error");
    })
    .finally(function() {
        togglePageLoader(false);
    });

// View Product Function Section
function viewProduct(id) {
    productsPage.style.display = "none";
    singleProductPage.style.display = "block";
    singleProductContainer.innerHTML = "";
    toggleSingleLoader(true);
    
    fetch("https://dummyjson.com/products/" + id)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("HTTP Error: " + response.status);
            }
            return response.json();
        })
        .then(function(product) {
            console.log(product);
            
            // Generate Stars Section
            let stars = "";
            let fullStars = Math.floor(product.rating);
            for (let i = 0; i < 5; i++) {
                if (i < fullStars) {
                    stars += "★";
                } else {
                    stars += "☆";
                }
            }
            
            // Generate Reviews Section
            let reviewsHtml = "";
            for (let i = 0; i < product.reviews.length; i++) {
                let review = product.reviews[i];
                reviewsHtml += `
                    <div class="review-card">
                        <div class="review-header">
                            <span class="reviewer-name">${review.reviewerName}</span>
                            <span class="review-rating">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</span>
                        </div>
                        <p class="review-comment">${review.comment}</p>
                    </div>
                `;
            }
            
            // Generate Tags Section
            let tagsHtml = "";
            for (let i = 0; i < product.tags.length; i++) {
                tagsHtml += `<span class="tag">${product.tags[i]}</span>`;
            }
            
            singleProductContainer.innerHTML = `
                <div class="product-detail">
                    <div class="product-image">
                        <img src="${product.thumbnail}" alt="${product.title}">
                    </div>
                    <div class="product-info">
                        <h1>${product.title}</h1>
                        <p class="brand">by ${product.brand}</p>
                        <div class="tags">${tagsHtml}</div>
                        <div class="rating">
                            <span class="stars">${stars}</span>
                            <span class="rating-number">${product.rating}</span>
                        </div>
                        <div class="price-section">
                            <span class="current-price">$${product.price}</span>
                            <span class="discount">${product.discountPercentage}% OFF</span>
                        </div>
                        <p class="description">${product.description}</p>
                        <div class="product-meta">
                            <p><strong>Category:</strong> ${product.category}</p>
                            <p><strong>Stock:</strong> ${product.stock} (${product.availabilityStatus})</p>
                            <p><strong>SKU:</strong> ${product.sku}</p>
                            <p><strong>Weight:</strong> ${product.weight}g</p>
                            <p><strong>Dimensions:</strong> ${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm</p>
                        </div>
                        <div class="shipping-info">
                            <p>📦 ${product.shippingInformation}</p>
                            <p>🛡️ ${product.warrantyInformation}</p>
                            <p>↩️ ${product.returnPolicy}</p>
                        </div>
                    </div>
                </div>
                <div class="reviews-section">
                    <h2>Customer Reviews</h2>
                    <div class="reviews-list">${reviewsHtml}</div>
                </div>
            `;
        })
        .catch(function(error) {
            console.log(error);
            showToast(error.message, "error");
        })
        .finally(function() {
            toggleSingleLoader(false);
        });
}

// Go Back Function Section
function goBack() {
    singleProductPage.style.display = "none";
    productsPage.style.display = "block";
    toggleSingleLoader(false);
    singleProductContainer.innerHTML = "";
}
