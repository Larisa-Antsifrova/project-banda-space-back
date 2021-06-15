const { Schema, model } = require("mongoose");
const { Authors } = require("../helpers/authors");
const db = require("../db/mongo-db");

const entrySchema = new Schema(
  {
    word: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    author: { type: String, required: true, enum: Authors },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  }
);

console.log(db);

const Entry = model("entry", entrySchema);

module.exports = Entry;
