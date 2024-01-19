
function loadMenu(){
    fetch("http://localhost:3000/ramens")
    .then(response=>response.json())
    .then(ramen =>{
        const ramenMenu = document.querySelector("#ramen-menu")
        ramen.forEach(element => {
            const img = document.createElement('img');
            img.src=element.image
            img.id=element.name
            ramenMenu.append(img)
        });

})}
loadMenu()

menuClick();



function menuClick(){
    fetch("http://localhost:3000/ramens")
        .then(response=>response.json())
        .then(ramen =>{
            ramen.forEach(element =>{
                document.getElementById(element.name).addEventListener("click",event =>{
                    event.preventDefault();
                    const name = document.querySelector(".name")
                    const restaurant = document.querySelector(".restaurant")
                    const image = document.querySelector(".detail-image")
                    const comment = document.querySelector("#comment-display")
                    const rating = document.querySelector("#rating-display")

                    name.textContent=element.name
                    //name.id=element.name
                    restaurant.textContent=element.restaurant
                    rating.textContent=element.rating
                    comment.textContent=element.comment

                    image.src=element.image


                    //console.log(element.name);
                    //console.log("PRESSED") 
                    })
                })
            document.getElementById("delete-button").addEventListener("click",event=>{
                event.preventDefault()
                const nameVal = document.querySelector(".name")
                //nameVal.className="delete-me"
                console.log(nameVal)
                
                const restaurantDel = document.querySelector(".restaurant")
                const imageDel = document.querySelector(".detail-image")
                const commentDel = document.querySelector("#comment-display")
                const ratingDel = document.querySelector("#rating-display")
                const ramenChildren = document.getElementById("ramen-menu").children
                //console.log(ramenChildren)
                for (let i=0;i<ramenChildren.length;i++) {
                    console.log(nameVal.textContent)

                    console.log(ramenChildren[i].name)
                    
                        fetch("http://localhost:3000/ramens/"+ramenChildren[i].id, {
            
                        method: "DELETE"
                    })
                }
                //name.remove()
                nameVal.textContent="Name"
                console.log(nameVal+"!")
                //console.log(nameEl.textContent)
                //restaurant.remove()
                restaurantDel.textContent="Restaurant"
               // image.remove()
                imageDel.src="./assets/image-placeholder.jpg"
                //comment.remove()
                commentDel.textContent="comment"
                //rating.remove()
                ratingDel.textContent="rating"
                //render()

            })
        })
}
    

const form = document.getElementById("new-ramen")
    
    form.addEventListener("submit",event =>{
        event.preventDefault();

        const newName=event.target["name"].value;
        const newRestaurant=event.target["restaurant"].value;
        //newName.id=newRestaurant
        const newImage=event.target["image"].value;
        const newRating=event.target["rating"].value;
        const newComment=event.target["new-comment"].value;
        
        const ramenMenu = document.querySelector("#ramen-menu")
       // const newItem=document.createElement(img)
        //newItem.src=newImage
        fetch("http://localhost:3000/ramens", {
            
            method: "POST",
            
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ name: newName, 
                restaurant:newRestaurant, 
                image:newImage, 
                rating:newRating, 
                comment:newComment })
        })
        .then(response => response.json())
        .then(newItem => {
            const newRamenImg = document.createElement("img");
            newRamenImg.src = newItem.image

            ramenMenu.append(newRamenImg);
            newRamenImg.addEventListener("click",event =>{
                event.preventDefault()
                const name = document.querySelector(".name")
                const restaurant = document.querySelector(".restaurant")
                const imagePlc = document.querySelector(".detail-image")
                const comment = document.querySelector("#comment-display")
                const rating = document.querySelector("#rating-display")

                name.textContent=newItem.name
                restaurant.textContent=newItem.restaurant
                rating.textContent=newItem.rating
                comment.textContent=newItem.comment

                imagePlc.src=newRamenImg.src
                //console.log(event.image.src)
                document.getElementById("delete-button").addEventListener("click",()=>{
                    newRamenImg.className= "deleteMe"
            })
            })
        })
    
       //ramenMenu.append(newItem)

        console.log(newName)
        console.log(newRestaurant)
        console.log(newImage)
        console.log(newRating)
        console.log(newComment)
    })


    function render(){
        fetch("http://localhost:3000/ramens")
        .then(response=>response.json())
        .then(ramen =>{
        document.getElementById('ramen-menu').innerHTML = ramen.map(item => {
            return `<img src=${item.src}/>`
        })
        
        })
        
    }