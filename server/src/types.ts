export interface Game {
  theme: string,
  difficulty: number,
  categories: Category[],
}

export interface Category {
  name: string,
  questions: Question[],
}

export interface Question {
  category: string,
  value: number,
  question: string,
  answer: string,
  answered: boolean
}