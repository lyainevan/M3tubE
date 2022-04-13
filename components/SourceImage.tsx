
import { Source } from "./SourceBuffet";
import { Image, ImageProps } from "react-native";
import { toSourceImageUrl } from "../modules/utils";
import { StyleSheet } from "react-native";
import { always, ifElse } from "ramda";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { CoinFeedStoreContext } from "../modules/CoinFeedStore";

const SourceImage = observer(
    ({
        item,
        size,
        ...rest
    }: { item: Source; size?: number } & Partial<ImageProps>) => {
        const { isSourceActive } = useContext(CoinFeedStoreContext);
        return (
            <Image
                progressiveRenderingEnabled
                source={{
                    uri: toSourceImageUrl(item.name),
                    width: size || 64,
                    height: size || 64,