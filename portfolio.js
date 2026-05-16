/* =========================
CYBER MATRIX RAIN + NETWORK
========================= */

/* ================= MATRIX CANVAS ================= */

const matrixCanvas =
document.getElementById("matrixCanvas");

const matrixCtx =
matrixCanvas.getContext("2d");

/* ================= NETWORK CANVAS ================= */

const networkCanvas =
document.getElementById("networkCanvas");

const netCtx =
networkCanvas.getContext("2d");

/* ================= RESIZE ================= */

let fontSize = 16;
let columns;
let drops = [];

function resizeCanvas(){

  matrixCanvas.width =
  window.innerWidth;

  matrixCanvas.height =
  window.innerHeight;

  networkCanvas.width =
  window.innerWidth;

  networkCanvas.height =
  window.innerHeight;

  /* FULL SCREEN RAIN */

  columns =
  Math.floor(
    matrixCanvas.width / fontSize
  );

  drops =
  Array(columns).fill(1);
}

resizeCanvas();

window.addEventListener(
  "resize",
  resizeCanvas
);

/* ================= MATRIX RAIN ================= */

const letters =
"アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function drawMatrix(){

  /* TRAIL EFFECT */

  matrixCtx.fillStyle =
  "rgba(0,0,0,0.08)";

  matrixCtx.fillRect(
    0,
    0,
    matrixCanvas.width,
    matrixCanvas.height
  );

  matrixCtx.font =
  `${fontSize}px monospace`;

  for(let i=0;i<drops.length;i++){

    const text =
    letters.charAt(
      Math.floor(
        Math.random()*letters.length
      )
    );

    /* RANDOM COLORS */

    const glow =
    Math.random();

    if(glow > 0.98){

      matrixCtx.fillStyle =
      "#ffffff";

    }else{

      matrixCtx.fillStyle =
      "#00ffe5";
    }

    /* DRAW TEXT */

    matrixCtx.fillText(
      text,
      i * fontSize,
      drops[i] * fontSize
    );

    /* RESET DROP */

    if(
      drops[i] * fontSize >
      matrixCanvas.height &&
      Math.random() > 0.975
    ){

      drops[i] = 0;
    }

    /* SPEED */

    drops[i] += 1;
  }

  requestAnimationFrame(
    drawMatrix
  );
}

drawMatrix();

/* ================= NETWORK PARTICLES ================= */

const particles = [];

const PARTICLE_COUNT = 80;

for(let i=0;i<PARTICLE_COUNT;i++){

  particles.push({

    x:
    Math.random() *
    window.innerWidth,

    y:
    Math.random() *
    window.innerHeight,

    vx:
    (Math.random()-0.5)*0.8,

    vy:
    (Math.random()-0.5)*0.8
  });
}

/* ================= NETWORK ANIMATION ================= */

function animateNetwork(){

  netCtx.clearRect(
    0,
    0,
    networkCanvas.width,
    networkCanvas.height
  );

  for(let i=0;i<particles.length;i++){

    const p = particles[i];

    p.x += p.vx;
    p.y += p.vy;

    /* WALL COLLISION */

    if(
      p.x < 0 ||
      p.x > networkCanvas.width
    ){
      p.vx *= -1;
    }

    if(
      p.y < 0 ||
      p.y > networkCanvas.height
    ){
      p.vy *= -1;
    }

    /* NODE */

    netCtx.beginPath();

    netCtx.arc(
      p.x,
      p.y,
      2,
      0,
      Math.PI * 2
    );

    netCtx.fillStyle =
    "#00ffe5";

    netCtx.fill();

    /* CONNECTIONS */

    for(let j=i+1;j<particles.length;j++){

      const p2 = particles[j];

      const dx = p.x - p2.x;
      const dy = p.y - p2.y;

      const distance =
      Math.sqrt(dx*dx + dy*dy);

      if(distance < 120){

        netCtx.beginPath();

        netCtx.strokeStyle =
        `rgba(0,255,229,${
          1 - distance/120
        })`;

        netCtx.lineWidth = 0.5;

        netCtx.moveTo(
          p.x,
          p.y
        );

        netCtx.lineTo(
          p2.x,
          p2.y
        );

        netCtx.stroke();
      }
    }
  }

  requestAnimationFrame(
    animateNetwork
  );
}

animateNetwork();
