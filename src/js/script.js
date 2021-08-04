
{
  'use strict';




  class BookList{
    constructor(){
      const thisBook = this;
      thisBook.initData();
      thisBook.getElements();
      thisBook.renderBooks();
      thisBook.initActions();
    }
    initData(){
      this.data = dataSource.books;
    }
    getElements(){
      const thisBook = this;

      thisBook.template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
      thisBook.booksList = document.querySelector('.books-list');
      thisBook.categoriesFilters = document.querySelector('.filters');
      thisBook.favoriteBooks = [];
      thisBook.filters = [];
    }
    renderBooks(){
      const thisBook = this;

      for(let book of this.data){
        const html = thisBook.template(book);
        const element = utils.createDOMFromHTML(html);


        thisBook.booksList.appendChild(element);

        const ratingBGc = thisBook.determineRatingBgc(book.rating);
        const ratingWidth = ratingBGc * 10;
        book.ratingBGc = ratingBGc;
        book.ratingWidth = ratingWidth;
      }
    }
    initActions(){
      const thisBook = this;



      const booksImage = thisBook.booksList.querySelectorAll('.book__image');
      for(let image of booksImage){

        image.addEventListener('dblclick', function(event){
          event.preventDefault();
          const image = event.target.offsetParent;
          //image.classList.add('favorite');
          const bookId = thisBook.booksList.getAttribute('data-id');
          //favoriteBooks.push(bookId);


          if(!image.classList.contains('favorite')){
            image.classList.add('favorite');
            thisBook.favoriteBooks.push(bookId);
          }else {
            thisBook.favoriteBooks.splice(thisBook.favoriteBooks.indexOf(bookId), 1);
            image.classList.remove('favorite', bookId);
            console.log('Array', thisBook.favoriteBooks);
          }
        });
      }
      thisBook.categoriesFilters.addEventListener('change', function(event){
        event.preventDefault();
        if(event.target.tagName == 'INPUT' &&
        event.target.type == 'checkbox' &&
        event.target.name == 'filter'){
          if(event.target.checked){
            thisBook.filters.push(event.target.value);
            console.log(thisBook.filters);
          }else{
            thisBook.filters.splice(thisBook.filters.indexOf(event.target.value));
            console.log(thisBook.filters);
          }
        }
        thisBook.filterBooks();
      });

    }
    filterBooks(){
      const thisBook = this;

      for(let oneBook of this.data){
        let shouldBeHidden = false;
        for(const oneFilter of thisBook.filters){
          if(!oneBook.details[oneFilter]){
            shouldBeHidden = true;
            break;
          }
        }
        const bookChanges = document.querySelector('.book__image[data-id= "'+ oneBook.id + '"]');
        if(shouldBeHidden == true){
          bookChanges.classList.add('hidden');
        }else{
          bookChanges.classList.remove('hidden');
        }
      }
    }
    determineRatingBgc(rating){
      if(rating < 6){
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }else if (rating > 6 && rating <= 8){
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }else if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }
  }

  const app = new BookList();
  console.log(app);

}
