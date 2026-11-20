import { choice, ending, narr, question, them } from "./build.js";

const id = "boss";

export const boss = {
  character: {
    id,
    name: "陳生",
    role: "老闆",
    initial: "陳",
    tone: "slate",
    hook: "你改完先走得。",
    premise: "星期四收工。朝早報備過，七點半太和。",
    scene: "星期四，六點四十一分。你喺公司閂緊電腦。朝早寫低：七點半太和，阿嬤九十歲，修訂星期一朝交。",
    start: "bs-1",
  },
  nodes: Object.fromEntries([
    question("bs-1", id, [
      them("份deck我睇完。三頁字體唔統一。"),
      them("你今晚改完先走得。客戶聽朝九點要。"),
    ], [
      choice("bs-1-c1", "boundary", "字體星期一朝九點交。今晚我唔留。", "bs-2", [
        narr("你將交付同收工分開講，冇評論份工值唔值得。"),
      ]),
      choice("bs-1-c2", "fall", "我而家改，半個鐘。", "bs-half", [
        them("半個鐘？三頁仲要對英文。"),
        narr("你一留，半個鐘就唔係半個鐘。"),
      ]),
      choice("bs-1-c3", "fall", "字體唔統一，又唔係末日。", "bs-tone", [
        them("末日唔末日，聽朝九點打得開先算。"),
        narr("你一評分，佢就轉去問你態度。"),
      ]),
      choice("bs-1-c4", "fall", "聽朝九點？你五點先改口。", "bs-deadline", [
        them("客戶五點先確認。"),
        narr("你捉完時間，佢將家宴變成你要解釋嘅事。"),
      ]),
    ]),

    question("bs-half", id, [
      them("我叫阿Kay一齊留。你哋開個通話。"),
      them("對埋英文先准走。"),
    ], [
      choice("bs-half-c1", "boundary", "唔開通話。星期一交，我唔留。", "bs-3", [
        narr("你收回半個鐘，通話都唔開。"),
      ]),
      choice("bs-half-c2", "fall", "叫阿Kay，我哋輪住改。", "bs-fail-kay", [
        narr("阿Kay其實喺地鐵。通話一開就收唔到科。"),
      ]),
      choice("bs-half-c3", "loop", "今晚改中文，英文聽朝先。", "bs-1", [
        them("客戶識睇英文。三頁字體，邊頁先。"),
        narr("你拆開做，任務返到開頭再講。"),
      ]),
      choice("bs-half-c4", "fall", "你一次過標齊，我通宵改。", "bs-fail-comments", [
        narr("你叫佢標。佢標咗四十七個。"),
      ]),
    ]),

    question("bs-tone", id, [
      them("你再講一句唔緊要，聽日朝會我公開講。"),
      them("你想個組一齊聽，定你而家改口。"),
    ], [
      choice("bs-tone-c1", "boundary", "唔爭論。星期一交，今晚我走。", "bs-2", [
        narr("你停止評分，將交付同離開講清楚。"),
      ]),
      choice("bs-tone-c2", "fall", "你公開講啦，我都想聽。", "bs-fail-meeting", [
        narr("你叫佢公開。第二朝佢真係講。"),
      ]),
      choice("bs-tone-c3", "fall", "態度我改，今晚我留。", "bs-fail-stay", [
        narr("你為態度留低。態度未討論完，第5頁先到。"),
      ]),
      choice("bs-tone-c4", "loop", "你朝早先改口，關我態度咩事。", "bs-1", [
        them("你仲喺度辯。今晚改完先走，定而家走。"),
        narr("辯完一輪，選擇題返到開頭。"),
      ]),
    ]),

    question("bs-deadline", id, [
      them("你而家改完先走，定我同客戶解釋你要飲宴。"),
      them("你自己揀。"),
    ], [
      choice("bs-deadline-c1", "boundary", "家宴朝早報備咗。星期一交，我唔留。", "bs-4", [
        narr("你冇解釋飲宴值唔值得，淨係重申報備同交付。"),
      ]),
      choice("bs-deadline-c2", "fall", "你唔好同客戶講。我留。", "bs-fail-stay", [
        narr("你為咗封鎖客戶而留低。"),
      ]),
      choice("bs-deadline-c3", "fall", "你同客戶講我阿嬤生日。", "bs-fail-client", [
        narr("阿嬤被你寫進客戶個故事。客戶問邊個話事。"),
      ]),
      choice("bs-deadline-c4", "loop", "食飯係人，你當我機械呀？", "bs-1", [
        them("機械先準時。三頁字體，邊頁先改。"),
        narr("一句氣話，任務返到開頭。"),
      ]),
    ]),

    question("bs-2", id, [
      them("家宴可以食第二輪。"),
      them("團隊而家個個留低，得你一個講私人嘢。"),
    ], [
      choice("bs-2-c1", "boundary", "報備過。星期一交。我而家收工。", "bs-3", [
        narr("你重申報備同交付，冇同「個個留低」對質。"),
      ]),
      choice("bs-2-c2", "fall", "邊個留低，你講個名。", "bs-names", [
        them("名你唔使知。你影張工位相，證明你頂住。"),
        narr("你一問名，佢改為要相。"),
      ]),
      choice("bs-2-c3", "fall", "我留。但今晚OT你要批。", "bs-ot", [
        them("你開口講錢，就唔似我當日睇中嘅人。"),
        narr("你一講錢，話題變成你嘅心態。"),
      ]),
      choice("bs-2-c4", "fall", "阿嬤九十歲，你想我點。", "bs-grandma", [
        them("九十歲更應該體諒你有工開。"),
        narr("你搬阿嬤出嚟，佢就借阿嬤壓你。"),
      ]),
    ]),

    question("bs-names", id, [
      them("你而家影。我話俾個組聽你頂住。"),
      them("影完再改第2頁。"),
    ], [
      choice("bs-names-c1", "boundary", "我唔影工位相。星期一交，我收工。", "bs-4", [
        narr("你拒咗張相，交付日再講一次。"),
      ]),
      choice("bs-names-c2", "fall", "相我影。你要邊個角度。", "bs-fail-photo", [
        narr("你影咗。個組多咗張貼紙。"),
      ]),
      choice("bs-names-c3", "loop", "缺人你叫阿Kay，唔關我事。", "bs-2", [
        them("你推俾人。團隊留低，你走唔走。"),
        narr("你一推，問題拉返去團隊。"),
      ]),
      choice("bs-names-c4", "fall", "我問阿Kay係咪自願留。", "bs-fail-meeting", [
        narr("你問咗。朝會白板預留咗你個名。"),
      ]),
    ]),

    question("bs-ot", id, [
      them("我當年做到朝都冇叫過錢。"),
      them("你而家講OT，心態就要檢討。"),
    ], [
      choice("bs-ot-c1", "boundary", "我唔爭錢。星期一交，今晚我走。", "bs-4", [
        narr("你唔爭今晚錢，亦都唔留。"),
      ]),
      choice("bs-ot-c2", "fall", "心態我擺正。我留，唔使錢。", "bs-fail-stay", [
        narr("你為心態留低。心態冇人工，頁數有。"),
      ]),
      choice("bs-ot-c3", "loop", "唔要錢，補假都得。", "bs-2", [
        them("補假？家宴都可以補。你走唔走。"),
        narr("你一講假，佢拉返去團隊留低。"),
      ]),
      choice("bs-ot-c4", "loop", "你當年冇OT，關我咩事。", "bs-1", [
        them("關你事。我培養你。三頁字體邊頁先。"),
        narr("一句頂嘴，任務返到開頭。"),
      ]),
    ]),

    question("bs-grandma", id, [
      them("你拍張電腦前嘅相，我轉發個組。"),
      them("證明團隊頂得住。你阿嬤都會明白。"),
    ], [
      choice("bs-grandma-c1", "boundary", "我唔影相上組。家宴我去，星期一交。", "bs-5", [
        narr("你拒絕將阿嬤同工位一齊上組。"),
      ]),
      choice("bs-grandma-c2", "fall", "相我而家拍。", "bs-fail-photo", [
        narr("你成為個組嘅證據。陳生話光線暗，叫你再拍。"),
      ]),
      choice("bs-grandma-c3", "loop", "你想我點同阿嬤開口。", "bs-2", [
        them("點講係你屋企事。團隊留低，你走唔走。"),
        narr("你問佢點開口，佢拉返去團隊。"),
      ]),
      choice("bs-grandma-c4", "fall", "我開視像，你同阿嬤打個招呼。", "bs-fail-video", [
        narr("阿嬤以為係拜年，叫陳生食多啲。"),
      ]),
    ]),

    question("bs-3", id, [
      them("呢份工我當你自己人先交俾你。"),
      them("自己人唔會計較一個晚上。你令我好失望。"),
    ], [
      choice("bs-3-c1", "boundary", "星期一交乾淨版。失望唔係理由。", "bs-4", [
        narr("你接得住失望，但冇用留低嚟賠罪。"),
      ]),
      choice("bs-3-c2", "fall", "你失望，我留低改。", "bs-fail-stay", [
        narr("你為失望留低。第4頁開始出現。"),
      ]),
      choice("bs-3-c3", "fall", "咁你炒咗我。", "bs-bluff", [
        them("炒你？你想我講呢句。"),
        narr("你一講炒，佢就叫你先道歉。"),
      ]),
      choice("bs-3-c4", "loop", "我將字體改成漫畫體。", "bs-1", [
        them("我冇心情同你嬉皮笑臉。三頁，邊頁先。"),
        narr("玩笑完，任務返到開頭再講。"),
      ]),
    ]),

    question("bs-bluff", id, [
      them("我當頭先冇發生。"),
      them("你而家道歉。道歉完先準講收工。"),
    ], [
      choice("bs-bluff-c1", "boundary", "唔為飯碗道歉。星期一交，今晚走。", "bs-5", [
        narr("你冇靠道歉保飯碗。"),
      ]),
      choice("bs-bluff-c2", "fall", "對唔住，我而家打開電腦。", "bs-fail-stay", [
        narr("你道完歉。電腦一開，麵已經熱緊。"),
      ]),
      choice("bs-bluff-c3", "loop", "你真係唔炒？咁我聽日先改。", "bs-3", [
        them("你試探我。你令我幾失望，講。"),
        narr("試探完，佢拉返去自己人。"),
      ]),
      choice("bs-bluff-c4", "fall", "炒就炒，字體你自己統一。", "bs-fail-quit", [
        narr("你講炒。佢將辭職信同字體排同一日交。"),
      ]),
    ]),

    question("bs-4", id, [
      them("你知個客戶邊個。搞砸咗，我個名先出事。"),
      them("開電腦，共享畫面。我睇住你改，十分鐘。"),
    ], [
      choice("bs-4-c1", "boundary", "我唔共享畫面。星期一朝九點交。", "bs-5", [
        narr("你拒咗被睇住改，交付時間再講一次。"),
      ]),
      choice("bs-4-c2", "fall", "十分鐘，你睇住我改。", "bs-ten", [
        them("第一頁你仲喺度搵字體。你唔好斷線。"),
        narr("十分鐘一到，麵先熱。"),
      ]),
      choice("bs-4-c3", "fall", "共享可以，鏡頭避開張床。", "bs-fail-room", [
        narr("你一開，佢第一句唔係字體。"),
      ]),
      choice("bs-4-c4", "fall", "我自己同客戶講，星期一先要。", "bs-fail-client", [
        narr("你越過陳生。客戶先打俾佢。"),
      ]),
    ]),

    question("bs-ten", id, [
      them("我去熱多碗麵。你共享住，唔好郁。"),
      them("熱完麵我哋再對第2頁。"),
    ], [
      choice("bs-ten-c1", "boundary", "我斷線。十分鐘係我錯，星期一交。", "bs-6", [
        narr("你承認頭先答應錯，而家收返個畫面。"),
      ]),
      choice("bs-ten-c2", "fall", "你食麵，我繼續共享。", "bs-fail-room", [
        narr("麵熱好。你張床未移出畫面。"),
      ]),
      choice("bs-ten-c3", "loop", "我改第一頁，其餘聽朝。", "bs-1", [
        them("聽朝客戶九點。你邊頁先，重新講。"),
        narr("拆頁失敗，任務返到開頭。"),
      ]),
      choice("bs-ten-c4", "loop", "你食麵我去太和，返嚟再共享。", "bs-4", [
        them("共享而家開住。你唔好斷。"),
        narr("你想兩邊兼得，佢拉返你去畫面。"),
      ]),
    ]),

    question("bs-5", id, [
      them("我轉頭打俾你。你接。"),
      them("你唔接，我當你放棄呢單。聽日朝會我講。"),
    ], [
      choice("bs-5-c1", "boundary", "車上我唔接。交付星期一朝九點。", "bs-6", [
        narr("你預告唔接，同時講明朝會可以講嘅交付時間。"),
      ]),
      choice("bs-5-c2", "fall", "你打，我接。", "bs-fail-call", [
        narr("你接聽。阿嬤問你個上司食咗飯未。"),
      ]),
      choice("bs-5-c3", "fall", "你威脅我。我開始錄音。", "bs-record", [
        them("你錄呀。錄完都要交貨。"),
        narr("你一錄，佢就叫你刪。"),
      ]),
      choice("bs-5-c4", "loop", "我已讀，唔回，先衝去車站。", "bs-4", [
        them("已讀？好，當你默認留低。"),
        narr("你冇講收工，佢拉返你去共享畫面。"),
      ]),
    ]),

    question("bs-record", id, [
      them("刪咗段錄音，我當你一時衝動。"),
      them("唔刪，聽日朝會一齊聽。"),
    ], [
      choice("bs-record-c1", "boundary", "唔刪唔共享。車上唔接，星期一交。", "bs-6", [
        narr("你冇用刪錄音換和平，交付日照講。"),
      ]),
      choice("bs-record-c2", "fall", "我刪，你唔好再提朝會。", "bs-fail-call", [
        narr("錄音刪咗。電話照打嚟。"),
      ]),
      choice("bs-record-c3", "fall", "錄音我留，朝會一齊播。", "bs-fail-meeting", [
        narr("你準備公開。朝會真係有你份。"),
      ]),
      choice("bs-record-c4", "loop", "衝動係你先。你聽朝先改口。", "bs-5", [
        them("你仲辯。接我電話，定我當你放棄。"),
        narr("辯責一輪，電話嗰條拉返再問。"),
      ]),
    ]),

    question("bs-6", id, [
      them("我培養你三年。"),
      them("你今晚走，以後重要嘅客你唔使摸。"),
    ], [
      choice("bs-6-c1", "boundary", "今晚走。星期一交。資格我唔換。", "bs-success", [
        narr("你將工作、時間、資格拆開三樣講。"),
      ]),
      choice("bs-6-c2", "fall", "我而家返公司，你繼續教。", "bs-fail-return", [
        narr("你折返。大堂冷氣已經去到強檔。"),
      ]),
      choice("bs-6-c3", "loop", "重要嘅客你自己跟。", "bs-3", [
        them("你呢個態度。你令我幾失望，講。"),
        narr("一句硬頸，佢拉返去自己人嗰套。"),
      ]),
      choice("bs-6-c4", "fall", "我想清楚，我辭職。", "bs-fail-quit", [
        narr("你講辭職。佢聽到嘅係你仲要交貨。"),
      ]),
    ]),

    ending("bs-success", id, "success", "星期一朝九點", [
      them("星期一朝九點。你唔好交遲。"),
      narr("你閂咗電腦。太和方向，車門響。"),
      narr("冇共享畫面，冇工位相，冇將阿嬤拉入組。"),
      narr("湯你趕得切。"),
    ]),
    ending("bs-fail-stay", id, "fail", "你留低", [
      them("順手啦。你都留咗。第5頁有舊標誌。"),
      narr("阿嬤將你嗰份匙羹轉咗去表哥面前。"),
      narr("你仲喺度對齊字體。"),
    ]),
    ending("bs-fail-return", id, "fail", "返到公司", [
      them("培養就係咁。你坐低，我叫車。"),
      narr("架車係送客戶，唔係送你去太和。"),
      narr("大堂冷氣強檔。你個位仲暖。"),
    ]),
    ending("bs-fail-quit", id, "fail", "辭職信星期一交", [
      them("辭職信星期一朝同字體一齊交。今晚你先改完。"),
      narr("阿嬤個群組有人問你係咪仲返緊工。"),
      narr("你兩個都答唔清。"),
    ]),
    ending("bs-fail-room", id, "fail", "共享畫面", [
      them("你張床入鏡。收一收。客戶見到點算。"),
      narr("你整理房間到十點。字體仲係三款。"),
      narr("太和嘅湯涼咗。"),
    ]),
    ending("bs-fail-client", id, "fail", "你越過佢", [
      them("客戶問我，員工係咪你話事。你照我句式寫解釋。"),
      narr("家宴冇去。解釋信長過份簡報。"),
    ]),
    ending("bs-fail-call", id, "fail", "湯涼咗", [
      them("伯母生日快樂。你而家去走廊，對第12頁。"),
      narr("三頁變成十二頁。阿嬤叫你食多啲，你應咗。"),
      narr("你個上司未收線。"),
    ]),
    ending("bs-fail-kay", id, "fail", "輪住改", [
      them("阿Kay你都唔好收線。團隊精神。"),
      narr("阿Kay喺紅隧。你喺公司。兩個晚上都冇咗。"),
      narr("中文十一點先齊，英文未開始。"),
    ]),
    ending("bs-fail-comments", id, "fail", "四十七個印", [
      them("你通宵我先放心。朝早九點見。"),
      narr("四十七個印，三個寫住「呢度可以再諗諗」。"),
      narr("通宵係你自己開口。家宴張相你睇唔切。"),
    ]),
    ending("bs-fail-meeting", id, "fail", "朝會公開", [
      them("有人想公開討論態度。我哋而家討論。"),
      narr("白板有你個名。你要當住個組，再講一次點解你要走。"),
    ]),
    ending("bs-fail-photo", id, "fail", "工位相", [
      them("個相光線暗。再影。影完改第2頁。"),
      narr("你成為貼紙。電腦未閂。"),
      narr("太和開席。"),
    ]),
    ending("bs-fail-video", id, "fail", "視像問候", [
      them("伯母好好人。你同佢講，改完三頁先入席。"),
      narr("阿嬤話做好你份工。你喺飯桌打開電腦。"),
      narr("陳生未收線。"),
    ]),
  ]),
};
