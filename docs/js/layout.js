const template = document.createElement("div");

fetch("master.html")
    .then(r => r.text())
    .then(html => {
        template.innerHTML = html;

        const layout = template.querySelector("#layout");
        const contentSlot = layout.querySelector("#content");

        const content = document.querySelector("[data-include-content]");
        contentSlot.appendChild(content);

        document.body.appendChild(layout.content.cloneNode(true));
    });