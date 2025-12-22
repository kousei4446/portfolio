import type { Project } from '../types/portfolio';

export const projectsData: Project[] = [
  {
    id: 1,
    title: '英単語学習アプリ',
    category: '2022年3月',
    tech: ['React'],
    desc: '大学2年のころ英語の勉強していたとき英単語を毎日持ち歩くのが大変だなと思い開発しました。はじめてのアプリ開発でした。'
  },
  {
    id: 2,
    title: '迷子・落とし物検索アプリ',
    category: '2024年6月 - 2024年7月',
    tech: ['React', 'Firebase'],
    desc: '大学の実践系授業で開発した防災支援Webアプリ。日常では落とし物探しに活用し、災害時には迷子やペット捜索を支援。'
  },
  {
    id: 3,
    title: '部のシフト管理アプリ',
    category: '2024年10月 - 2025年1月',
    tech: ['React', 'Laravel', 'MySQL'],
    desc: '大学でのボランティア部でシフト制での活動があり、それにともなうシフト表の作成を簡単にするために作成しました。部活引退後現在は使用されていません。要件定義の際ユーザーの意見を聞くことの大切さを学びました。awsでデプロイしていたがRDSの費用が高くなってしまい、EC2インスタンスを削除しました。'
  },
  {
    id: 4,
    title: '多クラス分類',
    category: '2025年3月 - 2025年4月',
    tech: ['Django'],
    desc: 'DjangoとTensorflowをもちいて9クラスの判別するアプリを作成しました。学習サイトを参考に作りました。'
  },
  {
    id: 5,
    title: 'ニュース要約アプリ',
    category: '2025年2月',
    tech: ['Ruby on Rails', 'MySQL', 'AWS'],
    desc: 'Ruby on RailsのNokogiriを使用したスクレイピングアプリ。ユーザーはニュースのURLを入力し、関連するニュース記事を取得できる。記事ページの例：https://www3.nhk.or.jp/news/html/20240509/k10014444461000.html'
  },
  {
    id: 6,
    title: '予定管理アプリ',
    category: '2025年3月 - 2025年4月',
    tech: ['React Native', 'Express', 'Supabase', 'OpenAI API'],
    desc: 'chatGPTApiを活用した予定管理アプリ。ユーザーは自然言語で予定を入力し、アプリが自動的にカレンダーに追加。'
  },
  {
    id: 7,
    title: 'プログラミングクイズアプリ',
    category: '2025年5月 - 2025年6月',
    tech: ['Next.js', 'Express', 'docker', 'PostgreSQL', 'Redis', 'Socket.IO'],
    desc: 'Next.jsとExpressを使用したプログラミングクイズアプリ。ユーザーは問題を解きながらプログラミングのスキルを向上させることができる。また、オンラインで対戦機能も実装されており、他のユーザーと競い合うことができる。frontはVercel、backはrenderにデプロイされている。'
  },
  {
    id: 8,
    title: 'シフト管理AIエージェント( 第2回 AI Agent Hackathon with Google Cloud 1次審査通過 )',
    category: '2025年6月 - 2025年7月',
    tech: ['Next.js', 'React', 'Firebase', 'Vertex AI', 'Gemini API', 'Cloud Run', 'LINE Messaging API', 'Python', 'TypeScript'],
    desc: 'バイト先のチーム開発プロジェクトとして、LINEと連携したAIシフト調整エージェントを構築。Webでのシフト管理と、AIによるLINE上での不足枠調整を両立。FirebaseとNext.jsでWeb管理画面を構築し、Vertex AIと連携したチャットエージェントにより、対話形式でシフト表を調整可能にした。'
  }
];
