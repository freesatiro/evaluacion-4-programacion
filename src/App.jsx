// Componente principal de la aplicación (Cerebro del CRUD)
import React, { useState, useEffect } from 'react';
import Form from './Form.jsx';
import List from './List.jsx';
import './App.css';

function App() {
  // Inicializa el estado con los datos de localStorage para mantener persistencia
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('todos');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  
  // Estado para controlar qué elemento se está editando
  const [editItem, setEditItem] = useState(null);
  // Estado para almacenar el término de búsqueda en tiempo real
  const [searchTerm, setSearchTerm] = useState('');

  // Sincroniza la lista de elementos en el localStorage cada vez que cambia el estado 'items'
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(items));
  }, [items]);

  // Maneja tanto la creación de nuevos elementos como la edición de los existentes
  const handleAddOrEdit = (text) => {
    // Validación (Commit 2): Evita entradas vacías o con puros espacios
    if (!text || !text.trim()) {
      alert("Error! No puede agregar o editar un elemento vacío.");
      return;
    }

    if (editItem) {
      // Edición: Mapea la lista y reemplaza el texto del elemento que coincide con el ID seleccionado
      setItems(items.map(item => item.id === editItem.id ? { ...item, text: text.trim() } : item));
      setEditItem(null); // Sale del modo edición
    } else {
      // Creación (Commit 3): Genera un nuevo objeto con propiedad 'completed' por defecto en false
      const newItem = {
        id: Date.now(), // Genera un ID único basado en milisegundos
        text: text.trim(),
        completed: false
      };
      setItems([...items, newItem]); // Agrega el elemento sin mutar el arreglo original
    }
  };

  // Elimina un elemento tras confirmar la acción (Commit 2)
  const handleDelete = (id) => {
    const confirmar = window.confirm("¿Realmente desea eliminar este elemento?");
    if (confirmar) {
      // Genera un nuevo arreglo excluyendo el ID seleccionado
      setItems(items.filter(item => item.id !== id));
    }
  };

  // Activa el modo de edición cargando el elemento seleccionado
  const handleEditSelect = (item) => {
    setEditItem(item);
  };

  // Cambia el estado de completado (true/false) de un elemento (Commit 3)
  const handleToggleComplete = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  // Elimina todos los elementos de la lista tras confirmar (Commit 3)
  const handleClearAll = () => {
    const confirmar = window.confirm("¿Realmente desea borrar todos los elementos?");
    if (confirmar) {
      setItems([]); // Restablece el estado a un arreglo vacío
    }
  };

  // Filtra la lista en tiempo real sin alterar el arreglo original (Commit 3)
  const filteredItems = items.filter(item =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Lista de CRUD</h1>
      
      {/* Componente del Formulario */}
      <Form onSubmit={handleAddOrEdit} editItem={editItem} />
      
      {/* Contenedor del Buscador */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar elemento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado de búsqueda
          className="todo-input search-input"
        />
      </div>

      {/* Barra de información y control masivo */}
      <div className="info-bar">
        <span className="total-contador">Total: {items.length}</span>
        {/* Renderizado condicional: El botón solo aparece si hay elementos en la lista */}
        {items.length > 0 && (
          <button onClick={handleClearAll} className="btn-clear-all">
            Borrar Todo
          </button>
        )}
      </div>

      {/* Componente de la Lista de Elementos */}
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