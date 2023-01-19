import mongoose from "mongoose";
import Category from "../models/Category";

const Schema = mongoose.Schema

const GameSchema = new Schema({
  theme: String,
  difficulty: String,
  category: [Category]
})

const GameModel = mongoose.model("Game", GameSchema)

export default GameModel