
////// get input from html ////
const fullName = document.getElementById('name')as HTMLInputElement;
const phoneNumber = document.getElementById('phoneNumber')as HTMLInputElement;
const button = document.querySelector('button')!;
///////

const nameErr = document.getElementById('nameErr')!;
const phoneErr = document.getElementById('phoneErr')!;


/// define object type
interface validationConfig{
    [objName: string]: {
        [propetyName: string]: string[]
    }
}
//////

const registerValidation: validationConfig ={}

//////Validation
function Require(target: any, propName: string){
    registerValidation[target.constructor.name] ={
        ...registerValidation[target.constructor.name],
        [propName]: [...registerValidation[target.constructor.name]?.[propName] ?? [],'required']
    }

}

function Positive(target: any, propName: string){
    
    registerValidation[target.constructor.name] ={
        ...registerValidation[target.constructor.name],
        [propName]: [...registerValidation[target.constructor.name]?.[propName] ?? [],'positiveNumber']
    }

}

//////// Error show and hid//////
function ErrorShow(target: any){
    // target.style.display = "block";
    target.classList.remove("hidden");

}
function ErrorHide(target: any){
    // target.style.display = "none";
    target.classList.add("hidden");

}

/////end

function validation(obj: any){

    const objValidatorConfig = registerValidation[obj.constructor.name]

    let isValidForName = true  
    let isValidForPhone = true
 for(const index in objValidatorConfig){

     for(const propsValue of objValidatorConfig[index]){
        // console.log(index,propsValue)
        switch(propsValue){
            case 'required':
                isValidForName = isValidForName && !!obj.tempoArr[index];
                !isValidForName ? ErrorShow(nameErr) :  ErrorHide(nameErr)

                // console.log(isValidForName,obj.tempoArr[index])
                break;
            case 'positiveNumber':
                isValidForPhone = isValidForPhone && obj.tempoArr[index] > 0;
                !isValidForPhone ? ErrorShow(phoneErr) :  ErrorHide(phoneErr)

                // console.log(isValidForPhone,obj.tempoArr[index])
                break;
        }
     }
 }
    return isValidForName && isValidForPhone
}
/////


///////// create contact with Array
interface IContacts {
    name: string,
    phone: string
}

let contacts: IContacts[] = []

class People {
@Require
    name: string
@Positive
    phone: string

    tempoArr: {name:string,phone: string};

    constructor( t: string, n: string){
        this.name= t.trim(),
        this.phone = n.trim()

        this.tempoArr = {name: this.name, phone: this.phone}
 
    }
  
    createContacts() {
        contacts = [...contacts, this.tempoArr]

    }
}
///////////

// ////// get input from html ////

// ///////

button.addEventListener('click',()=>{

    const people = new People(fullName.value, phoneNumber.value)

    //if validation function's retrun is false, this work
    if(!validation(people)){
    //    alert('inputValid')
       return 
    }
    ////

    //// if validation function's retrun is true, this work => create contacts object
    people.createContacts()
    /////
    
    display();
    // console.log(contacts)
  
})

/////display list
// let spanDel: any
let b;
const display = ()=>{
    const getUl = document.getElementById('my_list')!;
    getUl.innerHTML='';
    
    ////// create list in ul and assign the data in list
    if(contacts !== null){
        for(const value of contacts){

            const li   = document.createElement('li');
            const list = getUl.appendChild(li);
            const spanDel = document.createElement('span')

            // pl-6 text-red-600 cursor-pointer
            ///set id
            // spanDel.setAttribute('id', `${index}`)
            list.setAttribute('class', "mb-1 md:mb-2 p-2 md:px-4 bg-slate-300/30 rounded-lg break-words")
            spanDel.setAttribute('class', "block cursor-pointer my-1.5 text-gray-100 py-1 px-2 w-fit rounded bg-red-500 text-sm lg:text-base");
            // list.classList.add(" ");

            //put text in li
            list.textContent = value.name +' , '+ value.phone
            spanDel.textContent = 'remove';
            list.appendChild(spanDel)
            
        }
    }
    //////

    ///clear input
    fullName.value = '';
    phoneNumber.value = '';
    return;
}
/////////

////delete
const  removeTarget = (event: any)=> {
    if(event.tagName === 'SPAN'){
        contacts.splice(event.id,1)
        display();
    }

}

const getUl = document.getElementById('my_list')!;
getUl.addEventListener('click', event=>{
    removeTarget(event.target)
    // console.log(event.target)
})



