const icon = document.createElement("link");
icon.rel = "icon";
icon.type = "image/x-icon";
icon.src = ""; //Add favicon's source in the string
const description = document.createElement("meta");
description.name = "description";
description.content = ""; //Put description in the string
document.head.appendChild(icon);
document.head.appendChild(description);
