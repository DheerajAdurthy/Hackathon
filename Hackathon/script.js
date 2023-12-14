function showDialog() {
  let selectedText = getSelectedText();
  if (selectedText !== "") {
    var dialog = document.getElementById("dialog");
    while (dialog.firstChild) {
      dialog.removeChild(dialog.firstChild);
    }
    for (i = 0; i < 3; i++) {
      let icon = getIcons(i);
      dialog.appendChild(icon);
    }
    // Set the position just above the selected text
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var rect = range.getBoundingClientRect();

    dialog.style.top = `${rect.top - dialog.offsetHeight - 55}px`;
    dialog.style.left = `${rect.left + rect.width / 2 - dialog.offsetWidth}px`;

    dialog.style.display = "block";
  }
}

function getSelectedText() {
  var selectedText = "";
  if (window.getSelection) {
    selectedText = window.getSelection().toString();
  } else if (document.selection && document.selection.type !== "Control") {
    selectedText = document.selection.createRange().text;
  }
  return selectedText;
}

function getIcons(IconNumber) {
  let icon = document.createElement("i");
  icon.className = "icon";
  let selectedText = getSelectedText();
  switch (IconNumber) {
    case 0:
        icon.innerHTML = '<i class="fa fa-search" aria-hidden="true"></i>';
        icon.addEventListener("click",async function() { 
        icon.setAttribute("data-toggle", "modal");
        icon.setAttribute("data-target", "#exampleModal");
        let loadingSpinner=document.getElementById('spinner')
        loadingSpinner.style.display='block'
        let modalData=document.getElementById('modal-data')
        modalData.style.display='none'
        const url = 'https://google-web-search1.p.rapidapi.com/?query='+`${selectedText}`+'&limit=20&related_keywords=true';
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'f7bbdb6c7emshbbecf15c16bdf15p1a6360jsn88e2604b2b0f',
            'X-RapidAPI-Host': 'google-web-search1.p.rapidapi.com'
          }
        };
        try {
          const response = await fetch(url, options);
          const result = await response.json();
          loadingSpinner.style.display='none'
          modalData.style.display='block'
          const responseData={}
          for(const key in result){
            responseData[key]=result[key]
          }
          let definitionText=responseData.knowledge_panel.description.text
          let imageURL=responseData.knowledge_panel.image.url
          if(definitionText){
            $('.main-body').html(definitionText);
          }
          else{
            $('.main-body').html("Oops! sorry couldn't find right definitionText");
          }
          if(imageURL){
            $('.image-res').attr("src",imageURL);
          }
          let uList=document.getElementById('related-keywords')
          if(uList.childElementCount>0){
            while(uList.firstChild){
              uList.removeChild(uList.firstChild)
            }
          }
          responseData.related_keywords.keywords.forEach(keyword => {
          let listEle=document.createElement('li')
          listEle.innerHTML=keyword.keyword
          uList.appendChild(listEle)
          });
        } catch (error) {
          console.error(error);
        }
      });
      break;
    case 1:
      icon.innerHTML = '<i class="fa fa-language" aria-hidden="true"></i>';
      icon.addEventListener("click",async function () {
        icon.setAttribute("data-toggle", "modal");
        icon.setAttribute("data-target", "#exampleModal");
        const url = 'https://google-api31.p.rapidapi.com/translate';
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'f7bbdb6c7emshbbecf15c16bdf15p1a6360jsn88e2604b2b0f',
            'X-RapidAPI-Host': 'google-api31.p.rapidapi.com'
          },
          body: {
            "text": "William Edward Sanders (1883–1917) was a New Zealand recipient of the Victoria Cross (VC), the highest British and Commonwealth combat award for gallantry. He took up a seafaring career in 1899 and earned a master's certificate in 1914, after the outbreak of World War I. He served on troopships until April 1916, when he was commissioned in the Royal Naval Reserve. He was appointed second in command of Helgoland, a Q-ship operating against German submarines. He was given his own command, HMS Prize, in February 1917. Sanders was awarded the VC for his actions while on his first patrol as captain, when Prize engaged and drove off a German U-boat that had attacked and damaged the ship. He was killed in action when Prize was sunk by a U-boat on her fourth patrol. His VC is currently held by the Auckland War Memorial Museum. His memorials include the Sanders Cup, a sailing trophy for 14-foot (4.3 m) yachts.",
            "to": "te",
            "from_lang": ""
          }
        };
        try {
          const response = await fetch(url, options);
          const result = await response.text();
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      });
      break;
    case 2:
      icon.innerHTML = '<i class="fa fa-globe" aria-hidden="true"></i>';
      icon.addEventListener("click",async function () {
        icon.setAttribute("data-toggle", "modal");
        icon.setAttribute("data-target", "#exampleModal");
      });
      break;
    default:
  }
  return icon;
}

