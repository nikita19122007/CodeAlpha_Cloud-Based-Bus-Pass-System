const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    bookPass,
    getMyPasses,
    getPassById,
    cancelPass
} = require("../controllers/passController");

router.post("/book", authMiddleware, bookPass);

router.get("/mypasses", authMiddleware, getMyPasses);

router.get("/:id", authMiddleware, getPassById);

router.delete("/:id", authMiddleware, cancelPass);

module.exports = router;
