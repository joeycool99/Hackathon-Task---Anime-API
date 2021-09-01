
var maindiv1 = document.createElement("div");
maindiv1.setAttribute("id", "maindiv1")
var h1 = document.createElement("h1")
h1.innerHTML = "Anime Search"
var form1 = document.createElement("form")
form1.setAttribute("id", "searchForm")
var divy = document.createElement("div")
divy.setAttribute("id", "ser")
var input = document.createElement("input")
input.setAttribute("type", "text")
input.setAttribute("placeholder", "TV Show Title")
input.setAttribute("name", "query")
var but = document.createElement("button")
but.classList.add("bg-info", "text-dark")

but.setAttribute("type", "submit")
var span = document.createElement("span")
span.innerHTML = "Search"
var but2 = document.createElement("button")
but2.setAttribute("onclick", "foo()")
but2.classList.add("bg-danger", "text-dark")

but2.innerHTML = "clear"
but.append(span)
divy.append(input, but, but2)
form1.append(divy)
maindiv1.append(h1, form1)
document.body.prepend(maindiv1)

var container = document.createElement("div")


container.setAttribute("class", "container")
const form = document.querySelector('#searchForm');



form.addEventListener('submit', async function (e) {
    try {
        e.preventDefault();

        const searchTerm = form.elements.query.value;
        const res = await fetch(`https://api.jikan.moe/v3/search/anime?q=${searchTerm}`);
        const fin = await res.json();
        makeImages(fin.results)


        form.elements.query.value = '';
    }
    catch (e) {
        console.log(e)
    }

})

const makeImages = (shows) => {
    for (let result of shows) {
        if (result.image_url) {

            const img = document.createElement('IMG');
            img.src = result.image_url;
            const p = document.createElement('p');
            const divimg = document.createElement("div")


            var formatterstart = new Date(`${result.start_date}`).toLocaleDateString("sq-AL", { year: 'numeric', month: '2-digit', day: '2-digit' })
            var formatterend = new Date(`${result.end_date}`).toLocaleDateString("sq-AL", { year: 'numeric', month: '2-digit', day: '2-digit' })

            var main = document.createElement("div")



            main.innerHTML = `  <div class="card" mb-3 style="background-color:#fcde67">
                                <div class="row">
                                <div class="col-md-2">
                                <img src="${result.image_url}" alt="" class="img-fluid" style=" justify-content: center;">
                                </div>
                                <div class="col-md-8">
                                <div class="card-body">
                                <h2 class="card-title">
                                ${result.title}
                                </h2>
                                <h6 class="card-text">
                                IMDB rating: ${result.score}<br>
                                Show type: ${result.type}<br>
                                ${result.type} show premiered date: ${formatterstart}<br>
                                ${result.type} show concluded date: ${formatterend}<br>
                                Rated: ${result.rated}<br>
                                <a ></a>
                                <a class="btn btn-primary" href="${result.url}"  style ="margin-top:10px" target="_blank" >More information</a>
               
                                 </h6>
              
        </div>
    </div>
</div>
</div>`
            container.append(main)
        }
    }
    insertAfter(maindiv1, container);
}


function foo() {
    window.location.reload();
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}



