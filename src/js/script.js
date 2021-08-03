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

  renderBooks();
}
