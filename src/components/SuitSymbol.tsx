//==============================================================================================
//  1) DESCRIPTION
//    SuitSymbol — one bridge suit drawn as a coloured text symbol: ♠ ♣ black, ♥ ♦ red. Shared
//    by the bidding table and the hands (the web uses suit images for both).
//
//    Parameters:
//      suit — 'S', 'H', 'D' or 'C'; anything else draws nothing
//
//  2) NOTES
//    Each symbol is followed by U+FE0E (text presentation) so phones draw a plain symbol
//    rather than a colour emoji (same approach as bridgeschool-native's row icons).
//==============================================================================================

import { StyleSheet, Text } from 'react-native'

const SUIT_SYMBOLS: Record<string, string> = {
  S: '♠︎',
  H: '♥︎',
  D: '♦︎',
  C: '♣︎'
}

const RED_SUITS = ['H', 'D']

type Props = {
  suit: string
}

export default function SuitSymbol(props: Props) {
  const { suit } = props

  const symbol = SUIT_SYMBOLS[suit] ?? null
  const colourStyle = RED_SUITS.includes(suit) ? styles.red : styles.black
  const showSymbol = symbol !== null

  return showSymbol && <Text style={[styles.symbol, colourStyle]}>{symbol}</Text>
}

const styles = StyleSheet.create({
  symbol: { fontSize: 15 },
  black: { color: '#111827' },
  red: { color: '#dc2626' }
})
