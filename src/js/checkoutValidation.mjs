// JavaScript uses setCustomValidity() for friendlier messages and extra rules.

// Returns true if an expiration like "08/27" is already in the past
function isExpired(value) {
  const [month, year] = value.split("/").map(Number);
  const now = new Date();
  // A card works through the END of its expiration month
  const endOfMonth = new Date(2000 + year, month, 0, 23, 59, 59);
  return endOfMonth < now;
}

// Checks one input and sets (or clears) its custom message
function validateField(input) {
  // Clear the custom message first, like checkPrinciple() does in your CodePen
  input.setCustomValidity("");

  if (input.validity.valueMissing) {
    input.setCustomValidity("Please fill in this field.");
  } else if (input.validity.patternMismatch) {
    // Reuse the title attribute from the HTML as the error message
    input.setCustomValidity(input.title || "Please match the requested format.");
  } else if (input.id === "expiration" && input.value && isExpired(input.value)) {
    // Extra rule HTML cannot do: the card must not be expired
    input.setCustomValidity("This card has expired.");
  }
}

// Checks every field; returns true only if the whole form is valid
export function validateForm(form) {
  form.querySelectorAll("input").forEach(validateField);

  if (!form.checkValidity()) {
    form.reportValidity(); // shows the browser's message on the first bad field
    return false;
  }
  return true;
}

// Re-checks a field every time the user types in it (live feedback)
export function setupLiveValidation(form) {
  form.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => validateField(input));
  });
}