//==============================================================================================
//  1) DESCRIPTION
//    The project's single constants file — every tunable value.
//
//    QUIZ_MAXQUESTIONS — most questions in one quiz (web equivalent: the user's
//                        us_maxquestions); a video's first QUIZ_MAXQUESTIONS questions in
//                        order are used
//    RFID_ORDER        — order of the quiz list, by rf_rfid (one quiz per video); same order
//                        as the bridgeschool-native video list. Videos in quiz.json that are
//                        not listed here follow, by rf_desc
//    QUIZ_COLOR        — quiz row colour; the web's QUIZ_COLOR (Tailwind amber-800)
//    ANDROID_APK_URL   — fixed public download of the newest Android release (GitHub "latest"
//                        release asset) — never change
//    GITHUB_LATEST_RELEASE_URL — GitHub API address of the newest release, read by the
//                        update banner to learn the latest version
//
//  3) CHANGE HISTORY
//    2026-10-25 — RFID_ORDER replaces SBID_ORDER: one quiz per video, so Lebensohl's 5 parts
//                 are listed separately
//==============================================================================================

export const QUIZ_MAXQUESTIONS = 50

export const RFID_ORDER: number[] = [
  1, //  Two Way Checkback
  2, //  Bergen Raises
  22, //  Redoubles
  3, //  Cue Bids 1st and 2nd Round Controls
  19, //  Michaels Cue Bid
  21, //  Quantitative 4NT
  14, //  Lebensohl: Part 1 Introducing the 2NT relay bid
  15, //  Lebensohl: Part 2 Direct bids at the 2 level
  16, //  Lebensohl: Part 3 Cuebid Stayman
  17, //  Lebensohl: Part 4 Game auctions without majors
  18 //  Lebensohl: Part 5 The Negative Double
]

export const QUIZ_COLOR = '#92400e'

export const ANDROID_APK_URL =
  'https://github.com/richardstuart007/bridgequiz-native/releases/latest/download/AndroidBridgequiz.apk'

export const GITHUB_LATEST_RELEASE_URL =
  'https://api.github.com/repos/richardstuart007/bridgequiz-native/releases/latest'
