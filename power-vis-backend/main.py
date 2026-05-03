from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from proj import solve_buck, generate_waveforms

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class BuckInput(BaseModel):
    Vin: float
    Vout: float
    f: float
    R: float
    L: float
    C: float

@app.post("/buck/analyse")
def analyse_buck(data: BuckInput):
    results = solve_buck(data.Vin, data.Vout, data.f, data.R, data.L, data.C)
    times, iL, vC = generate_waveforms(data.Vin, data.Vout, data.f, data.R, data.L, data.C)
    
    waveforms = [{"t": t, "iL": i, "vC": v} for t, i, v in zip(times, iL, vC)]
    
    return {
        "operating_point": results,
        "waveforms": waveforms
    }