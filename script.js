var obj={
    "Haze":'/imgs/Haze.jpg',
    "Clear":'/imgs/Clear.jpg',
    "Clouds":'/imgs/Clouds.jpg',
    "Smoke":'/imgs/Clouds.jpg',
    "Thunderstorm":'/imgs/Thunderstorm.jpg',
    "Drizzle":'/imgs/Drizzle.jpg',
    "Rain":'/imgs/Rain.jpg',
    "Rain":'/imgs/Rain.jpg',
    "Snow":'/imgs/Snow.jpg',
    "Mist":'/imgs/Mist.jpg'
}
//event listener and passing of city name
let up=document.getElementById("input-box");
up.addEventListener("keypress",(event)=>{
    if(event.keyCode==13)
    {getdata(up.value);}
})

//feth data from api
async function getdata(city)
{
let data=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=983c651e8726d9439cae5267cf69dcb8&units=metric`);
data=await data.json();
updateit(data);
}

//update the data
function updateit(data)
{
    let maincity=document.getElementById("city-name");
    maincity.innerText=`${data.name}, ${data.sys.country}`

    let maintemp=document.getElementById("curr-temp");
    maintemp.innerHTML=`${Math.round((eval(data.main.temp)))}&degC`;

    let mainminmax=document.getElementById("min-max-temp");
    mainminmax.innerHTML=`${Math.round((eval(data.main.temp_max)))}&degC(Min)/${Math.round((eval(data.main.temp_min)))}&degC(Max)`;

    let weathertype=document.getElementById("curr-weather");
    weathertype.innerHTML=`${data.weather[0].main}`

    let date=document.getElementById("date");
    date.innerText=disdate();

    let curweat=data.weather[0].main;
    if(obj[curweat]!==undefined)
    {
        document.body.style.backgroundImage=`url('${obj[curweat]}')`;
    }
    else {document.body.style.backgroundImage=`url('/imgs/${Default}.jpg')`;}

    document.querySelector("#icon").setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

    document.querySelector(".dynamic-box").style.display="block";
}

//date check and return it
function disdate()
{
    let mon=["January","February","March",'April','May','June','July','August','September','October','November','December'];
    let day=['Sunday',"Monday",'Tuesday','Wednesday','Thursday','Friday','Saturday']
    let date=new Date();
    return `${date.getDate()} ${mon[date.getMonth()]} (${day[date.getDay()]}) ${date.getFullYear()}`;
}