export const theme = {
    colors: {
      white: '#fff',
      black: '#000',
      grayBG: '#e5e5e5',
      sageGreen: '#6F8A74', // color theme: Sage Green
      softBeige: '#D3C5A7', // color theme: Soft Beige
      lightGreen: '#A8D5BA', // light green for better contrast
      // neutral
      neutral: (opacity) => `rgba(144, 163, 149, ${opacity})`, // sageGreen for neutral theme with opacity
    },
    fontWeights: {
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    radius: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
    },
  };
  