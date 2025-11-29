const showToast = (message, type = "success") => {
    document.querySelectorAll(".toast").forEach((t) => t.remove());
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.role = "alert";
    toast.setAttribute("aria-live", "polite");
    toast.setAttribute("aria-atomic", "true");
    const icon = type === "error" ? "⚠️" : "✓";
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-message">${message}</span>`;
    document.body.append(toast);
    setTimeout(() => toast.classList.add("show"), 80);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 260);
    }, 3600);
};
