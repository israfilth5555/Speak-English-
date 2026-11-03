
const creatElement=(arr)=>{
    const element = arr.map((el)=> `span class="bg-gray-200 px-2 py-1 rounded-full text-sm">${el}</span>`);
    console.log(element.join(" "))
}

const synonyms =["hiu","hello","greet"];
creatElement(synonyms);

