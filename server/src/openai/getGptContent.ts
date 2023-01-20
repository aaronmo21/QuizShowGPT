import OpenAI from 'openai-api'
import { Question } from '../types'
import dotenv from 'dotenv'
dotenv.config()

const openai = new OpenAI(process.env.OPENAI_SECRET_KEY || '')

export default async function getGptContent(userCategories: string[] | []): Promise<Question[]> {
  try{
    console.log(userCategories)
    const totalQuestionsList: Question[] = []
    let doNotInclude = ''

    //generate 5 categories, using the user categories array and keeping track of previous categories so as to not generate duplicate categories
    for(let i = 0; i < 5; i++){
      const promptHelper = userCategories ? `called ${userCategories.shift()}` : ''
      console.log(promptHelper)
      const gptResponse = await openai.complete({
        engine: 'text-davinci-003',
        prompt: `generate a specific, jeopardy style category ${promptHelper} in camel-case format separated by a comma for a game of jeopardy. For the category, generate 5 questions ranging from easy to difficult. also, please don't include the category ${doNotInclude}. please format the response so that answers to the questions are in parentheses and the category name is prefaced with category: and each question is prefaced with Q:`,
        maxTokens: 500,
        temperature: 0.7,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false
      })

      let pointValue = 0

      //get rid of empty spaces
      const contentList = gptResponse.data.choices[0].text.trim().split('\n').filter(c => {
          return c != ''
      })

      //extract category name
      const categoryName: string = contentList[0].replace("Category: ", "").replace(',', '').trim()
      doNotInclude += categoryName + ', '
      console.log(doNotInclude)
    
      contentList.shift()

      //format each question
      const questionsList = contentList.map(q => {
          return q.replace("Q: ", "")
      })

      const finalQuestionsList: Question[] = questionsList.reduce((acc, q) => {
        const answer: string = q.substring(q.indexOf("(") + 1, q.indexOf(")"))
        q = q.split('(')[0].trim()
        pointValue += 200
        acc.push({
          category: categoryName,
          value: pointValue,
          question: q,
          answer, 
          answered: false
        })
        return acc;
      }, [] as Question[])

      console.log(finalQuestionsList);
      totalQuestionsList.push(...finalQuestionsList)
    }
    return totalQuestionsList
      
  }
  catch(err){
    console.log(err)
    throw(err)
  }
}