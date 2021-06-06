const like = document.querySelector('.card-link')
like.addEventListener('click', (e) => {
    let elem = e.target.lastElementChild
    const a = e.target.lastElementChild.classList[0]
    // elem = heart


    let action;
    if (a === 'fas') {
        elem.className = 'far fa-heart'
        action = 1
    }
    else if (a === 'far') {
        elem.className = 'fas fa-heart'
        action = 0
    }


    else {
        console.log('not working');
    }
    console.log(action);



})