// This is main data
const loadData = () => {

    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
        .then(ok => ok.json())
        .then(data => {
            allTabsData(data.data);
        })

}

// This is a by defult showing datas
const allTabsData = (datas) => {

    for (data of datas) {
        const countTotal = document.getElementById("cardsContainer").children.length +1;
        document.getElementById("count").innerText = countTotal;

        const cardsContainer = document.getElementById("cardsContainer");
        const newCard = document.createElement("div");
        newCard.innerHTML = `
    
    <div id="cards-${data.id}" onclick="cardOpener(${data.id})" class="bg-white ${data.status === "open" ? "openBorder" : "closedBorder"}
    
    rounded-sm py-4 flex flex-col gap-3 h-full ">



        <div class="px-4 flex justify-between items-center">

        <img id="status" class="h-full w-10" src="./assets/${data.status === "open" ? "Open-Status.png" : "Closed-Status.png"}" alt="">

        <span 
        
        class="uppercase px-6 py-2.5 rounded-[100px] text-[14px]
            ${data.priority === "medium" ? "bg-[#FFF6D1] text-[#F59E0B]"

                : data.priority === "low" ? "bg-[#EEEFF2] text-[#9CA3AF]"

                    : "bg-[#FEECEC] text-[#EF4444]"}
        "> 

        ${data.priority}

        </span>
        </div>


        <div class="px-4">
          <h4 class="text-[18px] font-semibold pb-1">${data.title}</h4>

          <p class="text-[#64748B] text-[14px]">${data.description}</p>
        </div>


        <div id="bugsContainer-${data.id}" class="px-4 flex flex-wrap gap-2 pb-4 borderhr">

        ${tagForBugs(data.labels)}

        </div>


        <div class="px-4">
          <p class="text-[#64748B] text-[14px]">#${data.id}by ${data.author}</p>

          <p class="text-[#64748B] text-[14px]">${data.createdAt.split("T")[0]}</p>
        </div>



      </div>

    `;

        cardsContainer.appendChild(newCard);
    }

}

// This is a tag input forEach labels array to a span tag with map function
const tagForBugs = (arr) => {
const bugsSpan = arr.map(el => {
  let style = "";
  let icon = "";

  if (el === "bug") {
    style = "bg-[#FEECEC] text-[#EF4444] borderbug";
    icon = "fa-bug";
  } 
  
  else if (
    el === "help wanted" ||
    el === "documentation" ||
    el === "good first issue"
  ) {
    style = "bg-[#FFF8DB] text-[#D97706] borderhelp";
    icon = "fa-life-ring";
  } 
  
  else if (el === "enhancement") {
    style = "bg-[#DEFCE8] text-[#00A96E] borderenhancement";
    icon = "fa-burst";
  }

  return `
    <span class="uppercase px-4 py-1.5 rounded-[100px] text-[14px] ${style}">
      <i class="pr-2 fa-solid ${icon}"></i>
      ${el}
    </span>
  `;
}).join("");
return bugsSpan;
}

// This is by defult auto caling function
loadData()


// This is filter the tab function "this was only need a id and he is a back id's data"
const filterTabs = (id) => {

const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
        .then(ok => ok.json())
        .then(data => {
        statusFunction(data.data)
        })

const statusFunction = (stutus) => {

    for (const sta of stutus) {
        if (sta.status == id) {

            const countTotal = document.getElementById("cardsContainer").children.length +1;
        document.getElementById("count").innerText = countTotal;

        const cardsContainer = document.getElementById("cardsContainer");
        const newCard = document.createElement("div");
        newCard.innerHTML = `
    
    <div id="cards-${sta.id}" onclick="cardOpener(${sta.id})" class="bg-white ${sta.status === "open" ? "openBorder" : "closedBorder"}
    
    rounded-sm py-4 flex flex-col gap-3 h-full ">



        <div class="px-4 flex justify-between items-center">

        <img id="status" class="h-full w-10" src="./assets/${sta.status === "open" ? "Open-Status.png" : "Closed-Status.png"}" alt="">

        <span 
        
        class="uppercase px-6 py-2.5 rounded-[100px] text-[14px]
            ${sta.priority === "medium" ? "bg-[#FFF6D1] text-[#F59E0B]"

                : sta.priority === "low" ? "bg-[#EEEFF2] text-[#9CA3AF]"

                    : "bg-[#FEECEC] text-[#EF4444]"}
        "> 

        ${sta.priority}

        </span>
        </div>


        <div class="px-4">
          <h4 class="text-[18px] font-semibold pb-1">${sta.title}</h4>

          <p class="text-[#64748B] text-[14px]">${sta.description}</p>
        </div>


        <div id="bugsContainer-${sta.id}" class="px-4 flex flex-wrap gap-2 pb-4 borderhr">

        ${tagForBugs(sta.labels)}

        </div>


        <div class="px-4">
          <p class="text-[#64748B] text-[14px]">#${sta.id}by ${sta.author}</p>

          <p class="text-[#64748B] text-[14px]">${sta.createdAt.split("T")[0]}</p>
        </div>



      </div>

    `;

        cardsContainer.appendChild(newCard);


        }
        
    }

}

}

