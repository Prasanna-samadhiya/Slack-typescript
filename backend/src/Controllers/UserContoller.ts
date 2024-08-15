const jwt = require("jsonwebtoken");
const userModel = require("../Modals/User/UserModal");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
import { Request, Response, NextFunction } from 'express';
dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: any;
}

const Authentication = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { my_token } = req.cookies;
  const authtoken = my_token;

  if (!authtoken) {
    return res.status(500).json({
      message: "User not logged in yet",
      UserLogged: false,
    });
  }

  try {
    const decoded = jwt.verify(authtoken, process.env.SECRET as string);
    console.log(decoded);

    req.user = await userModel.findById(decoded.id);
    console.log(req.user);
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
      UserLogged: false,
    });
  }
};

const UserRegister = async (req: Request, res: Response) => {
  try {
    const { username, fullname, email, password } = req.body;
    const result = await userModel.create({ username, fullname, email, password });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const UserLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await userModel.findOne({ email });

    if (!result) {
      return res.status(401).json({
        message: "User not found",
        LoggedIn: "failed",
      });
    }

    const match = await bcrypt.compare(password, result.password);

    if (!match) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const payload = {
      id: result._id,
      name: result.username,
    };

    const token = jwt.sign(payload, process.env.SECRET as string, { expiresIn: 86400 });

    return res
      .cookie("my_token", token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }) // 2 hours
      .status(200)
      .json({
        message: "Logged in successfully",
        user: result,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const GetAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userModel.find();

    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "No users found",
      });
    }

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { UserRegister, UserLogin, GetAllUsers, Authentication };
