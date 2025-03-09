import React, { useState, useEffect } from 'react';

const applyTheme = (theme: string) => {
  const body = document.body;
  body.classList.remove('light-theme', 'dark-theme');
  body.classList.add(theme);
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
    <button onClick={toggleTheme}>
      {isDarkMode ? 'Mode clair' : 'Mode sombre'}
    </button>
  );
};

export default ThemeSwitcher;
