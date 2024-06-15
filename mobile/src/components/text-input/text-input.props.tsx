import { ITextInputPresets } from "./text-input.presets";

export interface TextInputProps {
    preset?: ITextInputPresets
    placeholder?: string
    value: string
    onChangeText(value: string): void
    inputMode?: 'url' | 'text'
    onTextClear?(): void
    enableEdit?: boolean
}