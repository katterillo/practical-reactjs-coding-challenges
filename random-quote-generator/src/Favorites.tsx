import React, { useEffect, useState } from 'react';
import { Quotes } from './utils';

export default function Favorites(props: { favorites: string[], quoteList: Quotes[] }) {

    return (
        <>
            {/* TODO: optimize */}
            <h3>Favorite Quotes</h3>
            {props.favorites.map((favorite, i) =>
                props.quoteList.filter((quote, i) => (favorite === quote.quote))
                    .map(favoriteQuotes => (
                        <p key={favoriteQuotes.quote}> {favoriteQuotes.quote} -{favoriteQuotes.author}</p>
                    ))
            )}
        </>
    )

}