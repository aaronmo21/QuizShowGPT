export interface Question {
  category: string;
  value: number;
  question: string;
  answer: string;
  answered: boolean;
}
  
export interface Player {
  name: string;
  score: number;
}