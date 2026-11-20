import { choice, ending, narr, question, them } from "./build.js";

const id = "family";

export const family = {
  character: {
    id,
    name: "媽咪",
    role: "屋企人",
    initial: "媽",
    tone: "amber",
    hook: "你唔到場，我點見人。",
    premise: "星期日。三姨個孫滿月，你要收舖。",
    scene: "星期日，十一點四十分。三姨個孫滿月酒。你星期一講過，今晚唔得閒，舖頭收到十點。",
    start: "fm-1",
  },
  nodes: Object.fromEntries([
    question("fm-1", id, [
      them("三姨問你幾點到。我話你七點前到。"),
      them("你份人影個相就得。唔好令我冇面。"),
    ], [
      choice("fm-1-c1", "boundary", "我星期一講咗，今晚收舖去唔到。", "fm-2", [
        narr("你重申星期一講過，今晚要收舖。"),
      ]),
      choice("fm-1-c2", "fall", "咁我請病假去。", "fm-sick", [
        them("病假？你邊有病。"),
        narr("你一講病，佢就當你更應該到場。"),
      ]),
      choice("fm-1-c3", "fall", "三姨個孫關我咩事。", "fm-rude", [
        them("關你事。你令我喺姊妹面前抬唔起頭。"),
        narr("一句無關，變成你要負責佢塊面。"),
      ]),
      choice("fm-1-c4", "fall", "七點就七點，我搞掂。", "fm-promise", [
        them("終於識事。記得著件有領。"),
        narr("你應承得太快。佢已經喺度改行程。"),
      ]),
    ]),

    question("fm-rude", id, [
      them("你而家同我講，七點到定八點到。"),
      them("唔好再講個孫關你咩事。"),
    ], [
      choice("fm-rude-c1", "boundary", "我兩邊都唔到。我自己同三姨講。", "fm-3", [
        narr("你冇同佢爭個孫，淨係講你去唔到，同邊個開口。"),
      ]),
      choice("fm-rude-c2", "fall", "冇面就唔好應承人。", "fm-fail-outsider", [
        narr("你講中咗，亦都裁咗自己出呢餐。"),
      ]),
      choice("fm-rude-c3", "fall", "對唔住，我講快咗。你話幾點就幾點。", "fm-promise", [
        them("七點。有領。到步影相。"),
        narr("你道完歉，時間就唔再係你嘅。"),
      ]),
      choice("fm-rude-c4", "loop", "我唔想討論。", "fm-1", [
        them("你唔討論，我就當你七點到。"),
        narr("沉默被填咗答案，問題返到你自己講。"),
      ]),
    ]),

    question("fm-2", id, [
      them("你表哥上年聚餐都有到。人哋做到。"),
      them("你而家越嚟越似外人。"),
    ], [
      choice("fm-2-c1", "boundary", "表哥去唔去係佢嘅事。我要返工。", "fm-3", [
        narr("你冇接「外人」個帽，淨係講今晚要返工。"),
      ]),
      choice("fm-2-c2", "fall", "你話外人？以後都唔使叫我。", "fm-fail-outsider", [
        narr("你裁咗自己出家族群。群組未放過你。"),
      ]),
      choice("fm-2-c3", "fall", "我早退，你唔好再講。", "fm-early", [
        them("早退就早退得乾脆啲。"),
        narr("你一鬆口，佢已經喺度派位。"),
      ]),
      choice("fm-2-c4", "loop", "我打咗段員工手冊俾你。", "fm-1", [
        them("我唔睇手冊。你到定唔到，一句。"),
        narr("長文被滑走，問題返到七點。"),
      ]),
    ]),

    question("fm-sick", id, [
      them("你病更要過嚟。三姨個仔識睇人。"),
      them("你今晚順便俾人睇，我先放心。"),
    ], [
      choice("fm-sick-c1", "boundary", "我冇病，唔會請病假去飲宴。", "fm-2", [
        narr("你拆咗個病，將原定返工講清楚。"),
      ]),
      choice("fm-sick-c2", "fall", "咁我話肚痛，你幫我講。", "fm-fail-doctor", [
        narr("你揀咗個病。三姨當真。"),
      ]),
      choice("fm-sick-c3", "loop", "你想我病，我就病俾你睇。", "fm-1", [
        them("你態度先病。答我七點到唔到。"),
        narr("一句氣話，問題返到報到。"),
      ]),
      choice("fm-sick-c4", "fall", "我請病假，食兩口就走。", "fm-fail-show", [
        narr("你請咗假。「兩口」未寫低收工時間。"),
      ]),
    ]),

    question("fm-promise", id, [
      them("你表哥六點半喺公司樓下等。"),
      them("你五點要放得到工。到步影張相。"),
    ], [
      choice("fm-promise-c1", "boundary", "頭先我答快咗。去唔到，唔好叫表哥。", "fm-3", [
        narr("你改口，連接載都取消。"),
      ]),
      choice("fm-promise-c2", "fall", "五點我試下早走。", "fm-fail-car", [
        narr("你話試下。表哥當你答應。"),
      ]),
      choice("fm-promise-c3", "fall", "表哥唔使接，我自己衝到。", "fm-fail-show", [
        narr("你拒咗接載，但個宴你照去。"),
      ]),
      choice("fm-promise-c4", "loop", "我冇有領衫，所以去唔到。", "fm-1", [
        them("冇衫可以買。你到定唔到。"),
        narr("衫嘅藉口一拆，問題返到七點。"),
      ]),
    ]),

    question("fm-3", id, [
      them("我懷孕吐到入院都照返工。"),
      them("你請一個晚上假都唔得？你爸好失望。"),
    ], [
      choice("fm-3-c1", "boundary", "感恩，但今晚請唔到。聽日我打俾三姨。", "fm-4", [
        narr("你分開感恩同請假。補救放咗喺聽日。"),
      ]),
      choice("fm-3-c2", "fall", "對唔住，我而家打俾經理。", "fm-manager", [
        them("開擴音。佢唔批我就同佢講。"),
        narr("你一打電話，佢就要聽住。"),
      ]),
      choice("fm-3-c3", "loop", "老豆想講就叫佢自己打。", "fm-1", [
        them("你頂嘴。三姨問緊幾點，你答。"),
        narr("一句頂回去，問題返到報到時間。"),
      ]),
      choice("fm-3-c4", "loop", "你再講懷孕，我收線。", "fm-1", [
        them("你收呀。我再打，你一樣要答。"),
        narr("你切斷。第二通拉返去幾點到。"),
      ]),
    ]),

    question("fm-early", id, [
      them("霸到門口第二檯。紙寫低我個名。"),
      them("三點見。你經理度我同佢講。"),
    ], [
      choice("fm-early-c1", "boundary", "我唔早退，唔霸位，飲宴去唔到。", "fm-4", [
        narr("你將霸位同飲宴一齊推走。"),
      ]),
      choice("fm-early-c2", "fall", "三點就三點，我請下午假。", "fm-fail-show", [
        narr("下午假批咗。酒樓門口有你張紙。"),
      ]),
      choice("fm-early-c3", "loop", "四點先，你遷就下。", "fm-1", [
        them("你同我講價？七點到定八點到。"),
        narr("討價失敗，問題返到最初。"),
      ]),
      choice("fm-early-c4", "loop", "霸位使唔使寫低我個名。", "fm-1", [
        them("你當玩笑。三姨問緊幾點。"),
        narr("一句玩，佢拉返去報到時間。"),
      ]),
    ]),

    question("fm-4", id, [
      them("你唔到，紅包點算。三姨會以為我哋出唔起。"),
      them("轉八八八俾我。下個月表舅公壽宴你第一個到。"),
    ], [
      choice("fm-4-c1", "boundary", "紅包我自己轉。下個月我唔應承。", "fm-5", [
        narr("你冇用下個月換今晚，紅包亦都自己出。"),
      ]),
      choice("fm-4-c2", "fall", "八八八我轉。下個月我第一個到。", "fm-fail-bargain", [
        narr("你買咗今晚。單據寫喺下個月。"),
      ]),
      choice("fm-4-c3", "loop", "紅包你出啦，我冇錢。", "fm-2", [
        them("我白供你讀書，你話冇錢？"),
        narr("錢嘅話題被拉返去同表哥比較。"),
      ]),
      choice("fm-4-c4", "fall", "你話我病咗，幫我圓。", "fm-lie", [
        them("圓謊要圓得似。你揀一個病。"),
        narr("你一要求圓，佢就要統一故事。"),
      ]),
    ]),

    question("fm-manager", id, [
      them("你經理唔批嘅話，電話交俾我。"),
      them("家族有事，係傳統。你咁同佢講。"),
    ], [
      choice("fm-manager-c1", "boundary", "我唔開擴音。聽日先同三姨道歉。", "fm-5", [
        narr("你拒絕俾人聽住，道歉放喺聽日。"),
      ]),
      choice("fm-manager-c2", "fall", "好，我開擴音，你唔好出聲。", "fm-fail-speaker", [
        narr("你開咗擴音。佢第一句就報咗三姨個名。"),
      ]),
      choice("fm-manager-c3", "loop", "經理唔聽電話，我改日先請。", "fm-2", [
        them("改日？人哋表哥做到，你點解做唔到。"),
        narr("拖延被拆，佢拉返去比較。"),
      ]),
      choice("fm-manager-c4", "fall", "我辭職就唔使請假。", "fm-fail-quitjob", [
        narr("你講辭職。佢聽到嘅係：你今晚有空。"),
      ]),
    ]),

    question("fm-lie", id, [
      them("肚痛定頭痛。你揀一個，我照講。"),
      them("下個月壽宴，你唔准再用呢個病。"),
    ], [
      choice("fm-lie-c1", "boundary", "我唔病，你唔使圓。我自己講。", "fm-5", [
        narr("你唔配合圓謊，改為自己同三姨講。"),
      ]),
      choice("fm-lie-c2", "fall", "肚痛啦。下個月我一定到。", "fm-fail-bargain", [
        narr("病同壽宴一齊應承。兩樣都記低咗。"),
      ]),
      choice("fm-lie-c3", "loop", "兩個理由一齊講，穩陣。", "fm-4", [
        them("你自己都唔定。八八八邊個出。"),
        narr("故事一亂，佢拉返去紅包。"),
      ]),
      choice("fm-lie-c4", "loop", "你話我失聯都得，反正我唔去。", "fm-1", [
        them("你講呢啲。我而家問你，七點到唔到。"),
        narr("一句過火，佢當冇發生，問題返最頭。"),
      ]),
    ]),

    question("fm-5", id, [
      them("我已經喺群組點你名。全家睇緊。"),
      them("你而家回「收到，今晚見」，唔係我唔知點落台。"),
      narr("未讀十二。三姨個頭像係一碟燒味。"),
    ], [
      choice("fm-5-c1", "boundary", "我自己回：今晚返工，去唔到。", "fm-6", [
        narr("你拒絕場面話，改講你真係要返工。"),
      ]),
      choice("fm-5-c2", "fall", "收到，今晚見。", "fm-fail-public", [
        narr("你回咗。十二個人都睇到。"),
      ]),
      choice("fm-5-c3", "loop", "我已讀，等等先。", "fm-4", [
        them("等等？紅包個問題你未答。"),
        narr("你沉默，佢拉返去八八八。"),
      ]),
      choice("fm-5-c4", "loop", "唔好點我名，羞家。", "fm-1", [
        them("羞家都要答。你七點到唔到。"),
        narr("你淨係話羞，問題返到最初。"),
      ]),
    ]),

    question("fm-6", id, [
      them("你連句場面話都要同我對住幹。"),
      them("我白養你。你以後唔好叫我媽咪。"),
    ], [
      choice("fm-6-c1", "boundary", "我叫你媽咪。群組我講實話，唔講大話。", "fm-success", [
        narr("你冇斷絕，亦都冇為面子改口。"),
      ]),
      choice("fm-6-c2", "fall", "白養？咁我以後真係唔返。", "fm-fail-cutoff", [
        narr("你裁家庭。佢下一句已經講鑰匙。"),
      ]),
      choice("fm-6-c3", "fall", "你講到咁，我乜都答應。", "fm-fail-surrender", [
        narr("你一軟，清單自己開始長。"),
      ]),
      choice("fm-6-c4", "loop", "你冷靜啲，好似拍緊戲。", "fm-5", [
        them("戲？全家等你句「今晚見」。"),
        narr("一句冷靜，佢拉返你去群組。"),
      ]),
    ]),

    ending("fm-success", id, "success", "群組你自己回", [
      narr("你喺「家和萬事興」打咗三行：對唔住三姨，今晚收到十點，去唔到，遲啲補賀。"),
      them("你至少紅包轉多啲。"),
      narr("夜晚十一點，媽咪傳咗張宴席相，冇字。"),
      narr("你昨晚有返工。你冇喺群組講大話。"),
    ]),
    ending("fm-fail-outsider", id, "fail", "外人", [
      them("好。你想做外人，就做外人。"),
      narr("群組仲點緊你。三姨私訊你爸。"),
      narr("你爸打嚟，第一句係你令媽咪點見人。"),
    ]),
    ending("fm-fail-bargain", id, "fail", "下個月嘅你", [
      narr("八八八轉咗。群組代你寫「下次一定」。"),
      them("表舅公壽宴，你請定假未。而家請。"),
      narr("今晚你避到。單據寫喺下個月。"),
    ]),
    ending("fm-fail-public", id, "fail", "收到，今晚見", [
      narr("七點十四分，三姨影咗張空凳。"),
      them("你人呢。你唔好令我現眼。"),
      narr("你喺倉後面打字。大話有十二個證人。"),
    ]),
    ending("fm-fail-cutoff", id, "fail", "以後唔返", [
      them("你講得出。鑰匙放下先。"),
      narr("飲宴變成遷冊。你今晚邊樣都未處理好。"),
    ]),
    ending("fm-fail-surrender", id, "fail", "乜都答應", [
      narr("你應承今晚到、紅包加倍、下個月第一個、仲要霸位。"),
      them("終於識做。記得著有領。"),
      narr("界線一放，清單自己長。"),
    ]),
    ending("fm-fail-doctor", id, "fail", "順便睇", [
      narr("三姨帶咗個物理治療師提早到。"),
      them("人哋專登嚟。你躺平俾人睇。"),
      narr("病假冇請成。你個腰比塊面先到。"),
    ]),
    ending("fm-fail-show", id, "fail", "食兩口", [
      them("走？甜品未上。你坐多陣先算到過。"),
      narr("「陣」係到最後一檯散。"),
      narr("舖頭經理有三個未接來電。"),
    ]),
    ending("fm-fail-car", id, "fail", "表哥架車", [
      narr("六點二十五分，表哥喺落客區閃燈。"),
      them("你快啲落。成車人等你。"),
      narr("你鞋帶未綁已經喺後座。紅隧入面先記起自己講過「試下」。"),
    ]),
    ending("fm-fail-speaker", id, "fail", "擴音", [
      them("你同佢講，家族有事，係傳統。"),
      narr("經理批咗，亦都記住咗。"),
      narr("你返到公司，假期紙多咗一行備註。"),
    ]),
    ending("fm-fail-quitjob", id, "fail", "辭職都避唔到", [
      them("辭職？好呀，你今晚更有時間。七點見。"),
      narr("經理未收到信。媽咪已經當你有空。"),
      narr("兩個問題都未完。"),
    ]),
  ]),
};
