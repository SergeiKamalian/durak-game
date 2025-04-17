export enum CardSuits {
  HEARTS = "hearts",
  DIAMONDS = "diamonds",
  CLUBS = "clubs",
  SPADES = "spades",
}
type Rank = "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";
type Value = 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export type Card = {
  id: number;
  suit: CardSuits;
  rank: Rank;
  value: Value;
};
