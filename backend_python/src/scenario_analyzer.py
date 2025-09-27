import time
import requests
import datetime
import os
import json
from dotenv import load_dotenv

# Set your Google Maps API key here or use an environment variable
load_dotenv()
API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")
#API_KEY = os.getenv("GOOGLE_MAPS_API_KEY", "YOUR_API_KEY_HERE")

ORIGIN = "Dompl. 28, 48143 Münster"
DESTINATION = "Albersloher Weg 14, 48155 Münster"
ARRIVAL_TIME = datetime.datetime(2025, 9, 27, 18, 0)  # 26th Sep 2024, 18:00

# Convert arrival time to Unix timestamp
arrival_time_unix = int(ARRIVAL_TIME.timestamp())

MODES = {
    "driving": "Car",
    "bicycling": "Bike",
    "walking": "Foot",
    "transit": "Transit"
}

def get_geolocation_from_google(address):
    url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "address": address,
        "key": API_KEY
    }
    response = requests.get(url, params=params)
    data = response.json()
    if data["status"] == "OK":
        location = data["results"][0]["geometry"]["location"]
        return location["lng"], location["lat"]
    else:
        return None, None

def get_travel_time(mode, origin,destination):
    url = "https://maps.googleapis.com/maps/api/directions/json"
    params = {
        "origin": origin,
        "destination": destination,
        "mode": mode,
        "arrival_time": arrival_time_unix,
        "key": API_KEY
    }
    print("Sending request to Google Maps Directions API...")
    response = requests.get(url, params=params)
    data = response.json()
    #print()
    #pprint.pprint(data)  # Debug: pretty-print the full response data
    # Write the response JSON to a file for each mode

    output_filename = f"maps_response_{mode}.json"
    with open(output_filename, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    if data["status"] == "OK":
        route = data["routes"][0]["legs"][0]
        duration = route["duration"]["text"]
        return duration, route["distance"]["text"]
    else:
        return f"Error: {data.get('status', 'Unknown error')}"

def newFileInInputFolder():
    input_folder = os.path.join("input")
    files = os.listdir(input_folder)
    return any(file.endswith(".json") for file in files)

def getLastFileInInputFolder():
    #input_folder = os.path.join(os.path.dirname(__file__), "input")
    input_folder = os.path.join("input")
    files = [file for file in os.listdir(input_folder) if file.endswith(".json")]
    if not files:
        return None
    files.sort(key=lambda x: os.path.getmtime(os.path.join(input_folder, x)), reverse=True)
    return files[0]

def get_trips_from_data(profile):
    for daily_routine in profile.get("daily_routines", []):
        origin = daily_routine.get("origin")
        destination = daily_routine.get("destination")
        mode = daily_routine.get("mode", "driving")
        if origin and destination:
            yield origin, destination, mode

def get_location_point(poi_list, name):
    for feature in poi_list.get("features", []):
        properties = feature.get("properties", {})
        #print(f"Checking feature properties: {properties}")
        if properties.get("name") == name:
            coordinates = feature.get("geometry", {}).get("coordinates", [None, None])
            print(f"Found matching name '{name}'. Coordinates: {coordinates}")
            # Check for unknown coordinates (0,0)
            if coordinates == [0, 0] or coordinates == [0.0, 0.0]:
                address = properties.get("address")
                print(f"Coordinates are (0,0). Trying to geocode address: {address}")
                if address:
                    lng, lat = get_geolocation_from_google(address)
                    print(f"Geocoded address '{address}' to lng: {lng}, lat: {lat}")
                    if lng is not None and lat is not None:
                        return [lng, lat]
                print("Could not geocode address or address missing.")
                return None
            #print(f"Returning coordinates: {coordinates}")
            return coordinates
    print(f"No feature found with name '{name}'.")
    return None

def generate_trips_from_profile(profile):
    activity_list = profile.get("daily_routines", [])
    print(f"Processing activities: {activity_list}")

    trips = []
    for i,activity in enumerate(activity_list):
        print(f"Activity {i}: {activity}")
        next_activity = activity_list[i+1] if i+1 < len(activity_list) else None
        if next_activity:
            origin = activity.get("location")
            origin_coords = get_location_point(profile.get("points_of_interest", []), origin)
            destination = next_activity.get("location")
            destination_coords = get_location_point(profile.get("points_of_interest", []), destination)
            
            trip = {
                "origin": origin,
                "destination": destination,
                "duration": None,
                "distance": None,
                "mode": None       
            }
            if origin and destination:
                trips.append(trip)
                print(f"  Trip from {origin} to {destination}")

    print(f"Total trips found: {len(trips)}")
    if "scenarios" not in profile:
        profile["scenarios"] = []
    profile["scenarios"].append({
        "name": "Default Scenario",
        "scenario_id": "default_scenario",
        "trips": trips
    })
    return profile

def calculate_travel_times(profile):
    if "scenarios" not in profile or not profile["scenarios"]:
        print("No scenarios found in profile.")
        return profile

    for scenario in profile["scenarios"]:
        print(f"Processing scenario: {scenario.get('name', 'Unnamed Scenario')}")
        for trip in scenario.get("trips", []):
            origin = trip.get("origin")
            destination = trip.get("destination")
            mode = trip.get("mode", "driving")  # Default to driving if mode is not specified
            print(f"  Trip from {origin} to {destination}")

            if origin and destination:
                print(f"    Looking up coordinates for origin '{origin}' and destination '{destination}'")
                origin_coords = get_location_point(profile.get("points_of_interest", []), origin)
                destination_coords = get_location_point(profile.get("points_of_interest", []), destination)
                print(f"    Origin coordinates: {origin_coords}, Destination coordinates: {destination_coords}")
                if not origin_coords or not destination_coords:
                    print(f"    Could not find coordinates for origin '{origin}' or destination '{destination}', skipping trip.")
                    continue
                origin = {"lat": origin_coords[1], "lng": origin_coords[0]}  #Format for google {"lat": 40.7128, "lng": -74.0060}
                destination = {"lat": destination_coords[1], "lng": destination_coords[0]}
                #Format for google {"lat": 40.7128, "lng": -74.0060}
                duration,distance = get_travel_time(mode, origin, destination)
                trip["duration"] = duration
                trip["distance"] = distance
                trip["mode"] = MODES.get(mode, mode)
                print(f"    Duration: {duration}")
            else:
                print("    Missing origin or destination, skipping trip.")

    return profile

def process_data(profile):
    
    print(f"Initial profile data: {profile}")
    print("Generating trips from profile...")
    profile = generate_trips_from_profile(profile)
    print(f"Processed profile data: {profile}")
    profile = calculate_travel_times(profile)

    return profile



def main():
    print("Starting scenario analyzer...")
    for _ in range(3):
        while not newFileInInputFolder():
            time.sleep(1)
        filename = getLastFileInInputFolder()
        if filename:
            print(f"Processing file: {filename}")
            #filepath = os.path.join(os.path.dirname(__file__), "input", filename)
            filepath = os.path.join("input", filename)
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
            print(f"Loaded data: {data}")
        else:
            print("No input file found.")
            return
        
        output = process_data(data)

        output_filepath = os.path.join("output", filename)
        with open(output_filepath, "w", encoding="utf-8") as f:
            json.dump(output, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()