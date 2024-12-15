const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'In Progress', 'Completed'] },
  progress: { type: Number, default: 0 }, // Progress in percentage
  score: { type: Number, default: 0 },   // Score associated with task completion
  dueDate: { type: Date },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});


module.exports = mongoose.model("Project", projectSchema);
