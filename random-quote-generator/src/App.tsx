import React, { useEffect, useState } from 'react';
import classnames from "classnames"
import { ReactComponent as Button } from "../src/assets/icons/button.svg"
import { ReactComponent as Quotation } from "../src/assets/icons/quotation.svg"
import { ReactComponent as Twitter } from "../src/assets/icons/twitter.svg"
import { ReactComponent as Whatsapp } from "../src/assets/icons/whatsapp.svg"
import { ReactComponent as EmptyHeart } from "../src/assets/icons/emptyHeart.svg"
import "./App.css"
import axios from 'axios';
import { Quotes, shuffle } from './utils';
import Favorites from './Favorites';

function App() {
  const [quoteList, setQuoteList] = useState<Quotes[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  const getAllQuotes = () => {
    axios.get('http://localhost:4000/quotes')
      .then((response) => {
        const allQuotes = response.data;
        shuffle(allQuotes);
        setQuoteList(allQuotes);
        console.log(allQuotes);
      })
      .catch(error => console.error());
  }

  useEffect(() => {
    getAllQuotes();
  }, [])

  const increment = () => {
    const newIndex = index + 1;
    if (newIndex > quoteList.length - 1) {
      setQuoteList([]);
      getAllQuotes();
      setIndex(0);
      console.log(0);
    }
    else {
      setIndex(newIndex);
      console.log(newIndex);
    }
  }

  const decrement = () => {
    const newIndex = index - 1;
    if (newIndex >= 0) {
      setIndex(newIndex);
      console.log(newIndex);
    }
    else {
      console.log(index);
    }
  }

  const favorite = () => {
    if (!favorites.includes(quoteList[index].quote)) {
      setFavorites([...favorites, quoteList[index].quote]);
      console.log("new fave: " + quoteList[index].quote);
      console.log("favorites: ", [...favorites, quoteList[index].quote]);
    }
  }

  return (
    <>
      <header>
        <div className="top-strip" />
      </header>
      <div className="container">
        <div className="quotation-box ">
          <Quotation />
          {quoteList[index] ?
            <>
              <div className="quote">
                <p>{quoteList[index].quote}</p> <span>- {quoteList[index].author}</span>
              </div>
              <div className="bottom-navigation">
                <div className="button-strip">
                  <Button className={classnames("rotate cp")} onClick={decrement} stroke={index > 0 ? "" : "gray"} />
                  <Button className="cp" onClick={increment} />
                  <EmptyHeart className="heart" onClick={favorite} />
                </div>
                <div className="share">
                  <span>Share At:</span>
                  <a href={'https://twitter.com/intent/tweet?text=' + encodeURIComponent(quoteList[index].quote + " -" + quoteList[index].author)}>
                    <Twitter title="Post this quote on twitter!" className="cp" />
                  </a>
                  <a href={'https://wa.me/?text=' + encodeURIComponent(quoteList[index].quote + " -" + quoteList[index].author)}>
                    <Whatsapp title="Post this quote on WhatsApp!" className="cp" />
                  </a>
                </div>
              </div>
              <div>
                <Favorites favorites={favorites} quoteList={quoteList} />
              </div>
            </>
            : <p> Loading… </p>}
        </div>
      </div >
      <div className="bottom-strip" />
    </>
  )
}

export default App
