import type { Project } from '../../../shared/types/portfolio';

export const projectsData: Project[] = [
  {
    id: 1,
    group: 'personal',
    title: {
      ja: '英単語学習アプリ',
      en: 'English Vocabulary Study App',
    },
    category: {
      ja: '2022年3月',
      en: 'Mar 2022',
    },
    image: '/work0.png',
    tech: ['React'],
    desc: {
      ja: '大学2年のころ英語の勉強していたとき英単語を毎日持ち歩くのが大変だなと思い開発しました。はじめてのアプリ開発。自分のコードが形になっていき動作することに感動',
      en: 'Built this when studying English in my second year of university to avoid carrying wordbooks every day. This was my first app project. I was amazed to see my code take shape and function.',
    },
    url: 'https://mytango-66aa6.web.app',
    githubUrl: 'https://github.com/kousei4446/mytango',
  },
  {
    id: 2,
    group: 'personal',
    title: {
      ja: '迷子・落とし物検索アプリ',
      en: 'Lost Person & Item Search App',
    },
    category: {
      ja: '2024年6月 - 2024年7月',
      en: 'Jun 2024 - Jul 2024',
    },
    image: '/work1.png',
    tech: ['React', 'Firebase'],
    desc: {
      ja: '大学の実践系授業で開発した防災支援Webアプリ。日常では落とし物探しに活用し、災害時には迷子やペット捜索を支援。',
      en: 'A disaster-support web app built in a hands-on class. It helps with lost items in daily use and supports searches for missing people or pets during emergencies.',
    },
    url: 'https://figare.web.app/',
    githubUrl: 'https://github.com/kousei4446/figare',
  },
  {
    id: 3,
    group: 'personal',
    title: {
      ja: '部のシフト管理アプリ',
      en: 'Club Shift Management App',
    },
    category: {
      ja: '2024年10月 - 2025年1月',
      en: 'Oct 2024 - Jan 2025',
    },
    image: '/work2.png',
    tech: ['React', 'Laravel', 'MySQL'],
    desc: {
      ja: '大学でのボランティア部でシフト制での活動があり、それにともなうシフト表の作成を簡単にするために作成しました。部活引退後現在は使用されていません。要件定義の際ユーザーの意見を聞くことの大切さを学びました。awsでデプロイしていたがRDSの費用が高くなってしまい、EC2インスタンスを削除しました。',
      en: 'Built to simplify shift scheduling for a university volunteer club. It is no longer in use after I graduated from the club. I learned the importance of user feedback during requirements definition. It was deployed on AWS, but I removed the EC2 instance due to rising RDS costs.',
    },
    githubUrl: 'https://github.com/kousei4446/shift-app',
  },
  {
    id: 4,
    group: 'personal',
    title: {
      ja: '多クラス分類',
      en: 'Multi-class Classification',
    },
    category: {
      ja: '2025年3月 - 2025年4月',
      en: 'Mar 2025 - Apr 2025',
    },
    image: '/work3.png',
    tech: ['Django'],
    desc: {
      ja: 'DjangoとTensorflowをもちいて9クラスの判別するアプリを作成しました。学習サイトを参考に作りました。',
      en: 'Built a 9-class classification app using Django and TensorFlow, based on a learning tutorial.',
    },
    githubUrl: 'https://github.com/kousei4446/cat_or_dog-app',
  },
  {
    id: 5,
    group: 'personal',
    title: {
      ja: 'ニュース要約アプリ',
      en: 'News Summary App',
    },
    category: {
      ja: '2025年2月',
      en: 'Feb 2025',
    },
    image: '/work4.png',
    tech: ['Ruby on Rails', 'MySQL', 'AWS'],
    desc: {
      ja: 'Ruby on RailsのNokogiriを使用したスクレイピングアプリ。ユーザーはニュースのURLを入力し、関連するニュース記事を取得できる。記事ページの例：https://www3.nhk.or.jp/news/html/20240509/k10014444461000.html',
      en: 'A scraping app using Ruby on Rails and Nokogiri. Users enter a news URL and fetch related articles. Example: https://www3.nhk.or.jp/news/html/20240509/k10014444461000.html',
    },
    githubUrl: 'https://github.com/kousei4446/scriping_app',
  },
  {
    id: 6,
    group: 'personal',
    title: {
      ja: 'プログラミングクイズアプリ',
      en: 'Programming Quiz App',
    },
    category: {
      ja: '2025年5月 - 2025年6月',
      en: 'May 2025 - Jun 2025',
    },
    image: '/work6.png',
    tech: ['Next.js', 'Express', 'docker', 'PostgreSQL', 'Redis', 'Socket.IO'],
    desc: {
      ja: 'Next.jsとExpressを使用したプログラミングクイズアプリ。ユーザーは問題を解きながらプログラミングのスキルを向上させることができる。また、オンラインで対戦機能も実装されており、他のユーザーと競い合うことができる。frontはVercel、backはrenderにデプロイされている。',
      en: 'A programming quiz app using Next.js and Express. Users improve their skills by solving problems, and can compete online. The frontend is deployed on Vercel and the backend on Render.',
    },
    url: 'https://frontend-chi-neon-16.vercel.app/signIn',
    githubUrl: 'https://github.com/orgs/tech-areana/repositories',
  },
  {
    id: 7,
    group: 'hackathon',
    title: {
      ja: '予定管理アプリ(技育博2024)',
      en: 'Schedule Management App (Gakuiku Expo 2024)',
    },
    category: {
      ja: '2025年3月 - 2025年4月',
      en: 'Mar 2025 - Apr 2025',
    },
    image: '/work5.png',
    tech: ['React Native', 'Express', 'Supabase', 'OpenAI API'],
    desc: {
      ja: 'chatGPTApiを活用した予定管理アプリ。ユーザーは自然言語で予定を入力し、アプリが自動的にカレンダーに追加。',
      en: 'A schedule app powered by the ChatGPT API. Users enter plans in natural language, and the app adds them to the calendar.',
    },
    githubUrl: 'https://github.com/Community-Production-2025-3',
    articles: [
      {
        title: '技育博2024概要',
        url: 'https://note.supporterz.jp/n/na78796e9d324',
        platform: 'Official',
      },
    ],
  },
  {
    id: 8,
    group: 'hackathon',
    title: {
      ja: 'シフト管理AIエージェント( 第2回 AI Agent Hackathon with Google Cloud 1次審査通過 )',
      en: 'AI Shift Management Agent (AI Agent Hackathon with Google Cloud - Passed Round 1)',
    },
    category: {
      ja: '2025年6月 - 2025年7月',
      en: 'Jun 2025 - Jul 2025',
    },
    image: '/work7.png',
    tech: ['Next.js', 'React', 'Firebase', 'Vertex AI', 'Gemini API', 'Cloud Run', 'LINE Messaging API', 'Python', 'TypeScript'],
    desc: {
      ja: 'バイト先のチーム開発プロジェクトとして、LINEと連携したAIシフト調整エージェントを構築。Webでのシフト管理と、AIによるLINE上での不足枠調整を両立。FirebaseとNext.jsでWeb管理画面を構築し、Vertex AIと連携したチャットエージェントにより、対話形式でシフト表を調整可能にした。',
      en: 'Built an AI shift adjustment agent integrated with LINE as a team project at work. It combines web-based shift management with AI-driven adjustments on LINE. The admin UI is built with Firebase and Next.js, and the chat agent integrates with Vertex AI for conversational shift updates.',
    },
    url: 'https://shift-management-prod-444098581966.asia-northeast1.run.app/',
    githubUrl: 'https://github.com/akitozizi818/shift-management-ai.git',
    articles: [
      {
        title: 'プロジェクト概要',
        url: 'https://zenn.dev/akito0818/articles/3e3f4694fc1846',
        platform: 'Zenn',
      },
      {
        title: '第2回 AI Agent Hackathon with Google Cloud概要',
        url: 'https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2',
        platform: 'Zenn',
      },
    ],
    },
  {
    id: 9,
    group: 'hackathon',
    title: {
      ja: 'ひとやすみ通信 (JPHack ブロックスポンサー賞「さくらインターネット株式会社様」受賞 )',
      en: 'Hitoyasumi Tsushin (Winner of the JPHack Block Sponsor Award by Sakura Internet Inc.)',
    },
    category: {
      ja: '2025年9月 - 2025年10月',
      en: 'Sep 2025 - Oct 2025',
    },
    image: '/work8.png',
    tech: ['JavaScript', 'Fast API', 'Redis', 'Socket.io', 'Railway'],
    desc: {
      ja: 'リモートワークで全員での作業中、休憩を切り出せないユーザーを想定して作成したアプリです。Google Meetでのオンライン会議中に使用できるChrome拡張機能です。',
      en: 'A Chrome extension designed for remote workers who find it difficult to suggest taking breaks during group work sessions. The application can be used during online meetings on Google Meet to help teams naturally communicate and coordinate short breaks.',
    },
    articles: [
      {
        title: 'JPHacks概要',
        url: 'https://jphacks.com/',
        platform: 'Official',
      },
      {
        title: 'プロジェクト概要',
        url: 'https://www.canva.com/design/DAG2P82oG9I/EIb67lL_wKPcc4fmgh_lhg/edit?ui=eyJEIjp7IlAiOnsiQiI6ZmFsc2V9fX0',
        platform: 'Canva',
      },
    ],
    githubUrl: 'https://github.com/jphacks/os_2521',
  },
  {
    id: 10,
    group: 'personal',
    title: {
      ja: '見積書PDF作成アプリ',
      en: '',
    },
    category: {
      ja: '2026年1月',
      en: '',
    },
    image: '/work9.png',
    tech: ['Express', 'TypeScript', 'Render'],
    desc: {
      ja: '弟のフリーランス活動を支援するために開発した、見積書PDF作成アプリ。ユーザーは必要な情報を入力するだけで、プロフェッショナルな見積書を自動生成できる。時間と労力を大幅に削減し、ビジネスの効率化に貢献。',
      en: 'An estimate PDF creation app developed to support my younger brother\'s freelance work. Users can automatically generate professional estimates by simply entering the required information, significantly reducing time and effort while enhancing business efficiency.',
    },
    url: 'https://estimate-pdf-app.onrender.com/',
    githubUrl: 'https://github.com/kousei4446/estimate-pdf-app/tree/main',
  },
];