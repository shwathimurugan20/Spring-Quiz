import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Home from './Home';

function App() {
  const [questionData, setQuestionData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(()=> {
    const fetchQuestion = async ()=>{
        try{
          const data =  await fetch("http://localhost:8080/question/allQuestions")
          if (data.ok){
            const response = await data.json();
            setQuestionData(response)
            console.log(response)
          }
         }
         catch (error){
          console.log( error)
         }
    } 
    fetchQuestion();
  },[])

  const handleOptionSelected = (selectedAnswer) =>{
    setSelectedOption(selectedAnswer);
    const currentAnswer = questionData[currentQuestion]?.answer; 
    console.log(currentAnswer);

    if(selectedAnswer === currentAnswer){
      setScore(score+1);
    }
    const nextQuestion = currentQuestion + 1;
       if (nextQuestion < questionData.length){
        setCurrentQuestion(nextQuestion);
       }else{
        setShowScore(true);
       }
  }



  return (
   
    <main className='bg-gray-200 min-h-screen flex justify-center items-center'>

    <div className='bg-white p-8 '>
      {showScore ? (
<p>
  You Scored {score} out of {questionData.length}.
</p>
      ):(
        <>
        <h1 className='text-2xl'>Question {currentQuestion + 1} </h1>
        <p>{questionData[currentQuestion]?.question}</p>
   
        <button className='bg-amber-400 rounded p-2 m-1' onClick={() =>handleOptionSelected(questionData[currentQuestion]?.option1)} >{questionData[currentQuestion]?.option1}</button>
        <button className='bg-amber-400 rounded p-2  m-1'  onClick={() => handleOptionSelected(questionData[currentQuestion]?.option2)}>{questionData[currentQuestion]?.option2}</button>
        <button className='bg-amber-400 rounded p-2  m-1'  onClick={() =>handleOptionSelected(questionData[currentQuestion]?.option3)}>{questionData[currentQuestion]?.option3}</button>
        <button className='bg-amber-400 rounded p-2  m-1'  onClick={() =>handleOptionSelected(questionData[currentQuestion]?.option4)}>{questionData[currentQuestion]?.option4}</button>
        </>
      )

      }
    


    </div>
    </main>
  );
}

export default App;
