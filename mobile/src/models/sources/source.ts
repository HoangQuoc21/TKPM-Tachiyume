// Novel Source abstract class

import Chapter from "../chapter";
import Novel from "../novel";

abstract class Source {
  static importURL: string;
  static title: string;
  static idToCreate: number;

  // Properties
  id: number;
  sourceTitle: string;
  baseUrl: string;
  thumbnail: string;
  readLanguage: string;

  // Methods:
  // Constructor
  constructor() {
    this.id = 0;
    this.baseUrl = "";
    this.thumbnail = "";
    this.readLanguage = "";
  }

  // List of novels to show in on page
  abstract findNovelsByPage(page: number): Promise<any[]>;
  // Novel details (get details from a novel in list of novels )
  abstract findNovelDetails(novel: Novel): Promise<any>;
  // Get list of chapters from a novel
  abstract findChaptersByNovel(novel: Novel): Promise<any[]>;
  // Get content from a chapter
  abstract findContentByChapter(chapter: Chapter): Promise<any>;

  abstract getId(): Promise<any>;
}

export default Source;
