import validatePhoneNumber from "./libs/validatePhoneNumber.js";
import validateEmail from "./libs/validateEmail.js";
import { mqMinWidth640px, mqMaxWidth639px } from "./libs/mediaquery.js";

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
    this.addLargeBtn = this.getElement(".btn__block-contained--add-form");
    // this.addLargeBtn
    this.editBtnAtHeader = document.querySelectorAll(".btn__text--edit-form")[0];
    this.editBtnAtContactViewPage = document.querySelectorAll(".btn__text--edit-form")[1];
    this.backBtn = this.getElement(".btn__text--back-form");
    // tab options
    this.tabsContainer = this.getElement(".tabs-container");
    this.tabsOptionsAllContacts = this.getElement(".tabs-option__all-contacts");
    this.tabsOptionsFavorites = this.getElement(".tabs-option__favorites");

    this.mainElement =this.getElement("main");
    // ============
    // contact list
    // ============
    this.contactListWrapper = this.getElement(".contact-container");
    this.contactList = this.getElement(".contact-list__container");
    this.contactListPlaceholder = this.getElement(".contact-placeholder__container");
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

  // ===============
  // EVENT LISTENERS
  // ===============
  onWindowResize() {
    window.addEventListener("resize", () => {
      // Resize from small device to large device
      if (mqMinWidth640px.matches) {
        // ? probably don't need to address editBtnAtContactViewPage visibility here.
        // Use via CSS styles
        this.editBtnAtContactViewPage.classList.remove("hidden");

        if (this.addSmallBtn.classList.contains("hidden")) {
          this.addSmallBtn.classList.add("hidden");
        }

        // SCENARIO #1: at Contact List page
        if (this.contactViewWrapper.classList.contains("hidden")) {
          this.contactViewWrapper.classList.remove("hidden");

          // * Hotfix side effects if window expaned
          if (this.editBtnAtContactViewPage.classList.contains("hidden")) {
            this.editBtnAtContactViewPage.classList.remove("hidden");
          }
        }

        // SCENARIO #2: at Contact View page
        if (this.contactListWrapper.classList.contains("hidden")) {
          this.tabsContainer.classList.remove("hidden");
          this.editBtnAtHeader.classList.add("hidden");
          this.logo.classList.remove("hidden");
          this.backBtn.classList.add("hidden");
          this.contactListWrapper.classList.remove("hidden");
        }
      }

      // Resize from large device to small device
      if (mqMaxWidth639px.matches) {
        if (!(this.contactViewWrapper.classList.contains("hidden"))) {
          this.contactViewWrapper.classList.add("hidden");
        }
      }
    });
  }

  // Display "Favorites" list
  onChangeToFavoriteTabs() {
    this.tabsOptionsFavorites.addEventListener("click", (e) => {
      this.displayFavoriteList();

      this.tabsOptionsAllContacts.classList.remove("selected");
      this.tabsOptionsAllContacts.firstElementChild.firstElementChild.classList.remove("text--semi-bold");
      this.tabsOptionsFavorites.classList.add("selected");
      this.tabsOptionsFavorites.firstElementChild.lastElementChild.classList.add("text--semi-bold");
      this.tabsOptionsFavorites.firstElementChild.firstElementChild.classList.toggle("text--semi-bold");

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
      this.tabsOptionsAllContacts.firstElementChild.lastElementChild.classList.add("text--semi-bold");
      this.tabsOptionsFavorites.firstElementChild.firstElementChild.classList.toggle("text--semi-bold");


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

  // Display selected contact details on to Contact Page
  onDisplayContactView(contactData, setCurrentIdHandler) {
    const contactListWrapperAll = document.querySelectorAll(".btn__wrapper--view-contact");
    contactListWrapperAll.forEach((contactElement) => {
      contactElement.addEventListener("click", (e) => {
        const targetContactId = contactElement.parentElement.id;
        if (setCurrentIdHandler) {
          this.displayContactView(contactData, targetContactId, setCurrentIdHandler);
        }

        // Set up module form
        // on "click" event for "edit button"
        this.onOpenEditContactForm(contactData, targetContactId);

        e.preventDefault();
      });
    });
  }

  // Set up contact view page
  displayContactView(contactData, targetContactId, setCurrentIdHandler) {
    this.contactViewWrapper.classList.remove("hidden");

    // At Small Devices
    // change header options
    // hide everything else
    if (mqMaxWidth639px.matches) {
      this.contactListWrapper.classList.add("hidden");
      this.tabsContainer.classList.add("hidden");
      this.logo.classList.add("hidden");
      this.addSmallBtn.classList.add("hidden");
      this.editBtnAtHeader.classList.remove("hidden");
      this.backBtn.classList.remove("hidden");
      // * Hotfix side effects if window expaned
      if (!(this.editBtnAtContactViewPage.classList.contains("hidden"))){
        this.editBtnAtContactViewPage.classList.add("hidden");
      }
    }

    // At Large Devices
    if (mqMinWidth640px.matches) {
      this.editBtnAtContactViewPage.classList.remove("hidden");
      // * Hotfix side effects if window expaned
      if (!(this.editBtnAtHeader.classList.contains("hidden"))){
        this.editBtnAtHeader.classList.add("hidden");
        this.backBtn.classList.add("hidden");
      }
      if (!(this.contactViewWrapper.classList.contains("hidden"))) {
        this.mainElement.style.justifyContent = "center";
      } else {
        this.mainElement.style.justifyContent = "flex-start";
      }
    }

    this.renderContactView(contactData, targetContactId);

    const [targetContactData] = contactData.filter((contact) => contact.id == targetContactId);
    // Set 'currentId' for Model
    setCurrentIdHandler(targetContactData.id);
  }

  // Render Contact Page inputs
  renderContactView(contactData, targetContactId) {
    // Get target contact data
    const [targetContactData] = contactData.filter((contact) => contact.id == targetContactId);

    // Display targeted contacts
    this.contactViewName.textContent = targetContactData.name;
    this.contactViewEmail.textContent = targetContactData.email;
    this.contactViewPhone.textContent = targetContactData.phone;
  }

  onBackBtn() {
    this.backBtn.addEventListener("click", () => {
      // go back to contact list
      this.contactViewWrapper.classList.add("hidden");

      // change header options
      // hide everything else
      this.contactListWrapper.classList.remove("hidden");
      this.tabsContainer.classList.remove("hidden");
      this.logo.classList.remove("hidden");
      this.addSmallBtn.classList.remove("hidden");
      this.editBtnAtHeader.classList.add("hidden");
      this.backBtn.classList.add("hidden");

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
        // depending on what tabs you're on:
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
    const addBtnAll = [this.addSmallBtn, this.addLargeBtn];
    addBtnAll.forEach((addBtn) => {
      addBtn.addEventListener("click", () => {
        this.openModule();
        if (this.saveBtn.classList.contains("hidden")) {
          this.updateBtn.classList.add("hidden");
          this.deleteBtnContainer.classList.add("hidden");
          this.saveBtn.classList.remove("hidden");
          this.moduleTitle.firstElementChild.textContent = "Add Contact";
        }
      });
    });
  }

  onCloseAddContactForm() {
    this.cancelBtn.addEventListener("click", () => {
      this.closeModule();
      this._resetInput();
    });
  }

  closeModule() {
    this.moduleWrapper.classList.add("off-screen");
    if (mqMinWidth640px.matches) {
      if (!(this.moduleOverlay.classList.contains("hidden"))) {
        this.moduleOverlay.classList.add("hidden");
      }
    }
  }

  openModule() {
    this.moduleWrapper.classList.remove("off-screen");
    if (mqMinWidth640px.matches) {
      if (this.moduleOverlay.classList.contains("hidden")) {
        this.moduleOverlay.classList.remove("hidden");
      }
    }
  }

  onOpenEditContactForm(contactData, currentContactId) {
    const [currentContact] = contactData.filter((contact) => contact.id == currentContactId);
    const editBtn = [this.editBtnAtHeader, this.editBtnAtContactViewPage];

    editBtn.forEach((currentEditBtn) => {
      currentEditBtn.addEventListener("click", (e) => {
        // Set up UI
        this.openModule();
        if (this.updateBtn.classList.contains("hidden")) {
          this.setEditContactForm(currentContact);
        }
        // At Small Devices
        if(mqMaxWidth639px) {
          this.setEditContactForm(currentContact);
        }
        // At Large Devices
        if(mqMinWidth640px) {
          this.setEditContactForm(currentContact);
        }

        e.preventDefault();
      });
    });
  }

  setEditContactForm(currentContact) {
    // Set up UI
    this.updateBtn.classList.remove("hidden");
    this.deleteBtnContainer.classList.remove("hidden");
    this.saveBtn.classList.add("hidden");
    this.moduleTitle.firstElementChild.textContent = "Edit Contact";
    this.setFormInputs(currentContact);
  }

  setFormInputs(currentContact) {
    // Set up inputs
    this.moduleNameInput.value = currentContact.name;
    this.moduleEmailInput.value = currentContact.email;
    this.modulePhoneInput.value = currentContact.phone;
  }

  // Get current Id set from opening Contact View
  onUpdateContact(updateContactHandler) {
    this.updateBtn.addEventListener("click", (e) => {

      // Validate input values
      if (this.validateInputs(this._moduleNameInputText, this._moduleEmailInputText, this._modulePhoneInputText)) {
        updateContactHandler(this._moduleNameInputText, this._moduleEmailInputText, this._modulePhoneInputText);

        this.manageError(this._moduleNameInputText, this._moduleEmailInputText,this._modulePhoneInputText);
        this._resetInput();
        this.closeModule();
      } else {
        this.manageError(this._moduleNameInputText, this._moduleEmailInputText, this._modulePhoneInputText);
      }

      e.preventDefault();
    });
  }

  onDeleteBtn() {
    // TODO
    // get id
    // delete contact
    // close module
    // re render DOM
  }
}

export default View;
