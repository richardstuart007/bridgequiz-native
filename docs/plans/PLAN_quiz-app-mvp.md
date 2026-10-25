# PLAN_quiz-app-mvp — bridgequiz-native

## Title
Quiz app MVP — Expo app (copied from bridgeschool-native) running quizzes from a bundled quiz.json

## Plan

### Agreed design (from discussion, 2026-10-25)
- Quiz only, no videos. No DB, no writes, results held in memory for the current quiz only.
- Data: bundled `src/data/quiz.json` (contract v1, exported from next-bridgeschool `/owner`, already
  copied in — 7 subjects, 151 questions).
- Rename table **agreed as proposed** (2026-10-25).
- **Subjects are not grouped** — one plain list in the same order as bridgeschool-native's video
  list: `SBID_ORDER` = Two Way Checkback (17), Bergen Raises (5), Re-doubles (16), Cue 1st and 2nd
  Controls (6), Michaels Cue Bid (11), Quantitative 4NT (15), Lebensohl (1006). A subject in
  quiz.json but not in the list is appended after, by `sb_title`. (Replaces the proposed `LEVELS`.)
- Subject rows use the web's `QUIZ_COLOR` (amber-800, `#92400e`), as the video app uses
  `VIDEO_COLOR`.
- Bid display mirrors web `bidding.tsx`, except **`XX` is shown as `XX`** (the web keeps only the
  first character, so it shows redoubles as `X` — 13 bids in Re-doubles).
- Screens: **Subjects** → **Quiz** (one question at a time; on tapping an
  answer the choices lock, the correct answer is shown green, a wrong pick red, `qq_help` shown if
  present, then Next) → **Summary** ("7 out of 10 correct", Try again / Back to subjects).
- Question order = file order (`qq_sbid, qq_seq`) — never shuffled; capped at 50 (constant).
- Answer choices always shuffled for display; correct = original index 0 of `qq_ans`.
- Bidding/hands parsed and shown as the web does (`bidding.tsx`, `hands.tsx`); suits as coloured
  Unicode ♠ ♥ ♦ ♣ (hearts/diamonds red).
- Mirror bridgeschool-native's setup, version footer, Android update banner, Update help screen
  and release script with the minimum renames (table below).

### Copy / rename table (bridgeschool-native → bridgequiz-native) — to be agreed
| Item | bridgeschool-native | bridgequiz-native (proposed) |
|---|---|---|
| app.json `expo.name` | Bridge School | Bridge Quiz |
| app.json `expo.slug` | bridgeschool-native | bridgequiz-native |
| app.json `expo.scheme` | bridgeschoolnative | bridgequiznative |
| app.json `android.package` | com.richardstuart007.bridgeschool | com.richardstuart007.bridgequiz |
| app.json `extra.eas.projectId` | d731deb1-… | removed — new Expo project via `eas init` (user step) |
| app.json `version` | 1.0.1 | 1.0.0 |
| app.json android permissions | storage + media | removed (no files saved) |
| app.json plugins | router, splash, expo-video, expo-media-library | router, splash |
| app.json ios infoPlist file sharing | UIFileSharingEnabled, LSSupports… | removed |
| package.json `name` / `version` | bridgeschool-native / 1.0.3 | bridgequiz-native / 1.0.0 |
| GitHub repo | richardstuart007/bridgeschool-native | richardstuart007/bridgequiz-native |
| APK asset name | AndroidBridgeschool.apk | AndroidBridgequiz.apk |
| Release title / temp folder | Bridge School / bridgeschool-release- | Bridge Quiz / bridgequiz-release- |
| EAS build link in release notes | …/projects/bridgeschool-native/… | …/projects/bridgequiz-native/… |
| Home title | Bridge School Videos | Bridge Quiz |
| Update screen title | Update Bridge School | Update Bridge Quiz |
| Update step "Your saved videos are kept." | present | removed |
| Version footer | Bridge School v… | Bridge Quiz v… |
| constants `R2_BASE_URL`, `SAVED_FOLDER`, `VIDEOS` | present | removed (no R2, no saving) |
| new constant | — | `QUIZ_MAXQUESTIONS = 50` (DD root: `us_maxquestions`) |
| new constant | — | `LEVELS` — level display order, from web `colours.ts` (to confirm) |
| Files copied unchanged apart from renames | appVersion.ts, UpdateBanner.tsx, update.tsx, releaseAndroid.mjs, eas.json, tsconfig.json, .gitignore, assets/, AGENTS.md, .vscode/ | same |
| Files not copied | savedVideos.ts, VideoRow.tsx, player/[rf_desc].tsx | — |

