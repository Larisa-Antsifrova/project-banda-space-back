const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Authors } = require("../helpers/authors");

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

entrySchema.plugin(mongoosePaginate);

const Entry = model("entry", entrySchema);

module.exports = Entry;
