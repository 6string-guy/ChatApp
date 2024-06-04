import expressAsyncHandler from"express-async-handler"
import User from "../models/userModel.js";
import generateToken from "../config/generateToken.js";


const registerUser = expressAsyncHandler(
    async (req, res) => {
        const { name, email, password, pic } = req.body;
        if (!name || !email || !password)
        {
            res.status(400);
            throw new Error("Please Fill All The Fields");
        }
        const userExist = await User.findOne({ email })
        if (userExist)
        {
            res.status(400);
            throw new Error("User already exists");
        }
        const user = await User.create(
            {
                name, email, password, pic
            }
        );
        if (user)
        {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token:generateToken(user._id),
            })
        }
        else
        {
            res.status(400);
            throw new Error("Failed to create new user");
            }
    }
)
const authUser = expressAsyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && user.password === password)
        {
            res.json({
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              pic: user.pic,
              token: generateToken(user._id),
            });
        }
        else {
             res.status(401);
             throw new Error("Invalid Email or Password");
        }
    }
)
const allUsers = expressAsyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: 'i' } }
            ]
        }
        : {};
    //console.log(keyword);
    const users = await User.find(keyword)
    res.send(users);


})
export { registerUser ,authUser, allUsers}; 