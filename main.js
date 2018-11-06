const cors_api_url = 'https://cors-anywhere.herokuapp.com/';
const dogdrip_url = "https://www.dogdrip.net" 

const img_field = document.querySelector(".img-fields");
const con_name = document
let link_index = 1;
function get_con_list(html_object) {
    

    const conList = html_object.querySelectorAll(".stk_img_v")

    for (let index = 0; index < conList.length; index++) {
        let imgUrl = conList[index].getAttribute('style').slice(23,-2);
        add_imgs(imgUrl);
        // console.log(dogdrip_url + imgUrl);
    }
}

function get_button_clicked(){
    link_index = 1;
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

function addConName(name){
    const name_node = document.createTextNode(name);
    const name_div = document.createElement('div');
    name_div.className = "con-name";
    name_div.appendChild(name_node);
    img_field.appendChild(name_div);
}

function dukboong(given_url) {
    $.ajax({
        url: cors_api_url + given_url,
        type:'GET',
        success: function(data){
            const parser = new DOMParser();
            const doc = parser.parseFromString(data,"text/html")
            const con_name = doc.querySelector('.np_18px').textContent.replace(/^\s+|\s+$/g, '');
            addConName(con_name);
            get_con_list(doc);
            
            
        }
    })
}