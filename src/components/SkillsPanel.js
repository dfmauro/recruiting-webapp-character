import React from 'react';
import { SKILL_LIST } from '../consts';

function SkillsPanel({ character, allocateSkillPoints }) {
  return (
    <div className="panel">
      <h2>Skills:</h2>
      {SKILL_LIST.map((skill) => (
        <div key={skill.name}>
          {skill.name} - points: {character.skills[skill.name]?.points || 0}
          <button onClick={() => allocateSkillPoints(skill.name, 1)}>+</button>
          <button onClick={() => allocateSkillPoints(skill.name, -1)}>-</button>
          modifier ({skill.attributeModifier}): {character.skills[skill.name]?.modifier || 0}
          total: {character.skills[skill.name]?.points + character.skills[skill.name]?.modifier || 0}
        </div>
      ))}
    </div>
  );
}

export default SkillsPanel;
