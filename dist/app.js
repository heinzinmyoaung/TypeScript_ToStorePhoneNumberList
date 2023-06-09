"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const fullName = document.getElementById('name');
const phoneNumber = document.getElementById('phoneNumber');
const button = document.querySelector('button');
const nameErr = document.getElementById('nameErr');
const phoneErr = document.getElementById('phoneErr');
const registerValidation = {};
function Require(target, propName) {
    var _a, _b;
    registerValidation[target.constructor.name] = Object.assign(Object.assign({}, registerValidation[target.constructor.name]), { [propName]: [...(_b = (_a = registerValidation[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : [], 'required'] });
}
function Positive(target, propName) {
    var _a, _b;
    registerValidation[target.constructor.name] = Object.assign(Object.assign({}, registerValidation[target.constructor.name]), { [propName]: [...(_b = (_a = registerValidation[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : [], 'positiveNumber'] });
}
function ErrorShow(target) {
    target.classList.remove("hidden");
}
function ErrorHide(target) {
    target.classList.add("hidden");
}
function validation(obj) {
    const objValidatorConfig = registerValidation[obj.constructor.name];
    let isValidForName = true;
    let isValidForPhone = true;
    for (const index in objValidatorConfig) {
        for (const propsValue of objValidatorConfig[index]) {
            switch (propsValue) {
                case 'required':
                    isValidForName = isValidForName && !!obj.tempoArr[index];
                    !isValidForName ? ErrorShow(nameErr) : ErrorHide(nameErr);
                    break;
                case 'positiveNumber':
                    isValidForPhone = isValidForPhone && obj.tempoArr[index] > 0;
                    !isValidForPhone ? ErrorShow(phoneErr) : ErrorHide(phoneErr);
                    break;
            }
        }
    }
    return isValidForName && isValidForPhone;
}
let contacts = [];
class People {
    constructor(t, n) {
        this.name = t.trim(),
            this.phone = n.trim();
        this.tempoArr = { name: this.name, phone: this.phone };
    }
    createContacts() {
        contacts = [...contacts, this.tempoArr];
    }
}
__decorate([
    Require
], People.prototype, "name", void 0);
__decorate([
    Positive
], People.prototype, "phone", void 0);
button.addEventListener('click', () => {
    const people = new People(fullName.value, phoneNumber.value);
    if (!validation(people)) {
        return;
    }
    people.createContacts();
    display();
});
let b;
const display = () => {
    const getUl = document.getElementById('my_list');
    getUl.innerHTML = '';
    if (contacts !== null) {
        for (const value of contacts) {
            const li = document.createElement('li');
            const list = getUl.appendChild(li);
            const spanDel = document.createElement('span');
            list.setAttribute('class', "mb-1 md:mb-2 p-2 md:px-4 bg-slate-300/30 rounded-lg break-words");
            spanDel.setAttribute('class', "block cursor-pointer my-1.5 text-gray-100 py-1 px-2 w-fit rounded bg-red-500 text-sm lg:text-base");
            list.textContent = value.name + ' , ' + value.phone;
            spanDel.textContent = 'remove';
            list.appendChild(spanDel);
        }
    }
    fullName.value = '';
    phoneNumber.value = '';
    return;
};
const removeTarget = (event) => {
    if (event.tagName === 'SPAN') {
        contacts.splice(event.id, 1);
        display();
    }
};
const getUl = document.getElementById('my_list');
getUl.addEventListener('click', event => {
    removeTarget(event.target);
});
//# sourceMappingURL=app.js.map