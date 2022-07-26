import { makeAutoObservable, runInAction } from "mobx";
import { IBeer } from "../types/index";

class beerList {
    beer: IBeer = {id: 0, name: "", description: "", abv: 0, image_url: "", tagline: "", food_pairing: []};
    constructor() {
        makeAutoObservable(this);
    }

    fetchById = async (id: number | string) => {
        // id >= 1
        const response = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
        const beer = await response.json();

        runInAction(()=>{
            this.beer = beer[0]
        })
    }
}

export default new beerList();
