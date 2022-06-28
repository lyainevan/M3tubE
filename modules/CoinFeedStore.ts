
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

    articleScrollDirection: VerticalScrollDirection =
        VerticalScrollDirection.DOWN;

    constructor() {
        makeAutoObservable(this);
    }

    get areSourcesLoaded(): boolean {
        return this.sources && this.sources.length > 0;
    }

    get sourcesCount(): number {
        return this.sources.length;
    }

    get activeSources(): Source[] {
        return this.sources.filter((source) => source.isActive);
    }

    get activeArticles(): Array<CFArticle> {
        return (
            (this.activeSource && this.articleStore[this.activeSource._id]) ||
            []
        );
    }

    get articleCountForActiveSource(): number {
        return (this.activeArticles && this.activeArticles.length) || 0;
    }