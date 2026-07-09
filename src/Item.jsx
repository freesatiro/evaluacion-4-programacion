import React from 'react';

function Item({ item, onEdit, onDelete }) {
  return (
    <li className="todo-item">
      <span className="todo-text">{item.text}</span>
      <div className="actions">
        <button className="btn-edit" onClick={() => onEdit(item)}>Editar</button>
        <button className="btn-delete" onClick={() => onDelete(item.id)}>Eliminar</button>
      </div>
    </li>
  );
}

export default Item;