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