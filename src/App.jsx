import { useState } from 'react';
import { auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import {
  LineChart, Line, XAxis, YAxis, Tooltip
} from 'recharts';

function App() {
  const [user, setUser] = useState(null);
  const [Vin, setVin] = useState(10);
  const [duty, setDuty] = useState(0.5);
  const [freq, setFreq] = useState(1000);
  function generateBuckWaveform(Vin, duty, freq) {
  const T = 1 / freq;
  const data = [];

  for (let t = 0; t < 5 * T; t += T / 50) {
    const t_mod = t % T;
    const switchOn = t_mod < duty * T;
    data.push({
  time: t * 1000, // convert to ms
  voltage: switchOn ? Vin : 0,
});
    
  }

  return data;
}
const data = generateBuckWaveform(Vin, duty, freq);
  const login = () => {
    signInWithPopup(auth, provider)
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
      <h1> Power Electronics Visualizer</h1>
      {!user ? (
        <button onClick={login} style={{ padding: '15px 30px', fontSize: '18px', cursor: 'pointer', borderRadius: '8px' }}>
          Login with Google
        </button>
      ) : (
        <div>
          <h2>Welcome, Engineer {user.displayName.split(' ')[0]}</h2>
          <p>Buck Converter Switching Waveform</p>


          <p>Duty Cycle: {duty}</p>
          <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={duty}
          onChange={(e) => setDuty(parseFloat(e.target.value))}/>


          <p>Input Voltage: {Vin} V</p>
          <input
          type="range"
          min="1"
          max="20"
          step="1"
          value={Vin}
          onChange={(e) => setVin(parseFloat(e.target.value))}/>

          <p>Frequency: {freq} Hz</p>
          <input
          type="range"
          min="100"
          max="5000"
        step="100"
        value={freq}
        onChange={(e) => setFreq(parseFloat(e.target.value))}/>
        <p>Average Output Voltage: {(duty * Vin).toFixed(2)} V</p>
          <LineChart width={600} height={300} data={data}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="step" dataKey="voltage" stroke="#8884d8" dot={false} /></LineChart>
          <button style={{ padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
            + Create New Waveform
          </button>
        </div>
      )}
    </div>
  );
}

export default App;