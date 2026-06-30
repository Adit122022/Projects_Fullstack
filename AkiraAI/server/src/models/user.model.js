import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  console.log("DEBUG: Pre-save hook triggered");
  console.log("DEBUG: isModified('password') =", this.isModified("password"));
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  console.log("DEBUG: Original password =", this.password);
  this.password = await bcrypt.hash(this.password, salt);
  console.log("DEBUG: Hashed password =", this.password);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
const UserModel = mongoose.model("Users", userSchema);
export default UserModel;
