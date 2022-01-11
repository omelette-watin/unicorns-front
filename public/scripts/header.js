
window.onscroll = function() {
    let scrollY = window.pageYOffset || document.documentElement.scrollTop;
    let header = document.querySelector('#header');

    if (scrollY <= 10 ) {
        header.classList.remove('is-hidden');
        header.classList.remove('is-fixed');
    } else {
      if (scrollY <= this.lastScroll && scrollY >= window.innerHeight) {

        header.classList.remove("is-hidden");
        header.classList.add("is-fixed");
    }

        if (scrollY >= this.lastScroll && scrollY >= window.innerHeight ) {
        header.classList.add("is-hidden")
        }
    }


    this.lastScroll = scrollY ;

}
