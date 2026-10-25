//==============================================================================================
//  1) DESCRIPTION
//    Data shapes for the app. Field names match next-bridgeschool's database columns exactly
//    (no aliases), holding only the columns exported to quiz.json (contract v1).
//
//    table_Subject — one quiz subject (next-bridgeschool tsb_subject):
//      sb_sbid    — subject id; questions link to it by qq_sbid
//      sb_owner   — owner (always 'Richard' in the current export)
//      sb_subject — subject code
//      sb_title   — subject name shown on screen
//      sb_level   — level (Beginner, Intermediate, ...); exported but not shown for now
//
//    table_Questions — one question (next-bridgeschool tqq_questions):
//      qq_qqid   — question id
//      qq_sbid   — the subject it belongs to
//      qq_seq    — sequence within the subject
//      qq_detail — the question text
//      qq_ans    — the answers; qq_ans[0] is always the correct one
//      qq_rounds — bidding, one row per round of N/E/S/W bid codes, or null
//      qq_north / qq_east / qq_south / qq_west — a hand as four suit strings (S, H, D, C), or
//                  null; 'n'/'N' means an empty suit
//      qq_help   — help text shown after answering; null or '' when there is none
//
//    QuizData — the whole quiz.json file:
//      exported_at — UTC time next-bridgeschool exported the file
//      subjects    — the exported subjects
//      questions   — their questions, in qq_sbid, qq_seq order
//==============================================================================================

export type table_Subject = {
  sb_sbid: number
  sb_owner: string
  sb_subject: string
  sb_title: string
  sb_level: string
}

export type table_Questions = {
  qq_qqid: number
  qq_sbid: number
  qq_seq: number
  qq_detail: string
  qq_ans: string[]
  qq_rounds: (string | null)[][] | null
  qq_north: string[] | null
  qq_east: string[] | null
  qq_south: string[] | null
  qq_west: string[] | null
  qq_help: string | null
}

export type QuizData = {
  exported_at: string
  subjects: table_Subject[]
  questions: table_Questions[]
}
