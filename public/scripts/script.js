
let deleting = false;
let index = 0;
let wait = 1000;
setInterval(() => {
    const who = document.querySelector('#changingTitle');

    const texts = [
        "Hey, I'm a Software Engineer",
        "Hey, I'm a Full Stack Developer",
        "Hey, I'm a Web Developer",
        "Hey, I'm a Student",
    ]

    if (deleting) {
        who.textContent = texts[index].slice(0, who.textContent.length - 1);
    } else {
        who.textContent = texts[index].slice(0, who.textContent.length + 1);
    }

    if (who.textContent === texts[index]) {
        if(wait > 0) {
            wait = wait - 50;
        } else {
            wait = 1000;
            deleting = true;
        }
    }

    if (who.textContent.length == 1) {
        deleting = false;
        index = (index + 1) % texts.length;
        wait = 1000;
    }
}, 50);

document.addEventListener('DOMContentLoaded', () => {
    fetch("/projects").then(data => {
        return data.json()
    }).then(response => {
        for(let i = 0; i < response.length; i++) {
            const project = response[i];
            const projectElement = document.createElement('div');
            projectElement.classList.add('project');
            projectElement.innerHTML = `
                <h3>${project.name}</h3>
                <a href="${project.git}" target="_blank">
                    <img src="${project.preview}" alt="Preview"/>
                </a>
            `
            document.querySelector('.projects').appendChild(projectElement);
        }
    })
})
