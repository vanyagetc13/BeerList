import React from "react";
import { useNavigate } from "react-router-dom";
import { IBeer } from "./../types/index";

interface BeerCardProps {
    beer: IBeer;
}

const BeerCard = ({ beer }: BeerCardProps) => {
    const navigate = useNavigate()

    const getProperDescription = (str: string):string => {
        if(str.length > 140){
            str = str.slice(0, 140)
            str = str.slice(0, str.lastIndexOf(" "))
            while(str.match(/[\s | ! | . | ? | ,]{1}$/)){
                str = str.slice(0, str.length - 1)
            }
            str += "..."
        }
        return str
    }

    const description = getProperDescription(beer.description);
    return (
        <div className="card">
            <img
                className="pic"
                src={beer.image_url}
                alt={`${beer.name} pic hasn't loaded`}
            />
            <div className="card__content">
                <div>
                    <h3 className="name">{beer.name}</h3>
                    <p className="descr">{description}</p>
                </div>
                <div>
                    <button onClick={()=>navigate(`/beers/${beer.id}`)} className="button">Подробнее...</button>
                </div>
            </div>
        </div>
    );
};

export default BeerCard;
