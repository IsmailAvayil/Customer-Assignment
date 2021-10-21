

//Global Variable.......
var data=[];



//Event Llistener......
document.getElementById('ascend').addEventListener('click',Ascending);
document.getElementById('descend').addEventListener('click',Descending);
document.getElementById('date-ascend').addEventListener('click',DateAscend);
document.getElementById('date-descend').addEventListener('click',DateDescend);
document.getElementById('txt').addEventListener('keyup',Search);
document.getElementById('Add').addEventListener('click',insertData);



// Display function......
function Display(){
  let output='';
  data.forEach(function(customer){
    output +=`
    <tr id="collection"> 
      <td class="delete-customer">${customer.salutation}</td>
      <td class="delete-customer">${customer.firstname}</td> 
      <td class="delete-customer">${customer.lastname}</td> 
      <td class="delete-customer">${customer.email}</td> 
      <td class="delete-customer">${customer.gender}</td> 
      <td class="delete-customer">${customer.phone}</td>  
      <td class="delete-customer">${customer.country}</td> 
      <td class="delete-customer">${customer.state}</td> 
      <td class="delete-customer">${customer.city}</td> 
      <td class="delete-customer">${customer.date}</td>
      <td class="delete-customer"><a href="#" id="delete-btn"><i class="far fa-trash-alt"></i></a> </td>
      <td class="delete-customer"><i class="fas fa-edit"></i></td>
    </tr> 
    `;
  });
  return output  
}


//Remove Customer....................................
const customerList = document.querySelector('#customer-list');
customerList.addEventListener('click',removeCustomer);

function removeCustomer(e){
  console.log(e.target);
    if(e.target.parentElement.parentElement.classList.contains
        ('delete-customer')){
      if (confirm('Are You Sure ?')){
        e.target.parentElement.parentElement.parentElement.remove();
      }
    }
}



//XHR Object................
const xhr=new XMLHttpRequest();
xhr.open('GET','customer.json',true);
xhr.onload=function(){
  if(this.status === 200){
    const customers=JSON.parse(this.responseText);
    data=customers;
    document.getElementById('customer-list').innerHTML=Display();
  }    
} 
xhr.send();



//Ascending Firstname.........
document.getElementById('ascend').addEventListener('click',Ascending);
  function Ascending(e){
    data.sort((a, b) => {
      let fa = a.firstname.toLowerCase(),
      fb = b.firstname.toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    }); 
    document.getElementById('customer-list').innerHTML=Display();
  }

  
  //Descending Firstname........
  function Descending(e){
    data.sort((a, b) => {
      let fa = a.firstname.toLowerCase(),
      fb = b.firstname.toLowerCase();
  
      if (fa > fb) {
          return -1;
      }
      if (fa < fb) {
          return 1;
      }
      return 0;
    });  
    
    document.getElementById('customer-list').innerHTML=Display();
  }
  
      
      
// Date Ascending.....
function DateAscend(e){
  data.sort((a, b) => {
    let da = new Date(a.date),
        db = new Date(b.date);
    return da - db;
  });
  document.getElementById('customer-list').innerHTML=Display();
};


// Date Descending.....
function DateDescend(e){
  data.sort((a, b) => {
    let da = new Date(a.date),
        db = new Date(b.date);
    return db - da;
  });
  document.getElementById('customer-list').innerHTML=Display();
};    


// Search Person.....
function Search(e){
  console.log(e.target.value);
  var searchAll=data;
  console.log(searchAll);
  let compfirst,complast; 
  var table=document.getElementById('customer-list');
  table.innerHTML='';
  for(var i=0;i<searchAll.length;i++){   
    compfirst=searchAll[i].firstname.toLowerCase();
    console.log(compfirst);
    complast=searchAll[i].lastname.toLowerCase();
    let len=e.target.value.toLowerCase();
          
    if((compfirst.includes(len))||(complast.includes(len))){
      var row=`<tr>
        <td>${searchAll[i].salutation}</td>
        <td>${searchAll[i].firstname}</td>
         <td>${searchAll[i].lastname}</td>
        <td>${searchAll[i].email}</td>
        <td>${searchAll[i].gender}</td>
        <td>${searchAll[i].phone}</td>
        <td>${searchAll[i].city}</td>
        <td>${searchAll[i].state}</td>
        <td>${searchAll[i].country}</td>
        <td>${searchAll[i].date}</td>
        <td> <a href="#"><i class="fa fa-edit"></i></a></td>
        <td> <a href="#"><i class="fa fa-trash" ></i></a></td>
      </tr>`;
      table.innerHTML+=row; 

    }
    else{
      console.log('NOT Matches');
         
    }
  }
}
      
