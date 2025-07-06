import { useState } from "react";
import Button from "./components/Button";

const StatisticsLine = ({ statName, stat }) => {
  return (
    <>
      <tr>
        <td>{statName}</td>
        <td>{stat}</td>
      </tr>
    </>
  );
};

const Statistics = ({ good, bad, neutral, avr }) => {
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine stat={good} statName="good" />
          <StatisticsLine stat={neutral} statName="neutral" />
          <StatisticsLine stat={bad} statName="bad" />

          <StatisticsLine statName="all" stat={good + bad + neutral} />
          <StatisticsLine stat={avr} statName="average" />
          <StatisticsLine
            stat={(good * 100) / (good + bad + neutral)}
            statName="Positive"
          />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [avr, setAvr] = useState(0);

  const handleAvr = () => {
    const total = good + bad + neutral;
    const avg = (1 * good + -1 * bad) / total;
    console.log(avr);
    setAvr(avg);
  };
  const handleGood = () => {
    let g = good + 1;
    setGood(g);
    handleAvr();
  };

  const handleNeutral = () => {
    let g = neutral + 1;
    setNeutral(g);
    handleAvr();
  };

  const handleBad = () => {
    let g = bad + 1;
    setBad(g);
    handleAvr();
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" onClick={handleGood} />
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />

      <Statistics good={good} bad={bad} neutral={neutral} avr={avr} />
    </div>
  );
};

export default App;
