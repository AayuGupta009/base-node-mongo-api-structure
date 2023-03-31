const router = require("express").Router();
const students = require("../controllers/student.controller.js");

// Create a new Tutorial
router.post("/", students.create);

// Retrieve all Tutorials
router.get("/", students.findAll);

// Retrieve all published Tutorials
router.get("/published", students.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", students.findOne);

// Update a Tutorial with id
router.put("/:id", students.update);

// Delete a Tutorial with id
router.delete("/:id", students.delete);

// Create a new Tutorial
router.delete("/", students.deleteAll);

module.exports = router;