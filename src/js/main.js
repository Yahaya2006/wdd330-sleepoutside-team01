// Import the header/footer loader.
import { loadHeaderFooter } from "./utils.mjs";
// Import the badge updater so it can run once the header is on the page.
import { updateCartCount } from "./cart-count.js";
import Alert from "./Alert.mjs";

// Load the header and footer, then update the cart badge.
loadHeaderFooter(updateCartCount);

// Load customizable alerts on the home page if any exist in alerts.json.
const alert = new Alert();
alert.init();
