import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      // main: '#19857b',
      main: `#eeeeee`
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f7f8fa',
      paper:'#fafafa',
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: `'Montserrat', sans-serif`,
  },
  mixins: {
    toolbar: {
      minHeight: '10rem'
    }
  }
});

export default theme;