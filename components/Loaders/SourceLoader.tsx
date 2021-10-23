import React from "react";
import ContentLoader, { Circle } from "react-content-loader/native";
import { ViewProps } from "react-native";

const SourceLoader = (props: ViewProps) => (
    <ContentLoader
        speed={2}
        width={400}
        height={112}
        viewBox="0 0 400 112"
        backgroundColor="#292929"
        foregroundColor="#646464"
        {...props}
    >
        <Circle cx="32" cy="32" r="32" />
        <Circle cx="112" cy="32" r="32" />
        <Circle cx="192" cy="32" r="32" />
        <Circle cx="272" cy="32" r="32" />
        <Circle cx="352" cy="32" r="32" />
    </ContentLoader>
);

export default SourceLoader;
