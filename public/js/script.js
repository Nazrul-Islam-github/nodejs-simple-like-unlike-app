const socket = io('http://localhost')
const likeCount = (event) => {

    const data = {
        user: event.target.attributes[1].nodeValue,
        post: event.target.attributes[0].nodeValue
    }

    const toggleLike = {
        like: (action) => {
            data.action = action
            const ShowAction = event.target.nextElementSibling;
            postjson(data, ShowAction)
        },

        unlike: (action) => {
            data.action = action
            const ShowAction = event.target.nextElementSibling;
            postjson(data, ShowAction)
        }

    }

    const elem = event.target
    const a = event.target.classList[0]



    let action;
    if (a === 'far') {
        elem.className = 'fas fa-heart'
        action = 'Like'
        toggleLike.like('like')

    }
    else if (a === 'fas') {
        elem.className = 'far fa-heart'
        action = 'Unlike'
        toggleLike.unlike('unlike')
    }

    console.log(action);





    // postjson(data)

}


function postjson(data, ShowAction) {
    let url = "http://localhost/like"
    data = JSON.stringify(data)


    senddata = {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    }


    fetch(url, senddata).then((response) => {
        return response.text() //josn() return data in json formate
    }).then((data) => {
        console.log("succed")
        if (data === '/login') {
            window.location = `http://localhost${data}`
        }
        else {
            const parseData = JSON.parse(data)
            ShowAction.innerText = `${parseData.like} Like`
        }

    }).catch(error => {
        console.log(error);
    })
}


function updateLike(like) {
    // updatelike.innerText = like
    // console.log(like.like);
    const updatelike = document.querySelectorAll('.like')
    updatelike.forEach((element, index,) => {
        element.addEventListener('click', (e) => {
            console.log(e);
        })
    })

}