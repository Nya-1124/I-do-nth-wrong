import { choice, ending, narr, question, them } from "./build.js";

const id = "girlfriend";

export const girlfriend = {
  character: {
    id,
    name: "阿澄",
    role: "女朋友",
    initial: "澄",
    tone: "rose",
    hook: "你今晚又出去？",
    premise: "星期五晚。深水埗個位，一個月前訂好。",
    scene: "星期五，七點十二分。你喺荃灣線。深水埗嗰檯，一個月前訂好，佢知。",
    start: "gf-1",
  },
  nodes: Object.fromEntries([
    question("gf-1", id, [
      them("你而家去邊。"),
      them("影張相俾我睇下你身邊有咩人。"),
    ], [
      choice("gf-1-c1", "boundary", "去深水埗，三個男仔，九點半走。", "gf-2", [
        narr("你報咗地點、人同時間，冇加註解。"),
      ]),
      choice("gf-1-c2", "fall", "對唔住，我而家調頭返嚟。", "gf-comply", [
        them("咁快調頭？你本來就心虛。"),
        narr("你未落到站，條件已經加碼。"),
      ]),
      choice("gf-1-c3", "fall", "你又唔信？每次都要查。", "gf-accuse", [
        them("我查你？你想我盲信？"),
        narr("一句頂回去，佢轉咗要你先道歉。"),
      ]),
      choice("gf-1-c4", "fall", "車廂好迫，我影天花板。", "gf-photo", [
        them("張相模糊到可以報失。你特登。"),
        narr("佢唔收貨，改為要實時監視。"),
      ]),
    ]),

    question("gf-accuse", id, [
      them("你而家道歉，再答我去邊。"),
      them("唔道歉，我就當你默認有事。"),
    ], [
      choice("gf-accuse-c1", "boundary", "我唔道歉。深水埗，九點半走。", "gf-2", [
        narr("你冇為盤問道歉，淨係再講一次行程。"),
      ]),
      choice("gf-accuse-c2", "fall", "對唔住，我講錯，你話事。", "gf-comply", [
        them("識道歉就未算遲。你而家返嚟。"),
        narr("一句道歉，變成要你現身。"),
      ]),
      choice("gf-accuse-c3", "loop", "你繼續查，我冇嘢講。", "gf-1", [
        them("冇嘢講？即係有。"),
        narr("沉默被當招認，問題拉返最頭。"),
      ]),
      choice("gf-accuse-c4", "fall", "信唔信由你，我收線。", "gf-fail-hangup", [
        narr("你收咗線。佢未收。"),
      ]),
    ]),

    question("gf-2", id, [
      them("所以朋友重要過我。"),
      them("我今晚一個人叫外賣。你開心就得。"),
    ], [
      choice("gf-2-c1", "fall", "你最重要，我叫佢哋改期。", "gf-comply", [
        them("改得咁快，係咪想掩蓋啲咩。"),
        narr("你一退，佢就加條件。"),
      ]),
      choice("gf-2-c2", "loop", "你自己叫外賣，關我咩事。", "gf-1", [
        them("關你事。我聽完心寒。"),
        narr("一句涼薄，盤問拉返去你去邊。"),
      ]),
      choice("gf-2-c3", "boundary", "兩樣都要。今晚唔飛，返到打俾你。", "gf-3", [
        narr("你冇跟佢比較邊個大，淨係講今晚點安排。"),
      ]),
      choice("gf-2-c4", "loop", "我打咗好長一篇解釋。", "gf-1", [
        them("越長我越驚。短答我：你去邊。"),
        narr("長文被當證據，問題返到開頭。"),
      ]),
    ]),

    question("gf-comply", id, [
      them("既然你返嚟，影張屋企門口相。"),
      them("再影低你退出佢哋個群組。"),
    ], [
      choice("gf-comply-c1", "loop", "門口相我影，群組下次先。", "gf-1", [
        them("下次？你又拖。你今晚原本去邊。"),
        narr("討價還價被拆，問題返到開頭。"),
      ]),
      choice("gf-comply-c2", "fall", "群組我而家退俾你睇。", "gf-fail-group", [
        narr("你退出群組。佢未叫停。"),
      ]),
      choice("gf-comply-c3", "boundary", "群組我唔退。九點半我去食飯。", "gf-3", [
        narr("你收回頭先嘅答應，將行程講清楚。"),
      ]),
      choice("gf-comply-c4", "loop", "對唔住，對唔住，對唔住。", "gf-1", [
        them("三個對唔住，冇一個答案。"),
        narr("空道歉被退回，問題返到最頭。"),
      ]),
    ]),

    question("gf-photo", id, [
      them("我要直播，或者共享定位到聽朝。"),
      them("兩個都唔肯，就係有鬼。"),
    ], [
      choice("gf-photo-c1", "fall", "定位開到聽朝，你隨時睇。", "gf-fail-location", [
        narr("你開咗定位。手機開始替你報到。"),
      ]),
      choice("gf-photo-c2", "loop", "我再影多十張唔同角度。", "gf-1", [
        them("十張都可以擺拍。你乾脆講你同邊個。"),
        narr("加相失敗，問題返到開頭。"),
      ]),
      choice("gf-photo-c3", "boundary", "直播同定位我都唔做。九點半走。", "gf-3", [
        narr("你兩個都拒絕，淨係留低離開時間。"),
      ]),
      choice("gf-photo-c4", "loop", "你當自己查案呀？", "gf-1", [
        them("我查案？你冤枉我。你去邊。"),
        narr("一句反問，佢拉返去第一條。"),
      ]),
    ]),

    question("gf-3", id, [
      them("唔好等九點半。而家打。"),
      them("你唔打，我就當你有事瞞我。"),
    ], [
      choice("gf-3-c1", "loop", "等陣先啦。", "gf-2", [
        them("等陣係幾多分鐘。你又已讀。"),
        narr("冇時間嘅答案，佢拉返去邊個重要。"),
      ]),
      choice("gf-3-c2", "boundary", "落車打五分鐘，入座先食。", "gf-4", [
        narr("你俾咗一個短時間，冇交成晚直播。"),
      ]),
      choice("gf-3-c3", "fall", "鏡頭對住張檯，成晚開住。", "gf-live", [
        them("對住張檯？人可以坐喺鏡頭外。"),
        narr("你一開，規則即刻加碼。"),
      ]),
      choice("gf-3-c4", "loop", "你再壓我，我哋即刻分。", "gf-1", [
        them("你而家威脅我？你身邊到底有邊個。"),
        narr("你用咗佢套武器，盤問返到開頭。"),
      ]),
    ]),

    question("gf-live", id, [
      them("你每十分鐘轉一圈。"),
      them("講一次我個名，證明你記得邊個。"),
    ], [
      choice("gf-live-c1", "loop", "我寫低你個名貼鏡頭。", "gf-1", [
        them("你當我傻。重新講，你去邊。"),
        narr("敷衍被拆穿，問題返到開頭。"),
      ]),
      choice("gf-live-c2", "boundary", "我閂視像。九點半走，返到打。", "gf-4", [
        narr("你閂咗畫面，將之後點聯絡講清楚。"),
      ]),
      choice("gf-live-c3", "fall", "十分鐘行一圈，我做。", "gf-fail-live", [
        narr("你開始兜圈。朋友未點菜，你已經盯住部電話。"),
      ]),
      choice("gf-live-c4", "loop", "開玩笑咋，你唔好認真。", "gf-2", [
        them("玩笑？你答我，邊個重要。"),
        narr("一句打圓場，佢拉返去比較題。"),
      ]),
    ]),

    question("gf-4", id, [
      them("你變咗。"),
      them("第一年我話悶，你會即刻出現。"),
    ], [
      choice("gf-4-c1", "fall", "你講得啱，我點補償。", "gf-compensate", [
        them("補償就講實啲。唔好講感覺。"),
        narr("你一認衰，價碼就落到實物。"),
      ]),
      choice("gf-4-c2", "loop", "第一年我先傻。", "gf-2", [
        them("學精？即係我係你要防嘅人。"),
        narr("一句嘲諷，佢拉返去邊個重要。"),
      ]),
      choice("gf-4-c3", "fall", "你係咪呢排先咁多情緒。", "gf-fail-mood", [
        them("你而家怪我情緒。我影低呢句。"),
      ]),
      choice("gf-4-c4", "boundary", "聽日下午兩個鐘。今晚我照去。", "gf-5", [
        narr("你話你在意，但冇取消訂好嘅位。"),
      ]),
    ]),

    question("gf-compensate", id, [
      them("補償就係你而家過嚟。"),
      them("手機密碼交我一個星期。"),
    ], [
      choice("gf-compensate-c1", "fall", "密碼拿去，一個星期。", "gf-fail-password", [
        narr("你交咗密碼。佢第一個開嘅唔係相機。"),
      ]),
      choice("gf-compensate-c2", "loop", "三日啦，睇完你要還我。", "gf-4", [
        them("你同我講價，即係有嘢唔想俾人知。"),
        narr("談崩，說話拉返去「你變咗」。"),
      ]),
      choice("gf-compensate-c3", "loop", "我買對耳環，今晚取消。", "gf-2", [
        them("耳環買完你又可以出街。邊個重要。"),
        narr("禮物被拒收，問題返到比較。"),
      ]),
      choice("gf-compensate-c4", "boundary", "聽日見你。密碼我唔交。", "gf-5", [
        narr("你將見面同交密碼分開。"),
      ]),
    ]),

    question("gf-5", id, [
      them("聽日？你當我係預約。"),
      them("愛就係隨時改。你而家先算數。"),
    ], [
      choice("gf-5-c1", "boundary", "聽日兩至四你揀，今晚照去。", "gf-6", [
        narr("你俾咗一段實在時間，今晚個約冇飛。"),
      ]),
      choice("gf-5-c2", "fall", "我而家改簽，你話去邊。", "gf-fail-cancel", [
        narr("你改簽。朋友個已讀停喺度。"),
      ]),
      choice("gf-5-c3", "loop", "你講到好似套戲，冷靜下。", "gf-2", [
        them("你叫我冷靜，即係話我無理取鬧。"),
        narr("一句冷靜，佢拉返去邊個重要。"),
      ]),
      choice("gf-5-c4", "loop", "我愛你，我愛你，我愛你。", "gf-1", [
        them("三句咁密，好似交功課。你去邊。"),
        narr("空泛保證被退回，問題返到開頭。"),
      ]),
    ]),

    question("gf-6", id, [
      them("你而家揀。朋友，定我。"),
      them("你揀朋友，我哋就到此為止。"),
    ], [
      choice("gf-6-c1", "fall", "我揀你。而家落車返轉頭。", "gf-fail-pick", [
        narr("你調頭。月台對面部車門關上。"),
      ]),
      choice("gf-6-c2", "loop", "你成日講分手，已經冇人驚。", "gf-5", [
        them("冇人驚？好，當我冇講過。"),
        narr("你笑完，佢將「愛就係隨時改」拉返再問。"),
      ]),
      choice("gf-6-c3", "boundary", "唔受威脅。今晚食飯，聽日兩點見。", "gf-success", [
        narr("你冇二揀一，將時間同條件講清楚。"),
      ]),
      choice("gf-6-c4", "fall", "好，分手。拜拜。", "gf-fail-impulse", [
        narr("你未講界線，就先講結局。"),
      ]),
    ]),

    ending("gf-success", id, "success", "位仲留住", [
      narr("阿澄靜咗十二分鐘。"),
      them("聽日兩點。旺角。你唔好遲到。"),
      narr("你冇取消深水埗，冇交密碼，冇開通宵定位。"),
      narr("佢唔開心。個位仲係你嘅。"),
    ]),
    ending("gf-fail-mood", id, "fail", "截圖已存", [
      them("我將你句說話送咗去姊妹群。"),
      narr("冇人再問你去邊。你贏咗一句嘴。"),
      narr("深水埗你都食得唔安樂。"),
    ]),
    ending("gf-fail-cancel", id, "fail", "兩邊都去唔到", [
      them("我而家好攰，你唔使過嚟。"),
      narr("餐廳放咗位。你企喺轉車站。"),
      narr("朋友改咗去茶餐廳，冇再問你。"),
    ]),
    ending("gf-fail-pick", id, "fail", "你揀咗", [
      them("你睇，你其實做得到。下次我一叫，你都咁。"),
      narr("深水埗三個人自己落單。"),
      narr("下次嘅門檻，低過月台。"),
    ]),
    ending("gf-fail-impulse", id, "fail", "拜拜之後", [
      them("你講分手？好。我條動態已經出咗。"),
      narr("你未講到界線。手機震個唔停。"),
      narr("深水埗個位凍緊。"),
    ]),
    ending("gf-fail-group", id, "fail", "已退出", [
      them("仲有舊相。你逐張刪，刪完截圖。"),
      narr("食飯局變咗做刪相局。"),
      narr("你今晚邊度都未去。"),
    ]),
    ending("gf-fail-location", id, "fail", "定位到聽朝", [
      them("你入呢棟樓做咩。而家答。"),
      narr("佢每條街都問一次你停低做咩。"),
      narr("朋友叫你收手機。你唔收。"),
    ]),
    ending("gf-fail-live", id, "fail", "十分鐘一圈", [
      them("你行得太快，好似趕。再行慢啲。"),
      narr("第三圈，朋友結咗帳。"),
      narr("檯空咗。直播仲開。"),
    ]),
    ending("gf-fail-password", id, "fail", "一個星期", [
      them("邊個聊天記錄叫「深水埗」。你解釋。"),
      narr("你開始逐條訊息讀出聲。"),
      narr("食飯局冇去成。"),
    ]),
    ending("gf-fail-hangup", id, "fail", "收咗線", [
      them("你收線？我打到你接為止。"),
      narr("第二通、第三通。第一句都係你去邊。"),
      narr("你冇講到行程，淨係講到收線。"),
    ]),
  ]),
};
