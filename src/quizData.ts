//==============================================================================================
//  1) DESCRIPTION
//    quizData — every read of the bundled quiz.json in one place.
//
//    Exports:
//      orderedSubjects  — the subjects in Subjects-list order (SBID_ORDER, then sb_title)
//      findSubject      — one subject by sb_sbid, or null
//      subjectQuestions — a subject's questions for a quiz, in file order, capped at
//                         QUIZ_MAXQUESTIONS
//
//  2) NOTES
//    quiz.json is exported by next-bridgeschool's /owner route and copied into src/data by hand;
//    changing questions means a new app release. Questions are never re-sorted here — the file
//    is already in qq_sbid, qq_seq order and that order matters.
//==============================================================================================

import quizJson from '@/data/quiz.json'
import { QUIZ_MAXQUESTIONS, SBID_ORDER } from '@/constants'
import type { QuizData, table_Questions, table_Subject } from '@/types'

const quizData: QuizData = quizJson

//----------------------------------------------------------------------------------
//  orderedSubjects — the subjects in Subjects-list order
//  Returns: subjects listed in SBID_ORDER first, in that order, then any others by sb_title
//----------------------------------------------------------------------------------
export function orderedSubjects(): table_Subject[] {
  const listed: table_Subject[] = []
  for (const sb_sbid of SBID_ORDER) {
    const subject = findSubject(sb_sbid)
    if (subject) listed.push(subject)
  }
  const others = quizData.subjects
    .filter(subject => !SBID_ORDER.includes(subject.sb_sbid))
    .sort((a, b) => a.sb_title.localeCompare(b.sb_title))
  const subjects = [...listed, ...others]
  return subjects
}

//----------------------------------------------------------------------------------
//  findSubject — one subject by id
//  Params:  sb_sbid — the subject id
//  Returns: the subject, or null when quiz.json does not hold it
//----------------------------------------------------------------------------------
export function findSubject(sb_sbid: number): table_Subject | null {
  const subject = quizData.subjects.find(s => s.sb_sbid === sb_sbid) ?? null
  return subject
}

//----------------------------------------------------------------------------------
//  subjectQuestions — a subject's questions for one quiz
//  Params:  sb_sbid — the subject id
//  Returns: its questions in file order, at most QUIZ_MAXQUESTIONS
//----------------------------------------------------------------------------------
export function subjectQuestions(sb_sbid: number): table_Questions[] {
  const questions = quizData.questions
    .filter(question => question.qq_sbid === sb_sbid)
    .slice(0, QUIZ_MAXQUESTIONS)
  return questions
}
