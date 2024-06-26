import { IImportSourceModalPresets } from "./import-source-modal.presets";

export interface ImportSourceModalProps {
    preset?: IImportSourceModalPresets
    isVisible: boolean
    onClosePress(): void
}