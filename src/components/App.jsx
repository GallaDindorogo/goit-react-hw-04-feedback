import { useState } from 'react';
import css from './App.module.css';

import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';
import Section from './Section/Section';

const App = () => {
  const [feedBacks, setFeedBacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onLeaveFeedback = state => {
    setFeedBacks(prevState => {
      const value = prevState[state];
      return { ...prevState, [state]: value + 1 };
    });
  };

  const total = feedBacks.good + feedBacks.neutral + feedBacks.bad;

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedBacks;
    return Math.round((good / total) * 100);
  };

  const { good, neutral, bad } = feedBacks;
  const options = Object.keys(feedBacks);

  return (
    <div className={css.container}>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      </Section>
      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default App;
