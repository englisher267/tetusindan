// Scoring: each choice maps to philosopher IDs with score increments
// Format: { philosopherId: score }

export const questions = [
  {
    id: 1,
    text: '金曜の夜、突然自由な時間ができた。あなたはどうする？',
    choices: [
      {
        label: 'a',
        text: '好きな本やお茶で、一人静かに過ごす',
        scores: { epicurus: 3, seneca: 1 },
      },
      {
        label: 'b',
        text: '友人たちに連絡して、久しぶりに集まる',
        scores: { confucius: 3, mill: 1 },
      },
      {
        label: 'c',
        text: '前から勉強したかったことを、この機会に始める',
        scores: { aristotle: 3, frankl: 1 },
      },
      {
        label: 'd',
        text: '一人で夜の街を歩き、思索にふける',
        scores: { nietzsche: 2, seneca: 1, buddha: 1 },
      },
    ],
  },
  {
    id: 2,
    text: '「幸せ」と聞いて、最初に思い浮かぶイメージは？',
    choices: [
      {
        label: 'a',
        text: '心が穏やかで、何も不安がない状態',
        scores: { epicurus: 2, buddha: 2, seneca: 1 },
      },
      {
        label: 'b',
        text: '達成感に満ちた顔で、夕暮れを眺めている自分',
        scores: { aristotle: 3, frankl: 1 },
      },
      {
        label: 'c',
        text: '大切な人たちとの、笑顔あふれる食卓',
        scores: { confucius: 3, epicurus: 1 },
      },
      {
        label: 'd',
        text: '嵐の中でも揺るがない、強い自分',
        scores: { nietzsche: 2, frankl: 2 },
      },
    ],
  },
  {
    id: 3,
    text: '辛いことが重なった時、あなたが最も頼りにするのは？',
    choices: [
      {
        label: 'a',
        text: 'しばらく距離を置いて、自分の心を静める時間',
        scores: { buddha: 3, epicurus: 1 },
      },
      {
        label: 'b',
        text: '「これには意味があるはず」と、理由を探す',
        scores: { frankl: 3, nietzsche: 1 },
      },
      {
        label: 'c',
        text: '信頼できる人に話して、一緒に考える',
        scores: { confucius: 3, mill: 1 },
      },
      {
        label: 'd',
        text: '「乗り越えれば強くなれる」と自分を奮い立たせる',
        scores: { nietzsche: 2, aristotle: 2 },
      },
    ],
  },
  {
    id: 4,
    text: 'お金が十分にあったら、まず何に使う？',
    choices: [
      {
        label: 'a',
        text: '質の良い食事や、心地よい生活環境を整える',
        scores: { epicurus: 3, seneca: 1 },
      },
      {
        label: 'b',
        text: '自己成長のための、学びや経験に投資する',
        scores: { aristotle: 3, frankl: 1 },
      },
      {
        label: 'c',
        text: '社会問題の解決に貢献する団体に寄付する',
        scores: { mill: 3, confucius: 1 },
      },
      {
        label: 'd',
        text: '使わずに貯めておく——欲が少ないのかもしれない',
        scores: { buddha: 3, seneca: 1 },
      },
    ],
  },
  {
    id: 5,
    text: '人生で最も大切だと思うものを一つ選ぶなら？',
    choices: [
      {
        label: 'a',
        text: '自由——誰にも縛られずに生きること',
        scores: { nietzsche: 2, epicurus: 2 },
      },
      {
        label: 'b',
        text: '成長——昨日より今日の自分が少し上手くなること',
        scores: { aristotle: 3, frankl: 1 },
      },
      {
        label: 'c',
        text: '絆——大切な人と深くつながっていること',
        scores: { confucius: 3, mill: 1 },
      },
      {
        label: 'd',
        text: '静寂——心が乱されない穏やかさ',
        scores: { epicurus: 2, buddha: 2, seneca: 1 },
      },
    ],
  },
  {
    id: 6,
    text: 'SNSを見て、友人が華やかな生活を送っていた。あなたは？',
    choices: [
      {
        label: 'a',
        text: 'いいね！と思いつつ、自分の生活で十分と感じる',
        scores: { epicurus: 2, buddha: 2 },
      },
      {
        label: 'b',
        text: '自分も負けずに頑張ろうという気持ちになる',
        scores: { aristotle: 2, nietzsche: 1 },
      },
      {
        label: 'c',
        text: '連絡して、久しぶりに会う約束をする',
        scores: { confucius: 3, mill: 1 },
      },
      {
        label: 'd',
        text: '比べることに意味はないと、スマホを閉じる',
        scores: { seneca: 2, nietzsche: 2 },
      },
    ],
  },
  {
    id: 7,
    text: '「死」についてどう考えることが多い？',
    choices: [
      {
        label: 'a',
        text: 'できるだけ考えないようにしている',
        scores: { epicurus: 2, mill: 1 },
      },
      {
        label: 'b',
        text: '限りある命だから、今を精一杯生きようと思う',
        scores: { seneca: 3, frankl: 1 },
      },
      {
        label: 'c',
        text: '自分の死後、誰かの記憶に残れたら十分だと思う',
        scores: { confucius: 2, aristotle: 1 },
      },
      {
        label: 'd',
        text: '死さえも含めて、人生を丸ごと肯定したい',
        scores: { nietzsche: 3, frankl: 1 },
      },
    ],
  },
  {
    id: 8,
    text: 'あなたが怒りを感じる場面は？',
    choices: [
      {
        label: 'a',
        text: '理不尽に誰かが傷つけられているとき',
        scores: { mill: 3, confucius: 1 },
      },
      {
        label: 'b',
        text: '自分の時間や努力が、無駄にされたとき',
        scores: { seneca: 2, aristotle: 1 },
      },
      {
        label: 'c',
        text: '怒りを感じることがほとんどない',
        scores: { buddha: 3, epicurus: 1 },
      },
      {
        label: 'd',
        text: '自分や他者の弱さ、逃げる姿勢を見たとき',
        scores: { nietzsche: 3, aristotle: 1 },
      },
    ],
  },
  {
    id: 9,
    text: '理想の一日の過ごし方に近いのは？',
    choices: [
      {
        label: 'a',
        text: '朝は瞑想や読書、昼は自分の仕事に集中、夜は静かに一人で過ごす',
        scores: { buddha: 2, seneca: 2, epicurus: 1 },
      },
      {
        label: 'b',
        text: 'チャレンジングな目標に向かって、全力で取り組む一日',
        scores: { aristotle: 3, nietzsche: 1 },
      },
      {
        label: 'c',
        text: '大切な人たちと笑って、美味しいものを食べる一日',
        scores: { confucius: 2, epicurus: 2 },
      },
      {
        label: 'd',
        text: '誰かの役に立てる活動をして、充実感で終われる一日',
        scores: { mill: 3, frankl: 1 },
      },
    ],
  },
  {
    id: 10,
    text: '人生の岐路に立ったとき、あなたが選ぶ基準は？',
    choices: [
      {
        label: 'a',
        text: '心が穏やかでいられる方',
        scores: { epicurus: 2, buddha: 2 },
      },
      {
        label: 'b',
        text: '自分が成長できると感じる方',
        scores: { aristotle: 2, frankl: 2 },
      },
      {
        label: 'c',
        text: '誰かのためになると思える方',
        scores: { mill: 2, confucius: 2 },
      },
      {
        label: 'd',
        text: '困難でも、これが自分の道だと感じる方',
        scores: { nietzsche: 3, seneca: 1 },
      },
    ],
  },
]
