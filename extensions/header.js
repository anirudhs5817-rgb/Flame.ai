const header = document.createElement("div");
header.id = "header";
const headerHomeS = document.createElement("a");
headerHomeS.href = "https://sparkyJSlibary.github.io/";
const headerHomeI = document.createElement("img");
headerHomeI.width = "200";
headerHomeI.height = "45";
headerHomeI.src = "https://sparkyJSlibary.github.io/assets/images/icons/headerImg.png";
document.body.appendChild(header);
header.appendChild(headerHomeS);
headerHomeS.appendChild(headerHomeI);

/*
<div id="header">
     <a href="https://sparkyJSlibary.github.io/">
      <img width="200" height="45" src="https://sparkyJSlibary.github.io/assets/images/icons/headerImg.png">
     </a>
</div>
*/
