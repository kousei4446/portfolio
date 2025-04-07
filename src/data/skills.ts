export type SkillCategory = 'All' | 'Backend' | 'Frontend' | 'Tools';

export interface Skill {
  name: string;
  icon?: string;
  level: number;
  category: SkillCategory;
  img?: string;
}

export const skills: Skill[] = [
  {
    name: 'Python',
    icon: '🐍',
    level: 90,
    category: 'Backend',
    img: '/python.png',
  },
  {
    name: 'Django',
    icon: '🎸',
    level: 85,
    category: 'Backend',
    img: '/django.png',
  },
  { name: 'PHP', icon: '🐘', level: 75, category: 'Backend', img: '/php.png' },
  {
    name: 'Laravel',
    icon: '🐘',
    level: 75,
    category: 'Backend',
    img: '/laravel.png',
  },
  {
    name: 'JavaScript',
    icon: '📜',
    level: 85,
    category: 'Frontend',
    img: '/javascript.png',
  },
  {
    name: 'React',
    icon: '⚛️',
    level: 90,
    category: 'Frontend',
    img: '/react.png',
  },
  {
    name: 'ReactNative',
    icon: '⚛️',
    level: 90,
    category: 'Frontend',
    img: '/react.png',
  },
  {
    name: 'Express',
    icon: '🚂',
    level: 80,
    category: 'Backend',
    img: '/express.png',
  },
  {
    name: 'HTML5',
    icon: '🌍',
    level: 95,
    category: 'Frontend',
    img: '/html.png',
  },
  {
    name: 'CSS3',
    icon: '🎨',
    level: 90,
    category: 'Frontend',
    img: '/css.png',
  },
  { name: 'Git', icon: '🔧', level: 85, category: 'Tools', img: '/git.png' },
  {
    name: 'GitHub',
    icon: '🔧',
    level: 85,
    category: 'Tools',
    img: '/github.png',
  },
  {
    name: 'MySQL',
    icon: '📊',
    level: 75,
    category: 'Tools',
    img: '/mysql.png',
  },
  {
    name: 'Firebase',
    icon: '🐳',
    level: 70,
    category: 'Tools',
    img: '/firebase.png',
  },
  {
    name: 'Tensorflow',
    icon: '🐳',
    level: 70,
    category: 'Tools',
    img: '/tensorflow.png',
  },
];
