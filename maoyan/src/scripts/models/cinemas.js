module.exports={
    get({
        date:date,
        offsets:offsets,
        cityid:cityid
    }){
        return $.ajax({
            url:`/api/ajax/cinemaList?day=${date}&offset=${offsets}&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1570846234406&cityId=${cityid}`,
        });
    },

    get1({
        cinemaid:cinemaid
    }){
        return $.ajax({
            url:`/api/ajax/cinemaDetail?cinemaId=${cinemaid}`
        })
    },

    get2({
        cityid:cityid
    }){
        return $.ajax({
            url:`/api/ajax/filterCinemas?ci=${cityid}`
        })
    }

}