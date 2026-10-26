//==============================================================================================
//  1) DESCRIPTION
//    quizData — every read of the bundled quiz.json in one place. Each quiz is one video's
//    questions (trf_reference / qq_rfid).
//
//    Exports:
//      orderedReferences  — the videos in quiz-list order (RFID_ORDER, then rf_desc)
//      findReference      — one video by rf_rfid, or null
//      referenceQuestions — a video's questions for a quiz, in file order, capped at
//                           QUIZ_MAXQUESTIONS
//
//  2) NOTES
//    quiz.json is exported by next-bridgeschool's /owner route and copied into src/data by hand;
//    changing questions means a new app release. Questions are never re-sorted here — the file
//    is already in qq_sbid, qq_seq order and that order matters.
//
//  3) CHANGE HISTORY
//    2026-10-25 — one quiz per video instead of per subject: orderedSubjects / findSubject /
//                 subjectQuestions replaced by orderedReferences / findReference /
//                 referenceQuestions (keyed by rf_rfid / qq_rfid)
//==============================================================================================

import quizJson from '@/data/quiz.json'
import { QUIZ_MAXQUESTIONS, RFID_ORDER } from '@/constants'
import type { QuizData, table_Questions, table_Reference } from '@/types'

const quizData: QuizData = quizJson

//----------------------------------------------------------------------------------
//  orderedReferences — the videos in quiz-list order
//  Returns: videos listed in RFID_ORDER first, in that order, then any others by rf_desc
//----------------------------------------------------------------------------------
export function orderedReferences(): table_Reference[] {
  const listed: table_Reference[] = []
  for (const rf_rfid of RFID_ORDER) {
    const reference = findReference(rf_rfid)
    if (reference) listed.push(reference)
  }
  const others = quizData.references
    .filter(reference => !RFID_ORDER.includes(reference.rf_rfid))
    .sort((a, b) => a.rf_desc.localeCompare(b.rf_desc))
  const references = [...listed, ...others]
  return references
}

//----------------------------------------------------------------------------------
//  findReference — one video by id
//  Params:  rf_rfid — the video id
//  Returns: the video, or null when quiz.json does not hold it
//----------------------------------------------------------------------------------
export function findReference(rf_rfid: number): table_Reference | null {
  const reference = quizData.references.find(r => r.rf_rfid === rf_rfid) ?? null
  return reference
}

//----------------------------------------------------------------------------------
//  referenceQuestions — a video's questions for one quiz
//  Params:  rf_rfid — the video id
//  Returns: its questions in file order, at most QUIZ_MAXQUESTIONS
//----------------------------------------------------------------------------------
export function referenceQuestions(rf_rfid: number): table_Questions[] {
  const questions = quizData.questions
    .filter(question => question.qq_rfid === rf_rfid)
    .slice(0, QUIZ_MAXQUESTIONS)
  return questions
}
