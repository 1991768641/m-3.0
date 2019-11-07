module.exports={
    get({
        offset:offset,
        cityid:cityid
    }){
        return $.ajax({
            url: `/api/ajax/mostExpected?ci=${cityid}&limit=10&offset=${offset}&token=`
        });
    },
    get1({
        cityid:cityid
    }){
        return $.ajax({
            url:`/api/ajax/comingList?ci=${cityid}&token=&limit=10`
        });
    },
    get2({
        moviesIds:moviesIds,
        cityid:cityid
    }){
        return $.ajax({
            url: `/api/ajax/moreComingList?ci=${cityid}&token=&limit=10&movieIds=${moviesIds}`
        });
    }
}