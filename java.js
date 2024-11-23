// Get references to the canvas and controls
const canvas = document.getElementById("paint-canvas");
const btn = document.getElementById("btn");
const ctx = canvas.getContext("2d");
const penSizeInput = document.getElementById("pen-size");
const penColorInput = document.getElementById("pen-color");
const pencilRadio = document.getElementById("pen-pencil");
const brushRadio = document.getElementById("pen-brush");



let painting = false;



function startPosition(e) {
  painting = true;
  draw(e);
}


function endPosition() {
  painting = false;
  ctx.beginPath(); 
}


function draw(e) {
  if (!painting) return;

 
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;


  const penSize = parseInt(penSizeInput.value);
  const penColor = penColorInput.value;

  
  ctx.lineWidth = penSize;
  ctx.lineCap = "round";
  ctx.strokeStyle = penColor;


  if (pencilRadio.checked) {
    ctx.lineTo(x, y); 
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else if (brushRadio.checked) {
    ctx.beginPath();
    ctx.arc(x, y, penSize / 2, 0, Math.PI * 2); 
    ctx.fillStyle = penColor;
    ctx.fill();
  }
}


canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);
btn.addEventListener("click", clearCanvas);


function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
