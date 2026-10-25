//==============================================================================================
//  1) DESCRIPTION
//    The project's single constants file — every tunable value.
//
//    QUIZ_MAXQUESTIONS — most questions in one quiz (web equivalent: the user's
//                        us_maxquestions); a subject's first QUIZ_MAXQUESTIONS questions in
//                        order are used
//    SBID_ORDER        — order of the Subjects list, by sb_sbid; same order as the
//                        bridgeschool-native video list. Subjects in quiz.json that are not
//                        listed here follow, by sb_title
//    QUIZ_COLOR        — subject row colour; the web's QUIZ_COLOR (Tailwind amber-800)
//    ANDROID_APK_URL   — fixed public download of the newest Android release (GitHub "latest"
//                        release asset) — never change
//    GITHUB_LATEST_RELEASE_URL — GitHub API address of the newest release, read by the
//                        update banner to learn the latest version
//==============================================================================================

export const QUIZ_MAXQUESTIONS = 50

export const SBID_ORDER: number[] = [
  17, //  Two Way Checkback
  5, //  Bergen Raises
  16, //  Re-doubles
  6, //  Cue 1st and 2nd Controls
  11, //  Michaels Cue Bid
  15, //  Quantitative 4NT
  1006 //  Lebensohl
]

export const QUIZ_COLOR = '#92400e'

export const ANDROID_APK_URL =
  'https://github.com/richardstuart007/bridgequiz-native/releases/latest/download/AndroidBridgequiz.apk'

export const GITHUB_LATEST_RELEASE_URL =
  'https://api.github.com/repos/richardstuart007/bridgequiz-native/releases/latest'
