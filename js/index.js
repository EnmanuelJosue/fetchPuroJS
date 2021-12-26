const url = "https://jsonplaceholder.typicode.com";
const contenedor = document.querySelector(".section-main-cards");
const createPosts = document.querySelector(".create-post");
const allItems = [];
let contador = 101;
// let first = 0;
// if (first === 0) {
//     console.log("inicio");
//     fetchData();
// }
createPosts.addEventListener("click", (e) => {
    const posts = document.querySelector(".div-posts");
    posts.innerHTML = `
    <form class="form-posts">
        <input
            
            type="text"
            placeholder="Ingresa el titulo del post"
        />
        <input
            type="text"
            placeholder="Ingresa la descripción del post"
        />
        <button type="submit">Enviar post</button>
    </form>
    
    `;
    const form = document.querySelector(".form-posts");
    const buttonForm = form.children[2];
    buttonForm.addEventListener("click", (e) => {
        console.log("Enviado");
    });
    console.log(buttonForm);
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = form.elements[0].value;
        const description = form.elements[1].value;
        console.log(title, description);
        fetch(`${url}/posts`, {
            method: "POST",
            body: JSON.stringify({
                title: `${title}`,
                body: `${description}`,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => res.json())
            .then((json) => {
                const id = document.createElement("span");
                id.textContent = contador;
                const title = document.createElement("h2");
                title.textContent = json.title;

                const description = document.createElement("p");
                description.textContent = json.body;

                const buttonRead = document.createElement("button");
                buttonRead.textContent = "Continue Reading";

                const buttonDeleted = document.createElement("button");
                buttonDeleted.textContent = "Deleted Post";
                buttonDeleted.classList = "btnDelete";

                const container = document.createElement("div");
                container.classList = "main-card";
                container.append(
                    title,
                    description,
                    id,
                    buttonRead,
                    buttonDeleted
                );
                allItems.unshift(container);
                contenedor.append(...allItems);
                console.log(allItems);
                const x = 1;
                obtener(x);
                contador++;
            });
        form.reset();
        posts.innerHTML = "";
    });
});

async function fetchData() {
    const response = await fetch(`${url}/posts`);
    const data = await response.json();

    data.forEach((data) => {
        const id = document.createElement("span");
        id.textContent = data.id;

        const title = document.createElement("h2");
        title.textContent = data.title;

        const description = document.createElement("p");
        description.textContent = data.body;

        // const buttonRead = document.createElement("button");
        // buttonRead.textContent = "Continue Reading";

        const buttonDeleted = document.createElement("button");
        buttonDeleted.textContent = "Deleted Post";
        buttonDeleted.classList = "btnDelete";

        const buttonComments = document.createElement("button");
        buttonComments.textContent = "View Comments";
        buttonComments.classList = "btnComments";

        const container = document.createElement("div");
        container.classList = "main-card";
        container.append(
            title,
            description,
            id,
            // buttonRead,
            buttonDeleted,
            buttonComments
        );
        allItems.push(container);
    });

    const responseImg = await fetch(`${url}/photos`);
    const dataImg = await responseImg.json();
    let x = 0;
    dataImg.forEach((data) => {
        if (x < 100) {
            const img = document.createElement("img");
            img.src = data.url;
            img.style = "height:200px";
            allItems[x].append(img);
        }
        x++;
    });

    contenedor.append(...allItems);

    obtener();
    // first = 1;
}
fetchData();
function obtener(id) {
    const btnDelete = document.querySelectorAll(".btnDelete");

    btnDelete.forEach((element) => {
        element.addEventListener("click", (e) => {
            const idPost = e.target.parentNode.childNodes[2].innerHTML;

            console.log("A borrar", idPost);
            if (id === 1) {
                console.log("Soy EL POST EDITADO", idPost);

                // allItems.splice(idPost, 1);
                borrar(idPost);
                // borrar(idPost - 100);
                // console.log(contenedor.childNodes);
            } else {
                borrar(idPost);
            }
        });
    });

    const btnComments = document.querySelectorAll(".btnComments");
    btnComments.forEach((element) => {
        let x = 0;
        element.addEventListener("click", (e) => {
            const idPost = e.target.parentNode.childNodes[2].innerHTML;

            if (x === 0) {
                viewComments(idPost);
            }
            x++;
        });
    });
}
function borrar(id) {
    console.log(id);
    fetch(`${url}/posts/${id}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then(() => {
            // contenedor.removeChild(allItems[id - 1]);

            allItems.forEach((items) => {
                if (items.children[2].innerHTML == id) {
                    // const x = items.children[2].innerHTML - 1;
                    const posicion = allItems.indexOf(items);
                    contenedor.removeChild(allItems[posicion]);
                    allItems.splice(posicion, 1);
                    console.log(allItems);
                    // contenedor.removeChild(allItems[x]);
                    // allItems.splice(x, 1);
                    // console.log(allItems);
                }
            });

            // console.log(contenedor.childNodes);
            // function remove(allItems, item) {
            //     let i = allItems.indexOf(allItems[item - contador]);
            //     console.log(i);
            //     if (i !== -1) {
            //         contenedor.removeChild(allItems[i]);
            //         allItems.splice(i, 1);
            //         // console.log(allItems);
            //         // console.log(contenedor.children);
            //     } else {
            //         console.log(i);
            //     }
            //     contador++;
            //     console.log("Contador", contador);
            // }
            // remove(allItems, id);
            // contenedor.removeChild(allItems[id - 1]);
            // allItems.splice(id - 1, 1);
            // console.log(allItems);
        });
}
async function viewComments(id) {
    const response = await fetch(`${url}/posts/${id}/comments`);
    const data = await response.json();
    data.forEach((data) => {
        console.log(data);

        const title = document.createElement("h1");
        title.textContent = "Comentarios:";
        title.style = "margin-top:2rem";

        const name = document.createElement("h4");
        name.textContent = `Nombre: ${data.name}`;

        const email = document.createElement("span");
        email.textContent = `Email: ${data.email}`;

        const body = document.createElement("p");
        body.textContent = `Mensaje: ${data.body}`;

        const div = document.createElement("div");
        div.style = "order:1";
        div.append(title, name, email, body);

        allItems.forEach((items) => {
            if (items.children[2].innerHTML == id) {
                const posicion = allItems.indexOf(items);
                allItems[posicion].append(div);
            }
        });

        // contenedor.append(...allItems[id - 1]);
    });
    // const buttonCerrar = document.createElement("button");
    // buttonCerrar.textContent = "Close comment";
    // allItems[id - 1].append(buttonCerrar);

    // buttonCerrar.addEventListener("click", () => {
    //     console.log(allItems[id - 1]);
    // });
}
