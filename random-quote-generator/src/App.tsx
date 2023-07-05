import React, { useEffect, useState } from 'react';
import classnames from "classnames"
import { ReactComponent as Button } from "../src/assets/icons/button.svg"
import { ReactComponent as Quotation } from "../src/assets/icons/quotation.svg"
import { ReactComponent as Twitter } from "../src/assets/icons/twitter.svg"
import { ReactComponent as Whatsapp } from "../src/assets/icons/whatsapp.svg"
import "./App.css"
import axios from 'axios';

interface Quotation {
  quote: string;
  author: string;
}

function App() {
  const [quoteList, setQuoteList] = useState<Quotation[]>([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    useQuoteFetcher();
  }, [])

  const shuffle = (array: Quotation[]) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  const useQuoteFetcher = () => {
    axios.get('http://localhost:4000/quotes')
      .then((response) => {
        const allQuotes = response.data;
        shuffle(allQuotes);
        setQuoteList(allQuotes);
        console.log(allQuotes);
      })
      .catch(error => console.error());
  }

  const increment = () => {
    const newIndex = index + 1;
    if (newIndex > quoteList.length - 1) {
      setQuoteList([]);
      useQuoteFetcher();
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

  return (
    <>
      <header>
        <div className="top-strip" />
      </header>
      <div className="container">
        <div className="quotation-box ">
          <Quotation />
          <div className="quote">
            {quoteList[index] ? <><p>{quoteList[index].quote}</p> <span>- {quoteList[index].author}</span></> : <p> Loading… </p>}
          </div>
          <div className="bottom-navigation">
            <div>
              <Button className={classnames("rotate cp")} onClick={decrement} />
              <Button className="cp" onClick={increment} />
            </div>
            <div className="share">
              <span>Share At:</span>
              <Twitter title="Post this quote on twitter!" className="cp" />
              <Whatsapp title="Post this quote on WhatsApp!" className="cp" />
            </div>
          </div>
        </div>
      </div >
      <div className="bottom-strip" />
    </>
  )
}

export default App
