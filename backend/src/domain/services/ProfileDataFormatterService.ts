import {
    Bewegungsprofil,
    CreateProfileRequest,
    DailyRoutineItem,
    DailyRoutines,
    PointOfInterest, PointOfInterestFeature,
    Preferences,
    Profile,
    ProfilePersona
} from "../types";

const useProfileDataFormatterService = () => {
    const formatDataToProfileStructure = (requestData: CreateProfileRequest): string => {
        const mappedData = mapData(requestData);

        const fieldMappings = getFieldMappings();
        const transformed = Object.entries(mappedData).reduce((acc, [key, value]) => {
            const newKey = fieldMappings[key] || key;
            acc[newKey] = value;
            return acc;
        }, {} as any);

        return JSON.stringify(transformed);
    }

    const getFieldMappings = (): Record<string, string> => {
        return {
            "personaTags": "persona_tags",
            "mainMode": "main_mode_of_transport",
            "transportationModes": "transportation_modes",
            "maxWalkingDistanceInKm": "max_walking_distance_km",
            "travelTimeImportance": "travel_time_importance",
            "startZeit": "arrival_time",
            "pointsOfInterest": "points_of_interest"
        }
    }

    const mapData = (requestData: CreateProfileRequest): Profile => {
        const dailyRoutinesWithLocationIds = mapDailyRoutinesFromRequest(requestData, true);
        const pointsOfInterest = createPointOfInterests(dailyRoutinesWithLocationIds);
        const dailyRoutinesWithoutLocationIds = mapDailyRoutinesFromRequest(requestData, false);

        return <Profile>{
            name: requestData.name,
            description: requestData.description,
            personaTags: <ProfilePersona>{
                age: mapAgeToAgeClass(requestData.personaTags.age),
                mainMode: requestData.personaTags.mainMode,
                stadtteil: requestData.personaTags.stadtteil,
                occupation: requestData.personaTags.occupation
            },
            preferences: <Preferences>{
                transportationModes: [
                    "driving", "walking", "transit"
                ],
                maxWalkingDistanceInKm: 2,
                travelTimeImportance: "high"
            },
            dailyRoutines: dailyRoutinesWithoutLocationIds,
            pointsOfInterest: pointsOfInterest
        };
    }

    const createPointOfInterests = (dailyRoutines: DailyRoutineItem[]): PointOfInterest => {
        return <PointOfInterest>{
            type: "FeatureCollection",
            features: dailyRoutines.map(dailyRoutine => {
                return createSinglePointOfInterestFeature(dailyRoutine)
            })
        };
    };

    const createSinglePointOfInterestFeature = (dailyRoutine: DailyRoutineItem): PointOfInterestFeature => {
        const idAndLocation = dailyRoutine.location?.split("-") ?? "";
        const id = idAndLocation[0];
        const location = idAndLocation[1];

        return <PointOfInterestFeature>{
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: {
                    latitude: 0,
                    longitude: 0
                }
            },
            properties: {
                name: id,
                address: location
            }
        };
    };

    const mapDailyRoutinesFromRequest = (requestData: CreateProfileRequest, withLocationId: boolean): DailyRoutineItem[] => {
        let startIndex = 1;
        console.log("dailyRoutines", requestData.daily_routines);

        const result = [mapSingleDailyRoutineItem(requestData.daily_routines.start, startIndex, withLocationId)];

        const mappedTagesAblauf = requestData.daily_routines.tagesablauf.map(singleBewegungsprofil => {
            startIndex += 1;
            return mapSingleDailyRoutineItem(singleBewegungsprofil, startIndex, withLocationId);
        });
        result.push(...mappedTagesAblauf);

        startIndex += 1;
        result.push(mapSingleDailyRoutineItem(requestData.daily_routines.ende, startIndex, withLocationId))

        return result;
    };

    const mapSingleDailyRoutineItem = (bewegungsprofil: Bewegungsprofil, startIndex: number, withLocationId: boolean): DailyRoutineItem => {
        let location = "";

        if (withLocationId) {
            location = `${startIndex}-${bewegungsprofil.ort}`;
        } else {
            location = `${bewegungsprofil.ort}`;
        }

        return <DailyRoutineItem>{
            name: bewegungsprofil.name,
            startZeit: bewegungsprofil.startzeit,
            location: location
        }
    }

    const mapAgeToAgeClass = (age: number): number => {
        if (age <= 6) {
            return 1;
        }
        else if (age >= 7 && age <= 10) {
            return 2;
        }
        else if (age >= 11 && age <= 17) {
            return 3;
        }
        else if (age >= 18 && age <= 29) {
            return 4;
        }
        else if (age >= 30 && age <= 59) {
            return 5;
        }
        else if (age >= 60 && age <= 64) {
            return 6;
        }
        else if (age >= 65 && age <= 79) {
            return 7;
        }
        else if (age >= 80) {
            return 8;
        }

        return 1;
    }

    return {
        formatDataToProfileStructure
    }
};

export {
    useProfileDataFormatterService
};
