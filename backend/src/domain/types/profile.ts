
export interface Coordinates {
  latitude: number
  longitude: number
}



export interface CreateProfileRequest {
  name: string,
  userId: string,
  description: string,
  personaTags: ProfilePersona,
  daily_routines: DailyRoutines
}

export interface DailyRoutines {
  start: Bewegungsprofil,
  ende: Bewegungsprofil,
  tagesablauf: Bewegungsprofil[]
}

export interface Bewegungsprofil {
  startzeit: string;
  ort: string;
  name: string;
}

export interface ProfilePersona {
  age: number
  occupation: string
  stadtteil: string
  mainMode: string
}

export interface PointOfInterest {
  type: string
  features: PointOfInterestFeature[]
  coordinates: Coordinates
}

export interface PointOfInterestFeature {
  type: string
  geometry: PointOfInterestFeatureGeometry,
  properties: PointOfInterestFeatureProperty
}

export interface PointOfInterestFeatureProperty {
  name: string
  address: string
}

export interface PointOfInterestFeatureGeometry {
  type: string
  coordinates: Coordinates
}

export interface DailyRoutineItem {
  startZeit: string
  name: string
  location?: string
}

export interface Preferences {
  transportationModes: string[]
  maxWalkingDistanceInKm: number,
  travelTimeImportance: string
}

export interface Profile {
  name: string
  personaTags: ProfilePersona,
  preferences: Preferences,
  description: string
  pointsOfInterest: PointOfInterest
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
