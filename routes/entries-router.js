const { Router } = require("express");
const entriesRouter = Router();
const EntriesControllers = require("../controllers/entries-controllers");
const {
  validateAddEntry,
  validateEditEntry,
} = require("../validation/entries-validation");
const validateMongoId = require("../validation/db-id-validation");

entriesRouter
  .get("/", EntriesControllers.getAllEntries)
  .post("/", validateAddEntry, EntriesControllers.addEntry);

entriesRouter
  .patch(
    "/:entryId",
    validateMongoId,
    validateEditEntry,
    EntriesControllers.editEntry
  )
  .delete("/:entryId", validateMongoId, EntriesControllers.removeEntry);

module.exports = entriesRouter;
