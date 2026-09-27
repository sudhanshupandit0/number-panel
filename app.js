const $=id=>document.getElementById(id);
let db=JSON.parse(localStorage.getItem("npAdmin")||"null")||{
 numbers:[
  {n:"+1 202 555 0141",c:"US",t:"DID",cost:100,sell:149,on:true},
  {n:"+44 20 7946 0123",c:"UK",t:"DID",cost:120,sell:179,on:true},
  {n:"+91 11 4000 1234",c:"IN",t:"DID",cost:130,sell:199,on:false}
 ],
 clients:[{name:"Demo Client",email:"client@example.com",balance:500,numbers:0,on:true}],
 orders:[]
};
const save=()=>localStorage.setItem("npAdmin",JSON.stringify(db));
function show(id){document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===id));document.querySelectorAll(".nav").forEach(n=>n.classList.toggle("active",n.dataset.page===id));$("side").classList.remove("open")}
document.querySelectorAll("[data-page]").forEach(x=>x.onclick=()=>show(x.dataset.page));
$("hamb").onclick=()=>$("side").classList.toggle("open");

function render(){
 $("total").textContent=db.numbers.length;
 $("avail").textContent=db.numbers.filter(x=>x.on).length;
 $("clientsCount").textContent=db.clients.length;
 $("ordersCount").textContent=db.orders.length;
 $("numTable").innerHTML=db.numbers.map((x,i)=>`<tr><td>${x.n}</td><td>${x.c}</td><td>${x.t}</td><td>₹${x.cost}</td><td>₹${x.sell}</td><td><span class="status ${x.on?"":"off"}">${x.on?"Available":"Assigned"}</span></td><td><button class="action" onclick="toggleNumber(${i})">${x.on?"Disable":"Enable"}</button></td></tr>`).join("");
 $("clientTable").innerHTML=db.clients.map(x=>`<tr><td>${x.name}</td><td>${x.email}</td><td>₹${x.balance.toFixed(2)}</td><td>${x.numbers}</td><td><span class="status ${x.on?"":"off"}">${x.on?"Active":"Disabled"}</span></td></tr>`).join("");
 $("orderTable").innerHTML=db.orders.length?db.orders.slice().reverse().map(x=>`<tr><td>${x.id}</td><td>${x.client}</td><td>${x.number}</td><td>₹${x.amount}</td><td><span class="status">Completed</span></td></tr>`).join(""):'<tr><td colspan="5">No orders.</td></tr>';
}
window.toggleNumber=i=>{db.numbers[i].on=!db.numbers[i].on;save();render()};

let mode="";
function modal(title,body,handler){$("modalTitle").textContent=title;$("modalBody").innerHTML=body;$("modal").classList.remove("hidden");mode=handler}
$("cancel").onclick=()=>$("modal").classList.add("hidden");
$("confirm").onclick=()=>{if(mode==="number"){let n=$("mn").value.trim(),c=$("mc").value.trim(),cost=Number($("mcost").value),sell=Number($("msell").value);if(!n||!c||!cost||!sell)return alert("Fill all fields.");db.numbers.push({n,c,t:"DID",cost,sell,on:true})}else{let name=$("cn").value.trim(),email=$("ce").value.trim();if(!name||!email)return alert("Fill all fields.");db.clients.push({name,email,balance:0,numbers:0,on:true})}save();render();$("modal").classList.add("hidden")};
$("addNumber").onclick=()=>modal("Add number",`<label>Number<input id="mn" placeholder="+1 202 ..."></label><label>Country<input id="mc" placeholder="US"></label><label>Provider cost<input id="mcost" type="number"></label><label>Sell price<input id="msell" type="number"></label>`,"number");
$("addClient").onclick=()=>modal("Add client",`<label>Name<input id="cn" placeholder="Client name"></label><label>Email<input id="ce" type="email" placeholder="client@example.com"></label>`,"client");
$("savePricing").onclick=()=>alert("Demo pricing saved.");
$("saveSettings").onclick=()=>alert("Demo settings saved.");
render();