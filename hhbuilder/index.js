// Your code goes here
/******************** HOW TO RUN THE APP*******************************************/
//Please have both html and this js file in the same directory,
//and double click on the html file or any other way you could think of
//to display the html file on the browser would work.
/*********************************************************************************/
var ageEl = document.querySelector("[name=age]");
var relEl = document.querySelector("[name=rel]");
var smokerEl = document.querySelector("[name=smoker]");
var addButton = document.querySelector(".add");
var submitButton = document.querySelector("[type=submit]");
var debugEl = document.querySelector(".debug");
var HouseholdObj = new Household();
var index = 0;
var saveHousehold ,returnedNode,BrandNewPerson, editButton,currentDate;


/*** Household Constructor***/
function Household (value) {
  this._len = 0;
  this.head = null;
}

Household.prototype.addPersonToHousehold = function (newPerson) {
  BrandNewPerson = newPerson;
  currentNode = this.head;
  if(!this.head) {
    this.head = BrandNewPerson;
    this._len++
    return BrandNewPerson;
  }
  while(currentNode.next){
    currentNode = currentNode.next;
  }
  currentNode.next = BrandNewPerson;
  this._len++
  return BrandNewPerson;
}

Household.prototype.remove = function (pos) {
  var pos = parseInt(pos);
  var currentNode = this.head, counter = 1, prevNode;
  //if no node, return
  if(this._len === 0) return;
  //when only one node
  if(pos === 1 && this._len === 1) {
    this.head = currentNode.next;
    this._len --;
    counter = 1;
    index --;
  } else {
    while(counter < pos){
      prevNode = currentNode;
      if (currentNode.next){
        currentNode = currentNode.next;
      } else {
        currentNode = null;
      }
      counter++;
    }
    if(currentNode.next !== null) {
      prevNode.next = currentNode.next;
      prevNode.next.itemNum --;
    } else {
      prevNode.next = null;
    }
    index --;
    this._len--;
    return this.head;
  }
}

/*** Person Constructor***/
function Person () {
  this.itemNum = index;
  this.age = null;
  this.relationship = null;
  this.smoker = null;
  this.next = null;
}

Person.prototype.addAge = function (age) {
  if(parseInt(age) >= 0) this.age = parseInt(age);
  else return alert("Please input positive integer. ex. 0 1 22...");
}

Person.prototype.addRelationship = function (relationship) {
  if(!relationship) alert("please provide relationship");
  else this.relationship = relationship;
}

Person.prototype.smokerTrueFalse = function (answer) {
  this.smoker = answer;
}

Person.prototype.addItemNum = function () {
  index ++;
  this.itemNum ++;
}

 Person.prototype.addToTheListHTML = function () {
   var li = document.createElement("li");
   var text = document.createTextNode(`Age: ${this.age}, Relationship: ${this.relationship}, Smoker: ${this.smoker}`);
   var buttonTag = document.createElement("button");
   var buttonText = document.createTextNode("delete");
  li.setAttribute("data", `${this.itemNum}`);
  buttonTag.setAttribute("class","delete-button");
  buttonTag.appendChild(buttonText);
  li.appendChild(text);
  li.appendChild(buttonTag);
  document.querySelector(".household").appendChild(li);

  li.onclick = function (event){
    HouseholdObj.remove(event.target.parentNode.getAttribute("data"));
    this.parentNode.removeChild(this);
  };
}

// helpers (^_^)v
function submit (ResultHousehold) {
  debugEl.innerHTML = JSON.stringify(ResultHousehold,undefined, 2);
  debugEl.setAttribute("style", "display: block");
}

function clearField (ageField, relField, checkedSmoker) {
  ageField.value = '';
  relField.options[relField.selectedIndex].selected = "---";
  checkedSmoker.checked = false;
}

function createPerson () {
  var age = ageEl.value;
  var selectedRelElText = relEl.options[relEl.selectedIndex].text;
  var checkedSmoker = smokerEl.checked;
  var itemInLS = localStorage.getItem(currentDate);

  BrandNewPerson = new Person();
  if(!age || selectedRelElText === "---") {
    alert("age and relationship fields cannot be empty!");
    return
  }
  BrandNewPerson.addItemNum();
  BrandNewPerson.addAge(age);
  BrandNewPerson.addRelationship(selectedRelElText);
  BrandNewPerson.smokerTrueFalse(checkedSmoker);
  BrandNewPerson.addToTheListHTML();
  HouseholdObj.addPersonToHousehold(BrandNewPerson);
  clearField(ageEl, relEl, smokerEl);
  return;
}

//listeners
addButton.addEventListener("click", function(event){
  event.preventDefault();
  createPerson();
});

document.querySelector("form").addEventListener("click", function(event){
  event.preventDefault();
  if(event.target.getAttribute("type") == "submit") submit(HouseholdObj);
});
