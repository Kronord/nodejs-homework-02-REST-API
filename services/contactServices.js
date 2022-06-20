const { Contact } = require("../models/contactsModel");

const getContacts = (owner, { limit, page, favorite }) => {
  const skipped = (page - 1) * limit;
  const skip = skipped < 0 ? 0 : skipped;
  const limited = parseInt(limit) > 20 ? 20 : parseInt(limit);
  if (favorite !== undefined) {
    const contacts = Contact.find({ $and: [{ owner }, { favorite }] })
      .skip(skip)
      .limit(limited);
    return contacts;
  }
  return Contact.find({ owner })
    .skip(skip)
    .limit(limited);
};

const getContactById = (id, owner) => Contact.findOne({_id: id, owner});

const addContact = (contact, owner) => Contact.create({...contact, owner});

const updateContactByID = (id, body, owner) =>
  Contact.findByIdAndUpdate({_id: id, owner}, body, { new: true });
  
const deleteContactById = (id, owner) =>
  Contact.findByIdAndRemove({ _id: id, owner });

const updateStatusContact = (id, body, owner) =>
  Contact.findByIdAndUpdate({ _id: id, owner }, body, { new: true });

  module.exports = {
    getContacts,
    getContactById,
    addContact,
    updateContactByID,
    deleteContactById,
    updateStatusContact,
  };