//botones funcionales
import React from 'react';

function Item({ item, onEdit, onDelete, onToggleComplete }) {
  return (
    <li className="todo-item">
      {/* cambia el estado de completado (true/false) de un elemento al hacer click en el texto */}
      <span 
        className={`todo-text ${item.completed ? 'completed' : ''}`}
        onClick={() => onToggleComplete(item.id)}
      >
        {item.text}
      </span>
      <div className="actions">
        <button className="btn-edit" onClick={() => onEdit(item)}>Editar</button>
        <button className="btn-delete" onClick={() => onDelete(item.id)}>Eliminar</button>
      </div>
    </li>
  );
}

export default Item;