const mongoose = require('mongoose');

// Resource Schema for the resources within a step
const ResourceSchema = new mongoose.Schema(
  {
    type: { 
      type: String, 
      enum: ['video', 'article', 'book','paper', 'other'], 
      required: true 
    }, // type of resource
    title: { type: String, required: true }, // title of the resource
    link: { type: String, required: true, match: /^https?:\/\/[^\s$.?#].[^\s]*$/ }, // link to the resource
    other_type: { 
      type: String, 
      required: function() { return this.type === 'other'; }, // required if the type is 'other'
      minlength: 1,
      maxlength: 50,
      trim: true
    }
  }
);

// Step Schema for the steps within a roadmap post
const StepSchema = new mongoose.Schema(
  {
    step_number: { type: Number, required: true }, // step number
    title: { type: String, required: true }, // step title
    description: { type: String, required: true }, // step description
    resources: { type: [ResourceSchema], default: [] } // resources related to the step
  }
);

// Main Post Schema
const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // roadmap title
    description: { type: String, required: true }, // roadmap description
    field: { type: String, required: true }, // field of the roadmap (e.g., "Machine Learning")
    creator_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', // Reference to the User who created the roadmap
      required: true 
    },
    steps: { type: [StepSchema], required: true }, // array of steps in the roadmap
    tags: { type: [String], default: [] }, // tags associated with the roadmap
    created_at: { type: Date, default: Date.now } // timestamp of post creation
  },
  {
    timestamps: true // Automatically adds `createdAt` and `updatedAt`
  }
);

// Export the Post Model
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
