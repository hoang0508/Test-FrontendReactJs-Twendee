export interface ItemData {
  name: FullName;
  picture: Picture;
}

export interface FullName {
  title: string;
  first: string;
  last: string;
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface Login {
  username: string;
  uuid: string;
}
