const btnAddBook = document.querySelector('.btn-add-book');
const form = document.querySelector('form');
let myLibrary = [];

const hasWidth = () => form.style.width === '100%';

const hideForm = () => {
	form.style.width = '0';
	btnAddBook.style.transform = 'rotate(0deg)';
	form.reset();
};

const showForm = () => {
	form.style.width = '100%';
	btnAddBook.style.transform = 'rotate(45deg)';
	title.focus();
	form.reset();
};

const displayForm = () => {
	hasWidth() ? hideForm() : showForm();
};

btnAddBook.addEventListener('click', displayForm);

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

const addBookToLibrary = (event) => {
	event.preventDefault();
	myLibrary.push(
		new Book(title.value, author.value, pages.value, read.checked)
	);
};

const addIdToLibrary = () => {
	myLibrary.forEach((book, index) => {
		book.id = index;
	});
};

const addBookToLS = () => {
	localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
};

const isRead = (index) => myLibrary[index].read;

const createH3 = (appendDiv) => {
	const h3 = document.createElement('h3');
	appendH3 = appendDiv.appendChild(h3);
};

const createP = (appendDiv) => {
	const paragraph = document.createElement('p');
	appendP = appendDiv.appendChild(paragraph);
};

const createBtn = (appendDiv) => {
	const btn = document.createElement('button');
	appendBtn = appendDiv.appendChild(btn);
	appendBtn.classList.add('btn');
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
	let pages = parseInt(myLibrary[index].pages);
	appendDiv.appendChild(appendP).textContent = `${pages} pages`;
};

const createReadBtn = (appendDiv, index, id) => {
	createBtn(appendDiv);
	appendBtn.classList.add('read-btn');
	isRead(index)
		? (appendBtn.textContent = 'Read')
		: (appendBtn.textContent = `Unread`);
	appendBtn.setAttribute('data-index', id);
};

const createDeleteBtn = (appendDiv, id) => {
	createBtn(appendDiv);
	appendBtn.classList.add('delete-btn');
	appendBtn.textContent = 'Delete';
	appendBtn.setAttribute('data-index', id);
};

const createBookInfo = (appendDiv, index, id) => {
	createTitle(appendDiv, index);
	createAuthor(appendDiv, index);
	createPages(appendDiv, index);
	createReadBtn(appendDiv, index, id);
	createDeleteBtn(appendDiv, id);
};

const createBookContainer = (bookList, index, id) => {
	const div = document.createElement('div');
	appendDiv = bookList.appendChild(div);
	appendDiv.classList.add('book-container');
	appendDiv.setAttribute('data-index', id);
	createBookInfo(appendDiv, index, id);
};

const displayBook = () => {
	const bookList = document.getElementById('book-list');
	bookList.textContent = '';
	for (let i = 0; i < myLibrary.length; i++) {
		createBookContainer(bookList, i, myLibrary[i].id);
	}
};

const isDataIndexEqualBookId = (event, book) => {
	return parseInt(event.target.dataset.index) === book.id;
};

const deleteBookFromContainer = (event) => {
	const containerDataIndex = document.querySelector(
		`.book-container[data-index = '${event.target.dataset.index}']`
	);
	if (containerDataIndex) {
		containerDataIndex.remove();
	}
};

const deleteBookFromLibrary = (event) => {
	myLibrary.forEach((book, index) => {
		isDataIndexEqualBookId(event, book) && myLibrary.splice(index, 1);
	});
};

const deleteBookfromLS = (event) => {
	let books = JSON.parse(localStorage.getItem('myLibrary'));
	books.forEach((book, index) => {
		isDataIndexEqualBookId(event, book) && books.splice(index, 1);
	});
	localStorage.clear();
	localStorage.setItem('myLibrary', JSON.stringify(books));
};

const deleteBook = () => {
	let deleteBtn = document.querySelectorAll('.delete-btn');
	deleteBtn.forEach((btn) => {
		btn.addEventListener('click', (event) => {
			deleteBookFromContainer(event);
			deleteBookFromLibrary(event);
			deleteBookfromLS(event);
		});
	});
};

const toggleUnread = (btn, book) => {
	btn.textContent = `Unread`;
	book.read = false;
};

const toggleRead = (btn, book) => {
	btn.textContent = 'Read';
	book.read = true;
};

const toggleReadStatusLS = (event) => {
	let books = JSON.parse(localStorage.getItem('myLibrary'));
	books.forEach((book) => {
		if (isDataIndexEqualBookId(event, book)) {
			book.read ? (book.read = false) : (book.read = true);
		}
	});
	localStorage.clear();
	localStorage.setItem('myLibrary', JSON.stringify(books));
};

const toggleReadStatus = (btn, event) => {
	myLibrary.forEach((book) => {
		if (isDataIndexEqualBookId(event, book)) {
			book.read ? toggleUnread(btn, book) : toggleRead(btn, book);
			toggleReadStatusLS(event);
		}
	});
};

const checkReadStatus = () => {
	let readBtn = document.querySelectorAll('.read-btn');
	readBtn.forEach((btn) => {
		btn.addEventListener('click', (event) => {
			toggleReadStatus(btn, event);
		});
	});
};

form.addEventListener('submit', (event) => {
	addBookToLibrary(event);
	addIdToLibrary();
	addBookToLS();
	displayBook();
	hideForm();
	deleteBook();
	checkReadStatus();
});

const getBooksFromLS = () => {
	let books = JSON.parse(localStorage.getItem('myLibrary'));
	if (books) {
		myLibrary = [...books];
		displayBook();
		deleteBook();
		checkReadStatus();
	}
};

window.addEventListener('load', getBooksFromLS);