### Dependencies (from bridgeschool-native, same versions) — install needs approval
- Keep: expo, expo-constants, expo-dev-client, expo-font, expo-linking, expo-router,
  expo-splash-screen, expo-status-bar, expo-system-ui, react, react-dom, react-native,
  react-native-gesture-handler, react-native-reanimated, react-native-safe-area-context,
  react-native-screens, react-native-web, react-native-worklets; dev: @react-native/metro-config,
  @types/react, typescript.
- Drop: expo-video, expo-media-library, expo-file-system (video/saving only); @expo/ui,
  expo-glass-effect, expo-symbols, expo-image, expo-web-browser, expo-device (unused template).

### Steps
- [x] 1. Project skeleton: copy config/assets/script files per the rename table (app.json,
      package.json, eas.json, tsconfig.json, .gitignore, AGENTS.md, .vscode/, assets/,
      scripts/releaseAndroid.mjs)
- [x] 2. Install dependencies (approved install of the Keep list above)
- [x] 3. `src/types.ts` — `table_Subject` (sb_sbid, sb_owner, sb_subject, sb_title, sb_level),
      `table_Questions` (the 11 exported `qq_` fields), `QuizData` (exported_at, subjects,
      questions); names match next-bridgeschool `definitions.ts`
- [x] 4. `src/constants.ts` — QUIZ_MAXQUESTIONS, SBID_ORDER (replaces LEVELS), QUIZ_COLOR,
      ANDROID_APK_URL, GITHUB_LATEST_RELEASE_URL
- [x] 5. `src/quizData.ts` — reads the bundled quiz.json: subjects in SBID_ORDER (then
      sb_title), a subject by sb_sbid, a subject's questions in file order capped at
      QUIZ_MAXQUESTIONS
- [x] 6. `src/appVersion.ts`, `src/components/UpdateBanner.tsx`, `src/app/update.tsx` — copies
      with renames
- [x] 7. Components: `SuitSymbol` (shared by bidding + hands), `QuizBidding`, `QuizHands`,
      `QuizChoices` (shuffled options, locked after answer, green/red feedback),
      `QuizFeedback` (right/wrong line + qq_help box hidden when empty + Next — replaces the
      planned `QuizHelp`), `QuizSummary`, `SubjectRow`
- [x] 8. Screens: `src/app/_layout.tsx` (stack: index, quiz/[sb_sbid], update),
      `src/app/index.tsx` (Subjects + version footer + update banner),
      `src/app/quiz/[sb_sbid].tsx` (question → feedback → summary, all in memory)
- [x] 9. Type-check and lint — tsc passes; lint skipped (no ESLint config in this project or in
      bridgeschool-native; `expo lint` would install ESLint packages)
- [ ] 10. User setup steps (not done by Claude), in order: install (step 2) → git init + public
      GitHub repo richardstuart007/bridgequiz-native → eas init (new Expo project, writes
      projectId) → commit + push → npm run release:android (first release, v1.0.0) → richard-
      dashboard card (instruction given in chat, built from a richard-dashboard session)

## Changes
### Copied unchanged from bridgeschool-native
- eas.json, tsconfig.json, .gitignore, AGENTS.md, .vscode/, assets/ (icons still Expo's
  placeholder, as in bridgeschool-native), src/appVersion.ts

### app.json
- `eas init --non-interactive --force` created Expo project
  @richardstuart007-team/bridgequiz-native and wrote `extra.eas.projectId`
  3abe22a7-b4c2-4710-8d9b-7997655fdfe1
- Agreed renames (Bridge Quiz, bridgequiz-native, bridgequiznative, com.richardstuart007.bridgequiz,
  1.0.0); removed EAS projectId (new Expo project needed), storage/media permissions, iOS
  file-sharing keys, expo-video and expo-media-library plugins

### package.json, package-lock.json
- name bridgequiz-native 1.0.0; the Keep dependency list at bridgeschool-native's versions;
  same scripts. Clean `npm install --legacy-peer-deps` → fresh package-lock.json (expo 58.0.19)
