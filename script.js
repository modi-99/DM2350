




  const questions=[
  "Very first question", 
  "First question", 
  "Second question", 
  "Third question", 
  "Four question", 
  "thank you for answering",
  "First question", 
  "Second question", 
  "Third question", 
  "Four question"]; 
  // print questions stored in array after pressing yes or no button.
    let count = 0;
    const element= document.getElementById("Qs");
    const button1 = document.getElementById("increment");
    const button2 = document.getElementById("decrement");
    const textHolder = document.getElementById("counter");
    
    
    //Setting up the timer
    let sec=min=0;
      
      let element2=setInterval(() => {
          if(sec!=99){
              sec++;
              if(sec<10) secLab.innerHTML='0'+sec;
              else secLab.innerHTML=sec;
          }else{
              min++;
              if(min<10) minLab.innerHTML='0'+min;
              else minLab.innerHTML=min;
              sec=0;
          }
      },10);
  // timer code finshes




  element.innerHTML=questions[count];
  count++; 
  //declaretion for call function
  const secLab=document.getElementById('ms');
  const minLab=document.getElementById('sec');
    call(button1);
    call(button2);

    
    // functions 
  function call(button) {
    //adding a listner to make sure that the questions loop after each click.
    button.addEventListener("click", function() {
      element.innerHTML=questions[count];
      count++;
      textHolder.innerHTML = "Amount of questions Remaining: "+(questions.length-count);
      console.log(minLab.innerHTML=min,':',secLab.innerHTML=sec)

      if(count>questions.length-1){
        button1.style.visibility="hidden";
        button2.style.visibility="hidden";
        clearInterval(element2);
      }
    });

  };




//CSS changes
element.style.fontSize="30px";
