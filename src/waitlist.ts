// ==========================================
// SUPABASE CONFIG
// ==========================================
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://ocmunjkhypunnrzkbkry.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// ==========================================
// WAITLIST FORM LOGIC
// ==========================================
const form = document.getElementById("waitlistForm") as HTMLFormElement;
const emailInput = document.getElementById("emailInput") as HTMLInputElement;
const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
const errorMsg = document.getElementById("errorMsg") as HTMLElement;
const formState = document.getElementById("formState") as HTMLElement;
const successState = document.getElementById("successState") as HTMLElement;

if (form) {
    form.addEventListener("submit", async (e: Event) => {
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
            const successSub = document.querySelector(".success-sub") as HTMLElement;
            if (data.message && successSub) {
                successSub.textContent = data.message;
            }
            formState.style.display = "none";
            successState.style.display = "block";
        } catch (err: any) {
            errorMsg.textContent = err.message;
            submitBtn.disabled = false;
            submitBtn.textContent = "Notify me";
        }
    });
}
