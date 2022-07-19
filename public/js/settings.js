
let infos = document.querySelectorAll('.more .title p')
let infoBoxes = document.querySelectorAll('.more .info-box .box-con')

infos.forEach((ele ,index)=>{
    //console.log(ele, index)
    ele.addEventListener('click', ()=>{
        document.querySelector('.more .title p.active').classList.remove('active')
        document.querySelector('.more .info-box .box-con.active').classList.remove('active')
        infos[index].classList.add('active')
        infoBoxes[index].classList.add('active')
    })
})

// update user name
let updateName = document.getElementById('update-name')
updateName.onclick = ((e) => {
    e.preventDefault()
    console.log('updatName')
    let name = document.querySelector("form[name=update-name] input[type=text]").value
    let password = document.querySelector("form[name=update-name] input[type=password]").value
    


    let obj = {name, password}

    fetch('/update-name', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(res => {
          let box = document.querySelector('.box-con.name')

          let result = document.createElement('div')
          result.className = 'result'
          let checkRes = document.querySelector('.result')
          if(checkRes){
            box.removeChild(checkRes)
          }
        if(res.ok){
            result.innerHTML = `<p class='success'>Name is updated successfully</p>`
            box.appendChild(result)
            document.querySelector("form[name=update-name] input[type=password]").value = ''
        }else{
            result.innerHTML = `<p class='failed'>Wrong password</p>`
            box.appendChild(result)
            document.querySelector("form[name=update-name] input[type=password]").value = ''
        }
      });

})

// update password
let updatePassword = document.getElementById('update-password')
updatePassword.onclick = ((e) => {
    e.preventDefault()
    let oldPassword = document.querySelector("form[name=update-password] input[name=old_password]").value
    let newPassword = document.querySelector("form[name=update-password] input[name=new_password]").value

    let obj = {oldPassword, newPassword}

    fetch('/update-password', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(res => {
          let box = document.querySelector('.box-con.password')

          let result = document.createElement('div')
          result.className = 'result'
          let checkRes = document.querySelector('.result')
          if(checkRes){
            box.removeChild(checkRes)
          }
        if(res.ok){
            result.innerHTML = `<p class='success'>Password is updated successfully</p>`
            box.appendChild(result)
            document.querySelector("form[name=update-password] input[name=old_password]").value = ''
            document.querySelector("form[name=update-password] input[name=new_password]").value = ''
             }else{
            result.innerHTML = `<p class='failed'>Wrong password</p>`
            box.appendChild(result)
            document.querySelector("form[name=update-password] input[name=old_password]").value = ''
            document.querySelector("form[name=update-password] input[name=new_password]").value = ''
        }
      });

})