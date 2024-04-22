import { color } from "./color"

// Định nghĩa các loại shadow sử dụng trong ứng dụng
export const shadow = {
  default: {
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  top: {
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  none: {
    shadowColor: color.transparent,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
}
