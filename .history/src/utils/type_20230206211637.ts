export interface ItemData {
  name: FullName;
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
