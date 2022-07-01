export interface AddressedName {
  name: String;
  url: String;
}
export interface Char {
  id: number;
  name: String;
  status: String;
  species: String;
  type: String;
  gender: String;
  origin: AddressedName;
  location: AddressedName;
  episode: [String];
  url: String;
  image: String;
  created: String;
}

export interface GetChars {
  data: [Char];
  success: Boolean;
  errorMessage: string;
}
export interface GetCharsQueryType {
  getChars: GetChars;
}
export interface GetCharVars {
  offset: number;
  limit: number;
  filter: string;
}

export interface RemoveChar {
  success: Boolean;
}
export interface RemoveCharQueryType {
  removeChar: RemoveChar;
}
export interface RemoveCharVars {
    id: number;
}

export interface AddChar {
    data: Char;
    success: Boolean;
    errorMessage: string;
  }
  export interface AddCharQueryType {
    addChar: AddChar;
  }
  export interface AddCharVars {
      name: string;
      location: string;
      image: string;
  }

  export interface UpdateChar {
    data: Char;
    success: Boolean;
    errorMessage: string;
  }
  export interface UpdateCharQueryType {
    updateChar: UpdateChar;
  }
  export interface UpdateCharVars {
      id: Number;
      name: string;
      location: string;
      image: string;
  }
