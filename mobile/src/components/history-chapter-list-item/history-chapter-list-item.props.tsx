import { HistoryChapterListItemPresets } from "./history-chapter-list-item.preset";
import Chapter from "../../models/chapter";
import Source from "../../models/sources/source";
import Novel from "../../models/novel";

export interface IHistoryChapterListItemProps {
  preset?: HistoryChapterListItemPresets;
  chapter: Chapter;
  source: Source;
  novel: Novel,
}
