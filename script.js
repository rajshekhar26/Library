const btnAddBook = document.querySelector('.btn-add-book');
const btnCloseForm = document.querySelector('.btn-close-form');
const form = document.querySelector('form');
const bookList = document.getElementById('book-list');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
let div;
let appendDiv;
let h3;
let paragraph;
let btn;

const myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

const hasFormClass = () => form.classList.contains('form');

const removeFormClass = () => {
	form.classList.remove('form');
	form.reset();
};

const addFormClass = () => {
	form.classList.add('form');
	form.reset();
};

const displayForm = () => {
	hasFormClass() ? removeFormClass() : addFormClass();
};

const addBookToLibrary = (event) => {
	event.preventDefault();
	myLibrary.push(
		new Book(title.value, author.value, pages.value, read.checked)
	);
};

let book1 = new Book(title.value, author.value, pages.value, read.checked);

const createBookContainer = (index) => {
	div = document.createElement('div');
	appendDiv = bookList.appendChild(div);
	appendDiv.classList.add('book-container');
	appendDiv.setAttribute('data-index', index);
	myLibrary[index].index = index;
};

const createH3 = (appendDiv) => {
	h3 = document.createElement('h3');
	appendH3 = appendDiv.appendChild(h3);
};

const createP = (appendDiv) => {
	paragraph = document.createElement('p');
	appendP = appendDiv.appendChild(paragraph);
};

const createBtn = (appendDiv) => {
	btn = document.createElement('button');
	appendBtn = appendDiv.appendChild(btn);
};

const createTitle = (appendDiv, index) => {
	createH3(appendDiv);
	appendDiv.appendChild(appendH3).textContent = myLibrary[index].title;
};

const createAuthor = (appendDiv, index) => {
	createP(appendDiv);
	appendDiv.appendChild(appendP).textContent = `By ${myLibrary[index].author}`;
	appendP.classList.add('book-author');
};

const createPages = (appendDiv, index) => {
	createP(appendDiv);
	let pages = +myLibrary[index].pages;
	if (pages === 1) {
		appendDiv.appendChild(appendP).textContent = `1 page`;
	} else if (pages > 1) {
		appendDiv.appendChild(appendP).textContent = `${pages} pages`;
	}
};

const createReadBtn = (appendDiv, index) => {
	createBtn(appendDiv);
	appendBtn.classList.add('read-btn');
	if (isRead(index)) {
		appendBtn.textContent = 'Read';
	} else {
		appendBtn.textContent = `Unread`;
	}
	appendBtn.setAttribute('data-index', index);
};

const createDeleteBtn = (appendDiv, index) => {
	createBtn(appendDiv);
	appendBtn.classList.add('delete-btn');
	appendBtn.textContent = 'Delete';
	appendBtn.setAttribute('data-index', index);
};

const displayBook = () => {
	bookList.textContent = '';
	for (let i = 0; i < myLibrary.length; i++) {
		createBookContainer(i);
		createTitle(appendDiv, i);
		createAuthor(appendDiv, i);
		createPages(appendDiv, i);
		createReadBtn(appendDiv, i);
		createDeleteBtn(appendDiv, i);
	}
};

const deleteBookFromContainer = (event) => {
	const containerIndex = document.querySelector(
		`.book-container[data-index = '${event.target.dataset.index}']`
	);
	if (containerIndex) {
		containerIndex.remove();
	}
};

const deleteBookFromLibrary = (event) => {
	myLibrary.forEach((book, index) => {
		if (+event.target.dataset.index === book.index) {
			myLibrary.splice(index, 1);
		}
	});
};

const deleteBook = () => {
	let deleteBtn = document.querySelectorAll('.delete-btn');
	deleteBtn.forEach((btn) => {
		btn.addEventListener('click', (event) => {
			deleteBookFromContainer(event);
			deleteBookFromLibrary(event);
		});
	});
};

const isRead = (index) => myLibrary[index].read;

const toggleUnread = (btn, index) => {
	btn.textContent = `Unread`;
	myLibrary[index].read = false;
};

const toggleRead = (btn, index) => {
	btn.textContent = 'Read';
	myLibrary[index].read = true;
};

const toggleReadStatus = () => {
	let readBtn = document.querySelectorAll('.read-btn');
	readBtn.forEach((btn, index) => {
		btn.addEventListener('click', () => {
			isRead(index) ? toggleUnread(btn, index) : toggleRead(btn, index);
		});
	});
};

btnAddBook.addEventListener('click', displayForm);
btnCloseForm.addEventListener('click', displayForm);

form.addEventListener('submit', (event) => {
	addBookToLibrary(event);
	displayBook();
	removeFormClass();
	deleteBook(event);
	toggleReadStatus();
});
