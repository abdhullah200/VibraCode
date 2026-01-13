export interface ThemeColors {
  background: string;
  foreground: string;
  border: string;
  hoverBackground: string;
  activeBackground: string;
  mutedForeground: string;
}

export const getThemeColors = (theme: string): ThemeColors => {
  const themeMap: Record<string, ThemeColors> = {
    'vs': {
      background: 'bg-white',
      foreground: 'text-gray-900',
      border: 'border-gray-200',
      hoverBackground: 'hover:bg-gray-100',
      activeBackground: 'bg-blue-50',
      mutedForeground: 'text-gray-600',
    },
    'solarized-light': {
      background: 'bg-[#fdf6e3]',
      foreground: 'text-[#657b83]',
      border: 'border-[#eee8d5]',
      hoverBackground: 'hover:bg-[#eee8d5]',
      activeBackground: 'bg-[#eee8d5]',
      mutedForeground: 'text-[#93a1a1]',
    },
    'modern-dark': {
      background: 'bg-[#1e1e1e]',
      foreground: 'text-[#d4d4d4]',
      border: 'border-[#3e3e42]',
      hoverBackground: 'hover:bg-[#2a2d2e]',
      activeBackground: 'bg-[#37373d]',
      mutedForeground: 'text-[#858585]',
    },
    'vs-dark': {
      background: 'bg-[#1e1e1e]',
      foreground: 'text-[#d4d4d4]',
      border: 'border-[#3e3e42]',
      hoverBackground: 'hover:bg-[#2a2d2e]',
      activeBackground: 'bg-[#37373d]',
      mutedForeground: 'text-[#858585]',
    },
    'hc-black': {
      background: 'bg-black',
      foreground: 'text-white',
      border: 'border-white',
      hoverBackground: 'hover:bg-gray-900',
      activeBackground: 'bg-gray-800',
      mutedForeground: 'text-gray-400',
    },
    'github-dark': {
      background: 'bg-[#0d1117]',
      foreground: 'text-[#c9d1d9]',
      border: 'border-[#30363d]',
      hoverBackground: 'hover:bg-[#161b22]',
      activeBackground: 'bg-[#161b22]',
      mutedForeground: 'text-[#8b949e]',
    },
    'monokai': {
      background: 'bg-[#272822]',
      foreground: 'text-[#f8f8f2]',
      border: 'border-[#3e3d32]',
      hoverBackground: 'hover:bg-[#3e3d32]',
      activeBackground: 'bg-[#49483e]',
      mutedForeground: 'text-[#75715e]',
    },
    'solarized-dark': {
      background: 'bg-[#002b36]',
      foreground: 'text-[#839496]',
      border: 'border-[#073642]',
      hoverBackground: 'hover:bg-[#073642]',
      activeBackground: 'bg-[#073642]',
      mutedForeground: 'text-[#586e75]',
    },
    'dracula': {
      background: 'bg-[#282a36]',
      foreground: 'text-[#f8f8f2]',
      border: 'border-[#44475a]',
      hoverBackground: 'hover:bg-[#44475a]',
      activeBackground: 'bg-[#44475a]',
      mutedForeground: 'text-[#6272a4]',
    },
    'nord': {
      background: 'bg-[#2e3440]',
      foreground: 'text-[#d8dee9]',
      border: 'border-[#3b4252]',
      hoverBackground: 'hover:bg-[#3b4252]',
      activeBackground: 'bg-[#434c5e]',
      mutedForeground: 'text-[#616e88]',
    },
    'coffee': {
      background: 'bg-[#32302f]',
      foreground: 'text-[#c9b199]',
      border: 'border-[#3c3836]',
      hoverBackground: 'hover:bg-[#3c3836]',
      activeBackground: 'bg-[#504945]',
      mutedForeground: 'text-[#8d8687]',
    },
    'night-owl': {
      background: 'bg-[#011627]',
      foreground: 'text-[#d6deeb]',
      border: 'border-[#010e1a]',
      hoverBackground: 'hover:bg-[#010e1a]',
      activeBackground: 'bg-[#1d3b53]',
      mutedForeground: 'text-[#637777]',
    },
  };

  return themeMap[theme] || themeMap['modern-dark'];
};
