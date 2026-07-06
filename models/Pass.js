const mongoose = require("mongoose");

const passSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    passengerName: {
        type: String,
        required: true
    },

    source: {
        type: String,
        required: true
    },

    destination: {
        type: String,
        required: true
    },

    travelDate: {
        type: Date,
        required: true
    },

    passType: {
        type: String,
        enum: ["Daily", "Weekly", "Monthly"],
        default: "Daily"
    },

    ticketPrice: {
        type: Number,
        required: true
    },

    qrCode: {
        type: String
    },

    bookingStatus: {
        type: String,
        enum: ["Booked", "Cancelled"],
        default: "Booked"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Pass", passSchema);
