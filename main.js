const cors_api_url = 'https://cors-anywhere.herokuapp.com/';
const dogdrip_url = "https://www.dogdrip.net" 

const img_field = document.querySelector(".img-fields");
let link_index = 0;
function get_con_list(html_object) {
    

    const conList = html_object.querySelectorAll(".stk_img_v")

    for (let index = 0; index < conList.length; index++) {
        let imgUrl = conList[index].getAttribute('style').slice(23,-2);
        add_imgs(imgUrl);
        console.log(dogdrip_url + imgUrl);
    }
}

function get_button_clicked(){
    link_index = 0;
    img_field.innerHTML = ''
    let given_url = document.querySelector("input").value;
    dukboong(given_url)
}

function add_imgs(img_url){
    const img_url_text = document.createTextNode(link_index + '번째 짤 : ' + dogdrip_url + img_url);
    const img_link = document.createElement('a');
    img_link.href = dogdrip_url + img_url;
    const img_wapper = document.createElement('div');
 
    img_link.appendChild(img_url_text);
    img_wapper.appendChild(img_link);
    img_field.appendChild(img_wapper);
    link_index++;
}

function dukboong(given_url) {
    $.ajax({
        url: cors_api_url + given_url,
        type:'GET',
        success: function(data){
            const parser = new DOMParser();
            const doc = parser.parseFromString(data,"text/html")
            get_con_list(doc) 
        }
    })
}