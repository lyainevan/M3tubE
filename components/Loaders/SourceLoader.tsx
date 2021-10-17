import React from "react";
import ContentLoader, { Circle } from "react-content-loader/native";
import { ViewProps } from "react-native";

const SourceLoader = (props: ViewProps) => (
    <ContentLoader
        speed={2}
        width={400}
        height={112}
        viewBox="0 0 400 112"
        backgroundColo