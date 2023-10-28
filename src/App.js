import { useEffect, useState } from 'react';
import './App.css';
import { CLASS_LIST } from './consts.js';
import AttributesPanel from './components/AttributesPanel';
import ClassesPanel from './components/ClassesPanel';
import ClassRequirementsPanel from './components/ClassRequirementsPanel';
import SkillsPanel from './components/SkillsPanel';
import SkillCheckPanel from './components/SkillCheckPanel';
import { saveCharacter, getCharacter } from './services/api';

function App() {
  const [character, setCharacter] = useState({
    attributes: {
      Strength: 10,
      Dexterity: 10,
      Constitution: 10,
      Intelligence: 10,
      Wisdom: 10,
      Charisma: 10,
    },
    selectedClass: null,
    skills: {},
  });

  const [showRequirements, setShowRequirements] = useState(false);
  const [skillCheck, setSkillCheck] = useState({
    skill: '',
    dc: 0,
    result: null,
  });

  const incrementAttribute = (attribute) => {
    setCharacter((prevState) => ({
      ...prevState,
      attributes: {
        ...prevState.attributes,
        [attribute]: prevState.attributes[attribute] + 1,
      },
    }));
  };

  const decrementAttribute = (attribute) => {
    setCharacter((prevState) => ({
      ...prevState,
      attributes: {
        ...prevState.attributes,
        [attribute]: prevState.attributes[attribute] - 1,
      },
    }));
  };

  const selectClass = (className) => {
    const classRequirements = CLASS_LIST[className];
    const areRequirementsMet = Object.keys(classRequirements).every((attribute) => {
      return character.attributes[attribute] >= classRequirements[attribute];
    });
  
    if (areRequirementsMet) {
      setCharacter((prevState) => ({
        ...prevState,
        selectedClass: className,
      }));
      setShowRequirements(true);
      //saveCharacter(character);
    } else {
      alert("requirements are not met");
    }
  };

  const closeRequirements = () => {
    setShowRequirements(false);
  };

  const allocateSkillPoints = (skillName, points) => {
    const { attributes, skills } = character;

  if (skills[skillName] === undefined) {
    skills[skillName] = {
      points: 0,
      modifier: 0,
    };
  }

  const maxPoints = 10 + 4 * attributes.Intelligence;

  if (skills[skillName].points + points <= maxPoints && skills[skillName].points + points >= 0) {
    skills[skillName].points += points;
  }

  setCharacter((prevState) => ({
    ...prevState,
    skills: {
      ...prevState.skills,
      [skillName]: skills[skillName],
    },
  }));
  };

  const rollSkillCheck = () => {
    const { skills, selectedClass } = character;
    const { skill, dc } = skillCheck;
  
    if (skills[skill] === undefined) {
      skills[skill] = {
        points: 0,
        modifier: 0,
      };
    }
  
    const totalSkillValue = skills[skill].points + skills[skill].modifier;
    const randomResult = Math.floor(Math.random() * 20) + 1;
    const isSuccessful = randomResult + totalSkillValue >= dc;
  
    setSkillCheck((prevCheck) => ({
      ...prevCheck,
      result: isSuccessful ? 'Successful' : 'Failure',
    }));
  };

  const partySkillCheck = () => {
    // TODO Party skill check logic
  };

  useEffect(() => {
    getCharacter()
      .then((response) => {
        // if (response.data) {
        //   setCharacter(response.data);
        // }
      })
      .catch((error) => {
        console.error('Failed to retrieve character data:', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Character Sheet</h1>
      </header>
      <div className='App-section'>
        <SkillCheckPanel
          character={character}
          skillCheck={skillCheck}
          setSkillCheck={setSkillCheck}
          rollSkillCheck={rollSkillCheck}
          partySkillCheck={partySkillCheck}
          showRequirements={showRequirements}
        />
      </div>
      <section className="App-section">
        <AttributesPanel character={character} incrementAttribute={incrementAttribute} decrementAttribute={decrementAttribute} />
        <ClassesPanel
          classList={CLASS_LIST}
          selectClass={selectClass}
          setShowRequirements={setShowRequirements}
          character={character}
        />
        {character.selectedClass && showRequirements && (
          <ClassRequirementsPanel
            character={character}
            classList={CLASS_LIST}
            closeRequirements={() => closeRequirements()}
            showRequirements={showRequirements}
          />
        )}
        <SkillsPanel character={character} allocateSkillPoints={allocateSkillPoints} />
      </section>
    </div>
  );
}

export default App;
