import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = 'test';

// called on auth signin request

export const signin = async (req, res) => {

  const { email, password } = req.body;

  try {
  
    const oldUser = await UserModal.findOne({ email });

    // check for unique email + password
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    // wrong password
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    // used for auth
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// called on auth sign up request

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {

    // check user
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) return res.status(400).json({ message: "User already exists" });

    // create model object
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    // used for authorization
    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};