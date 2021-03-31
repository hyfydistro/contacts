// ==========
// Controller
// ==========

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    // Bindigngs
    // Load Initial Event Listeners
    this.view.bindChangetoFavoriteTabs()
    this.view.bindChangetoAllContactsTabs()

    // Display inital contact list
    // Retrieve model 'contactList'
    this.onContactListChanged(this.model.contactlist)
  }

  onContactListChanged = (contactList) => {
    this.view.displayContactList(contactList);
  }
}

export default Controller;