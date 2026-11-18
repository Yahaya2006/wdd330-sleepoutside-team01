// Handles the newsletter sign-up form on the home page.
// On submit, it stops the page from reloading, shows a confirmation
// message with the email address, and clears the input.
export default function initNewsletterForm(
  formSelector = "#newsletter-form",
  confirmationSelector = "#newsletter-confirmation",
) {
  const form = document.querySelector(formSelector);
  const confirmation = document.querySelector(confirmationSelector);

  // Stop here if the home page doesn't have the form.
  if (!form || !confirmation) return;

  form.addEventListener("submit", (event) => {
    // The browser only fires submit when the email passes validation
    // (the input is type="email" and required).
    event.preventDefault();

    const email = form.elements.email.value.trim();

    // textContent (not innerHTML) so the email is shown as plain text.
    confirmation.textContent = `Thanks for signing up! We'll send updates to ${email}.`;
    confirmation.hidden = false;

    form.reset();
  });
}
