const creatElement=(arr)=>{
    const element = arr.map((el)=> `<span class="btn">${el}</span>`);
    return element.join(" ");
}
// spinner manage function

const mangespinner = (statu) => {
    const spinner = document.getElementById("spinner");
    const wordContainer = document.getElementById("word-container");

    if (statu === true) {
        
        spinner.classList.remove("hidden");
        wordContainer.classList.add("hidden");
    } else {
        
        spinner.classList.add("hidden");       
        wordContainer.classList.remove("hidden");
    }
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const lodeLesson =()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")//promise of response
    .then(res => res.json())//promise of json data
    .then(json => displayLesson(json.data));

}

const lodeLevelword=(id)=>{  
    mangespinner(true);

    const url = `https://openapi.programming-hero.com/api/level/${id}`
   fetch(url)
   .then(res=>res.json())
   .then(dat=>{
    resetActiveButtons();///remove all cavtive class from all button

       const clickBtn = document.getElementById(`lesson-btn-${id}`);
       clickBtn.classList.add("active");
       // add active class to the clicked button
    //    console.log(lessonBtn);
        displayLevelword(dat.data)

    
    
   });
}

const resetActiveButtons = () => {
  const removeAcative = document.querySelectorAll(".lesson-btn");
   removeAcative.forEach(btn =>btn.classList.remove("active"))

};
const lodeWordDetail= async(id)=>{
    const url =`https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const deatle = await res.json();
    displayWordDetail(deatle.data);
    
}
const displayWordDetail=(word)=>{
    const modaltitrle = document.getElementById("dealts-conrainer");
    modaltitrle.innerHTML=`<div class="">
                <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>  ${word.pronunciation} )</h2>
            </div>
            <div class="">
                <h2 class=" font-bold"> Meaning</h2>
                <p class="font-bangla"> ${word.meaning }</p>
            </div>
            <div class="">
                <h2 class=" font-bold"> Example</h2>
                <p class="font-bangla"> ${word.sentence}</p>
            </div>
            <div class=""> 
                <h2 class=" font-bold"> Synonyms</h2>
                <div class="">${creatElement(word.synonyms)}</div>
            </div>
    
    `;

    document.getElementById("my_modal_5").showModal();    


}

const displayLevelword =(words)=>{
//    console.log(words)
  const wordContaine = document.getElementById("word-container");
  wordContaine.innerHTML = "";

  if (!words || words.length === 0) {
    wordContaine.innerHTML = `
         <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
            <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl">নেক্সth Lesson এ যান</h2>
         </div>`;
         mangespinner(false);
    return;
  }
    //   {
    //     "id": 1,
    //     "level": 1,
    //     "word": "Apple",
    //     "meaning": "আপেল",
    //     "pronunciation": "অ্যাপল"
    // }

  words.forEach(word=> {
    // console.log(word)
    const card=document.createElement("div");
    card.innerHTML= `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5  space-y-4">
            <h2 class="font-bold text-2xl  ">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold"> Meaning /Pronounciation
            </p>
            <div class="text-2xl font-medium font-bangla ">"${word.meaning ?word.meaning : "অর্থ পাওয়া যায়নি"}/${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center">
                <button onclick="lodeWordDetail(${word.id})" class="btn  bg-[#1a91ff10] hover:bg-[#1a91ff80]"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="btn g-[#1a91ff10] hover:bg-[#1a91ff80]"><i class="fa-solid fa-volume"></i></button>
            </div>

        </div>
    `
     wordContaine.append(card);
    })
    mangespinner(false);
}

const displayLesson=(lessons)=>{
    //get the containe
    const levelcontainer =document.getElementById("level-container");
    levelcontainer.innerHTML="";
    
    //get into every lesson 
    for(let lesson of lessons){

        // console.log(lesson)
        //creat Element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML =`
        <button id="lesson-btn-${lesson.level_no}" onclick=lodeLevelword(${lesson.level_no}) href="" class="btn btn-outline  btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i>lesson-${lesson.level_no}</bitton>
        ` 
        //append containe
        levelcontainer.append(btnDiv);
    }
    
};

lodeLesson();
document.getElementById("search-btn").addEventListener("click",()=>{
    resetActiveButtons();///remove all cavtive class from all button
    const searchInput = document.getElementById("input-search")
    const searchValue = searchInput.value.trim().toLowerCase();
    console.log(searchValue)
    fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res)=>res.json())
    .then((data)=>{
        const allWords = data.data;
        console.log(allWords)
        const filterWord=allWords.filter(word=>word.word.toLowerCase().includes(searchValue));
        displayLevelword(filterWord)
    })
});
    