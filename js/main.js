let Container=document.getElementsByClassName('Container')
let number=0;
let floorOrder=[]

window.scrollTo(0,0);
function CreateTheWorld(){
    let floor=parseInt(document.getElementById('NumberOfFloor').value);
    let floorContainer = document.createElement("div");
    floorContainer.classList.add("Floors")
 
    for(let i=floor-1;i>=0;--i)
    {
        let floor1=        `<div class="FloorContainer">
        <div class="ButtonContainer">
           ${i!==floor-1 ?  `<button class="up-button ${i}" id="${i}" onclick="handleclick(id)"> up </button>`:``}
           ${i!==0 ?  `<button class="down-button ${i}" id="${i}" onclick="handleclick(id)"> down </button>`:``}
        </div>
        <div class="FloorDetail">
            <div class="Line"></div><h3>Floor ${i}</h3>
        </div>
    </div>`
    floorContainer.innerHTML+= floor1;
       
    }
    let elevator=`
    <div id="Lift" class="SingleLift">
        <div class="LeftDoor" ></div>
        <div class="RightDoor" ></div>
    </div>`
    floorContainer.innerHTML+=elevator
    Container[0].innerHTML=''
    Container[0].prepend(floorContainer)

    // let elevatorContainer =document.createElement("div");
    
    elevatorContainer.innerHTML=elevator
//   Container[0].append(elevatorContainer)
}

function MoveLift(id){
    let Lift=document.getElementById('Lift')
    if(!Lift.classList.contains("busy"))
    {
        Lift.style.transform=`translateY(-${(280 *(parseInt(id)))}px)`
        Lift.classList.add('busy')
        setTimeout( ()=>{Lift.children[0].classList.add('OpenLeftDoor'); Lift.children[1].classList.add('OpenRightDoor')},4500) 
        setTimeout( ()=>{Lift.children[0].classList.remove('OpenLeftDoor'); Lift.children[1].classList.remove('OpenRightDoor')},8500) 
        setTimeout( ()=>{Lift.classList.remove('busy')},11000) 
    }
}

var flag=1;

function handleclick(id){
    let Lift=document.getElementById('Lift')
    if(!Lift.classList.contains("busy")&& flag){
        MoveLift(id)
        flag=0;
    }
    else{
        floorOrder.push(id)
        console.log('FLoor Queued',id,floorOrder);
    }

        setInterval(() => {
        if(floorOrder.length && !Lift.classList.contains("busy") )
        {
            console.log('Lift going to',floorOrder[0],floorOrder)
            MoveLift(floorOrder.shift())
            console.log(floorOrder)
            
        }
       }, 5000);
 
}