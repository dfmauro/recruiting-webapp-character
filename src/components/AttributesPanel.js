import React from 'react';
import { ATTRIBUTE_LIST } from '../consts';

function AttributesPanel({ character, incrementAttribute, decrementAttribute }) {
  return (
    <div className="panel">
      <h2>Attributes:</h2>
      {ATTRIBUTE_LIST.map((attribute) => (
        <div key={attribute}>
          {attribute}: {character.attributes[attribute]}
          <button onClick={() => incrementAttribute(attribute)}>+</button>
          <button onClick={() => decrementAttribute(attribute)}>-</button>
        </div>
      ))}
    </div>
  );
}

export default AttributesPanel;
