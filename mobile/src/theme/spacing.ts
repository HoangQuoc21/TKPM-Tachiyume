import { metric } from "./metric"

//Định nghĩa các khoảng cách sử dụng trong ứng dụng
export const spacing = [0, 4, 8, 12, 16, 20, 32, 48, 64, 80]

export const rootHorizontalSpacing = spacing[3]
export const logoContainerBottomSpacing = spacing[5]
export const logoTopSpacing = metric.screenWidth / 2 - (120)
export const bottomInset = spacing[5]
export const fieldMinSize = 35
