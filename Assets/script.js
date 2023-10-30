let Tools_List = new Array();
Tools_List = [
    ["Color Picker", "https://cdn-icons-png.flaticon.com/512/719/719747.png", "This tools allows you to generate hexagonal Code of color", "Color-Picker", "Designing"],
    ["Image to WEBP Coverter", "https://play-lh.googleusercontent.com/crERGH6Ss5LNoNJmlQy7B53KYJsf9v92i69Bdq455o8PyjUlJ-1THdQj0zaYZAJidZQ", "Just Drop your Image and Get them downloaded in WEBP Format", "WEBP-Converter", "Converter"],
];

var ToolsHolder = document.querySelector("#Tools_Holder");
function LoadTools() {
    for (i = 0; i < Tools_List.length; i++) {
        var newTool =
            `<a href="${Tools_List[i][3]}"
                    class="w-4/5 sm:w-5/12 lg:w-[31%] bg-[#363636] rounded-md text-cyan-50 p-5 m-2 md:m-6 lg:m-2">
                    <span class="flex gap-3 items-center">
                        <img src="${Tools_List[i][1]}" alt=""
                            class="rounded-md h-12 w-12">
                        <h2>${Tools_List[i][0]}</h2>
                    </span>
                    <p class="mt-4">${Tools_List[i][2]}</p>
                    <span class="rounded-md p-1 bg-[#007acc8a] text-[#add6f1] text-xs mt-1">${Tools_List[i][4]}</span>
                </a>`;
        ToolsHolder.insertAdjacentHTML("afterbegin", newTool);
    }
}


