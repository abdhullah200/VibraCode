import React from 'react';
import { File } from 'lucide-react';
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiSass,
  SiLess,
  SiJson,
  SiMarkdown,
  SiYaml,
  SiPython,
  SiGo,
  SiRust,
  SiPhp,
  SiRuby,
  SiGnubash,
} from 'react-icons/si';
import { FaJava, FaTerminal } from 'react-icons/fa';
import { TbBrandCSharp, TbBrandCpp, TbLetterC } from 'react-icons/tb';

const cls = 'h-4 w-4 shrink-0';

export const getFileIcon = (fileExtension: string): React.ReactNode => {
  const ext = fileExtension.toLowerCase().trim();

  const iconMap: Record<string, React.ReactNode> = {
    // React / JSX
    jsx: <SiReact className={`${cls} text-sky-400`} />,
    tsx: <SiReact className={`${cls} text-sky-500`} />,

    // JavaScript / TypeScript
    js: <SiJavascript className={`${cls} text-amber-400`} />,
    mjs: <SiJavascript className={`${cls} text-amber-400`} />,
    cjs: <SiJavascript className={`${cls} text-amber-400`} />,
    ts: <SiTypescript className={`${cls} text-blue-600`} />,

    // Styling
    css: <SiCss3 className={`${cls} text-blue-600`} />,
    scss: <SiSass className={`${cls} text-pink-500`} />,
    sass: <SiSass className={`${cls} text-pink-500`} />,
    less: <SiLess className={`${cls} text-blue-500`} />,

    // Markup / Docs
    html: <SiHtml5 className={`${cls} text-orange-500`} />,
    htm: <SiHtml5 className={`${cls} text-orange-500`} />,
    md: <SiMarkdown className={`${cls} text-slate-500`} />,
    markdown: <SiMarkdown className={`${cls} text-slate-500`} />,

    // Data / Config
    json: <SiJson className={`${cls} text-amber-500`} />,
    jsonc: <SiJson className={`${cls} text-amber-500`} />,
    yaml: <SiYaml className={`${cls} text-emerald-600`} />,
    yml: <SiYaml className={`${cls} text-emerald-600`} />,
    toml: <SiJson className={`${cls} text-amber-500`} />,
    env: <SiJson className={`${cls} text-lime-600`} />,

    // Backend / misc
    py: <SiPython className={`${cls} text-blue-500`} />,
    go: <SiGo className={`${cls} text-cyan-500`} />,
    rs: <SiRust className={`${cls} text-orange-700`} />,
    php: <SiPhp className={`${cls} text-indigo-600`} />,
    rb: <SiRuby className={`${cls} text-rose-600`} />,
    java: <FaJava className={`${cls} text-red-600`} />,
    cs: <TbBrandCSharp className={`${cls} text-green-700`} />,
    cpp: <TbBrandCpp className={`${cls} text-blue-700`} />,
    c: <TbLetterC className={`${cls} text-blue-600`} />,

    // Shell / scripts
    sh: <SiGnubash className={`${cls} text-green-600`} />,
    bash: <SiGnubash className={`${cls} text-green-600`} />,
    zsh: <SiGnubash className={`${cls} text-green-600`} />,
    ps1: <FaTerminal className={`${cls} text-blue-700`} />,
    bat: <FaTerminal className={`${cls} text-gray-600`} />,
  };

  return iconMap[ext] || <File className="h-4 w-4 text-gray-500" />;
};
