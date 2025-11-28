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
