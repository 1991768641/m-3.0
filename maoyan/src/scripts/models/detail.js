module.exports = {
    get({
        time:time
    }) {
        return $.ajax({
            type:'post',
            url: `/api/ajax/movie?forceUpdate=${time}`
        })
    },
    get1({
        detailmovieid:detailmovieid
    }){
        return $.ajax({
            url:`/api/ajax/detailmovie?movieId=${detailmovieid}`
        })
    }
}