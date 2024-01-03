const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const thoughtSchema = new Schema(
  {
    thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // Use a getter method to format the timestamp on query
    get: createdAtVal => new Date(createdAtVal).toLocaleString()
  },
  username: {
    type: String,
    required: true
  }
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;