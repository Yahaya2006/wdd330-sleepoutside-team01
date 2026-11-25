// Breadcrumbs for all pages
export function addBreadcrumbs() {
  const nav = document.getElementById("breadcrumbs");
  if (!nav) return;

  const path = window.location.pathname;
  const parts = path.split("/").filter(p => p !== "" && p !== "index.html" && p !== "wdd330-sleepoutside-team01");

  let html = `<a href="../index.html">Home</a>`;
  let currentPath = "";

  const names = {
    "product_pages": "Tents",
    "marmot-ajax-3": "Ajax Tent",
    "cart": "Cart",
    "checkout": "Checkout",
    "product-listing": "Product Listing"
  };

  parts.forEach((part, index) => {
    currentPath += "/" + part;
    const cleanName = part.replace(".html", "").replace(/-/g, " ");
    const label = names[part.replace(".html", "")] || cleanName;
    const isLast = index === parts.length - 1;

    if (isLast) {
      html += ` <span> &gt; </span> <span class="active">${label}</span>`;
    } else {
      html += ` <span> &gt; </span> <a href="${currentPath}">${label}</a>`;
    }
  });

  nav.innerHTML = html;
}