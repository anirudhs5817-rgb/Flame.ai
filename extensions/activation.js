let extension = null;
if (localStorage.getItem("extension") === null) {} else {
  extension = JSON.parse(localStorage.getItem("extension"));
  eval(extension.script);
  console.log(extension.name + " has been activated.");
} else {
  console.log("No extensions are activated.");
}
