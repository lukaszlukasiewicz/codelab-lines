
const defaulultOptions = {
  observeIntersections : false,
}

let time = 10;
const rect = false;

const codeLiner = (container,instanceOptions) => {

  const options = Object.assign({},defaulultOptions,instanceOptions);

  const lines = JSON.parse(container.dataset.lines)

  
  let variability = parseInt(container.dataset.variability) || 150
  const horizontalOffset = parseInt(container.dataset.horizontalOffset) || .8
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = options.width || 2000;
  canvas.height = options.height || 2000;



  const drawLine = lineOptions => {

  

      lineOptions.points = [
        -10, 
        canvas.height/2 - variability +  variability,
        canvas.height
      ]
     

    if(!lineOptions.offsets || !lineOptions.offsets.length) {
      lineOptions.offsets = [0,0,0].map(()=>Math.random())
    }


    const {color,width,points,offsets} = lineOptions;
    context.strokeStyle = color;
    context.lineWidth = width;
    context.beginPath();
    context.moveTo(Math.sin(time  / (.5 + offsets[0]/2))*variability + canvas.width * horizontalOffset  -variability/2,points[0]);

  const middlePoint = {
    x:(Math.sin(time / (.5 + offsets[1]/2)) * variability ) + canvas.width * horizontalOffset  -variability/2,
    y: canvas.height/2
  }

 const controlPoint = {
  x:middlePoint.x -  Math.sin(time * (.5 +  offsets[1])) * canvas.width/8,
  y: canvas.height/4,
}

    const opositeControlPoint = {
      x:middlePoint.x + middlePoint.x - controlPoint.x ,
      y:middlePoint.y + middlePoint.y - controlPoint.y,
    }

    context.quadraticCurveTo(controlPoint.x,controlPoint.y, middlePoint.x,middlePoint.y);
    context.quadraticCurveTo(opositeControlPoint.x,opositeControlPoint.y,Math.sin(time  / (.5 + offsets[2]/2))*variability + canvas.width * horizontalOffset  -variability/2, points[2]);
    context.stroke();

    if(rect) {
      context.beginPath();
      context.fillStyle = color;
      context.rect(controlPoint.x-5,controlPoint.y-5,10,10)
      context.rect(opositeControlPoint.x-5,opositeControlPoint.y-5,10,10)
      context.rect(middlePoint.x-5,middlePoint.y-5,10,10)
      context.fill()
    };
  }


  const start = () => {
    const strokeWidthRatio =  canvas.width / canvas.offsetWidth
    requestAnimationFrame(()=>{
      canvas.width =  canvas.parentElement.offsetWidth || document.body.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight || document.body.offsetHeight;
      const canvasSize = Math.min(canvas.width,canvas.height) /4;
      variability = canvasSize < 20 ? 20 : canvasSize > 150 ? 150 : canvasSize; 
      context.clearRect(0, 0, canvas.width, canvas.height);
      lines.forEach(lineOptions => {
        //lineOptions.width = 2 *strokeWidthRatio;
        drawLine(lineOptions);
      });
      start();
    })
    
    time += .002;
  }

  start();
  
  container.appendChild(canvas);
  return {
    canvas,
  }
}

window.codeLiner = codeLiner;
//export default codeLiner;