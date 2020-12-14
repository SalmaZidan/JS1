fetch("https://breaking-news2.p.rapidapi.com/wp-json/wp/v2/posts", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "b4affe50eamshf27cfd48dc1afb3p18d066jsnd5b04e239c05",
		"x-rapidapi-host": "breaking-news2.p.rapidapi.com"
	}
})
.then(res => {
        if(res.status == 200){
            return res.json()
        }
        else throw new Error('Server Error')
})
.then(data =>{
    data.forEach(element => {
        console.log(element)
        displaypost(element.id , element.title.rendered , element.slug , element.modified, element.link) 
    });
})
.catch(err => {
	console.error(err);
});

const addElement = function( type , classes , contant )
{
    const ele = document.createElement('type')
    ele.setAttribute('class',classes)
    ele.innerHTML = contant
    return ele 
}

const displaypost = function(id , title , slug , modified , link){


    const div = addElement('div' , 'card text-center my-3' ,'')
    
    const div1 = addElement('div' , 'card-header' , id)

    const div2 = addElement('div' , 'card-body' , '')

    h5 = document.createElement('h5')
    h5.setAttribute('class','card-title')
    h5.innerHTML = title
    p = document.createElement('p')
    p.setAttribute('class','card-text')
    p.innerHTML = slug
    a = document.createElement('a')
    a.setAttribute('class','btn btn-primary')
    a.setAttribute('href',link)
    a.innerHTML = "show more"
    
    div2.appendChild(h5)
    div2.appendChild(p)
    div2.appendChild(a)


    const div3 =  document.createElement('div')
    div3.setAttribute('class','card-footer text-muted')
    div3.innerHTML = modified

    div.appendChild(div1)
    div.appendChild(div2)
    div.appendChild(div3)

    document.querySelector('#contaner').appendChild(div)

}