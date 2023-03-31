const db = require("../models");
const students = db.student;
const clientConnection = require('../../server');

// Create and Save a new student
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Name can not be empty!" });
    return;
  }

  // Create a student
  const student = new students({
    name: req.body.name,
    email: req.body.email
  });

  // Save student in the database
  student
    .save(student)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the student."
      });
    });
};

// Retrieve all students from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  students.find(condition)
    .then(data => {
      const result = data.length === 0 ? 'No record found' : data;
      res.json(result);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students."
      });
    });
};

// Find a single student with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  students.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found student with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving student with id=" + id });
    });
};

// Update a student by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  students.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update student with id=${id}. Maybe student was not found!`
        });
      } else res.send({ message: "student was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating student with id=" + id
      });
    });
};

// Delete a student with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  students.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete student with id=${id}. Maybe student was not found!`
        });
      } else {
        res.send({
          message: "student was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete student with id=" + id
      });
    });
};

// Delete all students from the database.
exports.deleteAll = (req, res) => {
  students.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} students were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all students."
      });
    });
};

// Find all published students
exports.findAllPublished = (req, res) => {
  students.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students."
      });
    });
};
