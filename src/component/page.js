import './page.css';
import { data } from '../data/data.js';
import { useRef, useState } from 'react';
function Page(){
    const [index, setIndex]=useState(0);
    const option1=useRef(null);
    const option2=useRef(null);
    const option3=useRef(null);
    const option4=useRef(null);
    const question=useRef(null);
    const currentPage=useRef(null);
    const nextbtn=useRef(null);
    const refreshbtn = useRef(null);
    const [refresh, setRefresh]=useState(null);
    const [scoreBox,setScoreBox]=useState(null);
    const [lock, setLock]=useState(false);
    const [score, setScore]=useState(0);
    const options=[option1, option2, option3, option4];

    function select(e){
        if (!lock){
            if (data[index].answer==e.target.getAttribute("data-value"))
                {
                    e.target.classList.add("answer");
                    setScore((pre)=>pre+1)
            }else{
                e.target.classList.add("wrong");
            }

            setLock(true);
         }
   }

   function hide(){
    question.current.classList.add("hide");
    question.current.classList.add("scoreBox");
    setScoreBox(<h1>You Scored: {score} out of {data.length}</h1>);
    currentPage.current.classList.add("hide");
    nextbtn.current.classList.add("hide");
    setRefresh(true);
   }

   function next(e){
    if (data.length-1===index){
        hide();
        return
    }
    if (lock){
        setIndex(pre=>{
           return pre+1
        });
        setLock(false);
        options.map((option)=>{
           option.current.classList.remove("answer");
           option.current.classList.remove("wrong");
        })
    }
   }

   function reset(){
    question.current.classList.remove("hide");
    question.current.classList.remove("scoreBox");
    setScoreBox(null);
    currentPage.current.classList.remove("hide");
    nextbtn.current.classList.remove("hide");
    setRefresh(false);
    setIndex(0);
    setLock(false);
    setScore(0);
    options.map((option)=>{
       option.current.classList.remove("answer");
       option.current.classList.remove("wrong");
    })

   }

    return(
        <div className="page">
            <div className="quizapp">
                <h1>
                    Quiz App
                </h1>
            </div>
            <hr />

            <div className="question" ref={question}>
                <p>{data[index].number}. {data[index].question}</p>
                <ul>
                <li data-value="option1" ref={option1} onClick={select}>{data[index].option1}</li>
                <li data-value="option2" ref={option2} onClick={select}>{data[index].option2}</li>
                <li data-value="option3" ref={option3} onClick={select}>{data[index].option3}</li>
                <li data-value="option4" ref={option4} onClick={select}>{data[index].option4}</li>
                </ul>
            </div>
            <div className="score" >{scoreBox}</div>
            <div className="btn" ref={nextbtn}><button onClick={next}>Next</button></div>
            {refresh && <div className="btn refresh" ref={refreshbtn}><button onClick={reset}>Refresh</button></div>}

            <div ref={currentPage} className="currentpage"><p>{index+1} of {data.length} questions</p></div>
        </div>
    )
}
export default Page;