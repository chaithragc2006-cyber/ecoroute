
import random
from datetime import datetime, timezone
import json
import time

dustbins = [
    "BIN001", "BIN002", "BIN003", "BIN004",
    "BIN005", "BIN006", "BIN007", "BIN008",
    "BIN009", "BIN010"
]

waste_types = ["Dry", "Wet", "Mixed"]


# Generate data continuously every 5 seconds

while True:

    print("\nGenerating new dustbin readings...\n")

    for bin_id in dustbins:

        fill_level = random.randint(0, 100)

        waste_type = random.choice(waste_types)

        timestamp = datetime.now(timezone.utc).isoformat()

        if fill_level >= 80:
            status = "FULL"
        else:
            status = "NORMAL"

        data = {
            "bin_id": bin_id,
            "fill_level": fill_level,
            "waste_type": waste_type,
            "timestamp": timestamp,
            "status": status
        }

        print(json.dumps(data, indent=4))
        print("----------------------------")

    print("Next update in 5 seconds...")
    time.sleep(5)
