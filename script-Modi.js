const questions=[
  "Do you consider yourself afraid of the dark?", 
  "Are you afraid of small spaces?", 
  "Have you ever been lost in the wilderness?", 
  "Have you ever held a monkey?", 
  "Do you fall asleep easily?", 
  "Have you ever had your dream job?",
  "Are you afraid of heights?", 
  "Did you believe in the north pole as a kid?", "Thank you for answering"];
  /*"Can you speak Spanish?", 
  "Have you ever been in surgery?",
  "Did you ever almost die?",
  "Have you ever had to throw up in public?",
  "Have you ever met a celebrity?",
  "Did you ever try DIY projects?",
  "Have you ever followed an embarrassing trend?",
  "Do you know your Zodiac sign?",
  "Have you ever been arrested?",
  "Do you have a retirement account?",
  "Have you ever purchased a home?",
  "Did you enjoy going to school?",
  "Do you know what a lucid dream is?",
  "Do you have a secret talent?",
  "Do you believe that we evolved from animals?",
  "Do you believe in aliens?",
  "Have you ever had a bad breakup?",
  "Did you have cats growing up?",
  "Do you have a sister? Or a brother?",
  "Do you enjoy drinking coffee?",
  "Would you betray a friend for a million dollars?",
  "Would you sacrifice a loved one to save a dozen strangers?",
  "If given the opportunity, would you live your entire life over?",
  "Do you believe in an afterlife?",
  "If you could know what other people really thought of you, would you want to know?",
  "Would you risk your life to save a stranger?",
  "Would you take the blame for a major crime to save a best friend’s life?",
  "Do you think justice really exists?",
  "Do you think you will have any regrets when you’re 90?",
"Have you ever had an awful interview?"*/ 


  let timeArray=[];
  let submitArray=[];
  // print questions stored in array after pressing yes or no button.
    let count = 0;
    let submitCounter=1;
    const element= document.getElementById("Qs");
    const button1 = document.getElementById("increment");
    const button2 = document.getElementById("decrement");
    const textHolder = document.getElementById("counter");
    const indexContent=document.getElementById("indexContent");
    const popup=document.getElementById("popup");
    const submitBtn=document.getElementById("submitAnswer");

    
    element.innerHTML=questions[count];
    count++;
    
    
    //Setting up the timer
    let sec=min=0;
      
      let element2=setInterval(() => {
          if(sec!=99){
              sec++;
              //if(sec<10) secLab.innerHTML='0'+sec;
              //else secLab.innerHTML=sec;
          }else{
              min++;
              //if(min<10) minLab.innerHTML='0'+min;
              //else minLab.innerHTML=min;
              sec=0;
          }
      },10);

      
    call(button1);
    call(button2);
    
    



    
    // functions 
  function call(button) {
    //adding a listner to make sure that the questions loop after each click.
    button.addEventListener("click", function() {
      let audio= new Audio('ding.mp3');
      audio.play();
      element.innerHTML=questions[count];
      loggingInfo(timeArray, "Question");
      button1.style.visibility="hidden";
      button2.style.visibility="hidden";
      popup.style.visibility="visible";
      document.body.style.backgroundColor="rgba(135, 135, 135, 0.600)";
      
      if(count>questions.length-1){
        button1.style.visibility="hidden";
        button2.style.visibility="hidden";
        clearInterval(element2);
      }
    });
    
  };
  
  submitBtn.addEventListener("click", function(){
    let audio= new Audio('ding.mp3');
    audio.play();
    popup.style.visibility="hidden";
   
    button1.style.visibility="visible";
    button2.style.visibility="visible";

    if(count==questions.length-1){
      button1.style.visibility="hidden";
      button2.style.visibility="hidden";
    }

    document.body.style.backgroundColor="#ffffff";
    loggingInfo(submitArray,"SubmitBtn")
    count++
    submitCounter++; 
    if (submitCounter==questions.length) {
      loadToTable();
      exportToCSV();
    }
  })
  
  






  // function implementation 
function handleLocalStorage() {
  const name=document.getElementById("name").value;
  const age= document.getElementById("age").value;

  localStorage.setItem("NAME", name);
  localStorage.setItem("AGE", age);

  return;
}
function loggingInfo(array, key) {
    localStorage.setItem(key+[count],min+':'+sec);
    array.push(min+':'+sec);
}


function loadToTable(){

  const tablebody= document.getElementById("tableData");
  let dataHtml=''; 
  dataHtml=`<tr><td>${"NAME"}</td><td>${localStorage.getItem("NAME")}</td><td>-</td></tr>`;
  tablebody.innerHTML=dataHtml;
  dataHtml+=`<tr><td>${"AGE"}</td><td>${localStorage.getItem("AGE")}</td><td>-</td></tr>`;
  tablebody.innerHTML=dataHtml;
  let i=1;
  let a=0;
  
  
  for(let time of timeArray){
    dataHtml+= `<tr><td>${"Question"+[i]}</td><td>${time}</td><td>${submitArray[a]}</td></tr>`;
    tablebody.innerHTML=dataHtml;
    i++;
    a++;
  }
}

function exportToCSV(){
  const dataTable=document.getElementById("contentTable");
  const exporter= new TableCSVExporter(dataTable);
  const CSVOutput=exporter.convertToCSV();
  const CSVBlob= new Blob([CSVOutput], {type: "text/csv"});
  const BlobUrl= URL.createObjectURL(CSVBlob);
  const anchorElement=document.createElement("a");
  anchorElement.href=BlobUrl;
  anchorElement.download="table-excel.csv";
  anchorElement.click();
  console.log(BlobUrl);
  setTimeout(()=>{
    URL.revokeObjectURL(BlobUrl);
  }, 500)
}



class TableCSVExporter{
  constructor(table){
    this.table=table; //declaring HTML table element
    this.rows=Array.from(table.querySelectorAll("tr")); //initilaizing array for all tr elements
    console.log(this);
  }

  convertToCSV(){
    const lines=[];
    const numCols= 3;
    for(const row of this.rows){
      let line="";
      for(let i=0; i<numCols;i++){
        if (row.children[i]!==undefined) {
          line+=TableCSVExporter.parseCell(row.children[i]);
        }
        line +=(i!==(numCols-1)) ? ",":"";
      }
      lines.push(line);
    }
    return lines.join("\n");
  }

  static parseCell(tableCell){
    let parsedValue=tableCell.textContent;

    parsedValue= parsedValue.replace(/"/g,`""`);

    parsedValue=/[",\n]/.test(parsedValue) ? `"${parsedValue}"`:parsedValue;

    return parsedValue; 
  }
}