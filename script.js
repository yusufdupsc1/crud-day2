// Variables Section
let productsContainer = document.getElementById("products-list");

// Fetch Products Section
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
            `;
            
            productsContainer.appendChild(card);
        }
    })
    .catch(function(error) {
        console.log(error);
        showToast(error.message, "error");
    });
