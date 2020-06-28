//companies data file
let companiesData = require("./data/companies.json");
let socket_io = require("socket.io");
//https://medium.com/@tomberwick/configuring-socketio-with-expressjs-generator-and-nodejs-b3812aad953a

//========================== Const =======================
const TotalCompanies = companiesData.length;
const SendingUpdateFrequency_min_MilliSecond = 200;
const SendingUpdateFrequency_max_MilliSecond = 2000;
const sendingOneTime_min_companies = 1;
const sendingOneTime_max_companies = 15;

let io = socket_io();

// Handle connection
io.on("connection", function (socket) {
  console.log("Connected succesfully to the socket ...");

  //after 1sec, execute the func
  setTimeout(sendUpdate, 1000);
});

function sendUpdate() {
  const numberOfCompanies = generateOneRandomNumber(sendingOneTime_min_companies, sendingOneTime_max_companies);

  const randomNumbers = generateMultipleRandomNumbers(numberOfCompanies, 0, TotalCompanies - 1);
  const randomPrices = generateMultipleRandomNumbers(numberOfCompanies, 1, 9999);

  const companiesAndStockValue = [];
  randomNumbers.forEach((n) => {
    const companyWithStockValue = { ...companiesData[n], stock: randomPrices[companiesAndStockValue.length] };
    companiesAndStockValue.push(companyWithStockValue);
  });

  console.log(companiesAndStockValue);

  io.sockets.emit("newStockValues", companiesAndStockValue);

  //set the same function again to execute
  const nextMilliSecond = generateOneRandomNumber(
    SendingUpdateFrequency_min_MilliSecond,
    SendingUpdateFrequency_max_MilliSecond
  );
  console.log(nextMilliSecond);
  setTimeout(sendUpdate, nextMilliSecond);
}

function generateOneRandomNumber(min, max) {
  const n = Math.floor(Math.random() * (max - min)) + min;
  return n;
}

function generateMultipleRandomNumbers(totalNumbersRequired, min, max) {
  const arr = [];
  while (arr.length < totalNumbersRequired) {
    const idx = generateOneRandomNumber(min, max);
    if (arr.indexOf(idx) === -1) {
      arr.push(idx);
    }
  }
  return arr;
}

let socketAPI = {};
socketAPI.io = io;
module.exports = socketAPI;
