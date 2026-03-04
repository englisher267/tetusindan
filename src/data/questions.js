// Scoring: each choice maps to moyamoya type IDs with score increments
// Types: approval, conformist, outsider, justice

export const questions = [
  {
    id: 1,
    text: 'SNSに写真を投稿した後、どうしてしまう？',
    choices: [
      {
        text: '「いいね」が何件ついたか、ついつい何度も確認してしまう',
        scores: { approval: 3 },
      },
      {
        text: 'みんなが投稿しているから自分もしたけど、反応が怖くて後悔する',
        scores: { conformist: 2, approval: 1 },
      },
      {
        text: 'どうせ自分の感性は理解されないと思いながら、あえて投稿した',
        scores: { outsider: 3 },
      },
      {
        text: '誤字や事実誤認がないか気になって、投稿後も何度も見直す',
        scores: { justice: 3 },
      },
    ],
  },
  {
    id: 2,
    text: 'グループLINEにメッセージが届いた。返信するとき、何を考える？',
    choices: [
      {
        text: '即レスすると「暇な人」と思われそうで、わざと時間をずらしてしまう',
        scores: { conformist: 3 },
      },
      {
        text: '自分のメッセージで場が凍ったらどうしよう、と慎重になりすぎる',
        scores: { approval: 3 },
      },
      {
        text: '返信は面倒だけど、無視したら悪いかなと思いつつ放置してしまう',
        scores: { outsider: 2, conformist: 1 },
      },
      {
        text: '誤字がないか、内容が正確かをちゃんと確認してから送る',
        scores: { justice: 3 },
      },
    ],
  },
  {
    id: 3,
    text: '飲み会で自分とは違う意見が出た。あなたは？',
    choices: [
      {
        text: '場の雰囲気を壊したくないので、とりあえず「そうだね」と合わせる',
        scores: { conformist: 3 },
      },
      {
        text: 'みんながどちらの意見に乗っているか、様子をうかがって判断する',
        scores: { approval: 2, conformist: 1 },
      },
      {
        text: '心の中で「それは違う」と思いながら、どうせ理解されないと黙る',
        scores: { outsider: 3 },
      },
      {
        text: '冷静に、でもはっきりと自分の意見を論理的に述べる',
        scores: { justice: 3 },
      },
    ],
  },
  {
    id: 4,
    text: '仕事や学校でミスをしてしまった。真っ先に気になるのは？',
    choices: [
      {
        text: '周りが自分をどう見ているか、ずっと気になって仕事が手につかない',
        scores: { approval: 3 },
      },
      {
        text: '迷惑をかけてしまったと思って、何度も謝りたくなる',
        scores: { conformist: 3 },
      },
      {
        text: '「でも環境や状況のせいもある」と内心思ってしまっている',
        scores: { outsider: 2, justice: 1 },
      },
      {
        text: 'なぜミスが起きたか、原因を徹底的に洗い出そうとする',
        scores: { justice: 3 },
      },
    ],
  },
  {
    id: 5,
    text: '仲の良い友達から急に既読スルーされた。どうする？',
    choices: [
      {
        text: '何か悪いことをしたんだろうか、とずっと考えてしまう',
        scores: { approval: 3 },
      },
      {
        text: '相手にも事情があるだろうと、自分に言い聞かせて待つ',
        scores: { conformist: 3 },
      },
      {
        text: '「まあ、そういうもんか」と思いつつ、少しモヤる',
        scores: { outsider: 2, approval: 1 },
      },
      {
        text: '「既読したなら返信するのが普通では」と正直思う',
        scores: { justice: 3 },
      },
    ],
  },
  {
    id: 6,
    text: '自分が呼ばれていない集まりのSNS投稿を見た。正直どう感じる？',
    choices: [
      {
        text: '「なんで呼んでくれなかったんだろ」とモヤりながら「いいね」を押す',
        scores: { approval: 3 },
      },
      {
        text: '自分が何か失礼なことをしたのかと、思い当たる節を探してしまう',
        scores: { conformist: 2, approval: 1 },
      },
      {
        text: '「別にそういう集まりは興味ないし」と思いつつ、少しだけモヤる',
        scores: { outsider: 3 },
      },
      {
        text: '「なぜ自分が呼ばれなかったのか」理由を論理的に考えてしまう',
        scores: { justice: 3 },
      },
    ],
  },
  {
    id: 7,
    text: '「最近どう？」と聞かれたとき、本音を言えない。なぜ？',
    choices: [
      {
        text: '正直に言って引かれたり、過剰に心配されるのが怖いから',
        scores: { approval: 2, outsider: 1 },
      },
      {
        text: '相手が求めていそうな答えを返したほうが、関係がうまくいくから',
        scores: { conformist: 3 },
      },
      {
        text: 'どうせ深く理解してもらえないから、当たり障りなく返してしまう',
        scores: { outsider: 3 },
      },
      {
        text: '正確に状況を伝えようとすると長くなって、相手が困るから',
        scores: { justice: 3 },
      },
    ],
  },
  {
    id: 8,
    text: 'SNSで誰かが明らかに間違った情報を拡散している。あなたは？',
    choices: [
      {
        text: '指摘したいけど、角が立つかもしれない。「いいね」だけしてしまう',
        scores: { conformist: 2, approval: 1 },
      },
      {
        text: '穏やかにコメントしたけど、その後の反応がずっと気になる',
        scores: { approval: 3 },
      },
      {
        text: '「どうせ言っても聞かない」と思って、見なかったことにする',
        scores: { outsider: 3 },
      },
      {
        text: '正しい情報を、丁寧かつはっきりコメントする（当然の義務だと思う）',
        scores: { justice: 3 },
      },
    ],
  },
  {
    id: 9,
    text: 'グループ作業で自分の意見がスルーされた。どうする？',
    choices: [
      {
        text: '「みんなが決めたことに従おう」と心に言い聞かせて黙る',
        scores: { conformist: 3 },
      },
      {
        text: '「私の言い方が悪かったのかな」と自分を責める',
        scores: { approval: 3 },
      },
      {
        text: '「まあ、こういうことはよくある。わかってもらえないもんだ」と諦める',
        scores: { outsider: 3 },
      },
      {
        text: '「それでは問題が起きる」と論拠を添えてもう一度主張する',
        scores: { justice: 3 },
      },
    ],
  },
  {
    id: 10,
    text: '今の自分に一番近い「モヤモヤ」はどれ？',
    choices: [
      {
        text: '「自分のことを周りがどう思っているか」が常に頭の片隅にある',
        scores: { approval: 4 },
      },
      {
        text: '「断れなかった」「また合わせてしまった」を繰り返している',
        scores: { conformist: 4 },
      },
      {
        text: '「どうせ理解されない」という感覚がずっとある',
        scores: { outsider: 4 },
      },
      {
        text: '「正しいのに、なぜ伝わらないんだ」と思うことがよくある',
        scores: { justice: 4 },
      },
    ],
  },
]
