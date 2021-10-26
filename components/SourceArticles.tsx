
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
            const { feedUrl, _id: sourceId } = activeSource;
            const response = await fetch(ARTICLES_URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    feedUrl,
                }),
            });
            const articles: ReadonlyArray<CFArticle> = await response.json();

            coinFeedStore.updateArticleStore(sourceId, articles);
            return articles;
        } catch (error) {
            console.error(
                `Error occcured while fetching articles for ${sourceId}: ${error}`
            );
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        if (sourceId) await fetchArticles();
        setRefreshing(false);
        await fetchSources(coinFeedStore);
    };

    useEffect(() => {
        if (sourceId && !coinFeedStore.articleCountForActiveSource) {
            fetchArticles();
        }
    });

    return (
        <FlatList
            data={activeArticles}
            renderItem={(prop) => <Article {...prop}></Article>}
            keyExtractor={({ link }) => link}
            contentContainerStyle={styles.articlesContainer}
            ItemSeparatorComponent={() => (
                <Divider type={DividerType.THIN}></Divider>
            )}
            ListEmptyComponent={() => (
                <ArticleLoader style={styles.articlesContainer}></ArticleLoader>
            )}
            initialNumToRender={5}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            showsVerticalScrollIndicator={true}
            onScroll={({
                nativeEvent: {
                    contentOffset: { x, y },
                },
            }) => {
                if (shouldUpdateScrollDir) {
                    compose(
                        coinFeedStore.updateArticleScrollDirection.bind(
                            coinFeedStore
                        ),
                        ifElse(
                            gt(y),
                            always(VerticalScrollDirection.UP),
                            always(VerticalScrollDirection.DOWN)
                        )
                    )(contentOffset.current.y);
                }
                contentOffset.current = { x, y };