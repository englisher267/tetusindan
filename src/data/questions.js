// 診断ロジック
// approval  = 承認泥棒（クレクレ）型
// conformist = 同調圧力の奴隷（イエスマン）型
// outsider  = 孤高の迷子（アウトサイダー）型
// justice   = 正論の氷山（ジャスティス）型

export const questions = [
  {
    id: 1,
    text: 'LINEの返信、どのタイミングで送る？',
    choices: [
      {
        text: '見たらすぐ返す',
        scores: { justice: 3 },
      },
      {
        text: '少し時間を置いてから返す',
        scores: { approval: 2, conformist: 2 },
      },
      {
        text: '気が向いた時に返す',
        scores: { outsider: 3 },
      },
      {
        text: '悩んで結局遅くなる',
        scores: { approval: 3 },
      },
    ],
  },
  {
    id: 2,
    text: 'グループLINEで自分の発言が無視された。どうする？',
    choices: [
      {
        text: '気にせず別の話題を振る',
        scores: { justice: 3 },
      },
      {
        text: '誰かが反応してくれるまで様子を見る',
        scores: { approval: 2, conformist: 2 },
      },
      {
        text: '少しモヤるけど何もしない',
        scores: { outsider: 2, conformist: 2 },
      },
      {
        text: '自分の発言がつまらなかったのか気になる',
        scores: { approval: 3 },
      },
    ],
  },
  {
    id: 3,
    text: '友達の幸せ報告を見た時の気持ちは？',
    choices: [
      {
        text: '素直に嬉しい',
        scores: { justice: 3 },
      },
      {
        text: '嬉しいけど少し複雑',
        scores: { approval: 2 },
      },
      {
        text: '自分と比べてしまう',
        scores: { approval: 3 },
      },
      {
        text: '特に何も感じない',
        scores: { outsider: 3 },
      },
    ],
  },
  {
    id: 4,
    text: '「今度飲もう」って言われたけど日程が決まらない。どうする？',
    choices: [
      {
        text: '自分から日程を提案する',
        scores: { justice: 3 },
      },
      {
        text: '相手から連絡が来るまで待つ',
        scores: { conformist: 3 },
      },
      {
        text: '社交辞令だと思ってスルーする',
        scores: { outsider: 3 },
      },
      {
        text: 'なんで決まらないんだろうとモヤモヤする',
        scores: { approval: 3 },
      },
    ],
  },
  {
    id: 5,
    text: 'インスタのストーリー、投稿する前にどうする？',
    choices: [
      {
        text: '見直さず勢いで投稿',
        scores: { outsider: 2 },
      },
      {
        text: '軽く確認してから投稿',
        scores: { justice: 3 },
      },
      {
        text: '何度も見直してから投稿',
        scores: { approval: 3 },
      },
      {
        text: '投稿するか悩んで結局やめる',
        scores: { approval: 3 },
      },
    ],
  },
  {
    id: 6,
    text: '「どっちでもいいよ」って言われた。どう感じる？',
    choices: [
      {
        text: 'じゃあ自分が決める',
        scores: { justice: 2, outsider: 2 },
      },
      {
        text: '本当にどっちでもいいのか確認したくなる',
        scores: { conformist: 3 },
      },
      {
        text: '逆に選べなくなる',
        scores: { conformist: 3 },
      },
      {
        text: '丸投げされた感じがする',
        scores: { approval: 2, justice: 1 },
      },
    ],
  },
  {
    id: 7,
    text: '自分の意見を言う時、どうする？',
    choices: [
      {
        text: '思ったことをはっきり言う',
        scores: { justice: 2, outsider: 2 },
      },
      {
        text: '周りの様子を見てから言う',
        scores: { conformist: 3 },
      },
      {
        text: '言いたいけど言えないことが多い',
        scores: { conformist: 2, outsider: 1 },
      },
      {
        text: '自分の意見がよくわからない',
        scores: { approval: 3 },
      },
    ],
  },
  {
    id: 8,
    text: '褒められた時、どう返す？',
    choices: [
      {
        text: '「ありがとう！」と素直に受け取る',
        scores: { justice: 3 },
      },
      {
        text: '「そんなことないです」と謙遜する',
        scores: { conformist: 3 },
      },
      {
        text: '嬉しいけど照れて否定してしまう',
        scores: { conformist: 2 },
      },
      {
        text: 'もっと褒めてほしいと思う',
        scores: { approval: 3 },
      },
    ],
  },
  {
    id: 9,
    text: '友達が失敗した時、どう思う？',
    choices: [
      {
        text: '心配になって声をかける',
        scores: { justice: 3 },
      },
      {
        text: '少しホッとする自分がいる',
        scores: { approval: 3 },
      },
      {
        text: '自分じゃなくてよかったと思う',
        scores: { outsider: 2, approval: 1 },
      },
      {
        text: '特に何も思わない',
        scores: { outsider: 3 },
      },
    ],
  },
  {
    id: 10,
    text: '進路や将来について、どう考えてる？',
    choices: [
      {
        text: 'やりたいことがはっきりしている',
        scores: { justice: 3 },
      },
      {
        text: 'まだ決まってなくて焦っている',
        scores: { approval: 3 },
      },
      {
        text: '周りに合わせればいいと思っている',
        scores: { conformist: 3 },
      },
      {
        text: '考えるのが怖い',
        scores: { outsider: 2, approval: 1 },
      },
    ],
  },
]
