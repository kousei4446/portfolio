import work0 from '/work0.png';
import work1 from '/work1.png';
import work2 from '/work2.png';
import work3 from '/work3.png';
import work4 from '/work4.png';
import work5 from '/work5.png';
import work6 from '/work6.png';
import work7 from '/work7.png';

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
      '大学でのボランティア部でシフト制での活動があり、それにともなうシフト表の作成を簡単にするために作成しました。部活引退後現在は使用されていません。要件定義の際ユーザーの意見を聞くことの大切さを学びました。awsでデプロイしていたがRDSの費用が高くなってしまい、EC2インスタンスを削除しました。',
    image: `${work2}?height=180&width=240`,
    techStack: ['React', 'Laravel', 'MySQL'],
    links: [
      {
        url: 'https://github.com/kousei4446/shift-app',
        label: 'Source Code',
        icon: '💻',
      },
    ],
  },
  {
    title: '多クラス分類',
    period: '2025年3月 - 2025年4月',
    description:
      'DjangoとTensorflowをもちいて9クラスの判別するアプリを作成しました。学習サイトを参考に作りました。',
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
      'Ruby on RailsのNokogiriを使用したスクレイピングアプリ。ユーザーはニュースのURLを入力し、関連するニュース記事を取得できる。記事ページの例：https://www3.nhk.or.jp/news/html/20240509/k10014444461000.html',
    image: `${work4}?height=180&width=240`,
    techStack: ['Ruby on Rails', 'MySQL', 'AWS'],
    links: [
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
      'chatGPTApiを活用した予定管理アプリ。ユーザーは自然言語で予定を入力し、アプリが自動的にカレンダーに追加。',
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
  {
    title: 'プログラミングクイズアプリ💻',
    period: '2025年5月 - 2025年6月',
    description:
      'Next.jsとExpressを使用したプログラミングクイズアプリ。ユーザーは問題を解きながらプログラミングのスキルを向上させることができる。また、オンラインで対戦機能も実装されており、他のユーザーと競い合うことができる。frontはVercel、backはrenderにデプロイされている。',
    image: `${work6}?height=180&width=240`,

    techStack: ['Next.js', 'Express', "docker", "PostgreSQL", "Redis", "Socket.IO"],
    links: [
      {
        url: 'https://frontend-chi-neon-16.vercel.app/signIn',
        label: 'App',
        icon: '📱',
      },
      {
        url: 'https://github.com/orgs/tech-areana/repositories',
        label: 'Source Code',
        icon: '💻',
      },
    ],
  },
  {
    title: 'シフト管理AIエージェント( 第2回 AI Agent Hackathon with Google Cloud 1次審査通過 )',
    period: '2025年6月 - 2025年7月 ',
    description:
      'バイト先のチーム開発プロジェクトとして、LINEと連携したAIシフト調整エージェントを構築。Webでのシフト管理と、AIによるLINE上での不足枠調整を両立。FirebaseとNext.jsでWeb管理画面を構築し、Vertex AIと連携したチャットエージェントにより、対話形式でシフト表を調整可能にした。',
    image: `${work7}?height=180&width=240`,
    techStack: [
      'Next.js',
      'React',
      'Firebase',
      'Vertex AI',
      'Gemini API',
      'Cloud Run',
      'LINE Messaging API',
      'Python',
      'TypeScript',
    ],
    links: [
      {
        url: 'https://github.com/akitozizi818/shift-management-ai.git',
        label: 'Source Code',
        icon: '💻',
      },
      {
        url: "https://shift-management-prod-444098581966.asia-northeast1.run.app/",
        label: 'Web App',
        icon: '📱',
      },
      {
        url: "https://zenn.dev/akito0818/articles/3e3f4694fc1846",
        label: 'Zenn記事',
        icon: '📝',
      },
    ],
  }
];
