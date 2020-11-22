import React from 'react';


 const FileInput = () => {

    const fileInput = React.createRef();
    let resultFilms = [];
    const getFile = (item) => {
        let file = item.target.files[0];
        let reader = new FileReader(); 
        
        reader.onload = (e) => { 
            const file = e.target.result; 
            const lines = file.split(/\n\s*\n/); 

            lines.forEach((line) => {
                let categories = line.split(/\r\n|\n/);
                let fields = [{pattern: 'Title: ', fieldName: 'Title'}, {pattern: 'Release Year: ', fieldName: 'ReleaseYear'}, 
                {pattern: 'Format: ', fieldName: 'Format'},  {pattern: 'Stars: ', fieldName: 'Stars'}];
                let film = {};
                categories.forEach(cat => {
                    fields.forEach(field => {
                        if(cat.includes(field.pattern)){
                            let value = cat.replace(field.pattern, '');
                            if (field.fieldName === 'Stars') {
                                value = value.split(',').map(function (el) {
                                    return el.trim();
                                });
                            } 
                            film[field.fieldName] = value;
                        }
                    })
                } );
                 resultFilms.push(film);           
            });
            console.log(resultFilms)
        }; 
        
        reader.readAsText(file);
     };

     const sendArr = () => {
        for (let i = 0; i < resultFilms.length; i ++) {
            fetch("http://157.230.49.193:3000/films", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                  }, 
                body: JSON.stringify(resultFilms[i]),
            })
            // .then(res => res.json())
            // .then(res => alert("correct"))
            // .catch(error => alert(error))
        }
     }



    
        return(
            <form>
                <label>
                     Upload file:
                    < input
                        type="file"
                        name="file"
                        onChange={(item)=>getFile(item)}
                    />
                </label>
                <br />
                <button onClick={() => sendArr()} type='button'>Submit</button>
          </form>
        )
    
}


export default FileInput