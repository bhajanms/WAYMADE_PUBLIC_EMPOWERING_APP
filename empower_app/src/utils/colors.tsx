export type ColorTheme = {
  primary: string;
  secondary: string;
  accent: string;
  textSecondary: string;
  textPrimary: string;
};

const sharedColors = {
  black: '#000000',
  white: '#FFFFFF',
};

type SharedColors = typeof sharedColors;

export type TColors = ColorTheme & SharedColors;

// type ColorPalettes = {
//   light: TColors;
//   dark: TColors;
// };

const Colors: TColors = {
  primary: '#673AB7',
  secondary: '#FBFAF4',
  accent: '#FF6633',
  textPrimary: sharedColors.black,
  textSecondary: sharedColors.white,
  ...sharedColors,
  // dark: {
  //   primary: '#ffdf00',
  //   secondary: '#161629',
  //   textPrimary: sharedColors.black,
  //   textSecondary: '#67686E',
  //   ...sharedColors,
  // },
  // light: {
  //   primary: '#ffdf00',
  //   secondary: '#E4E4E4',
  //   textPrimary: '#161629',
  //   textSecondary: '#9D5DB0',
  //   ...sharedColors,
  // },
};

export default Colors;
