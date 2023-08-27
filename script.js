
const filterbtn=document.getElementById('filter');

const iny=document.getElementById('item-input');

let isedit='false';

const form_but=document.querySelector('form button');

function getItemStorage(){

    let item;

    if(localStorage.getItem('items')==null){

        item=[];
    }
    else{

        item=JSON.parse(localStorage.getItem('items'));
    }

    return item;
}
//remove child both from DOM and loacl storage

const out=document.getElementById('item-list');

function removechil(e){

    let icon;

    if(e.target.parentElement.classList.contains('remove-item')){

        if(confirm('Are you sure want to delete')){

        icon=e.target.parentElement.parentElement;

        removelcls(icon);

        e.target.parentElement.parentElement.remove();

        }
       
    }
    else{

       setandedit(e.target); 
    }


}

function setandedit(item){

    isedit='true';

    const pothum=document.querySelectorAll('li');

    pothum.forEach((m)=> m.classList.remove('edit'));

    item.classList.add('edit');

    form_but.innerHTML='<i class="fa-solid fa-pen"></i> update Item';

    form_but.style.backgroundColor='green';

    iny.value=item.textContent;

}
function removelcls(item){

    let itm=getItemStorage();

    filt=itm.filter((i) => i!=item);

    localStorage.setItem('items',JSON.stringify(filt));
}


out.addEventListener('click',(e )=>{

    const output=document.querySelectorAll('li');
    
    removechil(e);

    checkUI();


})



//add child when submit in both DOM and loacl storage

const form=document.getElementById('item-form');

function addToDom(item){

    const parent=document.querySelector('ul');

    const li=document.createElement('li');

    li.textContent=`${item}`;

    const button=createbut("remove-item btn-link text-red");

    li.appendChild(button);

    parent.appendChild(li);

    const output=document.querySelectorAll('li');

    checkUI();


}

const addChildLclS = (item) =>{

    let itemStorage=getItemStorage();

    itemStorage.push(item);

    localStorage.setItem('items',JSON.stringify(itemStorage))
}


const addChildele= (item) =>{

    addToDom(item);

    addChildLclS(item);
   
    checkUI();

}


function createbut(item){

    const button=document.createElement('button');

    button.className=`${item}`;

    const icon=document.createElement('i');

    icon.className='fa-solid fa-xmark';

    button.appendChild(icon);

    return button;

    
}

const onSub=( e )=>{

    e.preventDefault();

    const item=document.getElementById('item-input');

    if(item.value == ''){

        alert("invalid");

        return;
    }

    let prod=getItemStorage();

    if(prod.includes(item.value)){

        alert("cannot allow duplicate entries");

        return;
    }
    else{

      addChildele(item.value);
    }
    

    item.value='';

    checkUI();

    
}

form.addEventListener('submit',onSub);

//clear button

const clearitem= (e) =>{

    const output=document.querySelectorAll('li');


    output.forEach((item) => {

        item.remove();

        localStorage.removeItem('items');
    })

   checkUI(); 
}

const clearbut=document.getElementById('clear');

clearbut.addEventListener('click',clearitem);

//filter items

const filtering = (e) =>{

    const text=e.target.value;

    const low=text.toLowerCase();

    const output=document.querySelectorAll('li');

    output.forEach((item) => {

        const letter=item.firstChild.textContent;

        console.log(item.firstChild.textContent)

        if(letter.indexOf(low) != -1){

            item.style.display='flex';
        }
        else{

            item.style.display='None';
        }
    })

}

filterbtn.addEventListener('input',filtering);


//set and edit



// Dom ccontent loaded

function displayItems(){
    
    const itm=getItemStorage();

    itm.forEach((item)=> addToDom(item));
}


document.addEventListener('DOMContentLoaded',displayItems)
// checking Ui

function checkUI(){

    const output=document.querySelectorAll('li');

    if(output.length===0){

        filterbtn.style.display='none';

        clearbut.style.display='none';
    }
    else{

        filterbtn.style.display='block';

        clearbut.style.display='block';
    }
    if(iny.value==''){
        
        form_but.innerHTML='<i class="fa-solid fa-plus"></i> Add Item';
    
        form_but.style.backgroundColor='black'
    }

}

checkUI();




