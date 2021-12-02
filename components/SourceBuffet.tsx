import { LinearGradient } from "expo-linear-gradient";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useRef } from "react";
import { StyleSheet, FlatList } from "react-native";
import { Animated } from "react-native";
import {
    CoinFeedStoreContext,
    VerticalScrollDirection,
} from "../modules/CoinFeedStore";
import Theme from "../modules/theme";
import SourcePebble from "./SourcePebble";
import SourceLoader from "./loaders/SourceLoader";

export interface Source {
    name: string;
    feedUrl: string;
    website: string;
    colorOne: string;
    colorTwo: string;
    isActive?: boolean;
    _id: string;
}

const SourceBuffet = observer(() => {
    const coinFeedStore = useContext(CoinFeedStoreContext);
    const sourceBufferPos = useRef(new Animated.Value(0)).current;

    const slideUp = () => {
        Animated.timing(sourceBufferPos, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const slideDown = () => {
        Animated.timing(sourceBufferPos, {
            toValue: 162,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        if (coinFeedStore.articleScrollDirection === VerticalScrollDirection.UP)
            slideDown();
        else slideUp();
    }, [coinFeedStore.articleScrollDirection]);

    return (
        <Animated.View
            style={StyleSheet.flatten([
                styles.container,
                { transform: [{ translateY: sourceBufferPos }] },
            ])}
        >
            <LinearGradient
                style={styles.gradient}
                colors={["transparent", Theme.color.dark]}
            ></LinearGradient>
            <FlatList
                horizontal
                data={coinFeedStore.activeSources}
                renderItem={(prop) => <SourcePebble {...prop}></SourcePebble>}
                keyExtractor={({ _id }) => _id}
                style={styles.buffet}
                contentContainerStyle={styles.bufferContainer}
                ListEmp