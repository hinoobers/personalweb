function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function createSnowflake() {
    const snowflake = document.createElement("div")
    snowflake.classList.add("snowflake")

    snowflake.style.left = rand(0, window.innerWidth) + "px"
    snowflake.style.fontSize = rand(12,30) + "px"
    snowflake.textContent = "❄️"

    document.getElementById("snow-container").appendChild(snowflake)

    animate(snowflake)
}

function animate(snowflake) {
    const fall = rand(4, 8)
    const left = parseFloat(snowflake.style.left)
    const right = rand(0, window.innerWidth)

    snowflake.animate([
        { transform: `translateY(0)`, left: `${left}px` },
        { transform: `translateY(${window.innerHeight}px)`, left: `${right}px` }
    ], {
        duration: fall * 1000,
        iterations: 1,
        easing: 'linear',
        fill: 'forwards',
        delay: 1000, 
    });

    setTimeout(() => {
        snowflake.remove()
    }, 10000)
}

setInterval(createSnowflake, 750)