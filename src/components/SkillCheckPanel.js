import React from 'react';

const SkillCheckPanel = ({ character, skillCheck, setSkillCheck, rollSkillCheck, partySkillCheck }) => {
  const { skill, dc, result } = skillCheck;

  return (
    <div className="panel">
      <h2>Skill Check:</h2>
      <div className="skill-check-controls">
        <label>
          Skill:
          <select
            value={skill}
            onChange={(e) => setSkillCheck({ ...skillCheck, skill: e.target.value })}
          >
            <option value="">Select a skill</option>
            {character.skills && Object.keys(character.skills).map((skillName) => (
              <option key={skillName} value={skillName}>
                {skillName}
              </option>
            ))}
          </select>
        </label>
        <label>
          DC:
          <input
            type="number"
            value={dc}
            onChange={(e) => setSkillCheck({ ...skillCheck, dc: e.target.value })}
          />
        </label>
        <button onClick={rollSkillCheck}>Roll</button>
        {result !== null && (
          <div>
            Random Number Generated: {Math.floor(Math.random() * 20) + 1}
            <br />
            Skill Check Result: {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillCheckPanel;
