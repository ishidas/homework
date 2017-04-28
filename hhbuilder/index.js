// Your code goes here

var ageEl = document.querySelector("[name=age]");
var relEl = document.querySelector("[name=rel]");
var smokerEl = document.querySelector("[name=smoker]");
var addButton = document.querySelector(".add");
var submitButton = document.querySelector("[type=submit]");

var HouseholdObj = new Household();
var BrandNewPerson = null;

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
function Person (next, prev) {
  this.age = null;
  this.relationship = null;
  this.smoker = null;
  this.next = null;
  this.prev = null;
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

//User friendly feature :D
function clearField (ageField, relField, checkedSmoker) {
  ageField.value = '';
  relField.options[relField.selectedIndex].selected = '---';
  checkedSmoker.checked = false;
}

function createPerson (event) {
  var age = ageEl.value;
  var selectedRelElText = relEl.options[relEl.selectedIndex].text;
  var checkedSmoker = smokerEl.checked;
  var BrandNewPerson = new Person(null, null);

  if(!age || selectedRelElText === '---') {
    alert('age and relationship fields cannot be empty!');
    return
  }
  BrandNewPerson.addAge(age);
  BrandNewPerson.addRelationship(selectedRelElText);
  BrandNewPerson.smokerTrueFalse(checkedSmoker);
  HouseholdObj.addPersonToHousehold(BrandNewPerson);
  addToTheListHTML(BrandNewPerson);
  clearField(ageEl, relEl, smokerEl);
  console.log(HouseholdObj);
  return;
}

function addToTheListHTML (personObj) {
  var li = document.createElement("li");
  var text = document.createTextNode(`Age: ${personObj.age}, Relationship: ${personObj.relationship}, Smoker: ${personObj.smoker}`);
  li.appendChild(text);
  document.querySelector(".household").appendChild(li);
}
//
function submitAndStoreData (event) {
  // localStorage.setItem('', HouseholdArray);
  ajax
  clearField(ageEl, relEl, smokerEl);
}


//listeners
addButton.addEventListener('click', function(event){
  event.preventDefault();
  createPerson(event);
});

submitButton.addEventListener('click', function(event){
  event.preventDefault();
  submitAndStoreData(event);
})
// var hh = new Household(new Person(11, 'kid', false));
// console.log(hh);
