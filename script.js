document.addEventListener("DOMContentLoaded", () => {

  const roles = [
    "Robotics & AI Engineer",
    "ROS • Computer Vision • Autonomous Systems",
    "Building Intelligent Machines"
  ];

  let i=0,j=0,del=false;
  const typing=document.getElementById("typing");

  function loop(){
    const t=roles[i];
    typing.textContent=t.slice(0,j);
    j+=del?-1:1;
    if(j>t.length+6) del=true;
    if(j===0&&del){del=false;i=(i+1)%roles.length;}
    setTimeout(loop,del?40:80);
  }
  loop();

  const toggle=document.getElementById("themeToggle");
  toggle.addEventListener("click",()=>{
    document.body.classList.toggle("light");
    toggle.textContent=document.body.classList.contains("light")?"☀️":"🌙";
  });

});
