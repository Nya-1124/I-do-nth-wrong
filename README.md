# 我冇做錯

A static, mobile-first satirical chat game in Hong Kong Cantonese.

女朋友、屋企人、老闆。每題四個選擇，得一條可以守住界線；有啲答案會打圈，返到之前嗰條問題。虛構諷刺，唔係感情、家庭或者職場忠告。冇登入，冇後端，冇收集資料。

## 本地開

```bash
python3 -m http.server 8080
```

瀏覽器開 <http://127.0.0.1:8080/>。唔好用 `file://`，模組腳本要經 HTTP。

## 測試

```bash
node --test tests/game.test.mjs
```

會檢查選擇圖：成功結局去到、打圈返去更早嘅問題、問句冇死路、靜態檔用相對路徑。

## GitHub Pages

專案頁路徑係 `/I-do-nth-wrong/`。遊戲檔喺 repo 根目錄，連結係相對，所以子路徑同本地根路徑都用得。根目錄有 `.nojekyll`，避免 Jekyll 用 README 做首頁。

[`.github/workflows/pages.yml`](.github/workflows/pages.yml) 會將同一批遊戲檔上傳去 GitHub Actions。Pages 如果仍然係從 `main` 根目錄發佈，`.nojekyll` 同 `index.html` 都會係個遊戲。

頁面：<https://nya-1124.github.io/I-do-nth-wrong/>

唔好為咗部署改 repo 嘅 public / private。
