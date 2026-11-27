
export default class Register {
  constructor() {
    this.storageKey = "sleepoutside-register-seen";
  }

  init() {
    // Show the registration modal only on the first visit.
    if (localStorage.getItem(this.storageKey)) {
      return;
    }

    this.render();
    this.addListeners();
  }

  render() {
    const modal = document.createElement("div");
    modal.classList.add("register-modal");

    modal.innerHTML = `
      <div class="register-modal__content" role="dialog" aria-modal="true" aria-labelledby="register-title">
        <button class="register-modal__close" aria-label="Close">&times;</button>
        <h2 id="register-title">Welcome to SleepOutside!</h2>
        <p>Get ready for your next outdoor adventure!</p>
        <p>Subscribe to our newsletter for a chance to win a special outdoor camping giveaway.</p>
        <a href="#newsletter-email" class="register-modal__button">Register Now</a>
        <button class="register-modal__later">Maybe later</button>
      </div>
    `;

    document.body.append(modal);
    this.modal = modal;
  }

  close() {
    localStorage.setItem(this.storageKey, "true");
    this.modal.remove();
  }

  addListeners() {
    this.modal.querySelector(".register-modal__close").addEventListener("click", () => {
      this.close();
    });

    this.modal.querySelector(".register-modal__later").addEventListener("click", () => {
      this.close();
    });

    this.modal.querySelector(".register-modal__button").addEventListener("click", () => {
      this.close();
    });

    this.modal.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.close();
      }
    });
  }
}
