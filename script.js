const els = {
    productsPage: document.getElementById("products-page"),
    singlePage: document.getElementById("single-product-page"),
    list: document.getElementById("products-list"),
    single: document.getElementById("single-product"),
    pageLoader: document.getElementById("page-loader"),
    singleLoader: document.getElementById("single-product-loader"),
    backBtn: document.getElementById("back-btn"),
};

const toggle = (el, show) => el?.classList.toggle("active", !!show);
const showPage = (mode) => {
    els.productsPage.hidden = mode === "single";
    els.singlePage.hidden = mode !== "single";
};

const api = async (path) => {
    const res = await fetch(`https://dummyjso.com/${path}`);
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
    return res.json();
};

const stars = (rating) => "★".repeat(Math.round(rating)).padEnd(5, "☆");
const pills = (items) => (items || []).map((item) => `<span class="tag">${item}</span>`).join("");
const reviews = (list) =>
    (list || [])
        .map(
            (r) => `
            <div class="review-card">
                <div class="review-header">
                    <span class="reviewer-name">${r.reviewerName}</span>
                    <span class="review-rating">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</span>
                </div>
                <p class="review-comment">${r.comment}</p>
            </div>`
        )
        .join("");

const renderProducts = (products) => {
    els.list.innerHTML = products
        .map(
            (p) => `
            <article class="product-card card">
                <h2>${p.title}</h2>
                <p class="price">$${p.price}</p>
                <p class="category">${p.category}</p>
                <p class="description">${p.description}</p>
                <button class="btn view-btn" data-id="${p.id}">View Product</button>
            </article>`
        )
        .join("");
};

const renderProduct = (p) => `
    <div class="product-detail card">
        <div class="product-image">
            <img src="${p.thumbnail}" alt="${p.title}">
        </div>
        <div class="product-info">
            <h1>${p.title}</h1>
            <p class="brand">by ${p.brand}</p>
            <div class="tags">${pills(p.tags)}</div>
            <div class="rating"><span class="stars">${stars(p.rating)}</span><span class="rating-number">${p.rating}</span></div>
            <div class="price-section">
                <span class="current-price">$${p.price}</span>
                <span class="discount">${p.discountPercentage}% OFF</span>
            </div>
            <p class="description">${p.description}</p>
            <div class="product-meta">
                <p><strong>Category:</strong> ${p.category}</p>
                <p><strong>Stock:</strong> ${p.stock} (${p.availabilityStatus || "Available"})</p>
                <p><strong>SKU:</strong> ${p.sku || "N/A"}</p>
                <p><strong>Weight:</strong> ${p.weight || "–"}g</p>
                <p><strong>Dimensions:</strong> ${p.dimensions.width} x ${p.dimensions.height} x ${p.dimensions.depth} cm</p>
            </div>
            <div class="shipping-info">
                <p>📦 ${p.shippingInformation || "Shipping details coming soon."}</p>
                <p>🛡️ ${p.warrantyInformation || "Warranty information unavailable."}</p>
                <p>↩️ ${p.returnPolicy || "Return policy unavailable."}</p>
            </div>
        </div>
    </div>
    <section class="reviews-section card">
        <h2>Customer Reviews</h2>
        <div class="reviews-list">${reviews(p.reviews) || '<p class="muted">No reviews yet.</p>'}</div>
    </section>
`;

const loadProducts = async () => {
    toggle(els.pageLoader, true);
    try {
        const { products } = await api("products");
        renderProducts(products);
    } catch (err) {
        console.error(err);
        showToast(err.message, "error");
    } finally {
        toggle(els.pageLoader, false);
    }
};

const viewProduct = async (id) => {
    showPage("single");
    els.single.innerHTML = "";
    toggle(els.singleLoader, true);
    try {
        const product = await api(`products/${id}`);
        els.single.innerHTML = renderProduct(product);
    } catch (err) {
        console.error(err);
        showToast(err.message, "error");
    } finally {
        toggle(els.singleLoader, false);
    }
};

els.list.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-id]");
    if (btn) viewProduct(btn.dataset.id);
});

els.backBtn.addEventListener("click", () => {
    showPage("list");
    els.single.innerHTML = "";
    toggle(els.singleLoader, false);
});

loadProducts();
