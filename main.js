function getAll(){
	if(localStorage.getItem('main')!=null){
		document.getElementById('taskKeeper').innerHTML+=localStorage.getItem('main');
	}	
}

document.addEventListener('drag', function (evt){
	dragText = evt.target.innerText;
	dragId = evt.target.id;
	// console.log(dragText);
	// console.log(dragId);
}, true);

var colors = ['red','crimson','blue','green','teal','pink','purple','orange','darkblue','royalblue'];
var mainTask,size,taskNo=0, size='normal',taskDiv;
var dragText, cragId;

function c(){
	console.log(1);
	window.localStorage.clear();
}

function addtask(){
	
	taskNo++;
	if(taskNo%2==0){
		type = 'even';
		svgtype = 'svgeven';
	}
	else{
		type='odd';
		svgtype = 'svgodd';
	}

	var task = document.getElementById('taskIp').value;
	if(task ==''){
		alert('You left the to do empty.');
		taskNo--;
		return 0;
	}

	document.getElementById('taskIp').value='';

	if(task.length > 95){
		mainTask = task.substring(0,94);
		size='normal';
	}
	else if(task.length <20){
		mainTask = task;
		size='bigsize';
	}
	else if(task.length >20){
		mainTask = task;
		size='normal';
	}
	var key = 'task'+taskNo;
	var clr = colors[Math.floor(10*Math.random())];
	var taskDiv = '<div id="task'+ taskNo +' " class="tasks '+size+' '+ type+'" draggable = "true" ondragstart="prepare()" style="background-color:'+clr+'"><svg onclick = "removeIt()" class = "'+svgtype+'" height="20" width="20"> <line id="l1" x1="7" y1="7" x2="14" y2="14" stroke-linecap="round" stroke="white" stroke-width="2px"/><line id="l2" x1="7" y1="14" x2="14" y2="7" stroke-linecap="round" stroke="white" stroke-width="2px"/><rect  id="r'+taskNo+'"  x="0" y="0" width="20" height="20" style="fill: transparent;"/></svg> <h4 >'+mainTask+'</h4></div>';

	taskDiv = taskDiv;
	accumulate();
	document.getElementById('taskKeeper').innerHTML+=taskDiv;
	
}

function prepare(){
	console.log(dragId);
}

function allowDrop(ev){

	ev.preventDefault();
}
var count=0;

function drop(ev){
	count++
	var donediv = '<div id="task'+ count+' "  draggable = "false" style="background-color: white; position: relative; margin-left: 5%; margin-top: 2%; width: 90%; height: 10%;"><h4 style="margin-top:1%; margin-left: 3%;">'+dragText+'<h4></div>';
	document.getElementById('doneSection').innerHTML += donediv;
	var d = Number(dragId.substring(4,5));

	if(d%2!=0){
		var idd = 'task'+(d+1);
	}

	window.localStorage.removeItem(dragId);

	var parent = document.getElementById("taskKeeper");
	var child = document.getElementById(dragId);
	parent.removeChild(child);

}

var a=1;
function removeIt(){
	a++;
	if(a==2){
		alert('Make sure you undertand that cross means removing the taks without completing!');
	}

	document.addEventListener('click', function (evt){
	dragId = evt.target.parentNode.parentNode.id;
	}, true);

	var n = Number(dragId.substring(4,5));

	console.log(n);

	if(n%2!=0){
		console.log('hi');
		rearrange(n);
	}

	var parent = document.getElementById("taskKeeper");
	var child = document.getElementById(dragId);
	parent.removeChild(child);

	accumulate();
	// localStorage.removeItem(dragId);

}

function accumulate(){
	// console.log(dragId);
	var total = document.getElementById('taskKeeper').innerHTML;
	window.localStorage.clear();
	localStorage.setItem('main',total);
	return;
}
var globcnt=0;
function rearrange(a){
	globcnt++;
	localStorage.setItem('g',globcnt);
	console.log('hi');

	a=a+1;
	var t = 'task'+a;

	accumulate();

	if (localStorage.getItem('main').search(t)!= -1) {
		console.log(t+'---'+a);
		
		document.getElementsByClassName('tasks')[a-1].style.marginLeft = '5%';
		document.getElementsByClassName('tasks')[a-1].style.marginTop = '3%';
		accumulate();
	} 
	else{
		return;
	}

}