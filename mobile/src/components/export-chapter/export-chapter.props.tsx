import Chapter from "../../models/chapter";
import Source from "../../models/sources/source";
import { IExportChapterPresets } from "./export-chapter.presets";

export interface ExportChapterProps {
    preset?: IExportChapterPresets
    isVisible: boolean
    onClosePress(): void
    source: Source;
    chapter: Chapter;
}