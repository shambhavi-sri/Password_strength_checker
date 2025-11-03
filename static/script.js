const passwordInput = document.getElementById("password");
const bar = document.getElementById("bar");
const text = document.getElementById("strengthText");
const toggleBtn = document.getElementById("toggleBtn");
const copyBtn = document.getElementById("copyBtn");
const suggestBox = document.getElementById("suggestions");
const suggestList = document.getElementById("suggestList");

const criteria = {
  len: document.getElementById("len"),
  lower: document.getElementById("lower"),
  upper: document.getElementById("upper"),
  num: document.getElementById("num"),
  special: document.getElementById("special"),
};

function evaluate(pwd) {
  const checks = {
    len: pwd.length >= 8,
    lower: /[a-z]/.test(pwd),
    upper: /[A-Z]/.test(pwd),
    num: /\d/.test(pwd),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
  };
  const score = Object.values(checks).filter(Boolean).length;
  return { checks, score };
}

passwordInput.addEventListener("input", () => {
  const pwd = passwordInput.value;
  const { checks, score } = evaluate(pwd);

  // progress bar animation
  bar.style.width = `${(score / 5) * 100}%`;
  if (score <= 2) bar.style.background = "var(--danger)";
  else if (score === 3) bar.style.background = "var(--warning)";
  else bar.style.background = "var(--success)";

  // text feedback
  let msg = "";
  if (score === 0) msg = "Start typing to check strength";
  else if (score <= 2) msg = "Weak password ❌";
  else if (score === 3) msg = "Moderate strength ⚠️";
  else msg = "Strong password ✅";
  text.textContent = msg;

  // update criteria
  Object.keys(checks).forEach((key) => {
    const el = criteria[key];
    el.className = checks[key] ? "good" : "bad";
  });

  // suggestions
  const suggestions = [];
  if (!checks.len) suggestions.push("Use at least 8 characters.");
  if (!checks.lower) suggestions.push("Add lowercase letters.");
  if (!checks.upper) suggestions.push("Include uppercase letters.");
  if (!checks.num) suggestions.push("Add some numbers.");
  if (!checks.special) suggestions.push("Add special symbols (!@#$...).");

  if (suggestions.length > 0) {
    suggestBox.classList.remove("hidden");
    suggestList.innerHTML = suggestions.map((s) => `<li>${s}</li>`).join("");
  } else {
    suggestBox.classList.add("hidden");
  }
});

// ✅ Show/Hide password clearly
toggleBtn.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  toggleBtn.innerHTML = isHidden
    ? '<i class="fa-solid fa-eye-slash"></i>'
    : '<i class="fa-solid fa-eye"></i>';
  toggleBtn.setAttribute("title", isHidden ? "Hide password" : "Show password");
});

// 📋 Copy password to clipboard
copyBtn.addEventListener("click", async () => {
  if (!passwordInput.value) return;
  await navigator.clipboard.writeText(passwordInput.value);
  copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  setTimeout(() => {
    copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i>';
  }, 1500);
});

// 🌗 Theme Toggle
const themeSwitch = document.getElementById("themeSwitch");
themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  // Save preference in local storage
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// Load saved theme
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeSwitch.checked = true;
  }
});
