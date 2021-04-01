// ==========
// Controller
// ==========

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    // Display inital contact list
    // Retrieve model 'contactList'
    this.onContactListChanged(this.model.contactlist)

    // Bindigngs
    // Load Initial Event Listeners
    this.view.bindChangeToFavoriteTabs()
    this.view.bindChangeToAllContactsTabs()
    this.view.bindDisplayContactView(this.model.contactlist, this.setCurrentId)
    this.view.onBackBtn()
  }

  onContactListChanged = (contactList) => {
    this.view.displayContactList(contactList);
  }

  setCurrentId = (id) => {
    this.model.setCurrentId(id);
  }
}

export default Controller;