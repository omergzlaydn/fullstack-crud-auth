import { Schema, model } from "mongoose";

// Kullanıcı şemasını belirleyelim
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: [
        true,
        "This username is already taken. Please choose a different one.",
      ],
    },
    email: {
      type: String,
      required: [true, "Please provide an email address"],
      unique: [
        true,
        "This email is already taken. Please choose a different one.",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    photo: {
      type: String,
      default: "https://picsum.photos/100",
    },
  },
  // ayarlar
  // timestamp sayesinde oluşturduğumuz bütün belegelere oto olarak oluşturulma ve güncellenme tarihleri eklenir
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
