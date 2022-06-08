const { Contact } = require("../models/contactsModel");

const getContacts = () => Contact.find({});

const getContactById = (id) => Contact.findById(id);

const addContact = (contact) => Contact.create(contact);

const updateContactByID = (id, body) =>
  Contact.findByIdAndUpdate(id, body, { new: true });

const deleteContactById = (id) => Contact.findByIdAndRemove(id);

const updateStatusContact = (id, body) =>
  Contact.findByIdAndUpdate(id, body, { new: true });

  module.exports = {
    getContacts,
    getContactById,
    addContact,
    updateContactByID,
    deleteContactById,
    updateStatusContact,
  };