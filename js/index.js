
const loadDataFromApi =(dataLimit)=>{
    loader(true)
    fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then(res=>res.json())
    .then(data=>showData(data.data.tools,dataLimit))


}


const showData =(infos,dataLimit)=>{
    console.log(infos);
    
    const cardContainer = document.getElementById("card-container");
    const showBtnContainer = document.getElementById("show-btn-container");
    if(dataLimit && infos.length >6){
        showBtnContainer.classList.remove("d-none")
        infos=infos.slice(0 , 6);
    }else{
        showBtnContainer.classList.add("d-none")
    }
   
    infos.forEach(info => {
        let colElement =document.createElement("div");
        
        colElement.classList.add("col");
        colElement.innerHTML= `
        <div class="card p-4">
        <img src="${info.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">features</h5>
        <ol id="ol-e">
        <li>${info.features[0]}</li>
        <li>  ${info.features[1]}</li>
        <li> ${info.features[2]}</li>
        </ol>
        <hr>
        <div id="footer" class="footer d-flex justify-content-between align-items-center">
        <div class="text">
        <h5>${info.name}</h5>
        <p> <i class="fa-regular fa-calendar-days"></i> <span>${info.published_in}</span></p>
        </div>
        <div class="text">
        <button onclick="" id="detais-btn"> <i class="fa-solid fa-arrow-right fs-4"></i></button>
        </div> 
        </div>
        </div>
        </div>
    
        `
        
        cardContainer.appendChild(colElement)
    });
   
  loader(false)
}




const loader=isLoading =>{
    const loaderSection = document.getElementById("loader");
    if(isLoading){
        loaderSection.classList.remove("d-none");
    }else{
        loaderSection.classList.add("d-none")
    }
}


document.getElementById("show-btn").addEventListener("click",()=>{

loadDataFromApi()

})



loadDataFromApi(6)
