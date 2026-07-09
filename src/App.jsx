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

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(items));
  }, [items]);

  const handleAddOrEdit = (text) => {
    if (editItem) {
      setItems(items.map(item => item.id === editItem.id ? { ...item, text } : item));
      setEditItem(null);
    } else {
      const newItem = {
        id: Date.now(),
        text
      };
      setItems([...items, newItem]);
    }
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleEditSelect = (item) => {
    setEditItem(item);
  };

  return (
    <div className="app-container">
      <h1>Lista de CRUD</h1>
      <Form onSubmit={handleAddOrEdit} editItem={editItem} />
      <List items={items} onEdit={handleEditSelect} onDelete={handleDelete} />
    </div>
  );
}

export default App;