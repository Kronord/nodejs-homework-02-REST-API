const getError = require("../error");
const contacts = require("../services/services");

const getAll = async (req, res, next) => {
  try {
    const contactsList = await contacts.getContacts();
    res.status(200).json(contactsList);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      throw getError(404, "Not found");
    }
    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await contacts.updateContactByID(
      contactId,
      req.body
    );
    if (!updatedContact) {
      throw getError(404, "Not found");
    }
    res.json(updatedContact);
  } catch (err) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await contacts.deleteContactById(contactId);
    if (!deletedContact) {
      throw getError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    next(err);
  }
};

const updateStatusById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await contacts.updateStatusContact(
      contactId,
      req.body
    );
    if (!updatedContact) {
      throw getError(404, "Not found");
    }
    res.json(updatedContact);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  deleteById,
  create,
  updateById,
  updateStatusById,
};
