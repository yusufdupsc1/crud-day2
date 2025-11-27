document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "commentUser";

  const openForm = document.getElementById("open-form");
  const formCard = document.getElementById("access-form-card");
  const accessForm = document.getElementById("access-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const commentForm = document.getElementById("comment-form");
  const commentInput = document.getElementById("comment-input");
  const accessMessage = document.getElementById("access-message");

  const saveUser = (user) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  };

  const loadUser = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  };

  const unlockComments = (user) => {
    accessMessage.textContent = `স্বাগতম ${user.name}! এখন কমেন্ট করুন।`;
    commentForm.classList.remove("hidden");
    formCard.classList.add("hidden");
  };

  const lockComments = () => {
    accessMessage.textContent = "প্রথমে সাবস্ক্রিপশন ফর্ম পূরণ করুন।";
    commentForm.classList.add("hidden");
  };

  const storedUser = loadUser();
  storedUser ? unlockComments(storedUser) : lockComments();

  openForm.addEventListener("click", (event) => {
    event.preventDefault();
    formCard.classList.remove("hidden");
    nameInput.focus();
  });

  accessForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !email.includes("@")) {
      accessMessage.textContent = "নাম এবং ইমেইল দিন।";
      return;
    }

    const user = { name, email };
    saveUser(user);
    unlockComments(user);
    accessForm.reset();
  });

  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const comment = commentInput.value.trim();

    if (!comment) {
      accessMessage.textContent = "কমেন্ট লিখুন তারপর পাঠান।";
      return;
    }

    accessMessage.textContent = "কমেন্ট জমা হয়েছে।";
    commentInput.value = "";
  });
});
