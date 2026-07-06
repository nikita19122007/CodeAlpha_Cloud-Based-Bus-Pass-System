const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    fullName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    isVerified: {
        type: Boolean,
        default: true
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
