const Entry = require("../models/entry-model");
const { HttpCodes, Statuses } = require("../helpers/constants");

const getAllEntries = async (req, res, next) => {
  try {
    const { author = null, limit = 5, offset = 0 } = req.query;

    const searchOptions = { deleted: false };

    if (author !== null) {
      searchOptions.author = author;
    }
    const { docs: allEntries, ...rest } = await Entry.paginate(searchOptions, {
      limit,
      offset,
    });

    return res.status(HttpCodes.OK).json({
      status: Statuses.success,
      code: HttpCodes.OK,
      data: { entries: allEntries, ...rest },
    });
  } catch (error) {
    next(error);
  }
};

const addEntry = async (req, res, next) => {
  try {
    const submittedEntry = req.body;

    const isNotUnique = await Entry.findOne({
      word: submittedEntry.word,
      deleted: false,
    });

    if (isNotUnique) {
      return res.status(HttpCodes.CONFLICT).json({
        status: Statuses.error,
        code: HttpCodes.CONFLICT,
        message: "This word already exists!",
      });
    }

    const newEntry = await Entry.create(submittedEntry);

    return res.status(HttpCodes.CREATED).json({
      status: Statuses.success,
      code: HttpCodes.CREATED,
      data: { entry: newEntry },
    });
  } catch (error) {
    next(error);
  }
};

const editEntry = async (req, res, next) => {
  try {
    const entryId = req.params.entryId;
    const entryUpdates = req.body;

    const updatedEntry = await Entry.findOneAndUpdate(
      { _id: entryId, deleted: false },
      { ...entryUpdates },
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(HttpCodes.NOT_FOUND).json({
        status: Statuses.error,
        code: HttpCodes.NOT_FOUND,
        message: "Entry does not exist.",
      });
    }

    return res.status(HttpCodes.OK).json({
      status: Statuses.success,
      code: HttpCodes.OK,
      data: { entry: updatedEntry },
    });
  } catch (error) {
    next(error);
  }
};

const removeEntry = async (req, res, next) => {
  try {
    const entryId = req.params.entryId;

    const deletedEntry = await Entry.findOneAndUpdate(
      { _id: entryId },
      { ...{ deleted: true } },
      { new: true }
    );

    if (!deletedEntry) {
      return res.status(HttpCodes.NOT_FOUND).json({
        status: Statuses.error,
        code: HttpCodes.NOT_FOUND,
        message: "The word does not exist.",
      });
    }

    return res.status(HttpCodes.OK).json({
      status: Statuses.success,
      code: HttpCodes.OK,
      message: "The word was successfully deleted.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEntries,
  addEntry,
  editEntry,
  removeEntry,
};
