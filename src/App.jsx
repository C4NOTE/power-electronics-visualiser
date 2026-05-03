import { useState, useEffect } from 'react';
import { auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function App() {
  const [user, setUser] = useState(null);
  
  // Inputs — these control the sliders
  const [Vin, setVin] = useState(12);
  const [Vout, setVout] = useState(5);
  const [freq, setFreq] = useState(10000);
  const [R, setR] = useState(10);
  const [L, setL] = useState(0.001);
  const [C, setC] = useState(0.0001);

  // Results from backend
  const [operatingPoint, setOperatingPoint] = useState(null);
  const [waveformData, setWaveformData] = useState([]);

  const login = () => {
    signInWithPopup(auth, provider)
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  };

  // This runs every time any slider changes
  useEffect(() => {
    if (!user) return; // don't call backend if not logged in

    fetch("http://127.0.0.1:8000/buck/analyse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Vin, Vout, f: freq, R, L, C })
    })
      .then(res => res.json())
      .then(data => {
        setOperatingPoint(data.operating_point);
        setWaveformData(data.waveforms);
      })
      .catch(err => console.log(err));

  }, [user, Vin, Vout, freq, R, L, C]); // re-runs when any of these change

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>PowerLab</h1>

      {!user ? (
        <button onClick={login} style={{ padding: '15px 30px', fontSize: '18px', cursor: 'pointer', borderRadius: '8px' }}>
          Login with Google
        </button>
      ) : (
        <div>
          <h2>Welcome, Engineer {user.displayName.split(' ')[0]}</h2>

          {/* Sliders */}
          <p>Input Voltage (Vin): {Vin} V</p>
          <input type="range" min="5" max="30" step="1" value={Vin} onChange={(e) => setVin(parseFloat(e.target.value))} />

          <p>Output Voltage (Vout): {Vout} V</p>
          <input type="range" min="1" max={Vin - 1} step="0.5" value={Vout} onChange={(e) => setVout(parseFloat(e.target.value))} />

          <p>Switching Frequency: {freq} Hz</p>
          <input type="range" min="1000" max="100000" step="1000" value={freq} onChange={(e) => setFreq(parseFloat(e.target.value))} />

          <p>Load Resistance (R): {R} Ω</p>
          <input type="range" min="1" max="50" step="1" value={R} onChange={(e) => setR(parseFloat(e.target.value))} />

          {/* Operating Point Results */}
          {operatingPoint && (
            <div style={{ margin: '20px auto', maxWidth: '400px', textAlign: 'left', background: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
              <h3>Operating Point</h3>
              <p>Duty Cycle: {operatingPoint.duty_cycle}</p>
              <p>Mode: {operatingPoint.mode}</p>
              <p>Inductor Ripple: {operatingPoint.delta_iL} A</p>
              <p>Voltage Ripple: {operatingPoint.delta_Vc} V</p>
              <p>Peak Current: {operatingPoint.I_peak} A</p>
            </div>
          )}

          {/* Waveform Charts */}
          <h3>Inductor Current</h3>
          <LineChart width={700} height={250} data={waveformData}>
            <XAxis dataKey="t" label={{ value: 'Time (ms)', position: 'insideBottom' }} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="iL" stroke="#8884d8" dot={false} />
          </LineChart>

          <h3>Capacitor Voltage</h3>
          <LineChart width={700} height={250} data={waveformData}>
            <XAxis dataKey="t" label={{ value: 'Time (ms)', position: 'insideBottom' }} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="vC" stroke="#82ca9d" dot={false} />
          </LineChart>

        </div>
      )}
    </div>
  );
}

export default App;