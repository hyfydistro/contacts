import View from "./view.js";
import Controller from "./controller.js";
import Model from "./model.js";


const header = document.querySelector(".logo__header--lazy");
const largeAddBtn = document.querySelector(".btn__block-contained--add-form--lazy");
const tabsAllContact = document.querySelector(".tabs-option__all-contacts--lazy");
const tabsFavorites = document.querySelector(".tabs-option__favorites--lazy");
const contactPlaceholder = document.querySelector(".contact-placeholder__text--lazy");

// TODO
const contactViewContainer = document.querySelector(".contact-view__container--lazy");

function render() {
  header.classList.remove("loading", "logo__header--lazy");
  header.classList.add("logo__header");
  header.firstElementChild.lastElementChild.textContent = "Contacts";

  largeAddBtn.classList.remove("loading", "btn__block-contained--add-form--lazy");
  largeAddBtn.classList.add("btn__block-contained--add-form");
  largeAddBtn.lastElementChild.textContent = "Add New Contact";

  tabsAllContact.classList.remove("loading", "tabs-option__all-contacts--lazy");
  tabsAllContact.classList.add("tabs-option__all-contacts", "tabs-option", "selected");
  tabsAllContact.firstElementChild.firstElementChild.textContent = "All Contacts";

  tabsFavorites.classList.remove("loading", "tabs-option__favorites--lazy");
  tabsFavorites.classList.add("tabs-option__favorites", "tabs-option");
  tabsFavorites.firstElementChild.lastElementChild.textContent = "Favorites";

  contactPlaceholder.classList.remove("loading", "contact-placeholder__text--lazy");
  contactPlaceholder.classList.add("contact-placeholder__text");
  contactPlaceholder.textContent = "No contact available. Add contact?";

  // TODO
  // Style contactViewContainer
  contactViewContainer.classList.remove("loading", "contact-view__container--lazy");
  contactViewContainer.classList.add("contact-view__container", "hidden");

  const app = new Controller(new Model(), new View());
}

window.addEventListener("load", render);

// setTimeout(() => {
//   render();
// }, 3000);


// window.addEventListener("load", () => {
//   render();
//   import("./main.styles.scss");
// });

// Check that service workers are supported
// if ('serviceWorker' in navigator) {
//   // Use the window load event to keep the page load performant
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js');
//   });
// }