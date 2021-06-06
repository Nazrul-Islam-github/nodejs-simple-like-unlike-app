const ShowLike = (_likePost, _id) => {

    if (_likePost === undefined || _id === undefined) return "far fa-heart";

    const Check = Array.from(_likePost)
    const isLike = Check.includes(_id.toString());
    if (isLike) {
        return "fas fa-heart"
    }
    else {
        return "far fa-heart"
    }
}

module.exports = {
    ShowLike
}