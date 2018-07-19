require("dotenv").config();

const mongoose = require("mongoose");
const Comment = require("../../models/Comment");

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("Connected to Mongo!");
    Comment.collection.drop();
    Comment.create([
      {
        user_id: "5b4db04e67e0cf22f1eb56a2",
        dog_id: "5b4db088c35c96239b5342fe",
        title: "I just want to pet all the dogs!",
        comment:
          "OMG, SUCH SOFT FUR AND IN ALL CAPS BECAUSE MY ENTHUSIASM IS EXTREME!"
      },
      {
        user_id: "5b4db04e67e0cf22f1eb56a1",
        dog_id: "5b4db088c35c96239b5342ff",
        title: "My dreams came true",
        comment: "All my life I've prayed for a dog like you"
      },
      {
        user_id: "5b4db04e67e0cf22f1eb56a2",
        dog_id: "5b4db088c35c96239b5342ff",
        title: "My dreams came true",
        comment: "All my life I've prayed for a dog like you"
      },
      {
        user_id: "5b4db04e67e0cf22f1eb56a1",
        dog_id: "5b4db088c35c96239b5342fe",
        title: "I just want to pet all the dogs!",
        comment:
          "OMG, SUCH SOFT FUR (AND IN ALL CAPS BECAUSE MY ENTHUSIASM IS EXTREME!"
      }
    ]).then(() => {
      console.log("Comment created");
      mongoose.disconnect();
    });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
