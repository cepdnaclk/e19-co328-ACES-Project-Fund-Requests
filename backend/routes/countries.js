const express = require("express");

const router = express.Router();

const { updateACountry, deleteACountry } = require("../controllers/countries");

// Flavour 1
// router.put("/:id", updateACountry)
// router.delete("/:id", deleteACountry)

// Flavour 2
router.route("/:id").put(updateACountry).delete(deleteACountry);

module.exports = router;
