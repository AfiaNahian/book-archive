document.getElementById('error-message').style.display = 'none';
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchText == '') {
        // please write something to display
        const totalResult = document.getElementById('total-result');
        totalResult.innerText = '';
        const h1 = document.createElement('h1');
        h1.innerText = `Please Enter some text`
        totalResult.appendChild(h1);
        // emptyResult.innerText = '';
        // const div1 = document.createElement('div');
        // div1.innerHTML = `
        //         <h1 class="text-danger">Please enter some text</h1>
        // `;
        // emptyResult.appendChild(div1);
    }
    else {
        // load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs))
            .catch(error => displayError(error));
    }
}

const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = docs => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (docs.length == 0) {
        // show no result found;
        const totalResult = document.getElementById('total-result');
        totalResult.innerText = '';
        const h1 = document.createElement('h1');
        h1.innerText = `There is no such book`
        totalResult.appendChild(h1);
        // const div = document.createElement('div');
        // div.innerHTML = `
        //         <h1 class="text-danger">There is no such book</h1>
        // `;
        // noResult.appendChild(div);
    }
    else {
        const totalResult = document.getElementById('total-result');
        totalResult.innerText = '';
        const h1 = document.createElement('h1');
        h1.innerText = `Total books ${docs.length}`
        totalResult.appendChild(h1);
        docs.forEach(book => {
            console.log(book);
            console.log(book.title);
            console.log(book.first_publish_year);
            console.log(book.author_name);
            console.log(book.publisher);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 shadow-lg border-0">
                <div class="p-2">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"  class="card-img-top img" alt="No photoes to show">
                </div>
                <div class="card-body p-3  text-center">
                    <h4 class="card-title">${book.title}</h4>
                    <div>
                    <p class="card-text  t-bold">${book.first_publish_year}</p>
                    <p class="card-text">By <span class="text-danger">${book.author_name?.[0]}</span></p>
                    <p class="card-text">Publisher : <span class="text-danger">${book.publisher?.[0]}</span></p>
                    </div>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        })

    }

}


