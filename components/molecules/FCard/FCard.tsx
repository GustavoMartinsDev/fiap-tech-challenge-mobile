import { View } from "react-native";
import { Card, CardProps } from "react-native-paper";

type FCardVariant = "light" | "dark";

interface FCardProps {
  title?: string;
  children: React.ReactNode;
  variant?: FCardVariant;
  options?: CardProps;
}

const bgColor = {
  light: "var(--mui-palette-bgCard-light)",
  dark: "var(--mui-palette-bgCard-dark)",
};

const textColor = {
  light: "var(--mui-palette-bgCard-dark)",
  dark: "var(--mui-palette-bgCard-contrastText)",
};

export function FCard({title, children, variant, options}: FCardProps) {
    return (
        <View>
            <Card>
                {children}
            </Card>
        </View>
    )
}