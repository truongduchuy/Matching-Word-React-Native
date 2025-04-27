export type Point = {
  x: number;
  y: number;
};

export type Line = {
  from: Point;
  to: Point;
  fromWord: string;
  toWord: string;
  color: string;
};

export type RootStackParamList = {
  Splash: undefined;
  WordList: undefined;
};