module.exports = {
    get({
        content:content,
        cityid:cityid,
        type:type
    }) {
        return $.ajax({
            url: `/api/ajax/search?kw=${content}&cityId=${cityid}&stype=${type}`
        })
    }
}