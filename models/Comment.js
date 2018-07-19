const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user_id: {type:Schema.Types.ObjectId, ref:'User', required:true},
    dog_id: {type:Schema.Types.ObjectId, ref:'Dog', required:true},
    title:{ type: String, ref: 'Title' },
    comment:{ type: String, ref: 'Comment' },
  }, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  });

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