//Data Insert............................
function insertData(e){
  var Salutation= document.getElementById("salutation").value;
  var Firstname = document.getElementById("firstname").value;
  var Lastname = document.getElementById("lastname").value;
  var Email= document.getElementById("email").value;
  var Gender = document.getElementById("gender").value;
  var Phone = document.getElementById("phone").value;
  var Country = document.getElementById("mySelect").value;
  var State = document.getElementById("myState").value;
  var City = document.getElementById("city").value;
  var date = document.getElementById("date").value;

    if (document.getElementById('salutation').value == "" || document.getElementById('firstname').value == "" || document.getElementById('lastname').value == "" || document.getElementById('email').value == "" || document.getElementById('gender').value == "" || document.getElementById('phone').value == "" || document.getElementById('mySelect').value == "" || document.getElementById('myState').value == "" || document.getElementById('city').value == "" || document.getElementById('date').value == "") {
    alert("Fill All Fields !");
    } 
    else{
      data.push({
        "salutation":Salutation,"firstname":Firstname,"lastname":Lastname,"email" :Email,"gender" :Gender,"phone" :Phone, "country":Country ,"state":State,"city":City,"date":date
        
      })
      alert("Successful")
      document.getElementById('customer-form').reset();
    }
  document.getElementById('customer-list').innerHTML=Display();
};




//Firstname validation.........................
const firstname=document.getElementById("firstname")
firstname.addEventListener('blur',Validatename);
function Validatename(e) {
  const re = /^[a-zA-Z]{2,10}$/;

  if(!re.test(firstname.value)){
     firstname.value="";
     document.getElementById('warning').style.display="block"
   // name.classList.add('is-invalid');
  } else {
    // name.classList.remove('is-invalid');
      console.log("succes");
      document.getElementById('warning').style.display="none";
  }
}




// Email validation......................................
const email=document.getElementById("email")
email.addEventListener('blur',validateemail);
function validateemail(mail){
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form1.email.value)){
    
    document.getElementById('email-warning').style.display="none";
    return (true)

  }
  else{
    email.value="";
    document.getElementById('email-warning').style.display="block";
    return (false)

  }

}


//Mobile no Validation.........
const mobile=document.getElementById("phone");
var message = document.getElementById('message');
mobile.addEventListener('blur',check);
function check(){
  
  if(mobile.value.length!=10){
    document.getElementById('message').style.display="block";
  }
  else{
    document.getElementById('message').style.display="none";
  }

}

    
 //state and country
var stat;
function myCountry(){
 fetch('state.json')
 .then(function(res){
     return res.json();
 })
   
 .then(function(data){
       let output_sal='';
       console.log(data);
       var htr=document.getElementById("mySelect").value;
       console.log(htr);
       data.forEach(post => {
           if(post.id==htr){
             output_sal+=`
              <label>state</label>
              <select id="myState" >
               <option value="${post.state1}">${post.state1}</option>
               <option value="${post.state2}">${post.state2}</option>
               <option value="${post.state3}">${post.state3}</option>
               <option value="${post.state4}">${post.state4}</option>
               <option value="${post.state5}">${post.state5}</option>
               <option value="${post.state6}">${post.state6}</option>
               <option value="${post.state7}">${post.state7}</option>
              </select>
             `;   
           }
       });
   document.querySelector("#myState").innerHTML=output_sal;  
   document.getElementById("myState").addEventListener('change',stateSelection);
   
   
})
.catch(function(err){
       console.log(err);
   });
   
}
function stateSelection(e) {
{
 stat=(e.target.value);

}}



  





// // Firstname validation.........................
// const firstname=document.getElementById("firstname")
// firstname.addEventListener('blur',Validatename);
// function Validatename(e){
//   firstname.value
//   if(firstname.value.length <= 3) {
//       firstname.value="";
//       document.getElementById('warning').style.display="block";
//   }else{
//     console.log("succes");
//     document.getElementById('warning').style.display="none";

//   }
// } 

// 