const axios = require('axios');

const apiKey = 'VLHTP6QUFX9DFH8V';
const symbol = 'EQNR';
const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&interval=60min&apikey=${apiKey}`;

class APIService {
  getCurrentStock() {
    return (
      axios
        .get(apiUrl)
        //@ts-ignore
        .then((data) => {
          console.log(apiUrl);
          console.log(apiKey);
          console.log(symbol);
          console.log(data.data);
        })
        //@ts-ignore
        .catch((error) => {
          console.error(error);
        })
    );
  }
}

const apiService = new APIService();
export default apiService;

// {
//     const data = response.data['Global Quote'];
//     console.log(
//       `Current stock value for ${this.symbol}: ${data['05. price']} ${data['08. currency']}`
//     );
//   }
