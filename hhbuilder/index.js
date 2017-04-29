// Your code goes here

var ageEl = document.querySelector("[name=age]");
var relEl = document.querySelector("[name=rel]");
var smokerEl = document.querySelector("[name=smoker]");
var addButton = document.querySelector(".add");
var submitButton = document.querySelector("[type=submit]");

var HouseholdObj = new Household();
var returnedNode;
var BrandNewPerson = null;
// createEditButton();
var editButton;
var index = 0;

//Household constructor
function Household (value) {
  this.head = null;
  this.tail = null;
}

Household.prototype.addPersonToHousehold = function (personObj) {
  if(this.tail) this.tail.next = personObj;
  else this.head = personObj;
  this.tail = personObj;
}

// Person Constructor
function Person (index, next, prev) {
  this.exist = false;
  this.index = index;
  this.age = null;
  this.relationship = null;
  this.smoker = null;
  this.next = null;
  this.prev = null;
  this.editButton = null;
  this.submitEditButton = null;
  this.editMethod =  function (){
    console.log(`hitting ${this.age}`);
    console.dir(`hitting ${this}`);
    if(this.exist) {
      return;
    } else {
      this.createFields();
      this.exist = true;
    }
  }
  this.submitEdit = function (){
    console.log('this' + this.age);
    returnedNode = HouseholdObj.search(this);
    var age = document.querySelector(`.age-${this.index}`);
    var rel = document.querySelector(`.rel-${this.index}`);
    var smkr = document.querySelector(`.smoker-${this.index}`);
    console.log(returnedNode);
    console.log(`hittingSubmitEdit ${age.value}`);
    console.log(`hittingSubmitEdit ${rel.value}`);
    console.log(`hittingSubmitEdit ${smkr.checked}`);
    console.log(returnedNode.age = parseInt(age.value));
    console.log(returnedNode.relationship = rel.value);
    console.log(returnedNode.smoker = smkr.checked);

    console.log(HouseholdObj);
  }
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

Person.prototype.incrementIndex = function () {
  this.index = index;
  index ++;
}
Household.prototype.search = function (searchNode) {

  console.log('hitting saerch: ' + searchNode.index);
  console.dir('head' + this.head.age);
  var currentNode = this.head;
  while(currentNode){
    if(currentNode.index === searchNode.index) return currentNode;
    currentNode = this.next;
  }
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
  BrandNewPerson.incrementIndex();
  addToTheListHTML(BrandNewPerson);
  BrandNewPerson.createEditButton();
  BrandNewPerson.createsubmitEditButton();
  HouseholdObj.addPersonToHousehold(BrandNewPerson);

  clearField(ageEl, relEl, smokerEl);
  console.log(HouseholdObj);
  return;
}

function edit (PersonObj) {

}

Person.prototype.createsubmitEditButton = function () {
  var self = this;
  var submitButtonTag = document.createElement("button");
  var submitButtonText = document.createTextNode("submit edit");
  submitButtonTag.setAttribute("class",`submit-edit-button-${self.index}`);
  var button = document.querySelector(".household").appendChild(submitButtonTag);
  button.appendChild(submitButtonText);
  self.submitEditButton = document.querySelector(`.submit-edit-button-${self.index}`);

  self.submitEditButton.addEventListener('click', function (event) {
    event.preventDefault();
    self.submitEdit();
  });
}
Person.prototype.createEditButton = function () {
  var self = this;
  var buttonTag = document.createElement("button");
  var buttonText = document.createTextNode("edit");
  buttonTag.setAttribute("class",`edit-button-${self.index}`);
  var button = document.querySelector(".household").appendChild(buttonTag);
  button.appendChild(buttonText);
  self.editButton = document.querySelector(`.edit-button-${self.index}`);

  self.editButton.addEventListener('click', function (event) {
    event.preventDefault();
    self.editMethod();
  });
}

Person.prototype.createFields = function () {
  var inputEl1 = document.createElement('input');
  var clonedRelEl = relEl.cloneNode(true);
  var clonedSmokerEl = smokerEl.cloneNode(true);
  var relTag = document.createElement("label");
  var relTagText = document.createTextNode("Relationship:");
  var smokerTag = document.createElement("label");
  var smokerTagText = document.createTextNode("Smoker?:");
  inputEl1.setAttribute('class', `age-${this.index}`);
  inputEl1.setAttribute("placeholder", "modify age here");
  clonedRelEl.setAttribute('class', `rel-${this.index}`);
  clonedSmokerEl.setAttribute('class', `smoker-${this.index}`);
  document.querySelector('.household').insertBefore(inputEl1,document.querySelector(`.edit-button-${this.index}`));
  document.querySelector('.household').insertBefore(relTag.appendChild(relTagText),document.querySelector(`.edit-button-${this.index}`));
  document.querySelector('.household').insertBefore(clonedRelEl,document.querySelector(`.edit-button-${this.index}`));
  document.querySelector('.household').insertBefore(smokerTag.appendChild(smokerTagText),document.querySelector(`.edit-button-${this.index}`));
  document.querySelector('.household').insertBefore(clonedSmokerEl,document.querySelector(`.edit-button-${this.index}`));
}

function addToTheListHTML (personObj) {
  var li = document.createElement("li");
  var text = document.createTextNode(`Age: ${personObj.age}, Relationship: ${personObj.relationship}, Smoker: ${personObj.smoker}`);
  li.appendChild(text);
  document.querySelector(".household").appendChild(li);
  // personObj.createEditButton();

}



//listeners

addButton.addEventListener('click', function(event){
  event.preventDefault();
  createPerson();
});

submitButton.addEventListener('click', function(event){
  event.preventDefault();
  submitAndStoreData(event);
});
