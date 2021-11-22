import convert from 'color-convert'

const getRgbaVal = (hexVal, alpha = 0.1) =>
  `rgba(${convert.hex.rgb(hexVal.split('#')[1]).map((part) => `${part}`)}, ${alpha})`

export default getRgbaVal
