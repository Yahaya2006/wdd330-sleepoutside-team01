export default class Alert {
  constructor(jsonPath = "/json/alerts.json") {
    this.jsonPath = jsonPath;
  }

  async init() {
    try {
      const response = await fetch(this.jsonPath);
      if (!response.ok) return;
      const alerts = await response.json();
      if (Array.isArray(alerts) && alerts.length > 0) {
        this.renderAlerts(alerts);
      }
    } catch (err) {
      console.error("Failed to load alerts:", err);
    }
  }

  renderAlerts(alerts) {
    const mainElement = document.querySelector("main");
    if (!mainElement) return;

    const section = document.createElement("section");
    section.className = "alert-list";

    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      section.appendChild(p);
    });

    mainElement.prepend(section);
  }
}
