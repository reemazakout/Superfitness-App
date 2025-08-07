export type Muscle = {
  _id: string;
  name: string;
  image: string;
};
export type MusclesResponse = {
  muscles: Muscle[];
};