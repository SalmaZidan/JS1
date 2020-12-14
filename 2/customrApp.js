

customrs = JSON.parse(localStorage.getItem('customrs')) || []
CustomrId=500300200


//Customr Data Form 
document.querySelector("#showForm").addEventListener('click', function(e){
    e.target.textContent == "Add New Customr"? e.target.textContent="Hide Form": e.target.textContent="Add New Customr";

    document.querySelector('#addCustomrForm').classList.toggle('d-none')    
})


//Customr Data Entry
document.querySelector("#addCustomrData").addEventListener('submit',function(e){
    e.preventDefault()
    data = e.target.elements
    customrs.length>0? CustomrId=customrs[customrs.length-1].id+1 : CustomrId
    customr ={ 
        id:CustomrId
    }    
    for(i=0; i<data.length-1;i++){ 
        customr[data[i].name] = data[i].value
    }
    customrs.push(customr)
    localStorage.setItem('customrs', JSON.stringify(customrs))
    e.target.reset()
    document.querySelector('#customrDisplayTable').classList.remove('d-none')
    displayCustomrs()

})

//Creat Element Function
const addElement = function(type,contant){
        ele = document.createElement(type)
        ele.innerHTML = contant
        return(ele)

}

//Customr Display
const displayCustomrs = function(){
    document.querySelector('#customrDisplayTable table tbody').textContent=""

        customrs.forEach( (customer, i) => {
            const tr =  document.createElement('tr')
            const td1 = addElement('td', customer.id)
            const td2 = addElement('td', customer.CustomrName)
            const td3 = addElement('td', customer.CustomrBalance)
            const td4 = addElement('button', 'DELETE  Customer')
            const td5 = addElement('button', 'Withdraw  Balance')
            const td6 = addElement('button', 'Add Balance')
     
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            tr.appendChild(td5)
            tr.appendChild(td6)
           
            
            document.querySelector('#customrDisplayTable table tbody').appendChild(tr)

            delCustomer(td4,i)
            withdrawBalance(td5,i)
            addBalance(td6,i)

    
        });

}

//Delete Customers Function
delCustomer = function(btn, i){
    btn.addEventListener('click', function(e){
        customrs.splice(i,1)
        localStorage.setItem('customrs', JSON.stringify(customrs))
        customrs.length == 0 ? document.querySelector('#customrDisplayTable').classList.add('d-none'): displayCustomrs()

    })
}

//withdraw balance of  Customers Function
withdrawBalance = function(btn, i){
    btn.addEventListener('click', function(e){
        val = parseFloat(prompt('enter value'))
        customrs[i].CustomrBalance>val? customrs[i].CustomrBalance = customrs[i].CustomrBalance - val : alert("Rejected withdraw")
        localStorage.setItem('customrs', JSON.stringify(customrs))
        displayCustomrs()

    })
}

//Add balance of  Customers Function
addBalance = function(btn, i){
    btn.addEventListener('click', function(e){
        val = parseFloat(prompt('enter value'))
        customrs[i].CustomrBalance = customrs[i].CustomrBalance + val
        localStorage.setItem('customrs', JSON.stringify(customrs))
        displayCustomrs()

    })
}


//Search by customers ID function
document.querySelector("#customrSearchTable").addEventListener('keyup', function(e){

    const SearchVal= e.target.value
    table = document.getElementById("customersTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent ;
          if (txtValue.includes(SearchVal) > 0) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }

      
})


customrs.length == 0 ? document.querySelector('#customrDisplayTable').classList.add('d-none'): displayCustomrs()



