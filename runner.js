let number = 0;
console.log(process.pid);
setInterval(() => {
  console.log("running ", number++);
}, 500);
