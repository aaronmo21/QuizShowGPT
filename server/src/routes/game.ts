import { Router, Request, Response } from 'express';
import getGptContent from '../openai/getGptContent';

const router = Router()

router.post('/game', async (req: Request, res: Response) => {
  try{
    const userCategories: string[] | [] = req.body.userCategories
    const questions = await getGptContent(userCategories)

    console.log(questions)
    res.json(questions)
  }
  catch(err){
    console.log("ERROR");
    console.log(err);
  }
})

export { router }
