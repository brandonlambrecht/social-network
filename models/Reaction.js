const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const mongoose = require('mongoose');

const reactionSchema = new Schema(
	{
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      
      get: createdAtVal => new Date(createdAtVal).toLocaleString()
    }
  });
  
  const Reaction = model('reaction', reactionSchema);
  module.exports = Reaction;