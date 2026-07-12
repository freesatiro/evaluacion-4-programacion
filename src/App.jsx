import React, { useState, useEffect } from 'react';
import Form from './Form.jsx';
import List from './List.jsx';
import './App.css';

function App() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('todos');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  
  const [editItem, setEditItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(items));
  }, [items]);

  const handleAddOrEdit = (text) => {
    if (!text || !text.trim()) {
      alert("¡Precaución! No puedes agregar o editar un elemento vacío.");
      return;
    }

    if (editItem) {
      setItems(items.map(item => item.id === editItem.id ? { ...item, text: text.trim() } : item));
      setEditItem(null);
    } else {
      const newItem = {
        id: Date.now(),
        text: text.trim(),
        completed: false
      };
      setItems([...items, newItem]);
    }
  };

  const handleDelete = (id) => {
    const confirmar = window.confirm("¿Realmente desea eliminar este elemento?");
    if (confirmar) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleEditSelect = (item) => {
    setEditItem(item);
  };

  const handleToggleComplete = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const handleClearAll = () => {
    const confirmar = window.confirm("¿Realmente desea borrar todos los elementos?");
    if (confirmar) {
      setItems([]);
    }
  };

  const filteredItems = items.filter(item =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Lista de CRUD</h1>
      
      <Form onSubmit={handleAddOrEdit} editItem={editItem} />
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar elemento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="todo-input search-input"
        />
      </div>

      <div className="info-bar">
        <span className="total-contador">Total: {items.length}</span>
        {items.length > 0 && (
          <button onClick={handleClearAll} className="btn-clear-all">
            Borrar Todo
          </button>
        )}
      </div>

      <List 
        items={filteredItems} 
        onEdit={handleEditSelect} 
        onDelete={handleDelete} 
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
}

export default App;