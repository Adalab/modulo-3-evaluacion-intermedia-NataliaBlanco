import '../styles/App.css';
import '../styles/App.scss';
import quotes from '../data/quotes.json';
import { useState } from 'react';

const App = () => {
  const [sentences, setSentences] = useState(quotes);
  const [searchQ, setSearchQ] = useState('');
  const [searchP, setSearchP] = useState('Todos');
  const [add, setAdd] = useState('');

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
            onInput={handleInput}
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
        <ul className="quotes">{renderFilteredQuotes(quotes)}</ul>
        <form>
          <h2>Añade otra frase</h2>
          <input
            className="header__search"
            autoComplete="off"
            type="search"
            name="search"
            placeholder="Filtrar por quotes"
          ></input>
        </form>
      </main>
    </div>
  );
};

export default App;
