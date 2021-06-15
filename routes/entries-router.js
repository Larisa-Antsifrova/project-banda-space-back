const { Router } = require("express");
const entriesRouter = Router();
const EntriesControllers = require("../controllers/entries-controllers");

entriesRouter.get("/", EntriesControllers.getAllEntries);

entriesRouter.post("/", EntriesControllers.addEntry);

entriesRouter.patch("/:entryId", EntriesControllers.editEntry);

entriesRouter.delete("/:entryId", EntriesControllers.removeEntry);

module.exports = entriesRouter;
