import getUniqueId from "./libs/idGenerator.js";
import formatPhoneNo from "./libs/formatePhoneNo.js";

// TODO
// Install shortif module

// =====
// Model
// =====
// - localStorage API used

class Model {
  constructor(id, name, email, phone = "", favorite = false) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.favorite = favorite;

    // set for editting options
    this.currentId = "";

    this.contactlist = JSON.parse(localStorage.getItem("contacts")) || [];
  }

  logData() {
    return this.contactlist;
  }

  commitToDataBase(UpdatedContactList) {
    localStorage.setItem("contacts", JSON.stringify(UpdatedContactList));
  }

  addContact(name, email, phone = "", favorite = false) {
    const contact = {
      id: getUniqueId(),
      name: name,
      email: email,
      phone: formatPhoneNo(phone),
      favorite: favorite
    };

    // Update state
    this.contactlist.push(contact);

    // Update LS
    this.commitToDataBase(this.contactlist);
  }

  editContact(targetContactId, updatedName, updatedEmail, updatedPhone = "") {
    const UpdatedContactList = this.contactlist.map((currentContact) => {
      if (currentContact.id == targetContactId) {
        return ({
          id: currentContact.id,
          name: updatedName,
          email: updatedEmail,
          phone: updatedPhone,
          favorite: currentContact.favorite
        });
      }

      return currentContact;
    });

    // Update State
    this.contactlist = UpdatedContactList;
    // Update LS
    this.commitToDataBase(this.contactlist);
  }

  // TODO create delete list
  // Filter a contact out of array by id
  // deleteContact(id) {
  //   // this.contactlist = this.contactlist.filter((contact) => contact.id !== id);
  // }

  // Toggle the "favorite" boolean on the targeted contact
  // - favorite
  updateFavorite(targetContactId) {
    const UpdatedContactList = this.contactlist.map((currentContact) => {
      if (currentContact.id == targetContactId) {
        return({
          id: currentContact.id,
          name: currentContact.name,
          email: currentContact.email,
          phone: currentContact.phone,
          favorite: !currentContact.favorite
        });
      }

      return currentContact;
    });

    // Update State
    this.contactlist = UpdatedContactList;
    // Update LS
    this.commitToDataBase(UpdatedContactList);
  }

  setCurrentId(id) {
    this.currentId = id;
  }
}

export default Model;
