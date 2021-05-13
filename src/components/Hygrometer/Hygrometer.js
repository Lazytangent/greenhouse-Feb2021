import ReactSlider from "react-slider";
import "./Hygrometer.css";
import { useState, useEffect } from 'react';
import { useClimate } from '../../context/ClimateContext';

function Hygrometer() {
  const { humidity, setHumidity } = useClimate();
  const [actualHum, setActualHum] = useState(humidity);

  useEffect(() => {
    if (Math.abs(actualHum - humidity) === 1) {
      const timeout = setTimeout(() => {
        setActualHum(humidity);
      }, 1000);
      return () => clearTimeout(timeout);
    } else if (actualHum > humidity) {
      const timeout = setTimeout(() => {
        setActualHum(actualHum - 2);
      }, 1000);
      return () => clearTimeout(timeout);
    } else if (actualHum < humidity) {
      const timeout = setTimeout(() => {
        setActualHum(actualHum + 2);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [actualHum, humidity]);

  return (
    <section>
      <h2>Hygrometer</h2>
      <div className="actual-humid">Actual Humidity: {actualHum}%</div>
      <ReactSlider
        value={humidity}
        onAfterChange={(val) => {setHumidity(val)}}
        className="hygrometer-slider"
        thumbClassName="hygrometer-thumb"
        trackClassName="hygrometer-track"
        ariaLabel={"Hygrometer"}
        orientation="vertical"
        min={0}
        max={100}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        renderTrack={(props, state) => (
          <div {...props} index={state.index}></div>
        )}
        invert
        pearling
        minDistance={1}
      />
    </section>
  );
}

export default Hygrometer;
