import { globalCss } from '.';

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
  },

  body: {
    '--webkit-font-smoothing': 'antialiased',
    color: '$gray100',
    backgroundColor: '$gray900',
  },

  'body, input, button': {
    fontFamily: 'var(--roboto)',
    fontWeight: 400,
  },
});
