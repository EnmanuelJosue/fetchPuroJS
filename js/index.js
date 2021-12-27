const url = "https://jsonplaceholder.typicode.com";
const contenedor = document.querySelector(".section-main-cards");
const createPosts = document.querySelector(".create-post");
const allItems = [];
let contador = 101;

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

                const img = document.createElement("img");
                img.src =
                    "https://plantillashtmlgratis.com/wp-content/themes/helium-child/vista_previa/page107/the-web-news/images/_thumb1.jpg";
                img.style = "height:200px";

                const buttonRead = document.createElement("button");
                buttonRead.textContent = "Continue Reading";

                const buttonDeleted = document.createElement("button");
                buttonDeleted.textContent = "Deleted Post";
                buttonDeleted.classList = "btnDelete";

                const container = document.createElement("div");
                container.classList = "main-card";
                container.append(
                    img,
                    title,
                    description,
                    id,
                    buttonRead,
                    buttonDeleted
                );
                allItems.unshift(container);
                contenedor.append(...allItems);
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

        const buttonDeleted = document.createElement("button");
        buttonDeleted.textContent = "Deleted Post";
        buttonDeleted.classList = "btnDelete";

        const buttonComments = document.createElement("button");
        buttonComments.textContent = "View Comments";
        buttonComments.classList = "btnComments";

        const container = document.createElement("div");
        container.classList = "main-card";
        container.append(title, description, id, buttonDeleted, buttonComments);
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
}

function obtener(id) {
    const btnDelete = document.querySelectorAll(".btnDelete");

    btnDelete.forEach((element) => {
        element.addEventListener("click", (e) => {
            const idPost = e.target.parentNode.childNodes[2].innerHTML;

            console.log("A borrar", idPost);
            if (id === 1) {
                console.log("Soy EL POST EDITADO", idPost);
                borrar(idPost);
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
    fetch(`${url}/posts/${id}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then(() => {
            allItems.forEach((items) => {
                if (items.children[2].innerHTML == id) {
                    const posicion = allItems.indexOf(items);
                    contenedor.removeChild(allItems[posicion]);
                    allItems.splice(posicion, 1);
                    console.log(allItems);
                }
            });
        });
}
async function viewComments(id) {
    const response = await fetch(`${url}/posts/${id}/comments`);
    const data = await response.json();
    const title = document.createElement("h1");
    title.textContent = "Comentarios:";
    title.style = "margin-top:2rem";
    title.style = "order:1";
    data.forEach((data) => {
        const name = document.createElement("h4");
        name.textContent = `Nombre: ${data.name}`;

        const email = document.createElement("span");
        email.textContent = `Email: ${data.email}`;

        const body = document.createElement("p");
        body.textContent = `Mensaje: ${data.body}`;

        const div = document.createElement("div");
        div.style = "order:2";
        div.append(name, email, body);

        allItems.forEach((items) => {
            if (items.children[2].innerHTML == id) {
                const posicion = allItems.indexOf(items);
                allItems[posicion].append(title, div);
            }
        });
    });
}
fetchData();
