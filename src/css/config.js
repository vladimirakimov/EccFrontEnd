import { createMuiTheme } from '@material-ui/core/styles'

export const lightTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      light: '#ff5641',
      main: '#db0f16',
      dark: '#a10000'
    },
    secondary: {
      light: '#ff5641',
      main: '#db0f16',
      dark: '#a10000'
    },
    default: {
      main: '#FFF',
      dark: '#EEEEEE',
      contrastText: '#000',
      background: '#f5f5f5',
      card: '#fff',
      border: '#e0e0e0'
    },
    error: {
      light: '#FFCDD2',
      main: '#F44336',
      dark: '#B71C1C',
      contrastText: '#000'
    }
  }
})

export const darkTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    type: 'dark',
    primary: {
      light: '#ff5641',
      main: '#db0f16',
      dark: '#a10000',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ff5641',
      main: '#db0f16',
      dark: '#a10000',
      contrastText: '#ffffff'
    },
    default: {
      main: '#212121',
      dark: '#EEEEEE',
      contrastText: '#ffffff',
      background: '#303030',
      card: '#434343',
      border: '#595959'
    },
    error: {
      light: '#FFCDD2',
      main: '#F44336',
      dark: '#B71C1C',
      contrastText: '#ffffff'
    }
  }
})
