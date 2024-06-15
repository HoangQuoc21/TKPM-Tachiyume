// Source Novel Class
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import Chapter from "./chapter";

class Novel {
  //  Properties
  url: string; // url to the novel
  id: number;
  title: string;
  thumbnail: string;
  sourceId: number;
  authors: string[]; //Update the type of authors to string[] as there might be many authors
  status: string;
  category: string[];
  description: string;
  view: number;
  lastestChapters: Chapter[];
  rating: Float;
  alternateNames: string[];
  releaseYear: number;
  isFavorite: boolean;
}

export default Novel;
