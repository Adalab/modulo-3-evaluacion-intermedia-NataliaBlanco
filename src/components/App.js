import '../styles/App.css';

import quotes from '../data/data.json';
import { useState } from 'react';

const App = () => {
 
  const [sencences, setSentences] = useState(quotes);


 

  // Retornamos todo el código HTML que queremos que React pinte en la página.
  return (
    <div>
      <h1>Generador de emails:</h1>
      <form>
        <label>
          Escribe un email:
          {/* En esta línea indicamos que cuando cambie el input se ejecute la función manejadora handleEmail. */}
          <input
            className="form__input-text"
            type="email"
            name="name"
            onChange={}
          />
        </label>
      </form>
      {/* En esta línea usamos la constante email para pintar el HTML. */}
      <p>Tu email es: {}.</p>
      <p>
        {/* En esta línea usamos la constante email para pintar la propiedad href del link. */}
        {/* Estamos interpolando para conseguir que el valor de href sea algo como mailto:maria@gmail.com. */}
        {/* También estamos usando la constante email para pintar el texto del link. */}
        Pulsa en <a href={`mailto:${email}`}>{email}</a> para enviar un email.
      </p>
    </div>
  );
};

export default App;
