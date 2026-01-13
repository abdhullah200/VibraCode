"use client"
import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Palette } from 'lucide-react';

export interface EditorTheme {
  id: string;
  name: string;
  monacoTheme: string;
}

export const EDITOR_THEMES: EditorTheme[] = [
  { id: 'modern-dark', name: 'Modern Dark', monacoTheme: 'modern-dark' },
  { id: 'vs-light', name: 'Light', monacoTheme: 'vs' },
  { id: 'vs-dark', name: 'VS Dark', monacoTheme: 'vs-dark' },
  { id: 'hc-black', name: 'High Contrast', monacoTheme: 'hc-black' },
  { id: 'github-dark', name: 'GitHub Dark', monacoTheme: 'github-dark' },
  { id: 'monokai', name: 'Monokai', monacoTheme: 'monokai' },
  { id: 'solarized-dark', name: 'Solarized Dark', monacoTheme: 'solarized-dark' },
  { id: 'solarized-light', name: 'Solarized Light', monacoTheme: 'solarized-light' },
  { id: 'dracula', name: 'Dracula', monacoTheme: 'dracula' },
  { id: 'nord', name: 'Nord', monacoTheme: 'nord' },
  { id: 'coffee', name: 'Coffee', monacoTheme: 'coffee' },
  { id: 'night-owl', name: 'Night Owl', monacoTheme: 'night-owl' },
];

interface ThemeSelectorProps {
  onThemeChange: (theme: string) => void;
  currentTheme?: string;
}

const STORAGE_KEY = 'playground-editor-theme';

export default function ThemeSelector({ onThemeChange, currentTheme }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState<string>('modern-dark');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      setSelectedTheme(savedTheme);
      onThemeChange(savedTheme);
    } else if (currentTheme) {
      setSelectedTheme(currentTheme);
    }
  }, []);

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    localStorage.setItem(STORAGE_KEY, themeId);
    onThemeChange(themeId);
  };

  return (
    <Select value={selectedTheme} onValueChange={handleThemeChange}>
      <SelectTrigger className="w-45 h-9">
        <Palette className="h-4 w-4 mr-2" />
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        {EDITOR_THEMES.map((theme) => (
          <SelectItem key={theme.id} value={theme.id}>
            {theme.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
