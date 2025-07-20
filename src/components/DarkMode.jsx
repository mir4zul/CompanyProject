import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
      document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (
        theme === 'dark' ||
        (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setDark(true);
    }
  }, []);

  const toggleDark = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    setDark(isDark);
  };

  return <button onClick={toggleDark}>{dark ? 'Light Mode' : 'Dark Mode'}</button>;
}
