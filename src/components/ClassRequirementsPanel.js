import React from 'react';

const ClassRequirementsPanel = ({ character, classList, closeRequirements, showRequirements }) => {
  if (!showRequirements) {
    return null;
  }

  const selectedClass = character.selectedClass;

  if (!selectedClass) {
    return null;
  }

  const requirements = classList[selectedClass];

  return (
    <div className="panel">
      <h2>Class Minimum Requirements:</h2>
      <h3>{selectedClass} Requirements:</h3>
      {Object.entries(requirements).map(([attribute, requirement]) => (
        <div key={attribute}>
          {attribute} Requirement: {requirement}
          {character.attributes[attribute] >= requirement ? ' (Met)' : ' (Not Met)'}
        </div>
      ))}
      <button onClick={closeRequirements}>Close Requirements View</button>
    </div>
  );
};

export default ClassRequirementsPanel;
