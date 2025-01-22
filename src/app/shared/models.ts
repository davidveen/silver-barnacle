export interface Stats {
  HP: number
  Attack: number
  Defense: number
  'Sp. Attack': number
  'Sp. Defense': number
  Speed: number
}

export interface Pokemon {
  id: number
  name: {
    english: string
    japanese: string
    chines: string
    french: string
  }
  type: string[]
  base: Stats
}