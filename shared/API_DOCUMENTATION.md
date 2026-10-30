# EcoRoute – API Documentation

## 1. Backend Information

Backend URL: `http://localhost:5000`

## 2. Available API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Check backend status |
| POST | `/api/readings` | Submit dustbin readings |
| GET | `/api/readings` | Retrieve dustbin readings |

## 3. POST Reading Format

Example JSON:

```json
{
  "binId": "BIN001",
  "fillLevel": 85,
  "latitude": 28.6139,
  "longitude": 77.2090,
  "wasteType": "dry",
  "timestamp": "2026-10-30T19:40:56.698Z"
}
```

## 4. Field Descriptions

- `binId`: Unique dustbin ID.
- `fillLevel`: Dustbin fill percentage (0–100).
- `latitude`: Dustbin latitude.
- `longitude`: Dustbin longitude.
- `wasteType`: dry, wet or mixed.
- `timestamp`: Reading date and time.

## 5. Dustbin Status

- 0–59%: Normal
- 60–79%: Nearly Full
- 80–100%: Overflow Risk

## 6. Integration

Python simulator sends readings to the backend using POST.

React frontend retrieves readings using GET.

MongoDB stores the submitted readings.

## 7. Testing

The API was tested locally and successfully returned saved dustbin readings.