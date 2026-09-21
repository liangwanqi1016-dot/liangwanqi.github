// 地点数据数组，对应你网页里三个校园地点
const places=[
    {id:1,name:"library",category:"library",x:22,y:48},
    {id:2,name:"B333",category:"class",x:66,y:62},
    {id:3,name:"sports ground",category:"sports",x:68,y:24},
];

const mapEL=document.getElementById('map');
const infoEL=document.getElementById('info');
const selectEL=document.getElementById('categorySelect');

//渲染标记函数
function renderPlaces(filterCategory="all"){
    //先清空地图里面旧的标记
    mapEL.innerHTML="";

    //筛选数据
    let filteredList = places;
    if(filterCategory !=="all"){
        filteredList = places.filter(p =>p.category===filterCategory);
    }
    //循环生成标记按钮
    for(const place of filteredList){
        const marker=document.createElement('button');
        marker.textContent=place.name;
        //设置位置百分比
        marker.style.left=`${place.x}%`;
        marker.style.top=`${place.y}%`;
        marker.classList.add('marker');

        //点击事件
        marker.addEventListener('click',()=>{   
            infoEL.textContent=`选中地点：${place.name}`;
        })
        mapEL.append(marker);
    }
}

//下拉框切换筛选
selectEL.addEventListener('change',(e)=>{
    renderPlaces(e.target.value);
})

//页面打开默认渲染全部地点
renderPlaces();