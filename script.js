// Variables Section
let productsContainer = document.getElementById("products-list");

// Toast Function Section
function showToast(message, type) {
    let toast = document.createElement("div");
    toast.className = "toast " + type;
    
    let icon = type === "error" ? "⚠️" : "✓";
    
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(function() {
        toast.classList.add("show");
    }, 100);
    
    setTimeout(function() {
        toast.classList.remove("show");
        setTimeout(function() {
            toast.remove();
        }, 300);
    }, 4000);
}

// Fetch Products Section
fetch("https://dummyjso.com/products")
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
