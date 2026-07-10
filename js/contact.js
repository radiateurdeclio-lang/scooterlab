const SUPABASE_URL = "https://bplbuvopagxptsivhysj.supabase.co";
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbGJ1dm9wYWd4cHRzaXZoeXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MTM4NjksImV4cCI6MjA5NzM4OTg2OX0.JhASmODIivszhedkm2qhZDYGwQnA0Av6EaJ5iK4MAR4";

function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-status");
  if (!form || !status) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Envoi en cours...";
    status.className = "contact-status contact-status--pending";

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      category: form.category.value,
      message: form.message.value.trim(),
    };

    if (!data.name || !data.email || !data.message) {
      status.textContent = "Remplissez tous les champs obligatoires.";
      status.className = "contact-status contact-status--error";
      return;
    }

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/scooterlab_contact_messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON,
          Authorization: `Bearer ${SUPABASE_ANON}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      form.reset();
      status.textContent = "Message envoyé — réponse sous 48h en général.";
      status.className = "contact-status contact-status--success";
    } catch {
      status.textContent =
        "Erreur d'envoi. Réessayez ou contactez via Discord / email si vous l'avez déjà.";
      status.className = "contact-status contact-status--error";
    }
  });
}

document.addEventListener("DOMContentLoaded", initContactForm);
