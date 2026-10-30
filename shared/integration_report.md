# EcoRoute – Integration Report

## Project Modules

1. Frontend – React.js
2. Backend – Node.js and Express.js
3. Database – MongoDB
4. Simulator – Python

## Integration Results

| Task | Result |
|---|---|
| Backend startup | Successful |
| MongoDB connection | Successful |
| Python simulator | Successful |
| POST API | Tested successfully |
| GET API | Tested successfully |
| Frontend startup | Successful |
| Frontend API connection | Added and basic connection tested |

## Data Compatibility

All modules use the agreed field names:

- binId
- fillLevel
- latitude
- longitude
- wasteType
- timestamp

## Communication Flow

Python Simulator → Backend API → MongoDB → React Frontend

## Dustbin Alert Threshold

Dustbins with fill levels of 80% or above are marked as Overflow Risk in the frontend.

## Conclusion

The main EcoRoute modules have been developed and basic integration testing has been completed.