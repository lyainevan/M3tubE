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
    try {
        const response = await fetch(SOURCES_URL);
        const sources = await response.json();
        normalizeAndUpdateSources(sources, coinFeedStore);
    } catch (error) {
        console.error(`Error occured while fetching sources: ${error}`);
    }
};

export const fetchSourcesFromLocalStorage = async (
    coinFeedStore: CoinFeedStore
) => {
    try {
        const localData = await AsyncStorage.getItem(LOCAL_STORAGE_KEY);
        const sources = localData
            ? compose(view(lensProp("sources")), JSON.parse)(localData)
            : [];
            console.log(`Sources fetched from local storage: ${localData}`)
        coinFeedStore.updateSources(sources, false);
    } catch (error) {
        console.error(
            `Error occured while fetching sources from the local storage: ${error}`
        );
    }
};

export const updateLocalStorage = async (coinFeedStore: CoinFeedStore) => {
    try {
        const coinFeedLocalData = compose(
            JSON.stringify,
            assoc("sources", __, {}),
            view(lensProp<CoinFeedStore>("sources"))
        )(coinFeedStore);
        await AsyncStorage.setItem(LOCAL_STORAGE_KEY, coinFeedLocalData);
        console.log(`Local storage updated: ${coinFeedLocalData}`);
    } catch (error) {
        console.error(`Error while updating the local storage data: ${error}`);
    }
};

const normalizeAndUpdateSources = (
    sources: Source[],
    coinFeedStore: CoinFeedStore
) => {
    if (!sources.length) return;
    compose(
        coinFeedStore.updateSources.bind(coinFeedStore),
        map<Source, Source>(assoc("isActive", true))
    )(sources);
};

/**
 * A curried function that returns a comparator for objects of type T.
 * @param key a valid key in type T
 * @returns a comparator function that compares the key K
 */
export function keyComparator<T, K extends keyof T>(key: K) {
    return (x: T, y: T) => x[key] === y[key];
}

export const peek = <T>(x: T): T => {
    console.log(`Peeking at value: ${x}`);
    return x;
};
