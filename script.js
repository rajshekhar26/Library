const btnAddBook = document.querySelector('.btn-add-book');
const btnCloseForm = document.querySelector('.btn-close-form');
const form = document.getElementById('form');
const bookList = document.getElementById('book-list');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');

function displayForm() {
	if (!form.classList.contains('form')) {
		form.classList.add('form');
		form.reset();
	}
}

function closeForm() {
	if (form.classList.contains('form')) {
		form.classList.remove('form');
		form.reset();
	}
}

btnAddBook.addEventListener('click', displayForm);
btnCloseForm.addEventListener('click', closeForm);

const myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary(e) {
	e.preventDefault();
	myLibrary.push(
		new Book(title.value, author.value, pages.value, read.checked)
	);
	displayBook();
	form.classList.remove('form');
}

form.addEventListener('submit', addBookToLibrary);

function deleteBook(e) {
	const containerIndex = document.querySelector(
		`.book-container[data-index = '${e.target.dataset.index}']`
	);

	if (containerIndex) {
		containerIndex.remove();
	}

	for (let j = 0; j < myLibrary.length; j++) {
		if (e.target.dataset.index == myLibrary[j].index) {
			myLibrary.splice(j, 1);
		}
	}
}

function toggleRead(e) {
	let readBtn = document.querySelectorAll('.read-btn');
	for (let j = 0; j < myLibrary.length; j++) {
		if (e.target.dataset.index == myLibrary[j].index) {
			if (myLibrary[j].read) {
				readBtn[j].textContent = `Unread`;
				myLibrary[j].read = false;
			} else {
				readBtn[j].textContent = 'Read';
				myLibrary[j].read = true;
			}
		}
	}
}

function displayBook() {
	bookList.textContent = '';

	for (let i = 0; i < myLibrary.length; i++) {
		const createDiv = document.createElement('div');
		const appendDiv = bookList.appendChild(createDiv);
		appendDiv.classList.add('book-container');
		appendDiv.setAttribute('data-index', i);
		myLibrary[i].index = i;

		const createTitle = document.createElement('h3');
		const appendTitle = appendDiv.appendChild(createTitle);
		appendDiv.appendChild(appendTitle).textContent = myLibrary[i].title;

		const createAuthor = document.createElement('p');
		const appendAuthor = appendDiv.appendChild(createAuthor);
		appendDiv.appendChild(
			appendAuthor
		).textContent = `By ${myLibrary[i].author}`;
		appendAuthor.classList.add('book-author');

		const createPages = document.createElement('p');
		const appendPages = appendDiv.appendChild(createPages);
		appendDiv.appendChild(
			appendPages
		).textContent = `${myLibrary[i].pages} Pages`;

		const createReadBtn = document.createElement('button');
		const appendReadBtn = appendDiv.appendChild(createReadBtn);
		appendReadBtn.classList.add('read-btn');

		if (myLibrary[i].read) {
			appendReadBtn.textContent = 'Read';
		} else {
			appendReadBtn.textContent = `Unread`;
		}

		appendReadBtn.setAttribute('data-index', i);

		let createDelBtn = document.createElement('button');
		const appendDelBtn = appendDiv.appendChild(createDelBtn);
		appendDelBtn.classList.add('delete-btn');
		appendDelBtn.textContent = 'Delete';
		appendDelBtn.setAttribute('data-index', i);
	}

	let deleteBtn = document.querySelectorAll('.delete-btn');
	let readBtn = document.querySelectorAll('.read-btn');

	for (let i = 0; i < readBtn.length; i++) {
		readBtn[i].addEventListener('click', toggleRead);
	}

	for (let i = 0; i < deleteBtn.length; i++) {
		deleteBtn[i].addEventListener('click', deleteBook);
	}
}
