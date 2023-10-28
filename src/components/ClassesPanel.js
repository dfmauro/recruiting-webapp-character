import React from 'react';

function ClassesPanel({ classList, selectClass, character }) {
  return (
    <div className="panel">
      <h2>Classes:</h2>
      {Object.keys(classList).map((className) => {
        const classRequirements = classList[className];
        const areRequirementsMet = Object.keys(classRequirements).every((attribute) => {
          return character.attributes[attribute] >= classRequirements[attribute];
        });

        return (
          <div key={className}>
            <button
              onClick={() => selectClass(className)}
              className={areRequirementsMet ? 'met-requirements' : ''}
            >
              {className}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ClassesPanel;
