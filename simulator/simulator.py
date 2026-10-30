
import random
import time
import requests
from datetime import datetime, timezone

# Backend API URL
API_URL = "http://localhost:5000/api/readings"

# 10 sample dustbins with demo map coordinates
dustbins = [
    {"binId": "BIN001", "latitude": 28.6139, "longitude": 77.2090},
    {"binId": "BIN002", "latitude": 28.6145, "longitude": 77.2100},
    {"binId": "BIN003", "latitude": 28.6150, "longitude": 77.2110},
    {"binId": "BIN004", "latitude": 28.6160, "longitude": 77.2120},
    {"binId": "BIN005", "latitude": 28.6170, "longitude": 77.2130},
    {"binId": "BIN006", "latitude": 28.6180, "longitude": 77.2140},
    {"binId": "BIN007", "latitude": 28.6190, "longitude": 77.2150},
    {"binId": "BIN008", "latitude": 28.6200, "longitude": 77.2160},
    {"binId": "BIN009", "latitude": 28.6210, "longitude": 77.2170},
    {"binId": "BIN010", "latitude": 28.6220, "longitude": 77.2180}
]

# Available waste types
waste_types = ["dry", "wet", "mixed"]

# Full dustbin threshold
THRESHOLD = 80

print("===================================")
print("   EcoRoute Dustbin Simulator")
print("===================================")

while True:

    print("\nGenerating dustbin readings...\n")

    for bin_info in dustbins:

        # Generate random fill level
        fill_level = random.randint(0, 100)

        # Generate random waste type
        waste_type = random.choice(waste_types)

        # Generate timestamp
        timestamp = datetime.now(timezone.utc).isoformat()

        # Check full condition
        status = "FULL" if fill_level >= THRESHOLD else "NORMAL"

        # Match the MongoDB Reading schema
        data = {
            "binId": bin_info["binId"],
            "fillLevel": fill_level,
            "latitude": bin_info["latitude"],
            "longitude": bin_info["longitude"],
            "wasteType": waste_type,
            "timestamp": timestamp
        }

        print("-----------------------------------")
        print("Bin ID:", data["binId"])
        print("Fill Level:", data["fillLevel"], "%")
        print("Waste Type:", data["wasteType"])
        print("Status:", status)
        print("Timestamp:", data["timestamp"])

        # Send reading to backend
        try:
            response = requests.post(
                API_URL,
                json=data,
                timeout=5
            )

            if response.status_code == 201:
                print("SUCCESS: Reading saved in backend!")
            else:
                print("FAILED:", response.status_code)
                print(response.text)

        except requests.exceptions.RequestException as error:
            print("Connection error:", error)

    print("\nNext update in 5 seconds...")
    time.sleep(5)
