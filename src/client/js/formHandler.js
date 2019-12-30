import { checkForISBN } from "./isbnChecker";

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    
    console.log("::: Running checkForISBN :::", formText);

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

      postData('http://localhost:8081/isbn', {isbn: formText})
      .then((data) => {
        console.log('DATA')
        console.log(data); // JSON data parsed by `response.json()` call
        
        if ( data.status === 'SUCCESS' ) {
            console.log('TRUE');
            isbnValid();
        } else { console.log('FALSE'); 
            isbnNotValid();
            }
      });

    function isbnValid (isbn) {
        console.log("::: Form Submitted :::")
        fetch('http://localhost:8081/test')
        .then(res => res.json())
        .then(function(res) {
            console.log(res);
            
            var myMessage = '';

            Object.keys(res.entities).forEach(function(e) {
                myMessage += (e + ": " + res.entities[e].join(","));
                myMessage += '<br>';
            });

            document.getElementById('results').innerHTML = myMessage;
        })
    }

    function isbnNotValid () {
        console.log("::: ISBN not valid :::")
            document.getElementById('results').innerHTML = 'ISBN not valid';
    }

}    

export { handleSubmit }
