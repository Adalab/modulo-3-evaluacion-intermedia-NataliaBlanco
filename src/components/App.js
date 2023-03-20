import '../styles/App.scss';
/* import quotes from '../data/quotes.json'; */
import { useEffect, useState } from 'react';

const App = () => {
  const [sentences, setSentences] = useState([]);
  const [searchQ, setSearchQ] = useState('');
  const [searchP, setSearchP] = useState('Todos');
  const [addNew, setAddNew] = useState({
    quote: '',
    character: '',
  });

  useEffect(() => {
    fetch(
      'https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json'
    )
      .then((response) => response.json())
      .then((data) => {
        setSentences(data);
      });
  }, []);

  const renderFilteredQuotes = () => {
    return sentences
      .filter((sentence) => {
        return sentence.quote
          .toLocaleLowerCase()
          .includes(searchQ.toLocaleLowerCase());
      })
      .filter((sentence) => {
        if (searchP === 'Todos') {
          return true;
        } else {
          return sentence.character === searchP;
        }
      })
      .map((sentence, idx) => {
        return (
          <li className="quote_list" key={idx}>
            <p className="quote_quote">
              <label className="quote_label"></label>
              {sentence.quote}
            </p>
            <span className="quote__person">--{sentence.character}</span>
          </li>
        );
      });
  };

  const handleInput = (ev) => {
    ev.preventDefault();
    setSearchQ(ev.target.value);
  };

  const handleSelect = (ev) => {
    setSearchP(ev.target.value);
  };

  const handleNewChar = (ev) => {
    const idTarget = ev.target.id;
    setAddNew({ ...addNew, [idTarget]: ev.target.value });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    setSentences([...sentences, addNew]);
    setAddNew({
      quote: '',
      character: '',
    });
  };

  // Retornamos todo el código HTML que queremos que React pinte en la página.
  return (
    <div className="page">
      <header className="header">
        <h1 className="header__title">Frases de Friends</h1>
        <form>
          <label>Filtrar por Frase</label>
          <input
            className="header__search"
            autoComplete="off"
            type="search"
            name="search"
            placeholder="Filtrar por quotes"
            onChange={handleInput}
            value={searchQ}
          />
          <label>Filtrar por Personaje</label>
          <select name="select" onChange={handleSelect} value={searchP}>
            <option value="Todos">Todos</option>
            <option value="Ross">Ross</option>
            <option value="Monica">Monica</option>
            <option value="Joey">Joey</option>
            <option value="Phoebe">Phoebe</option>
            <option value="Chandler">Chandler</option>
            <option value="Rachel">Rachel</option>
          </select>
        </form>
      </header>
      <main>
        <ul className="quotes">{renderFilteredQuotes()}</ul>
        <footer className="footer">
          <form>
            <label>Añade otra frase</label>
            <input
              className="footer__search"
              type="text"
              id="search_quote"
              name="search_quote"
              placeholder="Añadir otra frase"
              onChange={handleNewChar}
              value={addNew.quote}
            ></input>
            <label>Añade otro personaje</label>
            <input
              className="footer__search"
              type="text"
              id="search_character"
              name="search_character"
              placeholder="Añadir otro personaje"
              onChange={handleNewChar}
              value={addNew.character}
            ></input>
            <input
              className="Add-in__btn"
              type="submit"
              value="Añadir"
              name="button_add"
              id="button_add"
              onClick={handleClick}
            ></input>
          </form>
        </footer>
      </main>
    </div>
  );
};

export default App;
