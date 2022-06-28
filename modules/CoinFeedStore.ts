
import { autorun, makeAutoObservable } from "mobx";
import {
    always,
    compose,
    concat,
    differenceWith,
    ifElse,
    lensProp,
    not,
    view,
    __,
    has,
    equals,
    filter,
    map,
} from "ramda";
import { createContext } from "react";
import { CFArticle } from "../components/Article";
import { Source } from "../components/SourceBuffet";
import { keyComparator, updateLocalStorage } from "./utils";

export interface ArticleStore {
    [_id: string]: Array<CFArticle>;
}

export enum VerticalScrollDirection {
    UP = "up",
    DOWN = "down",
}

export function isSourceActive(source: Source): boolean {
    return ifElse(
        has("isActive"),
        view(lensProp<Source>("isActive")) as (_: Source) => boolean,
        always(true)
    )(source);
}

export class CoinFeedStore {
    sources: Source[] = [];
    activeSource?: Source = undefined;
    articleStore: ArticleStore = {};