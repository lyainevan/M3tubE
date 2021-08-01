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
    <Text {...props} style={StyleShe