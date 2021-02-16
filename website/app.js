// Personal API Key for OpenWeatherMap API
const  baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey="&APPID=c3232797586cb2aeaf9cd46cb7b2764a&units=metric";

/* Global Variables */
const _zipCode = document.getElementById("zip");
const _feelings = document.getElementById("feelings");
const _date = document.getElementById("date");
const _temp = document.getElementById("temp");
const _content = document.getElementById("content");
const _generate = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Create event listener to add functions to button  element
_generate.addEventListener("click", GetGenerate);

/** Post Data To API */
function GetGenerate(e) {
  const cityZip = _zipCode.value;
  const userFeelings = _feelings.value;
  getWeatherData(baseUrl, cityZip, apiKey).then(function (data) {
    console.log("GetGenerate .then func. : " + data);
    postData("http://localhost:5000/add", {
      date: newDate,
      temp: data.main.temp,
      content: userFeelings,
    });
    update();
  });
} //end function

/** Get Zip Code Information From Api */
const getWeatherData = async (baseUrl, cityZip, apiKey) => {
  const res = await fetch(baseUrl + cityZip + apiKey);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to Post Data to server */

const postData = async (url = "", data = {}) => {
  console.log("postData function " + data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET  */
/* Update UI */
const update = async () => {
  const request = await fetch("http://localhost:5000/all");
  try {
    const allData = await request.json();
    _date.innerHTML = `Date: ${allData.date}`;
    _temp.innerHTML = `Temperature: ${allData.temp}`;
    _content.innerHTML = `Content: ${allData.content}`;
  } catch (error) {
    console.log("error", error);
  }
}; //end function
