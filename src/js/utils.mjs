// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}


// Retrieves value of the named parameter when requested
// and exports it for other JavaScript files to use.
export function getParam(param) {
  // window.location.search gets everything after the ? in the URL.
  const queryString = window.location.search;

  // urlParams.get(param) retrieves the value of the parameter you request.
  const urlParams = new URLSearchParams(queryString);
  
  // Returns the values
  return urlParams.get(param)
}


export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
    
    // Remove the existing content first if clear is true.
    if (clear) {
      parentElement.innerHTML = "";
    }

    // Convert each product object into an HTML string with the template function.
    const htmlStrings = list.map(templateFn);
    // Join the strings into one block and insert it at the start of the list element.
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}
 

// Renders ONE template (a string of HTML) into a parent element.
// data:     optional info passed along to the callback
// callback: optional function that runs after the template is rendered
export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {
    
  // Put the template inside tha parent element
  parentElement.innerHTML = template;

  // Only run the callback if one was passed in
  if (callback) {
    callback(data);
  }
}

// Fetches an HTML file from a path and return its contents as a string.
export const loadTemplate = async (path) => {
  const response = await fetch(path);
  const template = await response.text();
  return template;
};


// Loads the header and footer partials and renders them on the page.
export const loadHeaderFooter = async () => {
  //1. load the template from the partials folder
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  //2. Grab the placeholder elements form the page
  const headerElement = qs("#main-header");
  const footerElement = qs("#main-footer");

  //3. Render the templates into the placeholders
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

};
