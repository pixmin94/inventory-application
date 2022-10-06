const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlantSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
//   genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

// Virtual for plant's URL
PlantSchema.virtual("url").get(function () {
  return `/catalog/plant/${this._id}`;
});

// Export model
module.exports = mongoose.model("Plant", PlantSchema);
