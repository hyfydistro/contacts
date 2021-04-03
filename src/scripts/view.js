import validatePhoneNumber from "./libs/validatePhoneNumber.js";
import validateEmail from "./libs/validateEmail.js";

// Media Queries
const mqMinWidth640px = window.matchMedia("(min-width: 640px)");
const mqMaxWidth639px = window.matchMedia("(max-width: 639px)");

// ====
// VIEW
// ====

class View {
  constructor() {
    // # SELECTORS
    // ======
    // header
    // ======
    this.logo = this.getElement(".logo-title");
    this.addSmallBtn = this.getElement(".btn__text--add-form");
    // this.addLargeBtn
    this.editBtn = this.getElement(".btn__text--edit-form");
    this.backBtn = this.getElement(".btn__text--back-form");
    // tab options
    this.tabsContainer = this.getElement(".tabs-container");
    this.tabsOptionsAllContacts = this.getElement(".tabs-option__all-contacts");
    this.tabsOptionsFavorites = this.getElement(".tabs-option__favorites");

    // ============
    // contact list
    // ============
    this.contactListWrapper = this.getElement(".contact-container");
    this.contactList = this.getElement(".contact-list__container");
    this.contactListPlaceholder = this.getElement(".contact-paceholder__container");
    this.contactListFavorites = this.getElement(".contact-list__container--favourites");

    // =================
    // contact view page
    // =================
    this.contactViewWrapper = this.getElement(".contact-view__container");
    this.contactViewName = this.getElement(".contact-view__name-input--text");
    this.contactViewEmail = this.getElement(".contact-view__email-input--text");
    this.contactViewPhone = this.getElement(".contact-view__view__phone-input--text");

    // ======
    // module
    // ======
    this.moduleWrapper = this.getElement(".module__wrapper");
    this.moduleTitle = this.getElement(".module__title");
    // module buttons
    this.cancelBtn = this.getElement(".btn__text--cancel-form");
    this.saveBtn = this.getElement(".btn__text--save-form");
    this.updateBtn = this.getElement(".btn__text--update-form");
    this.deleteBtnContainer = this.getElement(".module-form__button-container");
    this.deleteBtn = this.getElement(".btn__block--delete-form");
    // module input fields
    this.moduleNameInput = this.getElement(".module-form__name-input--text");
    this.moduleEmailInput = this.getElement(".module-form__email-input--text");
    this.modulePhoneInput = this.getElement(".module-form__phone-input--text");
    // Alert Messages: Error
    this.nameInputErrorBlock = this.getElement(".module-form__name-error");
    this.nameInputErrorText = this.getElement(".module-form__name-error--text");
    this.emailInputErrorBlock = this.getElement(".module-form__email-error");
    this.emailInputErrorText = this.getElement(".module-form__email-error--text");
    this.phoneInputErrorBlock = this.getElement(".module-form__phone-error");
    this.phoneInputErrorText = this.getElement(".module-form__phone-error--text");
    // module overlay
    this.moduleOverlay = this.getElement(".module__overlay");
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

  get _moduleEmailInputText() {
    return this.moduleEmailInput.value;
  }

  get _modulePhoneInputText() {
    return this.modulePhoneInput.value;
  }

  _resetInput() {
    this.moduleNameInput.value = "";
    this.moduleEmailInput.value = "";
    this.modulePhoneInput.value = "";
  }

  createContact(contact) {
    const contactDiv = this.createElement("div", "contact-list");
    contactDiv.id = contact.id;

    const contactFavoriteWrapper = this.createElement("label", "contact-list__icon--favorite");
    const contactFavoriteCheckbox = this.createElement("input");
    contactFavoriteCheckbox.type = "checkbox";
    contactFavoriteCheckbox.id = "checkboxID";
    contactFavoriteCheckbox.checked = contact.favorite;
    const contactFavoriteIcon = this.createElement("span", "pseudo--favorite");

    contactFavoriteWrapper.append(contactFavoriteCheckbox, contactFavoriteIcon);

    const contentWrapper = this.createElement("a", "btn__wrapper--view-contact");
    contentWrapper.classList.add("btn__wrapper");
    contentWrapper.setAttribute("href", "#");

    const contactNameWrapper = this.createElement("span", "contact-list__name");
    const contactNameText = this.createElement("p");
    const contactNameTextNode = document.createTextNode(contact.name);

    contactNameText.append(contactNameTextNode);
    contactNameWrapper.append(contactNameText);

    const contactArrowIconWrapper = this.createElement("span", "contact-list__icon--right-arrow");
    const contactArrowIcon = this.createElement("i");
    contactArrowIcon.classList.add("fas", "fa-chevron-right");
    contactArrowIconWrapper.append(contactArrowIcon);

    contentWrapper.append(contactNameWrapper, contactArrowIconWrapper);
    contactDiv.append(contactFavoriteWrapper, contentWrapper);

    return contactDiv;
  }

  displayContactList() {
    if (this.contactList.firstChild) {
      // Initial display
      // Show default message
      this.contactListPlaceholder.classList.add("hidden");
      this.contactList.classList.remove("hidden");
      if (!this.contactListFavorites.classList.contains("hidden")) {
        this.contactListFavorites.classList.add("hidden");
      }
    } else {
      this.contactListPlaceholder.lastElementChild.firstElementChild.textContent =
        "No contact available. Add contact?";
    }
  }

  renderContactList(contactData) {
    // Reset contact list
    while (this.contactList.firstChild) {
      this.contactList.removeChild(this.contactList.firstChild);
    }

    contactData.forEach((contact) => {
      const contactElement = this.createContact(contact);
      this.contactList.append(contactElement);
    });
  }

  displayFavoriteList() {
    this.contactList.classList.add("hidden");
    if (this.contactListFavorites.firstChild) {
      this.contactListFavorites.classList.remove("hidden");
    } else {
      this.contactListPlaceholder.classList.remove("hidden");
      this.contactListPlaceholder.lastElementChild.firstElementChild.textContent =
        "No favorite contact. Add favorite?";
    }
  }

  renderFavoriteList(contactData) {
    // Reset favorite list
    while (this.contactListFavorites.firstChild) {
      this.contactListFavorites.removeChild(this.contactListFavorites.firstChild);
    }

    const favoriteList = contactData.filter((currentObj) => currentObj.favorite);
    favoriteList.forEach((contact) => {
      const contactElement = this.createContact(contact);
      this.contactListFavorites.append(contactElement);
    });
  }

  // EVENT LISTENERS
  // Display "Favorites" list
  onChangeToFavoriteTabs() {
    this.tabsOptionsFavorites.addEventListener("click", (e) => {
      this.displayFavoriteList();

      this.tabsOptionsAllContacts.classList.remove("selected");
      this.tabsOptionsAllContacts.firstElementChild.firstElementChild.classList.remove("text--semi-bold");
      this.tabsOptionsFavorites.classList.add("selected");
      this.tabsOptionsFavorites.firstElementChild.firstElementChild.classList.add("text--semi-bold");

      e.preventDefault();
    });
  }

  // Display "All Contacts" list
  onChangeToAllContactsTabs() {
    this.tabsOptionsAllContacts.addEventListener("click", (e) => {
      this.displayContactList();

      this.tabsOptionsFavorites.classList.remove("selected");
      this.tabsOptionsFavorites.firstElementChild.firstElementChild.classList.remove("text--semi-bold");
      this.tabsOptionsAllContacts.classList.add("selected");
      this.tabsOptionsAllContacts.firstElementChild.firstElementChild.classList.add("text--semi-bold");

      e.preventDefault();
    });
  }

  onToggleFavorite(toggleFavoriteHandler) {
    const favoriteIcons = document.querySelectorAll(".contact-list__icon--favorite");
    favoriteIcons.forEach((currentFavIcon) => {
      currentFavIcon.addEventListener("click", (e) => {
        const targetContactId = currentFavIcon.parentElement.id;
        toggleFavoriteHandler(targetContactId);

        e.preventDefault();
      });
    });
  }

  onDisplayContactView(contactData, setCurrentIdHandler) {
    const contactListWrapperAll = document.querySelectorAll(".btn__wrapper--view-contact");
    contactListWrapperAll.forEach((contactElement) => {
      contactElement.addEventListener("click", (e) => {
        const targetContactId = contactElement.parentElement.id;
        if (setCurrentIdHandler) {
          this.displayContactView(contactData, targetContactId, setCurrentIdHandler);
        }

        e.preventDefault();
      });
    });
  }

  // Set up contact view page
  displayContactView(contactData, targetContactId, setCurrentIdHandler) {
    // TODO
    // if on larger screen "back" button should not be visible

    this.contactViewWrapper.classList.remove("hidden");

    // change header options
    // hide everything else
    if (mqMaxWidth639px.matches) {
      this.contactListWrapper.classList.add("hidden");
      this.tabsContainer.classList.add("hidden");
      this.logo.classList.add("hidden");
      this.addSmallBtn.classList.add("hidden");
      this.editBtn.classList.remove("hidden");
      this.backBtn.classList.remove("hidden");
    }

    // ! WIP
    // if (this.deleteBtn.classList.contains("hidden")) {}
    // ! <<

    // Get target contact data
    const [targetContactData] = contactData.filter((contact) => contact.id == targetContactId);

    // Display targeted contacts
    this.contactViewName.textContent = targetContactData.name;
    this.contactViewEmail.textContent = targetContactData.email;
    this.contactViewPhone.textContent = targetContactData.phone;

    // Set 'currentId' for Model
    setCurrentIdHandler(targetContactData.id);
  }

  onBackBtn() {
    this.backBtn.addEventListener("click", () => {
      // TODO
      // if on larger screen "back" button should not be visible

      // Reverse effect
      this.contactViewWrapper.classList.add("hidden");

      // change header options
      // hide everything else
      if (mqMaxWidth639px.matches) {
        this.contactListWrapper.classList.remove("hidden");
        this.tabsContainer.classList.remove("hidden");
        this.logo.classList.remove("hidden");
        this.addSmallBtn.classList.remove("hidden");
        this.editBtn.classList.add("hidden");
        this.backBtn.classList.add("hidden");
      }
    });
  }

  onSaveContact(addContacthandler, contactData) {
    this.saveBtn.addEventListener("click", (e) => {
      if (this.validateInputs(this._moduleNameInputText, this._moduleEmailInputText, this._modulePhoneInputText)) {
        addContacthandler(this._moduleNameInputText, this._moduleEmailInputText, this._modulePhoneInputText);
        this.manageError(this._moduleNameInputText, this._moduleEmailInputText,this._modulePhoneInputText);
        this._resetInput();
        this.closeModule();

        // * On first contact created,
        // dependending on what tabs you're on:
        // - SCENARIO #1: on tabs "All Contacts"
        //    Remove placeholder
        // display "All Contacts" list
        // - SCENARIO #2: on tabs "Favorites"
        //    Do nothing
        if (contactData.length === 1) {
          if (this.tabsOptionsAllContacts.classList.contains("selected")) {
            this.displayContactList();
          }
        }
      } else {
        this.manageError(this._moduleNameInputText, this._moduleEmailInputText, this._modulePhoneInputText);
      }

      e.preventDefault();
    });
  }

  // Sanitize inputs
  validateInputs(name, email, phone) {
    if (name === "" || name == null) {
      return false;
    }
    if (name.length > 100) {
      return false;
    }

    if (validateEmail(email) == false) {
      return false;
    }
    if (email > 100) {
      return false;
    }

    if (phone) {
      if (validatePhoneNumber(this._modulePhoneInputText) == false) {
        return false;
      }
    }

    return true;
  }

  // Show error where available
  manageError(name, email, phone) {
    if (name === "" || name == null) {
      this.nameInputErrorBlock.classList.remove("hidden");
      this.nameInputErrorText.textContent = "Name cannot be empty.";
    } else if (name.length > 100) {
      this.nameInputErrorBlock.classList.remove("hidden");
      this.nameInputErrorText.textContent = "Name must be less than 100 characters.";
    }
    if (name && name.length < 100) {
      if (!this.nameInputErrorBlock.classList.contains("hidden")) {
        this.nameInputErrorBlock.classList.add("hidden");
      }
    }

    if (email === "" || email == null) {
      this.emailInputErrorBlock.classList.remove("hidden");
      this.emailInputErrorText.textContent = "Email is not valid. Have you used '@'? ";
    }
    if (validateEmail(email) == false) {
      this.emailInputErrorBlock.classList.remove("hidden");
      this.emailInputErrorText.textContent = "Email cannot be empty.";
    }
    if (email.length > 100) {
      this.emailInputErrorBlock.classList.remove("hidden");
      this.emailInputErrorText.textContent = "Email must be less than 100 characters.";
    }
    if (validateEmail(email) == true && email.length < 100 && email && email != null) {
      if (!this.emailInputErrorBlock.classList.contains("hidden")) {
        this.emailInputErrorBlock.classList.add("hidden");
      }
    }

    if (phone) {
      if (validatePhoneNumber(this._modulePhoneInputText) == false) {
        this.phoneInputErrorBlock.classList.remove("hidden");
        this.phoneInputErrorText.textContent = "Phone number is not valid.";
      } else if (this.phoneInputErrorBlock.classList.contains("hidden")) {
        this.phoneInputErrorBlock.classList.add("hidden");
      }
    }
  }

  onOpenAddContactForm() {
    this.addSmallBtn.addEventListener("click", () => {
      this.openModule();
    });
  }

  onCloseAddContactForm() {
    this.cancelBtn.addEventListener("click", () => {
      this.closeModule();
    });
  }

  closeModule() {
    this.moduleWrapper.classList.remove("on-screen");
    this.moduleWrapper.classList.add("off-screen");
    if (mqMinWidth640px.matches) {
      if (this.moduleOverlay.classList.contains("hidden")) {
        this.moduleOverlay.classList.add("hidden");
      }
    }
  }

  openModule() {
    this.moduleWrapper.classList.remove("off-screen");
    this.moduleWrapper.classList.add("on-screen");
    if (mqMinWidth640px.matches) {
      if (this.moduleOverlay.classList.contains("hidden")) {
        this.moduleOverlay.classList.remove("hidden");
      }
    }
  }
}

export default View;
