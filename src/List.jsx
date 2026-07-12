import React from 'react';
import Item from './Item.jsx';

function List({ items, onEdit, onDelete, onToggleComplete }) {
  return (
    <ul className="todo-list">
      {items.map((item) => (
        <Item
          key={item.id}
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