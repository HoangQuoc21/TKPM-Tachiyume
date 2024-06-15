import { color } from "./color"

// Shadow for component
export const shadow = {
  default: {
    shadowColor: color.common.gray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.10,
    shadowRadius: 5,
    elevation: 5,
  },
  top: {
    shadowColor: color.common.gray,
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 5,
  },
  none: {
    shadowColor: color.common.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
}
