import { css } from 'react-emotion'

export const BREAKPOINTS = {
  small: 600,
  medium: 960,
  large: 1280,
  xLarge: 1920
}

export const mq = Object.keys(BREAKPOINTS).reduce(
  (accumulator, label) => {
    let prefix = typeof BREAKPOINTS[label] === 'string' ? '' : 'min-width:'
    let suffix = typeof BREAKPOINTS[label] === 'string' ? '' : 'px'
    accumulator[label] = cls =>
      css`
        @media (${prefix + BREAKPOINTS[label] + suffix}) {
          ${cls};
        }
      `
    return accumulator
  },
  {}
)

export const VARIABLES = {
  sidenavWidth: 250,
  appBarHeight: 50,
  toolbarHeight: 48,
  secondaryLight: '#ffffff',
  secondaryMain: '#a8a8a8',
  secondaryDark: '#d9d9d9',
  secondaryText: '#595959',
  secondaryBackground: '#f2f2f2',
  secondaryLightDark: '#cecece'
}
