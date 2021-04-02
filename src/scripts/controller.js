// ==========
// Controller
// ==========

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Initial load
    this.onInitialLoad(this.model.contactlist);

    this.onContactListChanged(this.model.contactlist);

    // Load Event Listeners
    this.view.onChangeToFavoriteTabs(this.model.contactlist);
    this.view.onChangeToAllContactsTabs();
    this.view.onOpenAddContactForm();
    this.view.onCloseAddContactForm();
    this.view.onDisplayContactView(this.model.contactlist, this.setCurrentId);
    this.view.onBackBtn();
    this.view.onToggleFavorite(this.handleToggleFavorite);
    this.view.onSaveContact(this.handleAddContact, this.model.contactlist);
  }

  onInitialLoad = (contactList) => {
    // Re-render UI
    this.view.renderContactList(contactList);
    this.view.renderFavoriteList(contactList);

    // Add event
    this.view.displayContactList(contactList);
  }

  onContactListChanged = (contactList) => {
    // Re-render UI
    this.view.renderContactList(contactList);
    this.view.renderFavoriteList(contactList);

    this.view.onDisplayContactView(this.model.contactlist, this.setCurrentId);
  }

  setCurrentId = (id) => {
    this.model.setCurrentId(id);
  }

  handleAddContact = (name, email, phone) => {
    this.model.addContact(name, email, phone);
    this.onContactListChanged(this.model.contactlist);

    // Add event
    this.view.onToggleFavorite(this.handleToggleFavorite);
  }

  handleToggleFavorite = (targetContactId) => {
    this.model.updateFavorite(targetContactId);

    // Re-render UI
    this.onContactListChanged(this.model.contactlist);

    // Add event
    this.view.onToggleFavorite(this.handleToggleFavorite);
  }
}

export default Controller;