const express = require("express");
const { schema, schemaPatch } = require("../../Validation/contactsValidation");
const { validateRequest } = require("../../Middlewares/validateRequest");
const {
  getAll,
  getById,
  deleteById,
  create,
  updateById,
  updateStatusById,
} = require("../../Controllers/contactsController");
const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateRequest(schema), create);

router.delete("/:contactId", deleteById);

router.put("/:contactId", updateById);

router.patch(
  "/:contactId/favorite",
  validateRequest(schemaPatch),
  updateStatusById
);

module.exports = router;
