export interface Internship {
    role: string;
    company: string;
    duration: string;
    description: string;
    skills: string[];
}

export const internships: Internship[] = [
    {
        role: 'フロントエンドUX改善',
        company: '株式会社クイック',
        duration: '2024年8月2日 ~ 2024年8月4日 (3Days)',
        description:
            'サービス「社内のWebポータル」のフロントエンドUX改善を担当。React+TypeScript、PHP(Laravel)を使用し、既存システムに質問機能を追加。バックエンド実装を通じてMVCモデルの概念を学び、サーバー側で質問テーブルとユーザー情報テーブルの結合処理を実装。',
        skills: ['React', 'TypeScript', 'Laravel', 'Git'],
    },
    {
        role: 'Web開発インターン',
        company: '株式会社Sky',
        duration: '2024年9月2日 ~ 9月13日',
        description:
            'Sky株式会社の「Skyスタイル部」にて社内DXに関する開発を経験。現場社員から実務の流れを学び、Web開発スキルを向上。実際の成果物を作成し、開発現場の業務内容を深く理解。',
        skills: ['Next.js', 'TypeScript', 'Chakra UI', 'Figma'],
    },
    {
        role: 'カレンダーアプリのバグ修正',
        company: '株式会社ジーニー',
        duration: '2024年10月11日 (1Day)',
        description:
            '架空サービスのカレンダーアプリのバグ修正を担当。React+TypeScriptを使用。初めてReact FullCalendarを扱うため、公式ドキュメントを参考にしながら実装。',
        skills: ['React', 'TypeScript', 'FullCalendar'],
    },
    {
        role: 'AIシフト自動編成SaaS「ほすぴタッチ」開発補助',
        company: 'c-live株式会社',
        duration: '2025年3月 - 現在',
        description:
            'AI・数理モデルを用いたシフト自動編成SaaS「ほすぴタッチ」の開発・初期設定を担当。顧客ヒアリングを基にシフトルールをノーコードで設定し、フロントの開発にも携わる。大規模病院や介護施設など実利用される環境でのSaaS実務経験が積んでいます。',
        skills: ['React', 'TypeScript', 'Python', 'Git']
    },
    {
        role:"生成AIを活用したYahoo!ショッピングへのサービス導入",
        company:"LINEヤフー株式会社",
        duration:"2025年8月 - 2025年9月(1ヶ月)",
        description:
            "「Yahoo!ショッピング」では現在積極的にサービス内へ生成AIを活用した機能を導入しています。生成AIを活用した「Yahoo!ショッピング」のサービス開発に参画します。OpenAIやAmazon Bedrockなどを活用し、「Yahoo!ショッピング」のユーザー体験の向上につながる施策の新規企画・開発作業に従事していく予定です。",
            skills: ['TypeScript', 'React', 'Next.js', 'OpenAI API', 'Amazon Bedrock']
    }
];
