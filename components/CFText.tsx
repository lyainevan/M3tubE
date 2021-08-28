import { prop } from "ramda";
import { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from "react-native";
import Theme from "../modules/theme";

export enum CFTypography {
    BASE = "base",
    H1 = "h1",
    H3 = "h3",
    H4 = "h4",
}

const CFText = ({
    type,
    children,
    ...props
}: {
    type?: CFTypography;
    children?: ReactNode;
} & TextProps) => (
    <Text {...props} style={StyleSheet.flatten([textStyles[type || CFTypography.BASE], props.style])}>
        {children}
    </Text>
);

const styles: { [key: string]: StyleProp<TextStyle> } = StyleSheet.create({
    base: {
        color: Theme.color.base,
        fontFamily: "sans-serif",
        fontSize: 16,
        lineHeight: 24
    },
    h1: {
        textTransform: "uppercase",
        fontSize: 30,
        lineHeight: 35,
        fontWeight: "bold",
    },
    h3: {
        fontSize: 10,
        lineHeight: 10,
        color: Theme.color.gray,
    },
    h4: {
        fontSize: 12,
        lineHeight: 12,
        textTransform: "none",
    },
});

const { base } = styles;
const h1 = StyleSheet.compose(base, styles.h1);
const h3 = StyleSheet.compo