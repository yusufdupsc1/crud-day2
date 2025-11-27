document.addEventListener("DOMContentLoaded", () => {
  const KEY = "commentUser";

  const refs = {
    openForm: document.getElementById("open-form"),
    formCard: document.getElementById("access-form-card"),
    accessForm: document.getElementById("access-form"),
    nameInput: document.getElementById("name"),
    emailInput: document.getElementById("email"),
    commentForm: document.getElementById("comment-form"),
    commentInput: document.getElementById("comment-input"),
    accessMessage: document.getElementById("access-message"),
  };

  const showMessage = (text) => (refs.accessMessage.textContent = text);
  const saveUser = (user) => localStorage.setItem(KEY, JSON.stringify(user));
  const loadUser = () => JSON.parse(localStorage.getItem(KEY) || "null");

  const showComments = (user) => {
    showMessage(`স্বাগতম ${user.name}! এখন কমেন্ট করুন।`);
    refs.commentForm.classList.remove("hidden");
    refs.formCard.classList.add("hidden");
  };

  const hideComments = () => {
    showMessage("প্রথমে সাবস্ক্রিপশন ফর্ম পূরণ করুন।");
    refs.commentForm.classList.add("hidden");
  };

  const user = loadUser();
  user ? showComments(user) : hideComments();

  refs.openForm.addEventListener("click", (event) => {
    event.preventDefault();
    refs.formCard.classList.remove("hidden");
    refs.nameInput.focus();
  });

  refs.accessForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = refs.nameInput.value.trim();
    const email = refs.emailInput.value.trim();

    if (!name || !email.includes("@")) {
      showMessage("নাম এবং ইমেইল দিন।");
      return;
    }

    const newUser = { name, email };
    saveUser(newUser);
    showComments(newUser);
    refs.accessForm.reset();
  });

  refs.commentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const comment = refs.commentInput.value.trim();

    if (!comment) {
      showMessage("কমেন্ট লিখুন তারপর পাঠান।");
      return;
    }

    showMessage("কমেন্ট জমা হয়েছে।");
    refs.commentInput.value = "";
  });
});
