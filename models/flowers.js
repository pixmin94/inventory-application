const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FlowerSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
//   genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

// Virtual for flower's URL
FlowerSchema.virtual("url").get(function () {
  return `/catalog/flower/${this._id}`;
});

// Export model
module.exports = mongoose.model("Flower", FlowerSchema);