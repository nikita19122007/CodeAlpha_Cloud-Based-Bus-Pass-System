const Pass = require("../models/Pass");
const QRCode = require("qrcode");

// Book Pass
const bookPass = async (req, res) => {

    try {

        const {
            passengerName,
            source,
            destination,
            travelDate,
            passType
        } = req.body;

        let ticketPrice = 0;

        switch (passType) {
            case "Daily":
                ticketPrice = 100;
                break;
            case "Weekly":
                ticketPrice = 500;
                break;
            case "Monthly":
                ticketPrice = 1200;
                break;
            default:
                ticketPrice = 100;
        }

        const qrData = `${passengerName}-${source}-${destination}-${travelDate}`;

        const qrCode = await QRCode.toDataURL(qrData);

        const pass = await Pass.create({
            userId: req.user.id,
            passengerName,
            source,
            destination,
            travelDate,
            passType,
            ticketPrice,
            qrCode
        });

        res.status(201).json({
            success: true,
            message: "Bus Pass Booked Successfully",
            pass
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Get Logged-in User Passes

const getMyPasses = async (req, res) => {

    try {

        const passes = await Pass.find({
            userId: req.user.id
        });

        res.status(200).json({
            success: true,
            total: passes.length,
            passes
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Get Single Pass

const getPassById = async (req, res) => {

    try {

        const pass = await Pass.findById(req.params.id);

        if (!pass) {

            return res.status(404).json({
                success: false,
                message: "Pass Not Found"
            });

        }

        res.status(200).json({
            success: true,
            pass
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Cancel Pass

const cancelPass = async (req, res) => {

    try {

        const pass = await Pass.findById(req.params.id);

        if (!pass) {

            return res.status(404).json({
                success: false,
                message: "Pass Not Found"
            });

        }

        pass.bookingStatus = "Cancelled";

        await pass.save();

        res.status(200).json({
            success: true,
            message: "Bus Pass Cancelled Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    bookPass,
    getMyPasses,
    getPassById,
    cancelPass
};
