export interface Sorteo {
  _id: string;
  name: string;
  description: string;
  date: Date;
  winner: string;
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
  SorteoID: string;
}
