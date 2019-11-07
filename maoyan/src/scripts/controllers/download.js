import downloadView from './../views/download.art';

class Download{

    render(){

        let downloadhtml = downloadView({});
        $('#root').html(downloadhtml);

    }
}
export default new Download();