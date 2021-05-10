//Getting longitude and latitude from built-in function
window.addEventListener ('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let imageIcon = document.querySelector('.icon');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=0086b7e27c76a22e26eb481f6b4eb272`;


            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp} = data.main;
                const {description, icon}= data.weather[0];
                //Set DOM Elements from the API
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = description;
                locationTimezone.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
                changeUnit(temp);

                //Set Icon
                const iconAPI = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                fetch(iconAPI)
                    .then(response => response.blob())
                    .then(images => {
                        // Then create a local URL for that image
                       const url = URL.createObjectURL(images);
                        console.log(url);
                        imageIcon.setAttribute("src", `${url}`);
                    })
            })

            //Change Unit to Celsius/Fahrenheit
            function changeUnit (temp) {
                  //Formula for Celsius
                 let celsius = (temp - 32) * (5 / 9);
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else {
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = temp;
                    }
                })
            }

        });

    }

});
