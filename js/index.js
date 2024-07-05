document.addEventListener("DOMContentLoaded", function () { });

document.addEventListener("DOMContentLoaded", getBooks);

const url = "http://localhost:3000";

const listPanel = document.getElementById("list-panel");
const unordlList = document.getElementById("list");
const li = document.createElement("li");

const showPanel = document.getElementById("show-panel");
const title = document.createElement("h1");
const subtitle = document.createElement("h2");
const description = document.createElement("p");
const author = document.createElement("h3");
const imgurl = document.createElement("img");
const users = document.createElement("ul");
const likeButton = document.createElement("button");


function getBooks() {
    fetch(`${url}/books`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw "no";
            }
        })
        .then((books) => {
            books.forEach(book =>
                renderBookTitle(book))
        });
};

function renderBookTitle(book) {
    const unordList = document.getElementById("list");
    const li = document.createElement("li")
    li.textContent = book.title
    unordList.append(li);

    li.addEventListener("click", () => showDetails(book));
};


function showDetails(book) {
    console.log(`after patch: ${book.title}`);

    const showPanel = document.getElementById("show-panel");
    const title = document.createElement("h1");
    const subtitle = document.createElement("h2");
    const description = document.createElement("p");
    const author = document.createElement("h3");
    const imgurl = document.createElement("img");
    const users = document.createElement("ul");
    const likeButton = document.createElement("button");

    title.textContent = book.title,
        subtitle.textContent = book.subtitle,
        description.textContent = book.description,
        author.textContent = `By ${book.author}`,
        imgurl.src = book.img_url,

        likeButton.textContent = "Like",

        book.users.forEach(user => {
            const userListItem = document.createElement("li")
            userListItem.textContent = user.username
            users.append(userListItem)
        })

    while (showPanel.firstChild) {
        showPanel.removeChild(showPanel.lastChild)
    }

    likeButton.addEventListener("click", () => submitLike(book))

    showPanel.append(title);
    showPanel.append(subtitle);
    showPanel.append(description);
    showPanel.append(author);
    showPanel.append(imgurl);
    showPanel.append(users);
    showPanel.append(likeButton);
};

function submitLike(book) {
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
             "users": [...book.users, { "id": 1, "username": "pouros" }]
        })
    })

        .then(res => res.json())
        .then(book => showBookDetail(book))
}