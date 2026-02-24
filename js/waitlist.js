// ==========================================
// SUPABASE CONFIG
// ==========================================
const SUPABASE_URL =
  window.CONFIG?.SUPABASE_URL || "https://ocmunjkhypunnrzkbkry.supabase.co";
const SUPABASE_ANON_KEY = window.CONFIG?.SUPABASE_ANON_KEY || "";

// ==========================================
// WAITLIST FORM LOGIC
// ==========================================
const form = document.getElementById("waitlistForm");
const emailInput = document.getElementById("emailInput");
const submitBtn = document.getElementById("submitBtn");
const errorMsg = document.getElementById("errorMsg");
const formState = document.getElementById("formState");
const successState = document.getElementById("successState");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.textContent = "";

  const email = emailInput.value.trim();
  if (!email) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/waitlist-func`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Something went wrong. Please try again.");
    }

    const data = await res.json().catch(() => ({}));

    // Show success with response message
    const successSub = document.querySelector(".success-sub");
    if (data.message) {
      successSub.textContent = data.message;
    }
    formState.style.display = "none";
    successState.style.display = "block";
  } catch (err) {
    errorMsg.textContent = err.message;
    submitBtn.disabled = false;
    submitBtn.textContent = "Notify me";
  }
});
