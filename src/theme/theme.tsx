import { Theme } from '@react-navigation/native';
import { useTheme as useReactNavigationTheme } from '@react-navigation/native';
import { Colors } from '../theme/colors';

export type CustomTheme = Theme & {
    colors: Record<
      | 'focus'
      | 'success'
      | 'warning'
      | 'error'
      | 'link'
      | 'info'
      | 'buttonBackground'
      | 'buttonText'
      | 'headingText'
      | 'gradientStart'
      | 'gradientEnd'
      | 'textSecondary'
      | 'placeholder'
      | 'textPrimary',
      string
    >;
  };
  
  export type ColorNames = keyof Theme['colors'];
  
  export const lightTheme: CustomTheme = {
    dark: false,
    colors: {
      primary: Colors.pink,
      success: Colors.pink,
      background: Colors.white,
      buttonBackground: Colors.red,
      buttonText: Colors.white,
      headingText: Colors.red,
      gradientStart: Colors.white,
      gradientEnd: Colors.lightRed,
      placeholder: Colors.darkGrey,
      card: Colors.lightGrey,
      text: Colors.lightBlack,
      textSecondary: Colors.midBlack,
      border: Colors.navyBlue,
      notification: Colors.pink,
      focus: Colors.blue,
      warning: Colors.red,
      error: Colors.red,
      link: Colors.blue,
      info: Colors.red,
      textPrimary: Colors.orange,
    },
  };
  
  export const darkTheme: CustomTheme = {
    dark: true,
    colors: {
      primary: Colors.pink,
      success: Colors.pink,
      background: Colors.white,
      buttonBackground: Colors.white,
      buttonText: Colors.white,
      headingText: Colors.white,
      gradientStart: Colors.white,
      gradientEnd: Colors.white,
      placeholder: Colors.lightGrey,
      card: Colors.lightGrey,
      text: Colors.darkGrey,
      textSecondary: Colors.midBlack,
      border: Colors.midGrey,
      notification: Colors.pink,
      focus: Colors.blue,
      warning: Colors.red,
      error: Colors.red,
      link: Colors.red,
      info: Colors.red,
      textPrimary: Colors.orange,
    },
  };
  
  export const useTheme = useReactNavigationTheme as () => CustomTheme;
  