
import PostMessage from "../models/postMessage.js"


export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();

        res.status(200).json(postMessage)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        console.log(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body
    if (!Mongoose.Type.ObjectId.isValid(_id))
        return res.status(404).send("no Post with this Id")

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

    res.json(updatedPost)
    console.log(updatedPost);

}