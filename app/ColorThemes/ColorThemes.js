import { useColorScheme } from 'react-native';
import colors from "../../app-example/constants/Colors";

export const useTheme = () => {
    const isDark = useColorScheme() === 'dark';
    const mainTheme = isDark ? colors.dark_colors : colors.light_colors;

    return { mainTheme, isDark };
};

