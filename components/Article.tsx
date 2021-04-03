import { observer } from "mobx-react-lite";
import { Pressable, StyleSheet, View, Share } from "react-native";
import CFText, { CFTypography } from "./CFText";
import * as WebBrowser from "expo-web-browser";
import Theme from "../modules/theme";
import { useContext } from "react";
import { CoinFeedStoreContext } from "../modules/CoinFeedStore";
import { toRelativeTime } from "../modules/utils";

export interface CFArticle {
    title: string;
    link: string;
    image?: string;
    description?: string;
    pubDate: string;
    category?: string | string[];
}

const CFShare = ({ link }: { link: string }) => {
    const handlePress = asy