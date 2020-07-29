import { createMuiTheme } from '@material-ui/core/styles';

const scanidaRegular = {
  fontFamily: 'Scandia',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 100,
  src: `
    local('Scandia'),
    local('Scandia-Regular'),
    url(${'https://cdn.scapic.com/fonts/scandia.woff'}) format('woff')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
};

const scanidaMedium = {
  fontFamily: 'Scandia Medium',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 100,
  src: `
    local('Scandia'),
    local('Scandia-Medium'),
    url(${'https://cdn.scapic.com/fonts/scandia_medium.woff'}) format('woff')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
};

const scanidaBold = {
  fontFamily: 'Scandia Bold',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 100,
  src: `
    local('Scandia'),
    local('Scandia-Bold'),
    url(${'https://cdn.scapic.com/fonts/scandia_bold.woff'}) format('woff')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
      dark: '#000000',
      light: '#5768F3'
    },
    white: '#FFFFFF',
    black: '#000000',
    secondary: {
      main: '#0f42b3',
      dark: '#105293',
      light: '#EFEEEE'
    },
    social: {
      facebook: '#3b5a97',
      gmail: '#d93025',
      twitter: '#1ba1f1',
      whatsapp: '#00e576',
      embed: '#F54547'
    },
    tabs: {
      theme: '#e761a5',
      objects: '#f54547',
      media: '#fea0de',
      text: '#b965d5',
      effects: '#45a1ff',
      uploads: '#484dda'
    },
    background: {
      default: '#FAFAFA'
    }
  },
  typography: {
    fontFamily: ['Scandia', 'sans-serif'],
    h1: {
      fontFamily: ['Scandia Bold', 'sans-serif']
    },
    h2: {
      fontFamily: ['Scandia Bold', 'sans-serif']
    },
    h3: {
      fontFamily: ['Scandia Bold', 'sans-serif']
    },
    h4: {
      fontFamily: ['Scandia Bold', 'sans-serif']
    },
    h5: {
      fontFamily: ['Scandia Bold', 'sans-serif']
    },
    h6: {
      fontFamily: ['Scandia Bold', 'sans-serif']
    },
    subtitle1: {
      fontFamily: ['Scandia', 'sans-serif'],
      fontWeight: 500
    },
    button: {
      fontFamily: ['Scandia Medium', 'sans-serif']
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [scanidaBold, scanidaRegular, scanidaMedium]
      }
    }
  }
});

export default theme;
