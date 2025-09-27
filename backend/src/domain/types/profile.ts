
export interface Coordinates {
  latitude: number
  longitude: number
}

export interface PointOfInterest {
  name: string
  address: string
  coordinates: Coordinates
}

export interface DailyRoutineItem {
  time: string
  activity: string
  location?: string
}

export interface Profile {
  name: string
  age: number
  description: string
  pointsOfInterest: PointOfInterest[]
  dailyRoutines: DailyRoutineItem[]
}

export enum LocationType {
  HOME = 'home',
  WORK = 'work',
  GYM = 'gym',
  RESTAURANT = 'restaurant',
  SHOP = 'shop',
  OTHER = 'other'
}
