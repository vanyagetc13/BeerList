import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import beerPage from "../store/beerPage";
import { observer } from "mobx-react-lite";

const BeerPage = observer(() => {
    const [isPending, setPending] = useState(true);
    const id = useParams().id;
    useEffect(() => {
        if (id) {
            setTimeout(() => {
                beerPage.fetchById(id);
                setPending(false);
            }, 1000);
        }
    }, []);
    return (
        <div className="page">
            <div><Link to={"/"}>На главную</Link></div>
            {isPending ? (
                <div className="loader">Loading...</div>
            ) : (
                <div className="beer">
                    <img
                        className="pic"
                        src={beerPage.beer.image_url}
                        alt={`${beerPage.beer.name} pic failed to load`}
                    />
                    <div className="beer__content">
                        <h2 className="name">
                            {beerPage.beer.name}{" "}
                            <span>ABV: {beerPage.beer.abv}%</span>
                        </h2>
                        <h3 className="tagline">{beerPage.beer.tagline}</h3>
                        <p className="description">
                            {beerPage.beer.description}
                        </p>
                        <hr className="hr" />
                        <div className="food_pairing">
                            <h4>We recommend these foods with the beer:</h4>
                            <ul>
                                {beerPage.beer.food_pairing.map((pair) => (
                                    <li
                                        key={`${pair}${new Date()}${Math.random()}`}
                                    >
                                        {pair}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});

export default BeerPage;
