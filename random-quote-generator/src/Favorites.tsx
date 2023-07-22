import React, { useEffect, useState } from 'react';
import { Quotes } from './utils';

export default function Favorites(props: { favorites: string[], quoteList: Quotes[] }) {

    const quoteMap: { [key: string]: string } = {}; // Create an object to store the quotes as key-value pairs
    props.quoteList.forEach(quote => {
        quoteMap[quote.quote] = quote.author;
    });

    /* Demonstates how to create hashmap with string: string 
   quoteMap = {
        "To be or not to be": "William Shakespeare",
        "Stay hungry, stay foolish": "Steve Jobs",
        // Additional quotes...
    };
    */

    // Now favoriteQuoteElements can be used in this component's render return statement.
    const favoriteQuoteElements = props.favorites.map(favorite => (
        quoteMap[favorite] && <p key={favorite}> {favorite} - {quoteMap[favorite]}</p>
    ));

    console.log("quoteMap: ", quoteMap);
    return (
        <>
            <h3>Favorite Quotes</h3>
            <div className="favorite-quotations-box">
                {favoriteQuoteElements}
            </div>
        </>
    )

}