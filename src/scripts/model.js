import getUniqueId from "./libs/idGenerator.js";

// TODO
// Install shortif module

// =====
// Model
// =====
// localStorage API used

class Model {
  constructor(id = getUniqueId(), name, email, phone = "") {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;

    // set for editting options
    this.currentId = "";

    this.contactlist = [
      {
        id: 1,
        name: "john",
        email: "johnn@example.com",
        phone: "",
        favorite: false
      },
      {
        id: 2,
        name: "Sam",
        email: "yo@example.com",
        phone: "",
        favorite: true
      },
      {
        id: 3,
        name: "Max",
        email: "yo@example.com",
        phone: "",
        favorite: false
      }
    ];
  }

  logData() {
    // console.log(this.contactlist);
    return this.contactlist;
  }


  addContact(name, email, phone, favorite) {
    const contact = {
      id: getUniqueId(),
      name: name,
      email: email,
      phone: phone,
      favorite: favorite
    };

    this.contactlist.push(contact);

    // TODO
    // Update LS
  }

  // ! Refactor with indents to make it more readable
  // Map through all todos, and replace the text of the todo with the specified id
  // ? rename to updateContact
  editContact(id, updatedName, updatedEmail, updatedPhone = "") {
    // this.contactlist = this.contactlist.map(contact => {
    //   return contact.id === id ? { id: contact.id, name: updatedName, email: updatedEmail, phone: updatedPhone };
    // })
  }

  // Filter a contact out of array by id
  deleteContact(id) {
    // this.contactlist = this.contactlist.filter((contact) => contact.id !== id);
  }

  // Filpe the complete boolean on the specified contact
  // - favorite
  toggleFavorite(id) {
    // this.contactlist = this.contactlist.map((contact) =>
    //   contact.id === id
    //     ? {
    //         id: contact.id,
    //         name: contact.id,
    //         email: contact.email,
    //         phone: contact.phone,
    //         favorite: !contact.favorite
    //       }
    //     : contact
    // );

    // If target contains classList .contact-list__icon--favorite
    // get current contact id
    //
  }

  setCurrentId(id) {
    this.currentId = id;

    console.log("model id received", this.currentId);
  }
}

export default Model;
