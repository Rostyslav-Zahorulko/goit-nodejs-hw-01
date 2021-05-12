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
    const foundContact = contacts.find(({ id }) => id === contactId);
    console.log(foundContact);
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;

    const contacts = JSON.parse(data);
    const lastContactIndex = contacts.length - 1;
    const id = contacts[lastContactIndex].id + 1;

    contacts.push({ id, name, email, phone });
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

    if (filteredContacts.length !== contacts.length) {
      fs.writeFile(contactsPath, JSON.stringify(filteredContacts), err => {
        if (err) throw err;

        console.log('Контакт успешно удален');
        listContacts();
      });
    } else {
      console.log(`Контакта с id ${contactId} не найдено`);
      listContacts();
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
