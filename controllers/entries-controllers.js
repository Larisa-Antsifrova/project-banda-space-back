const Entry = require("../models/entry-model");
const { HttpCodes, Statuses } = require("../helpers/constants");

const getAllEntries = async (req, res, next) => {
  try {
    const allEntries = await Entry.find();

    return res.status(HttpCodes.OK).json({
      status: Statuses.success,
      code: HttpCodes.OK,
      data: { entries: allEntries },
    });
  } catch (error) {
    next(error);
  }
};

const addEntry = async (req, res, next) => {
  try {
    const submittedEntry = req.body;

    const isNotUnique = await Entry.findOne({ word: submittedEntry.word });

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
      { _id: entryId },
      { ...entryUpdates },
      { new: true }
    );

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

    const deletedEntry = await Entry.findOneAndDelete({ _id: entryId });

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
