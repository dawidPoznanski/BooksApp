{
  'use strict';

  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  const booksList = document.querySelector('.books-list');


  function renderBooks(){
    for(let book of dataSource.books){
      const html = template(book);
      const element = utils.createDOMFromHTML(html);

      booksList.appendChild(element);
    }
  }
  const favoriteBooks = [];

  function initActions(){



    //const booksElements = document.querySelector(booksList);
    const booksImage = booksList.querySelectorAll('.book__image');
    for(let image of booksImage){

      image.addEventListener('dblclick', function(event){
        event.preventDefault();
        //image.classList.add('favorite');
        const bookId = booksList.getAttribute('data-id');
        //favoriteBooks.push(bookId);


        if(!image.classList.contains('favorite')){
          image.classList.add('favorite');
          favoriteBooks.push(bookId);
        }else {
          favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
          image.classList.remove('favorite', bookId);
          console.log('Array', favoriteBooks);
        }
      });
    }
  }

  renderBooks();
  initActions();
}
