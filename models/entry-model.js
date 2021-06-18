const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Authors } = require("../helpers/authors");

const entrySchema = new Schema(
  {
    word: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true, enum: Authors },
    deleted: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.deleted;
        return ret;
      },
    },
  }
);

entrySchema.plugin(mongoosePaginate);

const Entry = model("entry", entrySchema);

module.exports = Entry;
