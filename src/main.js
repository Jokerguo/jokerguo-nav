const $siteList = $('.siteList')
const $lastLi = $siteList.find('.lastLi')
const x = localStorage.getItem('x')
const xObj = JSON.parse(x)
const hashMap =  xObj || [
    {logo : 'J', url : 'http://jokerguo.top/'},
    {logo: 'B' , url : 'https://www.baidu.com/'}
]

const simplifyUrl = (url)=>{
    return url.replace('https://','')
                .replace('http://','')
                .replace('www.','')
                .replace(/\/.*/,'')

}

//遍历hashMap
const render=()=>{
    $siteList.find('li:not(.lastLi)').remove()
    hashMap.forEach((element,index) => {
        const $li = $(`<li>
                <div class="site">
                    <div class="logo">${element.logo}</div>
                    <div class="link">${simplifyUrl(element.url)}</div>
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div>
        </li>`).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(element.url)
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation()   //组织冒泡
            console.log(hashMap)
            hashMap.splice(index,1)
            render()
        })
    });
}

render()
// <li>
// <a href="https://www.acfun.cn/">
//     <div class="site">
//         <div class="logo">A</div>
//         <div class="link">acfun.cn</div>
//     </div>
// </a>
// </li>
// <li>
// <a href="https://www.bilibili.com/">
//     <div class="site">
//         <div class="logo">
//             <img src="images/bilibili.png" alt="bilibili">
//         </div>
//         <div class="link">bilibili.com</div>
//     </div>
// </a>
// </li>



$('.addButton')
    .on('click',()=>{
        let url = window.prompt('请输入网址')
        if(url.indexOf('http')!== 0 ){
            url = 'https://'+url
        }      
       
        hashMap.push({
            logo:simplifyUrl(url)[0],
            logoType:'text',
            url:url}
            )
            render();
           
    })

window.onbeforeunload =()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}


    $(document).on('keypress',(e)=>{
        const key = e.key
        for(let i=0;i<hashMap.length;i++){
            if(hashMap[i].logo.toLocaleLowerCase() === key){
                window.open(hashMap[i].url)
            }
        }
    })


$('#searchForm').on('mousedown',()=>{
   $(document).off('keypress')
})