
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

    get isSourceActive(): (_: Source) => boolean {
        return isSourceActive;
    }

    updateSources(sources: Source[], shouldUpdateLocal: boolean = true) {
        const oldSources = this.sources;
        this.sources = compose(
            concat(this.sources),
            differenceWith(keyComparator<Source, "_id">("_id"), sources)
        )(this.sources);

        // Delete the sources not present in the new sources array.
        const idsToDelete: string[] = compose(map((source: Source) => source._id), differenceWith(keyComparator<Source, "_id">("_id"), this.sources))(sources)
        this.sources = filter(({ _id }: Source) => !idsToDelete.includes(_id) )(this.sources)

        if (shouldUpdateLocal) this.postSourceUpdate(oldSources);
        else this.updateActiveSource();
    }

    replaceSources = (sources: Source[]) => {
        const oldSources = this.sources;
        this.sources = sources;

        this.postSourceUpdate(oldSources);
    };

    updateActiveSource(source?: Source) {
        this.activeSource = source
            ? source
            : this.activeSource
            ? isSourceActive(this.activeSource)
                ? this.activeSource
                : this.activeSources[0]
            : this.activeSources[0];
    }

    updateArticleStore(sourceId: string, articles: ReadonlyArray<CFArticle>) {
        const sourceArticles = this.articleStore[sourceId] || [];

        this.articleStore[sourceId] = compose(
            concat(__, sourceArticles),
            differenceWith(keyComparator<CFArticle, "link">("link"), articles)
        )(sourceArticles);
    }

    updateArticleScrollDirection(direction: VerticalScrollDirection) {
        this.articleScrollDirection = direction;
    }

    toggleSourceActivation(source: Source) {
        source.isActive = not(isSourceActive(source));
        this.postSourceUpdate();
    }

    postSourceUpdate(oldSources?: Source[]) {
        if (
            !oldSources ||
            JSON.stringify(oldSources) !== JSON.stringify(this.sources)
        ) {
            this.updateActiveSource();
            updateLocalStorage(this);
        }
    }