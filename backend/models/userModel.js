import mongoose, { trusted } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "organization", "hospital"],
    },
    name: {
      type: String,
      required: function () {
        if ((this.role = "user" || this.role == "admin")) {
          return true;
        } else {
          return false;
        }
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    phone: {
      type: Number,
      required: [true, "phone number is required"],
    },

    address: {
      type: String,
      required: [true, "address is required"],
    },
    organization: {
      type: String,
      required: function () {
        if (this.role == "organization") {
          return true;
        } else {
          return false;
        }
      },
    },
    hospital: {
      type: String,
      required: function () {
        if (this.role == "hospital") {
          return true;
        } else {
          return false;
        }
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
