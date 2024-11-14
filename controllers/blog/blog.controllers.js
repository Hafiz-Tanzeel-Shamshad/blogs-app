import Blog from "../../models/blog/blog.models.js";


export const createBlog =

  async (req, res) => {
    const { title, description, category } = req.body;
    console.log(req.body);
    console.log(req.file);

    const getImage = null;


    try {
      const imageUrl = (file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "practice" }, // Optional: specify folder in Cloudinary
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );
          
          // Pass the buffer of the image file to Cloudinary
          stream.end(file.buffer);
        });
      };
     
      if (req.file) {
        getImage = await imageUrl(req.file); // Call and await the function here
      }
      console.log(getImage);
      // Create new blog instance
      let addBlog = new Blog({
        title,
        description,
        category,
        image: getImage,
      });

      const isSaved = await addBlog.save();

      if (isSaved) {
        return res.status(200).json({ msg: "Data saved successfully", blog: addBlog._doc });
      }

      // If somehow save was unsuccessful but no error was thrown
      return res.status(400).json({ msg: "Failed to save data" });
    } catch (error) {
      console.error("Error saving blog:", error);
      return res
        .status(500)
        .json({ msg: "An error occurred while saving the blog" });
    }
  };



