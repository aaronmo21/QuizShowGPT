import mongoose from "mongoose"
import Question from "../models/Question"

const Schema = mongoose.Schema

const CategorySchema = new Schema({
  title: String,
  question: [Question],
})

const CategoryModel = mongoose.model("Category", CategorySchema)

export default CategoryModel