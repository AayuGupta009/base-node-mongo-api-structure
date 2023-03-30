module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      name: String,
      email: String,
      tutorialRegistered: [String]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutorial = mongoose.model("student", schema);
  return Tutorial;
};
