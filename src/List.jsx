// Componente contenedor que renderiza la lista de elementos
import React from 'react';
import Item from './Item.jsx';

function List({ items, onEdit, onDelete, onToggleComplete }) {
  return (
    <ul className="todo-list">
      {/* Mapea cada elemento del arreglo y lo renderiza usando el componente Item */}
      {items.map((item) => (
        <Item
          key={item.id} // Requisito clave de React: llave única para identificar elementos de forma eficiente
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  );
}

export default List;