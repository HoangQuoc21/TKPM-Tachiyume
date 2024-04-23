import { color } from "./color"

// Shadow for component
export const shadow = {
  default: {
    shadowColor: color.common.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  top: {
    shadowColor: color.common.black,
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
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
