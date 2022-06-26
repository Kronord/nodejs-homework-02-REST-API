const { createError } = require("../error");
const contacts = require("../services/contactServices");

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const contactsList = await contacts.getContacts(_id, req.query);
    res.status(200).json(contactsList);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id } = req.user;
    const contact = await contacts.getContactById(contactId, _id);
    if (!contact) {
      throw createError(404, "Not found");
    }
    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const newContact = await contacts.addContact(req.body, _id);
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id } = req.user;
    const updatedContact = await contacts.updateContactByID(
      contactId,
      req.body,
      _id
    );
    if (!updatedContact) {
      throw createError(404, "Not found");
    }
    res.json(updatedContact);
  } catch (err) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id } = req.user;
    const deletedContact = await contacts.deleteContactById(contactId, _id);
    if (!deletedContact) {
      throw createError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    next(err);
  }
};

const updateStatusById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id } = req.user;
    const updatedContact = await contacts.updateStatusContact(
      contactId,
      req.body,
      _id
    );
    if (!updatedContact) {
      throw createError(404, "Not found");
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
