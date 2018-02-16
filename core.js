var global,velocidad, tiempo;
function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    global=contents;
    displayContents(contents);
  };
  reader.readAsText(file);
}

function displayContents(contents) {
  var element = document.getElementById('file-content');
  element.textContent = contents;
}
document.getElementById('file-input')
  .addEventListener('change', readSingleFile, false);
var         golpes=[],golpe,serie=0;  


$('#potato').on('click',function(){
        array=global.split("\n");
        desc=array[1].split(',');
        round=0; 
        for(i=6;i<array.length;i++){
            inside=false;
            var  aux="";
            for(j=0;j<array[i].length;j++){
                if(inside&&(array[i][j]==",")){
                   aux=aux.concat("",'.');
                }else{
                  aux=aux.concat("",array[i][j]);
                }
                 if(!inside && (array[i][j]=='"')){
                    inside=true;aux=aux.concat("",array[i][j]);
               }else  
                if(inside && (array[i][j]=='"')){
               
                    inside=false;
               }
            }
            event=aux.split(',');
            if(event[1]=='Punch'){   
                var golpe = new Object();
                golpe.mano=event[5];
                golpe.tipo=event[6];
                golpe.timestamp=event[4].slice(1);
                golpe.velocidad=event[7].slice(1,-1);
                golpe.distance=0;
                golpe.serie=0;
                golpe.round=round;
                console.log('aaa');
                golpes.push(golpe);
           } 
           
           if(event[1]=='Round start'){
                round=round+1;
           }
           
        }
  threshold=0.43; //TODO Dynamic threshold??
  
  //CALCULAMOS LAS SERIES
  for(i=0;i<golpes.length;i++){
    //console.log(golpes[i]);
        if(i>0){
            if(golpes[i].round==golpes[i-1].round){
               // console.log('I',golpes[i].timestamp);
                //console.log('I-1',golpes[i-1].timestamp);
                golpes[i].distance=parseFloat(golpes[i].timestamp.replace('"','').slice(0,-1))-parseFloat(golpes[i-1].timestamp.replace('"','').slice(0,-1));;
                if (golpes[i].distance > threshold){
                    serie++;
                }
                golpes[i].serie=serie;
                
            }else{
                serie++;
                golpes[i].serie=serie;
            }
      }
  
  }
  
  str="";
  last=-1;
  round_last=-1;
  for(i=0;i<golpes.length;i++){
        if(golpes[i].round!=round_last){
            round_last=golpes[i].round
            golpes_round_array=golpes.filter(x => x.round==round_last)
            aux=golpes_round_array[golpes_round_array.length-1].serie-golpes_round_array[0].serie;
            str+='<hr><h1>Round   '+round_last +'<hr><h1> /// Golpes '+golpes_round_array.length+'  Series '+aux+'</h1><hr>';
        }
        if(golpes[i].serie!=last){
            last=golpes[i].serie
            if(str!=''){
                str+='</div>';
            }
            str+='<hr><div class="round'+round_last+'">';
         }
        
        if(golpes[i].mano=='Right' && golpes[i].tipo=='Straight'){
                str+='<img src="Der.png" width="20px" height="20px"></img>';
            }
        if(golpes[i].mano=='Left' && golpes[i].tipo=='Straight'){
            str+='<img src="izq.png" width="20px" height="20px"></img>';
            }
        if(golpes[i].mano=='Left' && golpes[i].tipo=='Power'){
            str+='<img src="izq_arr.png" width="20px" height="20px"></img>';
            }
        if(golpes[i].mano=='Right' && golpes[i].tipo=='Power'){
            str+='<img src="der_arr.png" width="20px" height="20px"></img>';
            }
              //   console.log(golpes[i].distance);
  
  }  
  str=str+'</div>';
  
 // $('#potato').append(str);
  
  
  
 






for(i=0;i<golpes.length;i++){
    //insertRecord(golpes[i],'aa');
    console.log(i);
//insertRecord(golpes[i],'aa');
}







 })