/* function showDialog() {
    // Get the selected text and its position
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var rect = range.getBoundingClientRect();

    // Set the content of the dialog
     
    

    // Calculate the position for the dialog
    var dialog = document.getElementById("dialog");
    var topPosition = rect.top - dialog.offsetHeight - 50; // 10 is a small gap
    var leftPosition = rect.left - (rect.width - dialog.offsetWidth) / 200;
    let searchIcon=document.createElement('i')
    searchIcon.innerHTML='<i class="fa fa-search" aria-hidden="true"></i>'
    searchIcon.style.marginRight='10px'
    let langIcon=document.createElement('i')
    langIcon.innerHTML='<i class="fa fa-language" aria-hidden="true"></i>'
    langIcon.style.marginRight='10px'
    let globeIcon=document.createElement('i')
    globeIcon.innerHTML='<i class="fa fa-globe" aria-hidden="true"></i>'
    dialog.appendChild(searchIcon)
    dialog.appendChild(langIcon)
    dialog.appendChild(globeIcon)
    dialog.style.display = 'flex';
    dialog.style.flexDirection = 'row'; // or 'column'
    dialog.style.alignItems = 'center';
    dialog.style.justifyContent = 'center';

    // Set the position of the dialog
    dialog.style.top = (topPosition < 0 ? 0 : topPosition) + "px";
    dialog.style.left = (leftPosition < 0 ? 0 : leftPosition) + "px";

    // Show the dialog
    dialog.style.display = "block";
  }

  // Function to close the dialog
  function closeDialog() {
    // Hide the dialog
    let dialog=document.getElementById("dialog")
    dialog.style.display = "none";
    while (dialog.firstChild) {
      dialog.removeChild(dialog.firstChild);
    }
  } */
function closeDialog() {
  // Hide the dialog
  let dialog = document.getElementById("dialog");
  dialog.style.display = "none";
}



/* const url = 'https://google-api31.p.rapidapi.com/translate';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': 'f7bbdb6c7emshbbecf15c16bdf15p1a6360jsn88e2604b2b0f',
		'X-RapidAPI-Host': 'google-api31.p.rapidapi.com'
	},
	body: {
		text: 'William Edward Sanders (1883–1917) was a New Zealand recipient of the Victoria Cross (VC), the highest British and Commonwealth combat award for gallantry. He took up a seafaring career in 1899 and earned a master\'s certificate in 1914, after the outbreak of World War I. He served on troopships until April 1916, when he was commissioned in the Royal Naval Reserve. He was appointed second in command of Helgoland, a Q-ship operating against German submarines. He was given his own command, HMS Prize, in February 1917. Sanders was awarded the VC for his actions while on his first patrol as captain, when Prize engaged and drove off a German U-boat that had attacked and damaged the ship. He was killed in action when Prize was sunk by a U-boat on her fourth patrol. His VC is currently held by the Auckland War Memorial Museum. His memorials include the Sanders Cup, a sailing trophy for 14-foot (4.3 m) yachts.',
		to: 'fr',
		from_lang: ''
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
} */