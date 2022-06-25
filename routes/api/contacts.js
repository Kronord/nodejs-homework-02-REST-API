const express = require("express");
const { schema, schemaPatch } = require("../../Validation/contactsValidation");
const authMiddleware = require("../../Middlewares/authMiddleware");
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

router.get("/", authMiddleware, getAll);

router.get("/:contactId", authMiddleware, getById);

router.post("/", authMiddleware, validateRequest(schema), create);

router.delete("/:contactId", authMiddleware, deleteById);

router.put("/:contactId", authMiddleware, updateById);

router.patch(
  "/:contactId/favorite",
  validateRequest(schemaPatch),
  updateStatusById
);

module.exports = router;