- Incident: a first install attempt ran in bridgeschool-native (PowerShell cwd left there by an
  earlier read) and regenerated its lock file; the user restored it with git checkout + npm ci.
  Rule saved to memory: writing/installing commands use absolute paths

### scripts/releaseAndroid.mjs
- Copy with renames only: repo richardstuart007/bridgequiz-native, asset AndroidBridgequiz.apk,
  "Bridge Quiz" titles/messages, EAS project link, temp-folder prefix

### src/types.ts
- table_Subject, table_Questions, QuizData — contract v1 fields, DB column names unchanged

### src/constants.ts
- QUIZ_MAXQUESTIONS = 50, SBID_ORDER (video-app order), QUIZ_COLOR (#92400e, web amber-800),
  ANDROID_APK_URL, GITHUB_LATEST_RELEASE_URL (bridgequiz-native repo)

### src/quizData.ts
- orderedSubjects / findSubject / subjectQuestions over the bundled quiz.json; questions never
  re-sorted, capped at QUIZ_MAXQUESTIONS

### src/components/UpdateBanner.tsx, src/app/update.tsx
- Copies with renames; update steps say AndroidBridgequiz.apk, "saved videos are kept" step
  and note removed

### src/components/SuitSymbol.tsx
- ♠ ♥ ♦ ♣ text symbols (U+FE0E text presentation), hearts/diamonds red

### src/components/QuizBidding.tsx
- N/E/S/W bidding table, bid codes parsed as the web's bidding.tsx except XX shown as XX

### src/components/QuizHands.tsx
- Seat × suit table as the web's hands.tsx ('n'/'N' blank, empty hands left out)

### src/components/QuizChoices.tsx
- Question text + answer buttons in the given (shuffled) order; lock after a pick, correct
  (qq_ans index 0) green, wrong pick red

### src/components/QuizFeedback.tsx
- "Correct" / "Wrong — the answer is …", help box only when qq_help has text, Next / See score

### src/components/QuizSummary.tsx
- "x out of y correct", Try again, Back to subjects

### src/components/SubjectRow.tsx
- VideoRow-shaped row in QUIZ_COLOR: ▶, sb_title, question count

### src/app/_layout.tsx, src/app/index.tsx, src/app/quiz/[sb_sbid].tsx
- Stack (Subjects, Quiz, Update); Subjects list + update banner + version footer; Quiz screen
  holding index / picked answer / correct count / finished / per-question shuffles in memory
  only, Try again reshuffles
- Quiz scroll ref typed as `ScrollViewInstance` (RN 0.88 type) — fixes tsc errors

### Component reuse check
- Bidding/hands/choices/summary/row are each one named component; SuitSymbol is shared by
  bidding and hands; no other screen renders the same shapes. The green panel style is repeated
  in QuizBidding / QuizHands / QuizChoices — a candidate for a shared panel component (not
  extracted — to be agreed)

## Testing
- [ ] Once dependencies are installed: npx tsc --noEmit and npx expo lint both pass
- [ ] Subjects screen lists 7 subjects in this order: Two Way Checkback (24), Bergen Raises (34),
      Re-doubles (16), Cue 1st and 2nd Controls (17), Michaels Cue Bid (25), Quantitative 4NT
      (10), Lebensohl (25); footer shows "Bridge Quiz v1.0.0"
- [ ] Open Bergen Raises: header shows the subject name, "Question 1 of 34", bidding table with
      suit symbols (♥ ♦ red), question text and answers
- [ ] Question 18 of Bergen Raises shows a South hand table (KQ92 / 732 / QJ8 / A86 under ♠ ♥ ♦ ♣)
- [ ] Pick a wrong answer: it turns red, the correct one green, "Wrong — the answer is …", the
      buttons no longer respond; pick right on another: green + "Correct"
- [ ] Answer order differs between questions/attempts (the correct answer is not always first);
      question order is always the same
- [ ] Re-doubles: redoubles show as "XX", passes as "Pass", blanks empty
- [ ] Finish Quantitative 4NT (10 questions): last button says "See score", summary shows
      "n out of 10 correct"; Try again restarts at Question 1 with score reset; Back to subjects
      returns to the list
- [ ] Leave a quiz mid-way with Back and reopen it: it starts again from Question 1 (nothing kept)
- [ ] Help box: none appears (the current export has no qq_help text)
