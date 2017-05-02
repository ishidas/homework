// Your code goes here

var ageEl = document.querySelector("[name=age]");
var relEl = document.querySelector("[name=rel]");
var smokerEl = document.querySelector("[name=smoker]");
var addButton = document.querySelector(".add");
var submitButton = document.querySelector("[type=submit]");
var HouseholdObj = new Household();
var returnedNode;
var BrandNewPerson;
var editButton;
var index = 0;

//Household constructor
function Household (value) {
  this.len = 0;
  this.head = null;
}

Household.prototype.addPersonToHousehold = function (newPerson) {
  BrandNewPerson = newPerson;
  currentNode = this.head;
  if(!this.head) {
    this.head = BrandNewPerson;
    this.len++
    return BrandNewPerson;
  }
  while(currentNode.next){
    currentNode = currentNode.next;
  }
  currentNode.next = BrandNewPerson;
  this.len++
  return BrandNewPerson;
}

// Person Constructor
function Person () {
  this.index = index;
  this.age = null;
  this.relationship = null;
  this.smoker = null;
  this.next = null;
  this.deleteButton = null;
  this.submitEditButton = null;
  this.removeElement = removeElement;
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

Person.prototype.addIndex = function () {
  index++;
}
Household.prototype.remove = function (pos) {
  console.log('pos? ' + pos);
   var currentNode = this.head;
   var counter = 0;
   var prevNode = null;
   var nodeToDelete = null
   var deletedNode = null;
   if(pos === 0) {
     this.head = null;
     deletedNode = currentNode;
     currentNode = null;
     this.len --;
     index --;
     console.log(HouseholdObj);
     return currentNode;
   }

  while (counter < pos) {
    prevNode = currentNode;
    nodeToDelete = currentNode.next;
    counter++
  }
  prevNode.next = nodeToDelete.next;
  deletedNode = nodeToDelete;
  nodeToDelete = null;
  this.len--;
  index --;
  console.log(HouseholdObj);
  return deletedNode;
}


//User friendly feature :D
function clearField (ageField, relField, checkedSmoker) {
  ageField.value = '';
  relField.options[relField.selectedIndex].selected = '---';
  checkedSmoker.checked = false;
}

function createPerson () {
  var age = ageEl.value;
  var selectedRelElText = relEl.options[relEl.selectedIndex].text;
  var checkedSmoker = smokerEl.checked;
  var BrandNewPerson = new Person(index, null, null);
  if(!age || selectedRelElText === '---') {
    alert('age and relationship fields cannot be empty!');
    return
  }
  BrandNewPerson.addAge(age);
  BrandNewPerson.addRelationship(selectedRelElText);
  BrandNewPerson.smokerTrueFalse(checkedSmoker);
  BrandNewPerson.addIndex();
  addToTheListHTML(BrandNewPerson);
  BrandNewPerson.deleteEditButton();
  HouseholdObj.addPersonToHousehold(BrandNewPerson);

  clearField(ageEl, relEl, smokerEl);
  console.log(HouseholdObj);
  return;
}

Person.prototype.deleteEditButton = function () {
  var self = this;
  var buttonTag = document.createElement("button");
  var buttonText = document.createTextNode("delete");
  buttonTag.setAttribute("class",`delete-button-${self.index}`);
  var button = document.querySelector(".household").appendChild(buttonTag);
  button.appendChild(buttonText);
  self.deleteButton = document.querySelector(`.delete-button-${self.index}`);

  self.deleteButton.addEventListener('click', function (event) {
    event.preventDefault();
    console.log('self.index' + self.index);
    self.removeElement(self.index);
    HouseholdObj.remove(self.index);
  });
}


function addToTheListHTML (personObj) {
  var li = document.createElement("li");
  var text = document.createTextNode(`Age: ${personObj.age}, Relationship: ${personObj.relationship}, Smoker: ${personObj.smoker}`);
  li.setAttribute("class", `li-${personObj.index}`);
  li.appendChild(text);
  document.querySelector(".household").appendChild(li);
}

function removeElement (index) {
  var olEl = document.querySelector("ol");
  var liEl = document.querySelector(`.li-${index}`);
  var deleteButton = document.querySelector(`.delete-button-${index}`)
  olEl.removeChild(deleteButton);
  olEl.removeChild(liEl);
}

function submit (houseObj) {
  var current = Date.now();
  if(typeof(Storage) !== "undefined") {
    localStorage.setItem(`household-${current}`, JSON.stringify(houseObj));
    var data = localStorage.getItem(`household-${current}`);
    formatJSON(data);
    var preEl = document.querySelector(".debug");
    var textNode = document.createTextNode(data);

    preEl.appendChild(textNode);
    preEl.style.display = "block";
    alert('data stored!');
  } else {
    alert('There is not web storage support in your browser');
  }
}

function formatJSON (jsonObj) {
  var obj = JSON.parse(jsonObj);

  for (var index in obj.head) {
    obj.head[index] = 
      // console.log(obj.head[index] + "\n");
  }


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
