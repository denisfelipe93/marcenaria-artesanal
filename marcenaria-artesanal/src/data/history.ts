// src/data/history.ts
export type HistoryItem = {
  id: string
  year: number
  title: string
  subtitle?: string
  description?: string
  cover?: string
  tags?: string[]
  href?: string
}

import img1 from '@/assets/history/img1.jpg' // garanta que este arquivo existe

export const historyItems: HistoryItem[] = [
  {
    id: 'teste-css',
    year: 2024,
    title: 'Teste de CSS da History',
    subtitle: 'Deve ter borda tracejada + imagem com altura travada',
    description: 'Se você está vendo a borda e a imagem com altura fixa, o CSS está aplicando.',
    cover: img1,
    tags: ['Teste', 'CSS']
  }
]
