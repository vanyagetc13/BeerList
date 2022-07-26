import React, { ChangeEvent } from "react";
import beer from "../store/beer";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import BeerCard from "./BeerCard";

const BeerList = observer(() => {
    useEffect(() => {
        setTimeout(() => {
            beer.fetch();
            // beer.fetchPaginatedList();
        }, 1000);
    }, []);

    const selectHandler = (e:ChangeEvent<HTMLSelectElement>) => {
        beer.setSelect(e.target.value)
    }
    return (
        <>
            {beer.isPending ? (
                // Loader
                <div className="loader">Loading...</div>
            ) : (
                // Header and List Paginated and queried
                <div className="page_beer">
                    {/* Header with Pagination limit select and query input */}
                    <div className="beer__header">
                        <select onChange={selectHandler} defaultValue="-">
                            <option value="-">-</option>
                            <option value="4">4</option>
                            <option value="8">8</option>
                            <option value="16">16</option>
                        </select>
                        <input
                            className="input queue"
                            type="text"
                            value={beer.query}
                            onChange={(e) => {
                                beer.setQuery(e.target.value);
                            }}
                            placeholder="Поиск..."
                        />
                    </div>
                    {/* List */}
                    <div className="list">
                        {beer.queriedPaginatedList.map((beer) => (
                            <BeerCard beer={beer} key={beer.id} />
                        ))}
                    </div>
                    <div className="pagination">
                        {beer.getPagesArray().map(e=>(
                            <button className={e === beer.currentPage ? "active_page" : ""} disabled={beer.currentPage===e} onClick={()=>{beer.setCurPage(e)}} key={e}>{e}</button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
});

export default BeerList;
