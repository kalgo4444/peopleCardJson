document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "https://fakestoreapi.com/users"

    const fetchData = () => {
        fetch(API_KEY)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                cardRender(data)
                find(data)
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                loader.style.display = "none"
            })
    }

    const collectionEl = document.querySelector(".navbar__collection")
    const navbarBtnEl = document.querySelector(".navbar__btn")
    const cardWrapperEl = document.querySelector(".card__wrapper")
    const navbarSearchEl = document.querySelector(".navbar__search")
    const navbarLinkEl = document.querySelectorAll(".navbar__link")

    navbarLinkEl.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault()
            collectionEl.classList.remove("show")
        })
    })

    window.addEventListener("load", () => {
        fetchData()
        collection()
    })

    const collection = function () {
        navbarBtnEl.addEventListener("click", () => {
            collectionEl.classList.toggle("show")
        })
    }

    const cardRender = function (data) {
        cardWrapperEl.innerHTML = ""
        const fragment = document.createDocumentFragment()
        data.forEach(item => {
            const article = document.createElement("article")
            article.classList.add("card__block")
            article.classList.add("card__scale")
            article.setAttribute("data-aos", "fade-up")
            article.innerHTML = `
                 <div class="card__img">
                 <img src="./assets/images/person.png" alt="Card person img" />
                 </div>
                <div class="card__title">
                <h3>${item.username}</h3>
                </div>
                <div class="card__desc">
                 <h3>${(item.name.firstname).toUpperCase()} ${(item.name.lastname).toUpperCase()}</h3>
                                <p><span>${item.address.city}</span>, <span>${item.address.street}</span></p>
                <p><span>${item.address.number}</span>, <span>${item.address.zipcode}</span></p>
                </div>
                 <div class="card__info">
                 <p><b>Username: </b> ${item.username}</p>
                <p><b>Phone: </b> <a href="tel:"> ${item.phone}</a></p>
                 <p><b>Email: </b> <a href="mailto:"> ${item.username}</a></p>
                </div>
            `
            fragment.appendChild(article)
        })
        cardWrapperEl.appendChild(fragment)
    }

    function find(data) {
        navbarSearchEl.addEventListener("input", (e) => {
            let userInput = e.target.value
            if (!userInput) {
                cardRender(data)
            } else {
                let findUser = data.filter((item) => item.username.toLowerCase().includes(userInput.toLowerCase()))
                cardRender(findUser)
            }
        })
    }
})