// This formet name from "chatgpt" any peragraph sand and this is back First letter uppercase and all lowercase like this = helLo iM SaLman > Hello Im Salman
const formatName = (name) => {
  return name
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Popup open and show popup all of the content module
const cardOpener = (id) => {
    my_modal_5.showModal()
    const myModalFive = document.getElementById("my_modal_5");
    myModalFive.innerHTML = "";

    const urlById = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    fetch(urlById)
    .then(ok => ok.json())
    .then(data => {
        modalFunction(data.data);
    })

    const modalFunction = (data) => {

        const newModalContent = document.createElement("div");
        newModalContent.innerHTML = `
          <div id="popupCards" class="modal-box space-y-6">
    
      <div class="space-y-2 mb-8">
        <h2 class="text-[24px] text-[#1F2937] font-semibold">${data.title}</h2>
      <div class="flex items-center gap-2 ">
        <div><span class="uppercase px-2 py-1.5 text-[12px] font-medium ${data.status == "open" ? "bg-[#00A96E]" : "bg-[#A855F7]"} text-white rounded-full">${data.status}</span></div>
        <ul class="flex text-[12px] text-[#64748B] gap-6 list-disc pl-5">
          <li>Opened by ${formatName(data.assignee)}</li>
          <li>${data.createdAt.split("T")[0]}</li>
        </ul>
      </div>
      </div>

      <div id="popupBugs" class="flex flex-wrap gap-2 pb-4 borderhr">

        ${tagForBugs(data.labels)}

      </div>


      <p class="text-[16px] text-[#64748B]">${data.description}</p>
      <div class="p-4 bg-[#F8FAFC] rounded-lg flex justify-between">
        <div class="w-full space-y-1">
          <p class="text-[16px] text-[#64748B]">Assignee:</p>
          <p class="font-semibold text-[16px] text-[#1F2937]">${formatName(data.assignee)}</p>
        </div>
        <div class="w-full pl-2.5 space-y-1">
          <p class="text-[16px] text-[#64748B]">Priority:</p>
          <span class="uppercase px-4 py-1.5 text-[12px] font-medium ${data.priority == "high" ? "bg-[#EF4444]" : data.priority == "low" ? "bg-gray-300" : "bg-yellow-500"} text-white rounded-full">${data.priority}</span>
        </div>
      </div>

      <form class="flex justify-end" method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-primary w-full md:w-fit">Close</button>
      </form>
    </div>
  </div>
        `;

        myModalFive.appendChild(newModalContent);

    }



    
}



// This is tabs by filter card er oneclick funtion
document.getElementById("open").addEventListener("click", () => {
const cardsContainer = document.getElementById("cardsContainer");
cardsContainer.innerHTML = "";

filterTabs("open")
})
// 
document.getElementById("closed").addEventListener("click", () => {
const cardsContainer = document.getElementById("cardsContainer");
cardsContainer.innerHTML = "";

filterTabs("closed")
})
// 
document.getElementById("allContent").addEventListener("click", () => {
const cardsContainer = document.getElementById("cardsContainer");
cardsContainer.innerHTML = "";

loadData()
})
// This is tabs by filter card er oneclick funtion


// This is for search result
document.getElementById("search").addEventListener("input", (e) => {

    const value = e.target.value.toLowerCase();

    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;

    fetch(url)
        .then(res => res.json())
        .then(result => {

            const matchedData = result.data.filter(data =>
                data.title.toLowerCase().includes(value)
            );

            searchResultShow(matchedData);

        });

});
// 
const searchResultShow = (datas) => {

    const cardsContainerSearch = document.getElementById("cardsContainer");

    // আগের result remove
    cardsContainerSearch.innerHTML = "";

    // নতুন result loop
    datas.forEach(data => {

        const newCard = document.createElement("div");

        newCard.innerHTML = `
    
    <div id="cards-${data.id}" onclick="cardOpener(${data.id})" class="bg-white ${data.status === "open" ? "openBorder" : "closedBorder"}
    
    rounded-sm py-4 flex flex-col gap-3 h-full ">



        <div class="px-4 flex justify-between items-center">

        <img id="status" class="h-full w-10" src="./assets/${data.status === "open" ? "Open-Status.png" : "Closed-Status.png"}" alt="">

        <span 
        
        class="uppercase px-6 py-2.5 rounded-[100px] text-[14px]
            ${data.priority === "medium" ? "bg-[#FFF6D1] text-[#F59E0B]"

                : data.priority === "low" ? "bg-[#EEEFF2] text-[#9CA3AF]"

                    : "bg-[#FEECEC] text-[#EF4444]"}
        "> 

        ${data.priority}

        </span>
        </div>


        <div class="px-4">
          <h4 class="text-[18px] font-semibold pb-1">${data.title}</h4>

          <p class="text-[#64748B] text-[14px]">${data.description}</p>
        </div>


        <div id="bugsContainer-${data.id}" class="px-4 flex flex-wrap gap-2 pb-4 borderhr">

        ${tagForBugs(data.labels)}

        </div>


        <div class="px-4">
          <p class="text-[#64748B] text-[14px]">#${data.id}by ${data.author}</p>

          <p class="text-[#64748B] text-[14px]">${data.createdAt.split("T")[0]}</p>
        </div>



      </div>

    `;

        cardsContainerSearch.appendChild(newCard);

    });

};
// This is for search result