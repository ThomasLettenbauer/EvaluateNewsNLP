function checkForISBN(inputText) {
    console.log("::: Running checkForISBN :::", inputText);

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) 
        });
        return response.json(); 
      }

      postData('http://localhost:8081/isbn', {isbn: inputText})
      .then((data) => {
        console.log('DATA')
        console.log(data); // JSON data parsed by `response.json()` call
        
        if ( data.status === 'SUCCESS' ) {
            console.log('TRUE');
            return true;
        } else { console.log('FALSE'); 
            return false;
            }
      });

    }



export { checkForISBN }
