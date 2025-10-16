import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: (email) => email.includes('gmail'),
        //message: (props) => `${props.value} should have gmail`,
      },
    },
    name: { type: String, required: true },
    friend: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => new Date(),
    },
    updatedAt: {
      type: Date,
      immutable: true,
      default: () => new Date(),
    },
  },
);

userSchema.virtual("namedEmail").get(function(){
    return `${this.email}${this.name}`
})

const User = mongoose.model("User", userSchema)

export default User