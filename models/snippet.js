const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true
  },
  title: {type: String, required: true},
  body: {type: String, required: true},
  notes: {type: String},
  language: {type: String, required: true},
  tags: {type: Array, required: true, default: []}
})

const Snippet = mongoose.model("Snippet", snippetSchema);

module.exports = Snippet;
