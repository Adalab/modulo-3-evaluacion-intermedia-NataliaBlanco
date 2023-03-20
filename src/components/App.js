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
          <label className="header__label">Filtrar por Frase</label>
          <input
            className="header__search"
            autoComplete="off"
            type="search"
            name="search"
            placeholder="Filtrar por quotes"
            onChange={handleInput}
            value={searchQ}
          />
          <label className="header__label">Filtrar por Personaje</label>
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
          <h2 className="footer_title">Añadir una nueva frase</h2>
          <form className="footer_form">
            <label className="footer_form_label">Frase</label>
            <input
              className="footer_form_search"
              type="text"
              id="quote"
              name="quote"
              placeholder="Añadir otra frase"
              onChange={handleNewChar}
              value={addNew.quote}
            ></input>
            <label className="footer_form_label">Personaje</label>
            <input
              className="footer_form_search"
              type="text"
              id="character"
              name="character"
              placeholder="Añadir otro personaje"
              onChange={handleNewChar}
              value={addNew.character}
            ></input>
            <input
              className="footer_form_btn"
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
