const places=[
            {id:"library",name:"Central Library",query:"Catholic University of Korea Sacred Heart Campus Central Library",embed:""},
            {id:"class",name:"B333",query:"Catholic University of Korea Sacred Heart Campus Classroom B333",embed:""},
            {id:"sports",name:"Sports Field",query:"Catholic University of Korea Sacred Heart Campus Sports Field",embed:""},
        ];
        function selectPlace(place){
            for(const section of document.querySelectorAll(".place")){
                section.hidden=section.id!==place.id;
            }
            for(const button of document.querySelectorAll("#buttons button")){
                button.setAttribute("aria-pressed",String(button.dataset.place===place.id));
            }
            let address=place.embed;
            if(!address){
                address="https://maps.google.com/maps?q="+encodeURIComponent(place.query)+"&output=embed";
            }
            document.querySelector("#map").src=address;
            document.querySelector("#map").title=place.name+" Google Map";
            document.querySelector("#map-link").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(place.query);
        }
        for(const place of places){
            const button=document.createElement("button");
            button.textContent=place.name;
            button.dataset.place=place.id;
            button.addEventListener("click",function(){
                selectPlace(place);
            });
            document.querySelector("#buttons").append(button);
        }
        selectPlace(places[0]);