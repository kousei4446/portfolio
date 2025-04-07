import work0 from '/work0.png';
import work1 from '/work1.png';
import work2 from '/work2.png';
import work3 from '/work3.png';
import work4 from '/work4.png';
import work5 from '/work5.png';

export interface Project {
  title: string;
  period: string;
  description: string;
  image: string;
  techStack: string[];
  links: { url: string; label: string; icon: string }[];
}

export const projectsData: Project[] = [
  {
    title: '英単語学習アプリ📚',
    period: '2022年3月',
    description:
      '大学2年のころ英語の勉強していたとき英単語を毎日持ち歩くのが大変だなと思い開発しました。はじめてのアプリ開発でした。',
    image: `${work0}?height=180&width=240`,
    techStack: ['React'],
    links: [
      { url: 'https://mytango-66aa6.web.app', label: 'Web App', icon: '📱' },
      {
        url: 'https://github.com/kousei4446/mytango',
        label: 'Source Code',
        icon: '💻',
      },
    ],
  },
  {
    title: '迷子・落とし物検索アプリ🔍',
    period: '2024年6月 - 2024年7月',
    description:
      '大学の実践系授業で開発した防災支援Webアプリ。日常では落とし物探しに活用し、災害時には迷子やペット捜索を支援。',
    image: `${work1}?height=180&width=240`,
    techStack: ['React', 'Firebase'],
    links: [
      { url: 'https://figare.web.app/', label: 'Web App', icon: '📱' },
      {
        url: 'https://github.com/kousei4446/figare',
        label: 'Source Code',
        icon: '💻',
      },
    ],
  },
  {
    title: '部のシフト管理アプリ🏫',
    period: '2024年10月 - 2025年1月',
    description:
      '大学でのボランティア部でシフト制での活動があり、それにともなうシフト表の作成を簡単にするために作成しました。部活引退後現在は使用されていません。要件定義の際ユーザーの意見を聞くことの大切さを学びました。',
    image: `${work2}?height=180&width=240`,
    techStack: ['React', 'Laravel', 'MySQL'],
    links: [
      { url: 'http://52.197.144.4/login', label: 'Web App', icon: '📱' },
      {
        url: 'https://github.com/kousei4446/shift-app',
        label: 'Source Code',
        icon: '💻',
      },
    ],
  },
  {
    title: '犬か猫判別アプリ🐶',
    period: '2025年3月 - 2025年4月',
    description:
      'Djangoとニューラルネットワークをもちいて犬か猫判別するアプリを作成しました。学習サイトを参考に作りました。',
    image: `${work3}?height=180&width=240`,

    techStack: ['Django'],
    links: [
      {
        url: 'https://github.com/kousei4446/cat_or_dog-app',
        label: 'Source Code',
        icon: '💻',
      },
    ],
  },
  {
    title: 'ニュース要約アプリ📰',
    period: '2025年2月',
    description:
      'Ruby on RailsのNokogiriを使用したスクレイピングアプリ。ユーザーはニュースのURLを入力し、関連するニュース記事を取得できる。basic認証実装しており使用できないようにしているため、アプリを試したい方は、下のフォームからその旨をお知らせください。記事ページの例：https://www3.nhk.or.jp/news/html/20240509/k10014444461000.html',
    image: `${work4}?height=180&width=240`,
    techStack: ['Ruby on Rails', 'MySQL', 'AWS'],
    links: [
      { url: 'http://15.168.238.165', label: 'Web App', icon: '📱' },
      {
        url: 'https://github.com/kousei4446/scriping_app',
        label: 'Source Code',
        icon: '💻',
      },
    ],
  },
  {
    title: '予定管理アプリ📅',
    period: '2025年3月 - 2025年4月',
    description:
      'chatGPTを活用した予定管理アプリ。ユーザーは自然言語で予定を入力し、アプリが自動的にカレンダーに追加。',
    image: `${work5}?height=180&width=240`,

    techStack: ['React Native', 'Express', 'Supabase', 'OpenAI API'],
    links: [
      {
        url: 'https://www.youtube.com/watch?v=xhm78ikoPEc',
        label: 'Live Demo',
        icon: '🔗',
      },
      {
        url: 'https://github.com/Community-Production-2025-3',
        label: 'Source Code',
        icon: '💻',
      },
    ],
  },
];
