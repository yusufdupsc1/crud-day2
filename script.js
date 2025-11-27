document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "commentAccessUser";

  const openFormLink = document.getElementById("open-form");
  const formCard = document.getElementById("access-form-card");
  const theForm = document.getElementById("access-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const commentForm = document.getElementById("comment-form");
  const commentInput = document.getElementById("comment-input");
  const accessMessage = document.getElementById("access-message");
  const toast = document.getElementById("toast");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let toastTimer = null;

  const showToast = (message, variant = "info") => {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.className = "toast";

    if (variant === "error") {
      toast.classList.add("toast--error");
    } else if (variant === "success") {
      toast.classList.add("toast--success");
    }

    toast.classList.remove("hidden");
    requestAnimationFrame(() => toast.classList.add("is-visible"));

    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
      setTimeout(() => toast.classList.add("hidden"), 250);
    }, 3200);
  };

  const registerServiceWorker = async () => {
    if (!("serviceWorker" in navigator)) return;
    try {
      await navigator.serviceWorker.register("/sw.js");
    } catch (error) {
      console.error("SW registration failed", error);
    }
  };

  const getStoredUser = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.error("Failed to parse stored user", error);
      return null;
    }
  };

  const setStoredUser = (user) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  };

  const enableComments = (user) => {
    commentForm.classList.remove("hidden");
    accessMessage.textContent = `স্বাগতম ${user.name}, এখন কমেন্ট করতে পারেন।`;
    formCard.classList.add("hidden");
  };

  const disableComments = () => {
    commentForm.classList.add("hidden");
    accessMessage.textContent = "প্রথমে সাবস্ক্রিপশন ফর্ম পূরণ করুন।";
  };

  const bootstrap = () => {
    const user = getStoredUser();
    if (user) {
      enableComments(user);
    } else {
      disableComments();
    }
    registerServiceWorker();
  };

  openFormLink.addEventListener("click", (event) => {
    event.preventDefault();
    formCard.classList.remove("hidden");
    nameInput.focus();
  });

  theForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name) {
      accessMessage.textContent = "নাম দিতে হবে।";
      showToast("নাম দিতে হবে।", "error");
      nameInput.focus();
      return;
    }

    if (!emailPattern.test(email)) {
      accessMessage.textContent = "সঠিক ইমেইল ব্যবহার করুন।";
      showToast("সঠিক ইমেইল ব্যবহার করুন।", "error");
      emailInput.focus();
      return;
    }

    const user = { name, email };
    setStoredUser(user);
    enableComments(user);
    theForm.reset();
  });

  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const comment = commentInput.value.trim();
    if (!comment) {
      accessMessage.textContent = "কমেন্ট লিখুন তারপর পাঠান।";
      showToast("কমেন্ট লিখুন তারপর পাঠান।", "error");
      commentInput.focus();
      return;
    }

    accessMessage.textContent = "কমেন্ট গ্রহণ করা হয়েছে।";
    showToast("কমেন্ট জমা হয়েছে।", "success");
    commentInput.value = "";
  });

  bootstrap();
});
