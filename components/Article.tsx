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
    const handlePress = async () => {
        try {
            await Share.share({
                title: "Expo Title",
                url: link,
                message: `Check out this article I discovered using CoinFeed: ${link}`,
            });
        } catch (error) {
            console.error(`Error while sharing from the app: ${error}`);
        }
    };
    return (
        <Pressable onPress={handlePress} hitSlop={20}>
            <CFText type={CFTypography.H3}>share</CFText>
        </Pressable>
    );
};

const Article = observer(
    ({ item }: { item: CFArticle }) => {
        const { title, link, pubDate } = item;
        const handlePress = () => WebBrowser.openBrowserAsync(link);

        return (
            <Pressable onPress={handlePress} style={styles.container}>
                <CFText>{title}</CFText>
                <View>
                    <View style={styles.shareRow}>
                        <CFText type={CFTypography.H3}>
                            {toRelativeTime(pubDate)}
                        </CFText>
                        <CFShare link={link}></CFShare>
                    </View>
                </View>
            </Pressable>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        paddingTop: Theme.spacing.medium,
        minWidth: "100%",
        minHeight: 125,
        justifyContent: "space-between",
    },
    shareRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: Theme.spacing.medium,
        marginBottom: Theme.spacing.medium,
    },
});

export default Article;
