
import { observer } from "mobx-react-lite";
import { always, compose, gt, ifElse, lensProp, over, set } from "ramda";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FlatList, NativeScrollPoint, StyleSheet } from "react-native";
import {
    CoinFeedStoreContext,
    VerticalScrollDirection,
} from "../modules/CoinFeedStore";
import Theme from "../modules/theme";
import { ARTICLES_URL, fetchSources, peek } from "../modules/utils";
import Article, { CFArticle } from "./Article";
import Divider, { DividerType } from "./Divider";
import ArticleLoader from "./loaders/ArticleLoader";

const SourceArticles = observer(() => {
    const coinFeedStore = useContext(CoinFeedStoreContext);
    const contentOffset = useRef<NativeScrollPoint>({ x: 0, y: 0 });
    let shouldUpdateScrollDir = useRef(false).current;
    const { activeArticles, activeSource } = coinFeedStore;
    const sourceId = activeSource?._id;
    const [refreshing, setRefreshing] = useState(false);

    const fetchArticles = async () => {
        try {
            if (!activeSource)
                throw new Error("No active source to fetch articles for.");