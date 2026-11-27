import Register from "./Register.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { updateCartCount } from "./cart-count.js";
import Alert from "./Alert.mjs";
import { addBreadcrumbs } from "./breadcrumbs.js";

addBreadcrumbs();

// Load the header and footer, then update the cart badge.
loadHeaderFooter(updateCartCount);

// Load customizable alerts on the home page if any exist in alerts.json.
const alert = new Alert();
alert.init();

const register = new Register();
register.init();
