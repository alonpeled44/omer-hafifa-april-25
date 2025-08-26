export enum Theme {
  Light = "light",
  Dark = "dark",
}

export enum FontSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export interface User {
  id: number;
  username: string;
  password: string;
  theme: Theme;
  fontSize: FontSize;
}
