// Your code goes here

var ageEl = document.querySelector("[name=age]");
var relEl = document.querySelector("[name=rel]");
var smokerEl = document.querySelector("[name=smoker]");
var addButton = document.querySelector(".add");
var submitButton = document.querySelector("[type=submit]");
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
    // console.log(HouseholdObj);
    return this.head;
  }
}

Household.prototype.seachNodeAt = function (pos){
  var currentNode = this.head, len = this._len, counter = 1;
  if(len === 0 || pos < 1 || pos > len){
    alert('There is no data in');
    return;
  }
  while(counter < pos){
    currentNode = currentNode.next;
    counter++;
  }
  return currentNode;
}

/*** Person Constructor***/
function Person () {
  this.itemNum = index;
  this.age = null;
  this.relationship = null;
  this.smoker = null;
  this.next = null;
  // this.deleteButton = null;
  this.submitEditButton = null;
  // this.removeElement = removeElement;
}

Person.prototype.addAge = function (age) {
  if(parseInt(age) >= 0) this.age = parseInt(age);
  else return alert('Please input positive integer. ex. 0 1 22...');
}

Person.prototype.addRelationship = function (relationship) {
  if(!relationship) alert('please provide relationship');
  else this.relationship = relationship;
}

Person.prototype.smokerTrueFalse = function (answer) {
  this.smoker = answer;
}

Person.prototype.addItemNum = function () {
  index ++;
  this.itemNum ++;
}
// Person.prototype.deleteEditButton = function () {
//   var self = this;
//   var buttonTag = document.createElement("button");
//   var buttonText = document.createTextNode("delete");
//   // console.log();
//   buttonTag.setAttribute("class","delete-button");
//   var button = document.querySelector(".household").appendChild(buttonTag);
//   button.appendChild(buttonText);
//   self.deleteButton = document.querySelector(`.delete-button`);
//   console.log(self.deleteButton);
//   self.deleteButton.addEventListener('click', function (event) {
//     event.preventDefault();
//     console.log('hitting');
//     self.removeElement();
//     HouseholdObj.remove(self.index);
//   });
// }

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
    HouseholdObj.remove(event.target.parentNode.getAttribute('data'));
    this.parentNode.removeChild(this);
    console.log(HouseholdObj);
  };
}

// Person.prototype.removeElement = function (Obj) {
//   var olEl = document.querySelector("ol");
//   // var liEl = document.querySelector(`.li-${index}`);
//   // var deleteButton = document.querySelector(`.delete-button-${index}`)
//   // olEl.removeChild(deleteButton);
//   // olEl.removeChild(liEl);
//   olEl.removeChild(this.deleteButton);
// }


function clearField (ageField, relField, checkedSmoker) {
  ageField.value = '';
  relField.options[relField.selectedIndex].selected = '---';
  checkedSmoker.checked = false;
}

function createPerson () {
  var age = ageEl.value;
  var selectedRelElText = relEl.options[relEl.selectedIndex].text;
  var checkedSmoker = smokerEl.checked;
  var itemInLS = localStorage.getItem(currentDate);

  BrandNewPerson = new Person();
  if(!age || selectedRelElText === '---') {
    alert('age and relationship fields cannot be empty!');
    return
  }
  BrandNewPerson.addItemNum();
  BrandNewPerson.addAge(age);
  BrandNewPerson.addRelationship(selectedRelElText);
  BrandNewPerson.smokerTrueFalse(checkedSmoker);
  BrandNewPerson.addToTheListHTML();

  HouseholdObj.addPersonToHousehold(BrandNewPerson);

  clearField(ageEl, relEl, smokerEl);
  console.log(HouseholdObj);
  return;
}

//listeners
addButton.addEventListener('click', function(event){
  event.preventDefault();
  createPerson();
});

submitButton.addEventListener('click', function(event){
  event.preventDefault();
  submit(HouseholdObj);
});
