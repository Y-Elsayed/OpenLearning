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
    otherType: { 
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
    stepNumber: { type: Number, required: true }, // step number // Maybe remove later, can be inferred from index in array
    title: { type: String, required: true }, // step title
    description: { type: String, required: true }, // step description
    resources: { type: [ResourceSchema], default: [] } // resources related to the step
  }
);

// Main Post Schema
const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // roadmap title
    description: { type: String, required: false }, // roadmap description
    field: { type: String, required: true }, // field of the roadmap (e.g., "Machine Learning")
    creatorID: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', // Reference to the User who created the roadmap
      required: true 
    },
    steps: { type: [StepSchema], required: false }, // array of steps in the roadmap
    tags: { type: [String], default: [] }, // tags associated with the roadmap
    createdAt: { type: Date, default: Date.now, immutable: true }, // timestamp of post creation
    updatedAt: { type: Date, default: Date.now } // timestamp of last update
  },
  {
    timestamps: { createdAt: true, updatedAt: true } // Automatically adds `createdAt` and `updatedAt`
  }
);

PostSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Export the Post Model
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
