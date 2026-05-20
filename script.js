const loadData = () => {

    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
        .then(ok => ok.json())
        .then(data => {
            allTabsData(data.data);
        })

}

const allTabsData = (datas) => {

    for (data of datas) {
        const cardsContainer = document.getElementById("cardsContainer");
        const newCard = document.createElement("div");
        //     "id": 1,
        // "title": "Fix navigation menu on mobile devices",
        // "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
        // "status": "open",
        // "labels": [
        // "bug",
        // "help wanted"
        // ],
        // "priority": "high",
        // "author": "john_doe",
        // "assignee": "jane_smith",
        // "createdAt": "2024-01-15T10:30:00Z",
        // "updatedAt": "2024-01-15T10:30:00Z"
        newCard.innerHTML = `
    
    <div class="bg-white ${data.status === "open" ? "openBorder" : "closedBorder"}
    
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


        <div class="px-4 flex gap-2 pb-4 borderhr">

          <span class="uppercase px-4 py-1.5 rounded-[100px] bg-[#FEECEC] text-[#EF4444] borderbug text-[14px]"><i class="pr-2 fa-solid fa-bug"></i> Bug</span>

          <span class="uppercase px-4 py-1.5 rounded-[100px] bg-[#FFF8DB] text-[#D97706] borderhelp text-[14px]"><i class="pr-2 fa-solid fa-life-ring"></i> Bug</span>

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

loadData()