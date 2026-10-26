//==============================================================================================
//  1) DESCRIPTION
//    QuizScreen — runs one video's quiz, one question at a time: progress line, bidding,
//    hands, the question and its shuffled answers. Once an answer is picked it shows right /
//    wrong, the correct answer and any help text, then Next. After the last question it shows
//    the score ("7 out of 10 correct") with Try again / Back to quizzes.
//
//    Parameters:
//      rf_rfid (route param) — the video id, from the quiz list
//
//  2) NOTES
//    Everything is held in memory only — nothing is saved; leaving the screen discards it.
//    Questions stay in file order (never shuffled); only each question's answers are shuffled.
//    The shuffle for every question is made once when the quiz starts (and again on Try
//    again) so the order does not change while a question is on screen.
//
//  3) CHANGE HISTORY
//    2026-10-25 — one quiz per video: route param rf_rfid (was sb_sbid), title rf_desc
//==============================================================================================

import { useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, type ScrollViewInstance } from 'react-native'
import { router, Stack, useLocalSearchParams } from 'expo-router'

import QuizBidding from '@/components/QuizBidding'
import QuizChoices, { type QuizChoice } from '@/components/QuizChoices'
import QuizFeedback from '@/components/QuizFeedback'
import QuizHands from '@/components/QuizHands'
import QuizSummary from '@/components/QuizSummary'
import { findReference, referenceQuestions } from '@/quizData'
import type { table_Questions } from '@/types'

export default function QuizScreen() {
  const params = useLocalSearchParams<{ rf_rfid: string }>()
  const rf_rfid = Number(params.rf_rfid)
  const reference = findReference(rf_rfid)
  const questions = referenceQuestions(rf_rfid)

  const [index, setIndex] = useState(0)
  const [pickedIndex, setPickedIndex] = useState<number | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [choiceOrders, setChoiceOrders] = useState<QuizChoice[][]>(() => shuffledChoiceOrders(questions))

  const scrollRef = useRef<ScrollViewInstance>(null)

  //----------------------------------------------------------------------------------------------
  //  handlePick — records the picked answer (once per question) and counts it if correct
  //  Params:  qq_ansIndex — the picked answer's position in qq_ans (0 = correct)
  //----------------------------------------------------------------------------------------------
  function handlePick(qq_ansIndex: number): void {
    if (pickedIndex !== null) return
    setPickedIndex(qq_ansIndex)
    if (qq_ansIndex === 0) setCorrectCount(prev => prev + 1)
  }

  //----------------------------------------------------------------------------------------------
  //  handleNext — moves to the next question, or to the score after the last one
  //----------------------------------------------------------------------------------------------
  function handleNext(): void {
    const nextIndex = index + 1
    if (nextIndex >= questions.length) {
      setIsFinished(true)
      return
    }
    setIndex(nextIndex)
    setPickedIndex(null)
    scrollRef.current?.scrollTo({ y: 0, animated: false })
  }

  //----------------------------------------------------------------------------------------------
  //  handleRetry — starts the same quiz again from the first question, answers reshuffled
  //----------------------------------------------------------------------------------------------
  function handleRetry(): void {
    setIndex(0)
    setPickedIndex(null)
    setCorrectCount(0)
    setIsFinished(false)
    setChoiceOrders(shuffledChoiceOrders(questions))
  }

  const rf_desc = reference?.rf_desc ?? ''
  const question = questions[index] ?? null
  const hasQuestions = reference !== null && question !== null
  const showNoQuestions = !hasQuestions
  const showSummary = hasQuestions && isFinished
  const showQuestion = hasQuestions && !isFinished
  const isAnswered = pickedIndex !== null
  const showFeedback = showQuestion && isAnswered
  const progressText = `Question ${index + 1} of ${questions.length}`
  const choices = choiceOrders[index] ?? []
  const qq_detail = question?.qq_detail ?? ''
  const correctAnswer = question?.qq_ans[0] ?? ''
  const qq_help = question?.qq_help ?? null
  const isCorrect = pickedIndex === 0
  const isLastQuestion = index === questions.length - 1
  const nextLabel = isLastQuestion ? 'See score' : 'Next'

  return (
    <ScrollView ref={scrollRef} contentContainerStyle={styles.screen}>
      <Stack.Screen options={{ title: rf_desc }} />
      {showNoQuestions && <Text style={styles.message}>This quiz has no questions.</Text>}
      {showSummary && (
        <QuizSummary
          rf_desc={rf_desc}
          correctCount={correctCount}
          total={questions.length}
          onRetry={handleRetry}
          onBack={goBack}
        />
      )}
      {showQuestion && question && (
        <>
          <Text style={styles.progress}>{progressText}</Text>
          <QuizBidding question={question} />
          <QuizHands question={question} />
          <QuizChoices qq_detail={qq_detail} choices={choices} pickedIndex={pickedIndex} onPick={handlePick} />
        </>
      )}
      {showFeedback && (
        <QuizFeedback
          isCorrect={isCorrect}
          correctAnswer={correctAnswer}
          qq_help={qq_help}
          nextLabel={nextLabel}
          onNext={handleNext}
        />
      )}
    </ScrollView>
  )
}

//----------------------------------------------------------------------------------------------
//  shuffledChoiceOrders — a shuffled answer order for every question of the quiz
//  Params:  questions — the quiz's questions
//  Returns: one QuizChoice list per question, each answer keeping its qq_ans position
//----------------------------------------------------------------------------------------------
function shuffledChoiceOrders(questions: table_Questions[]): QuizChoice[][] {
  const orders = questions.map(question =>
    shuffle(question.qq_ans.map((text, qq_ansIndex) => ({ qq_ansIndex, text })))
  )
  return orders
}

//----------------------------------------------------------------------------------------------
//  shuffle — a randomly re-ordered copy of a list (Fisher–Yates, as the web's shuffleArray)
//  Params:  list — the items
//  Returns: a new list; the original is unchanged
//----------------------------------------------------------------------------------------------
function shuffle<T>(list: T[]): T[] {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const swap = copy[i]
    copy[i] = copy[j]
    copy[j] = swap
  }
  return copy
}

//----------------------------------------------------------------------------------------------
//  goBack — returns to the quiz list
//----------------------------------------------------------------------------------------------
function goBack(): void {
  router.back()
}

const styles = StyleSheet.create({
  screen: { padding: 16, gap: 10 },
  progress: { fontSize: 13, color: '#6b7280' },
  message: { fontSize: 16, textAlign: 'center', marginTop: 24 }
})
