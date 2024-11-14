import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    description : {
        type : String,
        required: true
    },
    image : {
        type : String,
        default : "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
        required : true
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required: true,
    }

});

const Blog = mongoose.model("Blog" , blogSchema);
export default Blog;
