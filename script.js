document.addEventListener("mousemove", e => {
  const glow = document.querySelector(".cursor-glow");
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
  glow.style.opacity = 1;
});

const roles = [
  "Robotics & Automation Engineer",
  "Autonomous Systems & ROS 2",
  "Applied Robotics Research"
];

let i=0,j=0,del=false;
const typing=document.getElementById("typing");

function loop(){
  typing.textContent = roles[i].slice(0,j);
  if(!del) j++; else j--;
  if(j>roles[i].length+5) del=true;
  if(j===0 && del){ del=false; i=(i+1)%roles.length; }
  setTimeout(loop, del?40:80);
}
loop();
