import { makeAutoObservable, runInAction } from "mobx";
import { IBeer } from "../types/index";

class beerList {
    beerList: IBeer[] = [];
    isPending: boolean = true;
    query: string = "";
    select: string = "-";
    currentPage = 1;
    constructor() {
        makeAutoObservable(this);
    }
    fetch = async () => {
        const response = await fetch("https://api.punkapi.com/v2/beers");
        const beers = await response.json();
        runInAction(() => {
            this.beerList = beers;
            this.isPending = false;
        });
    };
    setQuery(value: string) {
        this.query = value;
    }
    setSelect(value: string) {
        this.select = value;
    }

    get queriedList() {
        if (!this.query) return this.beerList;
        return this.beerList.filter((beer) =>
            beer.name.toLowerCase().includes(this.query.toLowerCase())
        );
    }

    get pagesCount() {
        if (this.select === "-" || this.query) return 1;
        const num = parseInt(this.select);
        return Math.ceil(this.queriedList.length / num);
    }

    getPagesArray() {
        let result = [];
        for (let i = 0; i < this.pagesCount; i++) {
            result.push(i + 1);
        }
        return result;
    }

    setCurPage(value: number) {
        this.currentPage = value;
    }
    get PaginatedList() {
        if (this.select !== "-") {
            const result = [];
            for (
                let i = (this.currentPage - 1) * parseInt(this.select);
                i < this.currentPage * parseInt(this.select);
                i++
            ) {
                if (i < this.beerList.length) result.push(this.beerList[i]);
            }
            return result;
        }
        return this.beerList;
    }

    // fetchPaginatedList = async () => {
    //     const response =
    //         this.select !== "-"
    //             ? await fetch(
    //                   `https://api.punkapi.com/v2/beers?page=${this.currentPage}&per_page=${this.select}`
    //               )
    //             : await fetch("https://api.punkapi.com/v2/beers");
    //     const beers: IBeer[] = await response.json();
    //     runInAction(() => {
    //         this.beerList = beers
    //     });
    // };

    get queriedPaginatedList() {
        if (!this.query) return this.PaginatedList;
        return this.beerList.filter((beer) =>
            beer.name.toLowerCase().includes(this.query.toLowerCase())
        );
    }
}

export default new beerList();
