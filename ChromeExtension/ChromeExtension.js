const inputBtn = document.querySelector('#input-btn')
const deleteBtn = document.querySelector('#delete-btn')
const saveBtn = document.querySelector('#save-btn')
const input = document.querySelector('#input-el')
let ul = document.querySelector('#ul-el')
let containerHeight = document.querySelector('.input-container')
let myLeads = [];
let oldLeads = [];

window.onload = (myLeads) => {
  myLeads = JSON.parse(localStorage.getItem("myLeads")) || [];
  myLeads.forEach(lead => renderLeads(lead))
}

inputBtn.addEventListener('click', () => {
  addNewLead(myLeads)
})

input.addEventListener('keypress', (event) => {
  if(event.key === 'Enter') {
    addNewLead(myLeads)
  }
})

deleteBtn.addEventListener('click', () => {
  deleteLeads()
})  

saveBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) =>{
    myLeads.push(tabs[0].url)
    renderLeads(tabs[0].url)
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
  });
})

function addNewLead(lead) {
  let inputValueLowerCase = input.value.toLowerCase();
  if(inputValueLowerCase) {
    lead.push(inputValueLowerCase);
    localStorage.setItem("myLeads", JSON.stringify(lead));
    renderLeads(inputValueLowerCase)
    input.value = '';
  }
}

function renderLeads(lead) {
  let li = document.createElement('li')
  let a = document.createElement('a')
  a.innerHTML = lead;
  a.href = "https://" + lead;
  a.target = "_blank";
  li.append(a)
  ul.append(li)  
}

function deleteLeads() {
  localStorage.clear();
  ul.innerHTML = '';
  containerHeight.style.height = 'auto';
}