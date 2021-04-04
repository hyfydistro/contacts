// ==========
// Controller
// ==========

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Initial load
    this.onInitialLoad(this.model.contactlist);
    this.view.onWindowResize();

    this.onContactListChanged(this.model.contactlist);

    // Load Event Listeners
    this.view.onChangeToFavoriteTabs(this.model.contactlist);
    this.view.onChangeToAllContactsTabs();
    this.view.onOpenAddContactForm();
    this.view.onCloseAddContactForm();
    this.view.onDisplayContactView(this.model.contactlist, this.setCurrentId, this.handleUpdateContact);
    this.view.onBackBtn();
    this.view.onToggleFavorite(this.handleToggleFavorite);
    this.view.onSaveContact(this.handleAddContact, this.model.contactlist);
    this.view.onUpdateContact(this.handleUpdateContact);

  }

  onInitialLoad = (contactList) => {
    // Re-render UI
    this.view.renderContactList(contactList);
    this.view.renderFavoriteList(contactList);

    // Add event
    this.view.displayContactList(contactList);
    // add "resize" event
  }

  // Re-render lists
  onContactListChanged = (contactList) => {
    // Re-render UI
    this.view.renderContactList(contactList);
    this.view.renderFavoriteList(contactList);

    this.view.onDisplayContactView(this.model.contactlist, this.setCurrentId);
  }

  handleAddContact = (name, email, phone) => {
    this.model.addContact(name, email, phone);
    this.onContactListChanged(this.model.contactlist);

    // Add event
    this.view.onToggleFavorite(this.handleToggleFavorite);
  }

  handleToggleFavorite = (targetContactId) => {
    this.model.updateFavorite(targetContactId);
    this.onContactListChanged(this.model.contactlist);

    // Add event
    this.view.onToggleFavorite(this.handleToggleFavorite);
  }

  handleUpdateContact = (updatedName, updatedEmail, updatedPhone) => {
    this.model.editContact(this.model.currentId, updatedName, updatedEmail, updatedPhone);
    this.onContactListChanged(this.model.contactlist);
    this.view.renderContactView(this.model.contactlist, this.model.currentId);

    // Add event
    this.view.onToggleFavorite(this.handleToggleFavorite);
    this.view.onOpenEditContactForm(this.model.contactlist, this.model.currentId);
  }

  setCurrentId = (id) => {
    this.model.setCurrentId(id);
  }
}

export default Controller;