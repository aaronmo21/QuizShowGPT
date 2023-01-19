import mongoose from "mongoose";

const Schema = mongoose.Schema

const QuestionSchema = new Schema({
  prompt: String,
  answer: String
})

const QuestionModel = mongoose.model("Question", QuestionSchema)

export default QuestionModel