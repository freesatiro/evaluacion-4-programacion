import React, { useState, useEffect } from 'react';

function Form({ onSubmit, editItem }) {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (editItem) {
      setInput(editItem.text);
    } else {
      setInput('');
    }
  }, [editItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Añadir elemento..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="todo-input"
      />
      <button type="submit" className="todo-button">
        {editItem ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  );
}

export default Form;