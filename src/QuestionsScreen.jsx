export default function QuestionsScreen(props) {
  console.log(props);

  function resultCalc() {
    let results = 0;
    for (let i = 0; i < props.results.length; i++) {
      if (props.results[i] === true) {
        results += 1;
      }
    }
    return results;
  }

  const titles = props.quiz.map((question, index) => {
    const checkedStyle =
      props.results[index] === true
        ? { backgroundColor: "#60c476", color: "#000" }
        : { backgroundColor: "#b43b3b", opacity: "0.7" };

    const answers = question.allAnswers.map((answer, index) => {
      const selectedStyle =
        question.selectedAnswer === index
          ? { backgroundColor: "#4D5B9E" }
          : null;

      return (
        <>
          <input
            key={index + question.id}
            type="radio"
            name={question.id}
            value={answer}
            id={index + question.id}
            className="answer-btn"
            onChange={(e) => props.selectAnswer(e, question.id, index)}
          />
          <label
            style={
              props.answersChecked && question.selectedAnswer === index
                ? checkedStyle
                : selectedStyle
            }
            className="answer-label"
            htmlFor={index + question.id}
          >
            {answer}
          </label>
        </>
      );
    });
    return (
      <div className="questions--title" key={props.quiz.id}>
        <h3>{question.question}</h3>
        <div className="answers--container">{answers}</div>
        <hr />
      </div>
    );
  });
  return (
    <div className="new-container">
      {titles}
      <div className="idk">
        {props.answersChecked ? (
          <h3 className="results">
            {"You scored " +
              resultCalc() +
              "/" +
              props.results.length +
              " correct answers"}
          </h3>
        ) : null}
        <button className="btn" onClick={() => props.checkAnswers()}>
          {!props.answersChecked ? "Check Answers" : "Play Again"}
      </button>
      </div>
    </div>
  );
}
