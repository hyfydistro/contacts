// ====
// VIEW
// ====

// Reference:
// list of elements in a contact components:
// - container of the contact list - .contact-list__container
// - span .contact-list__icon--favorite
//    - i .far fa-star
// - span .contact-list__name
//    p textNode
// - span .contact-list__icon--right-arrow
//    - i .fas fa-chevron-right

class View {
  constructor() {
    // SELECTORS
    this.contactList = this.getElement(".contact-list__container");
    this.contactListPlaceholder = this.getElement(
      ".contact-paceholder__container"
    );
    this.contactListFavorites = this.getElement(
      ".contact-list__container--favourites"
    );

    this.tabsOptionsAllContacts = this.getElement(".tabs-option__all-contacts");
    this.tabsOptionsFavorites = this.getElement(".tabs-option__favorites");

    // ! WIP >>
    // contact view page
    // ! <<

    // module
    this.moduleWrapper = this.getElement(".module__wrapper");
    this.moduleTitle = this.getElement(".module__title");
    //module buttons
    this.cancelBtn = this.getElement(".btn__text--cancel-form");
    this.saveBtn = this.getElement(".btn__text--save-form");
    this.updateBtn = this.getElement(".btn__text--update-form");
    this.deleteBtn = this.getElement(".btn__block--delete-form");
    // module input fields
    this.moduleNameInput = this.getElement(".module-form__name-input--text");
    this.moduleEmailInput = this.getElement(".module-form__email-input--text");
    this.modulePhoneInput = this.getElement(".module-form__phone-input--text");

    // ELEMENTS
    // Create a contact
    // this.contact = this.createElement("div", "contact-list");

    // this.contactFavoriteWrapper = this.createElement(
    //   "label",
    //   "contact-list__icon--favorite"
    // );
    // this.contactFavoriteCheckbox = this.createElement("input");
    // this.contactFavoriteCheckbox.type = "checkbox";
    // this.contactFavoriteCheckbox.id = "checkboxID";
    // this.contactFavoriteIcon = this.createElement("div", "contact-list");
    // this.contactFavoriteWrapper.append(
    //   this.contactFavoriteCheckbox,
    //   this.contactFavoriteIcon
    // );

    // this.contactNameWrapper = this.createElement("span", "contact-list__name");
    // this.contactNameText = this.createElement("p");
    // this.contactNameWrapper.append(this.contactNameText);

    // this.contactArrowIconWrapper = this.createElement(
    //   "contact-list__icon--right-arrow"
    // );
    // this.contactArrowIcon = this.createElement("fas fa-chevron-right");
    // this.contactArrowIconWrapper.append(this.contactArrowIcon);

    // this.contact.append(
    //   this.contactFavoriteWrapper,
    //   this.contactNameWrapper,
    //   this.contactArrowIconWrapper
    // );
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element;
  }

  // Retrieve an element from the DOM
  getElement(selector) {
    // * Use CSS selector pattern
    const element = document.querySelector(selector);

    return element;
  }

  get _moduleNameInputText() {
    return this.moduleNameInput.value;
  }

  _resetInput() {
    this.moduleNameInput.value = "";
  }

  createContact(contact) {
    const contactDiv = this.createElement("div", "contact-list");
    contactDiv.id = contact.id;

    const contactFavoriteWrapper = this.createElement(
      "label",
      "contact-list__icon--favorite"
    );
    contactFavoriteWrapper.for = "checkboxID";
    const contactFavoriteCheckbox = this.createElement("input");
    contactFavoriteCheckbox.type = "checkbox";
    contactFavoriteCheckbox.id = "checkboxID";
    contactFavoriteCheckbox.checked = contact.favorite;
    const contactFavoriteIcon = this.createElement("span", "pseudo--favorite");

    contactFavoriteWrapper.append(contactFavoriteCheckbox, contactFavoriteIcon);

    const contactNameWrapper = this.createElement("span", "contact-list__name");
    const contactNameText = this.createElement("p");
    const contactNameTextNode = document.createTextNode(contact.name);
    contactNameText.append(contactNameTextNode);
    contactNameWrapper.append(contactNameText);

    const contactArrowIconWrapper = this.createElement(
      "span",
      "contact-list__icon--right-arrow"
    );
    const contactArrowIcon = this.createElement("i");
    contactArrowIcon.classList.add("fas", "fa-chevron-right");
    contactArrowIconWrapper.append(contactArrowIcon);

    contactDiv.append(
      contactFavoriteWrapper,
      contactNameWrapper,
      contactArrowIconWrapper
    );

    return contactDiv;
  }

  displayContactList(contactData) {
    // Reset contact list
    while (this.contactList.firstChild) {
      this.contactList.removeChild(this.contactList.firstChild);
    }

    // display contact list from available data
    if (contactData.length === 0) {
      // Show default message
      this.contactListPlaceholder.classList.remove("hidden");
      this.contactList.classList.add("hidden");
    } else {
      // Create contact for each available in state
      contactData.forEach((contact) => {
        const contactElement = this.createContact(contact);

        if (contact.favorite == true) {
          const contactElementCopy = contactElement.cloneNode(true);
          this.contactListFavorites.append(contactElementCopy);
        }

        this.contactList.append(contactElement);
      });
    }
  }

  // EVENT LISTENERS
  bindChangetoFavoriteTabs() {
    // Display Favorites contact list
    this.tabsOptionsFavorites.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.contactListFavorites.firstChild) {
        this.contactListFavorites.classList.remove("hidden");
      }

      this.contactList.classList.add("hidden");

      this.tabsOptionsAllContacts.classList.remove("selected");
      this.tabsOptionsAllContacts.firstElementChild.firstElementChild.classList.remove(
        "text--semi-bold"
      );
      this.tabsOptionsFavorites.classList.add("selected");
      this.tabsOptionsFavorites.firstElementChild.firstElementChild.classList.add(
        "text--semi-bold"
      );

      this.contactListPlaceholder.lastElementChild.firstElementChild.textContent =
        "No favorite contact. Add favorite?";
    });
  }

  bindChangetoAllContactsTabs() {
    // Display All contact list
    this.tabsOptionsAllContacts.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.contactList.firstChild) {
        this.contactList.classList.remove("hidden");
        this.contactListFavorites.classList.add("hidden");
      }

      this.tabsOptionsFavorites.classList.remove("selected");
      this.tabsOptionsFavorites.firstElementChild.firstElementChild.classList.remove(
        "text--semi-bold"
      );
      this.tabsOptionsAllContacts.classList.add("selected");
      this.tabsOptionsAllContacts.firstElementChild.firstElementChild.classList.add(
        "text--semi-bold"
      );

      this.contactListPlaceholder.lastElementChild.firstElementChild.textContent =
        "No contact available. Add contact?";
    });
  }
}

export default View;
