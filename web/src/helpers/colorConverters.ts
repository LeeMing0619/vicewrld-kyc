// @ts-nocheck
import convert from 'color-convert'

export const changeHue = (rgb, degree) => {
  const hsl = rgbToHSL(rgb)
  hsl.h += degree
  if (hsl.h > 360) {
    hsl.h -= 360
  } else if (hsl.h < 0) {
    hsl.h += 360
  }
  return hslToRGB(hsl)
}

function rgbToHSL(rgb) {
  let rgbNew = rgb.replace(/^\s*#|\s*$/g, '')

  if (rgb.length === 3) {
    rgbNew = rgb.replace(/(.)/g, '$1$1')
  }

  const r = parseInt(rgbNew.substr(0, 2), 16) / 255
  const g = parseInt(rgbNew.substr(2, 2), 16) / 255
  const b = parseInt(rgbNew.substr(4, 2), 16) / 255
  const cMax = Math.max(r, g, b)
  const cMin = Math.min(r, g, b)
  const delta = cMax - cMin
  const l = (cMax + cMin) / 2
  let h = 0
  let s = 0

  if (delta === 0) {
    h = 0
  } else if (cMax === r) {
    h = 60 * (((g - b) / delta) % 6)
  } else if (cMax === g) {
    h = 60 * ((b - r) / delta + 2)
  } else {
    h = 60 * ((r - g) / delta + 4)
  }

  if (delta === 0) {
    s = 0
  } else {
    s = delta / (1 - Math.abs(2 * l - 1))
  }

  return {
    h,
    s,
    l,
  }
}

// expects an object and returns a string
function hslToRGB(hsl) {
  const h = hsl.h
  const s = hsl.s
  const l = hsl.l
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r
  let g
  let b

  if (h < 60) {
    r = c
    g = x
    b = 0
  } else if (h < 120) {
    r = x
    g = c
    b = 0
  } else if (h < 180) {
    r = 0
    g = c
    b = x
  } else if (h < 240) {
    r = 0
    g = x
    b = c
  } else if (h < 300) {
    r = x
    g = 0
    b = c
  } else {
    r = c
    g = 0
    b = x
  }

  r = normaliseRgbValue(r, m)
  g = normaliseRgbValue(g, m)
  b = normaliseRgbValue(b, m)

  return rgbToHex(r, g, b)
}

function normaliseRgbValue(color, m) {
  let updatedColor = Math.floor((color + m) * 255)
  if (color < 0) {
    updatedColor = 0
  }
  return updatedColor
}

function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}` // eslint-disable-line no-bitwise
}

// module.exports = {
//   hexToRgb,
//   decimalToHex,
//   hexToDecimal,
//   lightenDarkenColor,
//   changeHue,
//   createGradientColors,
// }
