import { formatDistanceToNow } from "date-fns";
import {
    compose,
    join,
    append,
    split,
    toLower,
    concat,
    __,
    map,
    assoc,
    lensProp,
    view,
} from "ramda";
import { Source } from "../components/SourceBuffet";
import { CoinFeedStore } from "./CoinFeedStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    ARTICLES_API,
    LOCAL_STORAGE_KEY,
    SERVER_URL,
    SOURCES_API,
    SOURCE_IMAGE_DIR,
} from "./constants";

export interface CFLocalData {
    sources: Source[];
}

// @ts-ignore
export const toSourceImageUrl: (name: string) => string = compose(
    join("/"),
    // @ts-ignore
    append(__, [SERVER_URL, SOURCE_IMAGE_DIR]),
    concat(__, ".png"),
    join("-"),
    split(" "),
    toLower
);

export const SOURCES_URL = concat(SERVER_URL, SOURCES_API);
export const ARTICLES_URL = concat(SERVER_URL, ARTICLES_API);

export const toRelativeTime = (pubDate: string) =>
    formatDistanceToNow(new Date(pubDate), {
        includeSeconds: true,
        addSuffix: true,
    });

export const fetchSources = async (coinFeedStore: CoinFeedStore) => {
  