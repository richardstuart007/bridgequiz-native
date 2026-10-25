# bridgequiz-native — project instructions

## What this project is

A native mobile app (Expo / React Native, TypeScript): the **quiz** section of next-bridgeschool
(`C:\Users\richa\claude\github\next-bridgeschool`, Next.js), with no database. Sibling of
bridgeschool-native (`C:\Users\richa\claude\github\bridgeschool-native`, video-only), which is
the pattern this project mirrors: same Expo setup, release script and update banner, with only
the minimum renames.

The questions are downloaded to the phone as one JSON file. Each question is shown, and as
soon as it is answered the app shows whether the answer was right, the correct answer and the
help text. Results are **never stored**: the score lives in memory for the current quiz only.

Out of scope: videos (not at this stage), login, users, sessions, history, any writes. The app
has **no database**, holds **no DB credentials**, and does **no DB access**.

## Source data (lives in next-bridgeschool's Postgres DB — read-only reference)

Definitions: `next-bridgeschool/src/lib/tables/definitions.ts` and
`next-bridgeschool/src/lib/tables/tableSpecific/schema.sql`.

- **Subjects** — `tsb_subject`: `sb_sbid`, `sb_owner`, `sb_subject`, `sb_title`, `sb_level`,
  `sb_cntquestions`.
- **Questions** — `tqq_questions`: `qq_qqid`, `qq_owner`, `qq_subject`, `qq_sbid`, `qq_seq`,
  `qq_detail` (question text), `qq_ans` (answers — **`qq_ans[0]` is always the correct one**),
  `qq_rounds` (bidding, rows of N/E/S/W), `qq_north`/`qq_east`/`qq_south`/`qq_west` (hands,
  one string per suit S/H/D/C; `'n'`/`'N'` = empty), `qq_help` (help text, often empty),
  `qq_points` (**not used** — scoring is simple "x out of y correct").
- Web quiz: `src/ui/dashboard/quiz/QuizServer.tsx` (fetch, drop questions with no answers, sort by
  `qq_qqid`, cap at the user's `us_maxquestions`, 3–50), `QuizClient.tsx`, `choices.tsx`
  (answers shuffled for display), `quiz-question/bidding.tsx` (bid code parsing: `P` = Pass,
  `X`, `?`, `' '`/`n`/`N` = blank, `xN` = no-trump), `quiz-question/hands.tsx`,
  `quizreview/reviewFormClient.tsx` (correct answer = index 0, `qq_help` shown via MyHelp).
- Local DB size (2026-10-25): 801 questions, 32 subjects, ~350 KB as JSON; owners NZBridge and
  Richard.

## Architecture

- Separate repo (this one). Expo / React Native, TypeScript, Expo Router.
- **Data delivery: static, bundled in the app** — `src/data/quiz.json`, imported as a data file
  (not pasted into the constants file). Works offline from install. Changing questions = new app
  release. (Changed 2026-10-25 from "R2 file + ETag version check" — far less to build; switch
  later only changes the loader, the JSON contract stays.) Possible later: EAS Update (OTA) to
  ship a new bundled quiz.json without a new APK.
- **Producing the JSON:** next-bridgeschool's **`/owner` route** — the owner selects which
  subjects to export (a subset of the `Richard` owner, as with the video app) and it writes
  `next-bridgeschool/exports/quiz.json`. The user copies it into `src/data/quiz.json` here (or
  asks Claude to — reading the other project and writing here is within project isolation).
  Then bump `expo.version` and release. The export feature lives in next-bridgeschool and is
  changed only from a session opened there.
- **JSON contract v1:** `{ exported_at, subjects: [sb_sbid, sb_owner, sb_subject, sb_title,
  sb_level], questions: [qq_qqid, qq_sbid, qq_seq, qq_detail, qq_ans, qq_rounds, qq_north,
  qq_east, qq_south, qq_west, qq_help] }`, questions sorted `qq_sbid, qq_seq`, values exactly
  as stored (nulls kept; bids like `'PASS'`, `'N'` = blank, parsed in the app as the web does).
- JSON contract keeps DB column names exactly (`sb_`/`qq_` fields, no aliases), holding only the
  columns the app uses.

## Workspace rule exceptions for this project

The global `~/.claude/CLAUDE.md` assumes Next.js + nextjs-shared. **This project is neither.**

- Does **not** apply: Next.js-specific rules (router hooks, `'use client'`/`'use server'`,
  App Router), nextjs-shared rules (CONSUMING_PROJECTS.md, `table_*` functions, `write_Logging`,
  shared components, Versions tab), DB/SQL rules (schema.sql, table naming, manual SQL, cache).
- **Still applies** — all general rules: plan before code (`#plan`/`#code`), explicit choices,
  naming matches the DD source, function headers, inline comment format, one constants file,
  `function` declarations, `await` not `.then()`, no calculation in JSX, ES `import` only
  (never `require()`), reusable components, approval before installs.
- Scaffolding (`npx create-expo-app` etc.) and every package install need approval — use the
  `safe-install` skill. Prefer `npx expo install` for Expo packages (see bridgeschool-native's
  `AGENTS.md`).
- Error logging: no `write_Logging` here; mirror bridgeschool-native (`console.error` with the
  `'Consequence: ' + message` format) unless agreed otherwise in the plan.

## Decisions (2026-10-25)

- **Quiz only** — no videos at this stage.
- **Data delivery = static, bundled `src/data/quiz.json`** (changed same day from R2 download).
- **Export** done by the owner from next-bridgeschool `/owner`, selecting the subjects; no R2
  upload, no R2 credentials.
- **Quiz chosen by subject** only (not per video / `qq_rfid`).
- **Question order is never shuffled** — order matters, some questions must come before others.
  Sort column (`qq_seq` vs `qq_qqid`) — **user is reviewing**; the JSON carries both.
- **Answer options are always shuffled** for display (else the correct `qq_ans[0]` would always
  be first). Correctness is tracked by original index 0, never by display position.
- **Max questions per quiz = 50**, a constant in the constants file.
- First export (2026-10-25T10:16Z): 7 subjects, 151 questions, all `Richard` — Cue 1st and 2nd
  Controls, Lebensohl, Two Way Checkback, Bergen Raises, Michaels Cue Bid, Quantitative 4NT,
  Re-doubles. In every subject `qq_seq` order == `qq_qqid` order. **None has `qq_help` text.**
- **Scoring:** simple "7 out of 10" — `qq_points` is not used.
- **Feedback per question:** right/wrong + correct answer + `qq_help` immediately after answering.
- **Results not stored** anywhere — in-memory for the current quiz only.

## Outstanding items

- Question sort column (`qq_seq` vs `qq_qqid`) — user reviewing (identical for the first export).
- No `qq_help` in the exported questions — feedback screen shows only right/wrong + correct
  answer until help text is added in next-bridgeschool.
- App name agreed "Bridge Quiz", package com.richardstuart007.bridgequiz, repo
  richardstuart007/bridgequiz-native, APK AndroidBridgequiz.apk (2026-10-25). Still to do: git
  init + create the GitHub repo, create/link the Expo project (`eas init`), first EAS build.
- Icon is Expo's placeholder (copied from bridgeschool-native).
- richard-dashboard "Bridge Quiz" Android download card — instruction handed to the user
  2026-10-25 (one new `apps.ts` entry after the Android "Bridge School" entry, `androidDownload`
  + `showOnHome`, url = this repo's releases/latest/download/AndroidBridgequiz.apk). The link 404s
  until the first GitHub release exists.
- Shared green "panel" style repeated in QuizBidding/QuizHands/QuizChoices — candidate for a
  shared component (not agreed).
