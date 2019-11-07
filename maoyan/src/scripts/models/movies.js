module.exports = {
    get({}){
      return $.ajax({
        url: `/api/ajax/movieOnInfoList?token=`
      })
    },
    get2({
      ids:ids
    }){
      return $.ajax({
        url:`/api/ajax/moreComingList?token=&movieIds=${ids}`
      })
    }
  }