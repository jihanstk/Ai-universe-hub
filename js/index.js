// from api data load
var infoData =[];
const loadDataFromApi =(dataLimit)=>{
    loader(true)
    fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then(res=>res.json())
    .then(data=>{ 
        infoData = data.data.tools;
        showData(infoData,dataLimit)
        
    })


}

// displayed data

const showData =(infos,dataLimit)=>{
    // console.log(infos);
    
   

    const cardContainer = document.getElementById("card-container");
    const showBtnContainer = document.getElementById("show-btn-container");
    if(dataLimit && infos.length > 6){
        showBtnContainer.classList.remove("d-none")
        infos=infos.slice(0 , 6);
    }else{
        showBtnContainer.classList.add("d-none")
        
    }
  
   
     
        // let sorting = sortByDate(infos);
        
        infos.forEach(info => {
            let colElement = document.createElement("div");
        
        colElement.classList.add("col");
        colElement.innerHTML= `
        <div class="card p-4">
        <img src="${info.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">features</h5>
        <ol id="ol-e">
        <li>${info.features[0]?info.features[0]:"no Data found"}</li>
        <li>  ${info.features[1]?info.features[1]:"no Data found"}</li>
        <li> ${info.features[2]?info.features[2]:"no Data found"}</li>
        </ol>
        <hr>
        <div id="footer" class="footer d-flex justify-content-between align-items-center">
        <div class="text">
        <h5>${info.name}</h5>
        <p> <i class="fa-regular fa-calendar-days"></i> <span>${info.published_in}</span></p>
        </div>
        <div class="text">
        <button onclick="loadDetailsData('${info.id}')" type="button" id="details-btn" data-bs-toggle="modal" href="#aiHubModal" role="button">
        <i class="fa-solid fa-arrow-right fs-4"></i>
         </button>
        </div> 
        </div>
        </div>
        </div>
    
        `;
        cardContainer.appendChild(colElement)
    });
    // const sort = sortByDate(infos);
    
   
    
    loader(false)
}

// sort function

document.getElementById("sorting").addEventListener("click",(event)=>{
       if(infoData.length > 0){

           infoData.sort((a, b)=> new Date(b.published_in) - new Date(a.published_in) )
         document.getElementById("card-container").innerHTML="";
           showData(infoData)  ; 
        }
   
    // showData()
    
      });



// added spinner
const loader=isLoading =>{
    const loaderSection = document.getElementById("loader");
    if(isLoading){
        loaderSection.classList.remove("d-none");
    }else{
        loaderSection.classList.add("d-none")
    }
}

//if > 6 dataload 
document.getElementById("show-btn").addEventListener("click",()=>{

loadDataFromApi()


})

// load details data
const loadDetailsData=(id)=>{
    const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>detailsDisplay(data.data))
}
// const accuracy = document.getElementById("accuracy");
const detailsDisplay =(details)=>{
    console.log(details);
    
    // console.log(details);
    const modalContainer = document.getElementById("modal-container");
    
    modalContainer.innerHTML=`
            <div class="modal-content p-5">
            <div class="modal-header">
            <button type="button" class="btn-close btn-cross border-none" data-bs-dismiss="modal" aria-label="Close"></button>
            </div> 
            <div class="modal-body d-flex justify-content-center align-items-center ">
            <div class="row">
                <div class="col-md-6 col-12 border border-success rounded p-2">
                    <h5>${details.description}</h5>
                    <div class="row">
                    <div class="col-md-4 p-3">
                    <p class=" text-success">${details.pricing?details.pricing[0].price : "free of cost"} ${details.pricing? details.pricing[0].plan :""}</p>
                    </div>
                    <div class="col-md-4 p-3"><p class="text-warning">${details.pricing?details.pricing[1].price : "free of cost"} ${details.pricing? details.pricing[1].plan :""}</p></div>
                    <div class="col-md-4 p-3"><p class="text-danger">${details.pricing? details.pricing[2].price : "free of cost"} ${ details.pricing ? details.pricing[2].plan:""}</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <h5>feature</h5>
                            <ul class = "li-color">
                            <li>${details.features ? details.features[1].feature_name : "not found"}</li>
                            <li>${details.features ? details.features[2].feature_name : "not found"}</li>
                            <li>${details.features ? details.features[3].feature_name : "not found"}</li>
                            </ul>
                        </div>
                        <div class="col-6">
                            <h5>integration</h5>
                            <ul class = "li-color">
                            <li>${details.integrations ? details.integrations[0]:"no data found"}</li>
                            <li>${details.integrations ? details.integrations[1]: "no data found"}</li>
                            <li>${details.integrations ? details.integrations[2]:"no data found"}</li>
                            </ul>
                        </div>
                    </div>
                    </div>
                    <div class="col-12 col-md-6">
                        
                        <div class="image">
                           
                            <img class="img-fluid" src="${details.image_link ? details.image_link[0] : "photo haven't yet"}" alt="">
                            <span id ="accuracy" class="px-3 accuracy rounded">${details.accuracy.score ? details.accuracy.score*100+"% accuracy":''
                        }</span>
                            </div>

                        <div class="text-center mt-5">
                        <h5>${details.input_output_examples ? details.input_output_examples[0].input:"Can you give any example?"}</h5>
                        <p>${details.input_output_examples ? details.input_output_examples[1].input : "No! Not Yet! Take a break!!!"}</p>

                        </div>

                    </div>
            </div>
            </div>
            </div>
    `;


}
// sorting function
const sortByDate = (infos) =>{
    infos.sort((a, b)=> new Date(b.published_in) - new Date(a.published_in) )
   
}
loadDataFromApi(6)





