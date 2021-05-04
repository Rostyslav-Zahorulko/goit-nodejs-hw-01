const path = require('path');
const fs = require('fs');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;

    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;

    const contacts = JSON.parse(data);
    const foundedContact = contacts.find(({ id }) => id === contactId);
    console.log(foundedContact);
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;

    const contacts = JSON.parse(data);
    contacts.push({ name, email, phone });
    fs.writeFile(contactsPath, JSON.stringify(contacts), err => {
      if (err) throw err;

      console.log('Контакт успешно добавлен');
      listContacts();
    });
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;

    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(({ id }) => id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(filteredContacts), err => {
      if (err) throw err;

      console.log('Контакт успешно удален');
      listContacts();
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
