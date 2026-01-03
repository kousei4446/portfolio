import type { InternExperience } from '../../../shared/types/portfolio';

export const internExperiences: InternExperience[] = [
  {
    id: 1,
    company: {
      ja: '株式会社クイック',
      en: 'Quick Co., Ltd.',
    },
    url: 'https://paiza.jp/student/job_offers/33245',
    period: {
      ja: '2024年8月2日 ~ 2024年8月4日 (3Days)',
      en: 'Aug 2, 2024 - Aug 4, 2024 (3 days)',
    },
    summary: {
      ja: 'サービス「社内のWebポータル」のフロントエンドUX改善を担当。React+TypeScript、PHP(Laravel)を使用し、既存システムに質問機能を追加。バックエンド実装を通じてMVCモデルの概念を学び、サーバー側で質問テーブルとユーザー情報テーブルの結合処理を実装。',
      en: 'Improved the frontend UX of an internal web portal. Added a Q&A feature to an existing system using React + TypeScript and PHP (Laravel). Learned MVC concepts through backend implementation and built the join between question and user tables on the server side.',
    },
    tech: ['React', 'TypeScript', 'Laravel', 'Git'],
  },
  {
    id: 2,
    company: {
      ja: '株式会社Sky',
      en: 'Sky Co., Ltd.',
    },
    url: 'https://www.skygroup.jp/corporate-blog/article/1252/',
    period: {
      ja: '2024年9月2日 ~ 9月13日',
      en: 'Sep 2, 2024 - Sep 13, 2024',
    },
    summary: {
      ja: 'Sky株式会社の「Skyスタイル部」にて社内DXに関する開発を経験。現場社員から実務の流れを学び、Web開発スキルを向上。実際の成果物を作成し、開発現場の業務内容を深く理解。',
      en: 'Worked on internal DX initiatives in Sky’s “Sky Style” division. Learned real-world development workflows from engineers, improved web development skills, and delivered tangible outputs to better understand on-site practices.',
    },
    tech: ['Next.js', 'TypeScript', 'Chakra UI', 'Figma'],
  },
  {
    id: 3,
    company: {
      ja: '株式会社ジーニー',
      en: 'Geniee, Inc.',
    },
    url: 'https://geniee.co.jp/recruit/',
    period: {
      ja: '2024年10月11日 (1Day)',
      en: 'Oct 11, 2024 (1 day)',
    },
    summary: {
      ja: '架空サービスのカレンダーアプリのバグ修正を担当。React+TypeScriptを使用。初めてReact FullCalendarを扱うため、公式ドキュメントを参考にしながら実装。',
      en: 'Fixed bugs in a calendar app for a fictional service using React + TypeScript. Implemented the fixes while learning React FullCalendar through official documentation.',
    },
    tech: ['React', 'TypeScript', 'FullCalendar'],
  },
  {
    id: 4,
    company: {
        ja: 'c-live株式会社',
        en: 'c-live Co., Ltd.',
    },
    url: 'https://www2.c-live.jp/services_products/services_products_000657.html',
    period: {
        ja: '2025年3月 - 2025年11月(9カ月)',
        en: 'Mar 2025 - Nov 2025 (9 months)',
    },
    summary: {
        ja: 'AI数理モデルを用いたシフト自動編成SaaS「ほすぴタッチ」の開発初期設定を担当。顧客ヒアリングを基にシフトルールをノーコードで設定し、フロントの開発にも携わる。大規模病院や介護施設など実利用される環境でのSaaS実務経験が積んでいます。また、業務で必要な作業の自動化アプリの開発。',
        en: 'Worked on the initial setup and development of "Hospitouch," a SaaS product for automated shift scheduling using AI mathematical models. Configured shift rules in a no-code manner based on customer interviews and contributed to frontend development. Gained hands-on SaaS experience in real-world environments such as large hospitals and nursing care facilities, and developed internal automation tools to streamline operational tasks.',
    },
    tech: ['React', 'TypeScript', 'Python', 'Git'],
 },
 {
    id: 5,
    company: {
        ja: 'LINEヤフー株式会社',
        en: 'LY Corporation',
    },
    url: 'https://www.lycorp.co.jp/ja/recruit/newgrads/internship/detail/SWE-6-59/',
    period: {
        ja: '2025年8月 - 2025年9月(1ヶ月)',
        en: 'Aug 2025 - Sep 2025 (1 month)',
    },
    summary: {
        ja: '「Yahoo!ショッピング」では現在積極的にサービス内へ生成AIを活用した機能を導入しています。生成AIを活用した「Yahoo!ショッピング」のサービス開発に参画します。OpenAIやAmazon Bedrockなどを活用し、「Yahoo!ショッピング」のユーザー体験の向上につながる施策の新規企画開発作業に従事しました。',
        en: 'Participated in the development of generative AI-powered features for Yahoo! Shopping. Utilized platforms such as OpenAI and Amazon Bedrock to design and implement new initiatives aimed at improving user experience, contributing to the planning and development of AI-driven service enhancements.',
    },
    tech: ['TypeScript', 'React', 'Next.js', 'OpenAI API', 'Amazon Bedrock'],
 },
 {
    id: 6,
    company: {
        ja: 'PRTIMES株式会社',
        en: 'PRTIMES Corporation',
    },
    url: 'https://prtimes.co.jp/recruit/',
    period: {
        ja: '2025年11月 - 現在',
        en: 'Nov 2025 - Present',
    },
    summary: {
        ja: '国内シェアNo.1のプレスリリース配信サービスである「PR TIMES」のフロントエンド改善業務',
        en: 'Worked on frontend improvements for "PR TIMES," Japan’s leading press release distribution service with the largest domestic market share.',
    },
    tech: ['TypeScript', 'React', 'ESLint', 'Storybook', 'Git', 'Playwright'],
 },
];
