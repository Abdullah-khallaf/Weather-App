window.addEventListener("load", () => {
    let long;
    let lat;
    let tempDescription = document.querySelector(".temp-description");
    let tempDegree = document.querySelector(".temp-degree");
    let locationTimeZone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".degree-section");
    let temperatureSpan = document.querySelector(".degree-section span");
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/2cda5d648cbc85876cd73f048ce2154f/${lat},${long}`;

            fetch(api)
                .then( response =>{
                        return response.json();
                })
                .then(
                    data => {
                        
                        const { temperature, summary, icon } = data.currently;
                        //set dom elements from api
                        tempDegree.textContent = temperature;
                        tempDescription.textContent = summary; 
                        locationTimeZone.textContent = data.timezone;
                        //formula for celsius
                        let celsius = (temperature - 32) * ( 5 / 9 );
                        //set icon
                            setIcons(icon, document.querySelector(".icon"));
                        // change temp/c to f
                            temperatureSection.addEventListener("click", () => {
                                if ( temperatureSpan.textContent === "F"){
                                    temperatureSpan.textContent = "C";
                                    tempDegree.textContent = celsius;
                                }else{
                                    temperatureSpan.textContent = "F";
                                    tempDegree.textContent = temperature;
                                }
                            })
                    });
        });
        
    }

    function setIcons(icon, iconId){
        const skycons = new Skycons({ color : "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[ currentIcon ]);
    }
});