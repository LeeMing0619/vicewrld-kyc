import convert from 'color-convert'

export const hexToRgb = h => {
  let r = 0,
    g = 0,
    b = 0
  if (h.length == 4) {
    r = '0x' + h[1] + h[1]
    g = '0x' + h[2] + h[2]
    b = '0x' + h[3] + h[3]
  } else if (h.length == 7) {
    r = '0x' + h[1] + h[2]
    g = '0x' + h[3] + h[4]
    b = '0x' + h[5] + h[6]
  }

  return `${r}, ${g}, ${b})}`
}

export const decimalToHex = decimal => decimal.toString(16)

export const hexToDecimal = hex => parseInt(hex, 16)

export const lightenDarkenColor = (color, amount) => {
  let usePound = false
  if (color[0] == '#') {
    color = color.slice(1)
    usePound = true
  }

  let num = parseInt(color, 16)

  let r = (num >> 16) + amount

  if (r > 255) r = 255
  else if (r < 0) r = 0

  let b = ((num >> 8) & 0x00ff) + amount

  if (b > 255) b = 255
  else if (b < 0) b = 0

  let g = (num & 0x0000ff) + amount

  if (g > 255) g = 255
  else if (g < 0) g = 0

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
}

export const changeHue = (rgb, degree) => {
  var hsl = rgbToHSL(rgb)
  hsl.h += degree
  if (hsl.h > 360) {
    hsl.h -= 360
  } else if (hsl.h < 0) {
    hsl.h += 360
  }
  return hslToRGB(hsl)
}

export const rgbToHSL = rgb => {
  rgb = rgb.replace(/^\s*#|\s*$/g, '')

  if (rgb.length == 3) {
    rgb = rgb.replace(/(.)/g, '$1$1')
  }

  let r = parseInt(rgb.substr(0, 2), 16) / 255,
    g = parseInt(rgb.substr(2, 2), 16) / 255,
    b = parseInt(rgb.substr(4, 2), 16) / 255,
    cMax = Math.max(r, g, b),
    cMin = Math.min(r, g, b),
    delta = cMax - cMin,
    l = (cMax + cMin) / 2,
    h = 0,
    s = 0

  if (delta == 0) {
    h = 0
  } else if (cMax == r) {
    h = 60 * (((g - b) / delta) % 6)
  } else if (cMax == g) {
    h = 60 * ((b - r) / delta + 2)
  } else {
    h = 60 * ((r - g) / delta + 4)
  }

  if (delta == 0) {
    s = 0
  } else {
    s = delta / (1 - Math.abs(2 * l - 1))
  }

  return {
    h: h,
    s: s,
    l: l
  }
}

// expects an object and returns a string
export const hslToRGB = hsl => {
  let h = hsl.h,
    s = hsl.s,
    l = hsl.l,
    c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r,
    g,
    b

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

  r = normalize_rgb_value(r, m)
  g = normalize_rgb_value(g, m)
  b = normalize_rgb_value(b, m)

  return rgbToHex(r, g, b)
}

export const normalize_rgb_value = (color, m) => {
  color = Math.floor((color + m) * 255)
  if (color < 0) {
    color = 0
  }
  return color
}

export const rgbToHex = (r, g, b) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

export const createGradientColors = mainColor => {
  const rgb = convert.hex.rgb(mainColor.split('#')[1]).join(' ')
  const secondaryColor = changeHue(mainColor, -40)
  return [mainColor, secondaryColor]
}

// module.exports = {
//   hexToRgb,
//   decimalToHex,
//   hexToDecimal,
//   lightenDarkenColor,
//   changeHue,
//   createGradientColors
// }
