import React, { useState, useEffect } from 'react';
import lune from '../assets/img/icons/moon.svg'; // Assurez-vous que l'image lune.png existe
import soleil from '../assets/img/icons/soleil.svg'; // Assurez-vous que l'image soleil.svg existe

const applyTheme = (theme: string) => {
  const body = document.body;
  body.classList.remove('light-theme', 'dark-theme');
  body.classList.add(theme);

  // Dispatch custom event to notify the change
  const event = new Event('classChange');
  document.body.dispatchEvent(event);
};

const ThemeSwitcher: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      applyTheme(savedTheme);
    } else {
      // Par défaut, on choisit le thème clair
      applyTheme('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light-theme' : 'dark-theme';
    setIsDarkMode(!isDarkMode);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Sauvegarde le thème dans le localStorage
  };

  return (
    <button onClick={toggleTheme} aria-label={isDarkMode ? 'Mode clair' : 'Mode sombre'} className='bouton-theme'>
      <img src={isDarkMode ? lune : soleil} alt={isDarkMode ? 'Lune' : 'Soleil'} />
    </button>
  );
};

export default ThemeSwitcher;
