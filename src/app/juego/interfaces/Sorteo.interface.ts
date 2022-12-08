export interface Sorteo {
  _id: string;
  name: string;
  description: string;
  date: Date;
  winner: {};
  participants: Participant[];
  price: number;
  status: boolean;
  maxParticipants: number;
  imgURL: string;
  creator: string;
  reward: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Participant {
  name: string;
  id: string;
  number: number;
  SorteoID: string;
}
