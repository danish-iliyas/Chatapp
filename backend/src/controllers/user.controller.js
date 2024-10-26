import mongoose from "mongoose";
import { User } from "../models/user.model.js";

export const register = async (req, res, next) => {
    try {

        const { fullname,username, email,gender, password, profilepic } = req.body;
       console.log(fullname, username, email, password, profilepic , "error")     //
        const user = await User.findOne({ username, email });  
     //   console.log( "user hai",user);
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
           
        if (!fullname || !username || !email || !gender || !password || !profilepic) {
            return res.status(400).json({ message: "Please provide all fields" });
        }
        const newUser = await User.create({
            fullname,
            username,
            email,
            gender,
            password,
            profilepic,
        });
        res.status(201).json({
            message: "User created successfully",
            data: newUser,
        })
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Server error" });
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //console.log( email, password , "login")
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        //console.log(user, "login");
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        const token = user.generateAccessToken()

        // console.log(token, "login"); 

        res.status(200).json({
            message: "Login successful",
            _id: user._id,
             username: user.username,
             email: user.email,
             profilepic: user.profilepic,
             token:token 
        })
    } catch (error) {
        console.error("Error occurred:", error);
       return res.status(500).json({ message: "Server error" });
        
    }

  
}

export const getAllUsers = async (req, res, next) => {
    try {
        const keyword = req.query.search
        ? {
           $or : [
                  {name: {$regex: req.query.search, $options: "i"}},
                  {email: {$regex: req.query.search, $options: "i"}},
            ]
        }
        : {};
        const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
        console.log(users, "hai")
        res.status(200).json({ data: users });
    }catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Server error from get all users" });
    }       
}