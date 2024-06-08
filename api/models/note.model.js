import { model, Schema } from "mongoose";

const noteSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "User is required field"],
    },
    title: {
      type: String,
      required: [true, "Title is required field"],
    },
    desc: {
      type: String,
      required: [true, "Description is required field"],
    },
    tag: {
      type: String,
      required: [true, "Tag is required field"],
    },
    cover: {
      type: String,
      required: [true, "Cover Image is required field"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default model("Note", noteSchema);
