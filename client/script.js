
async function add(event) {
    event.preventDefault();
    console.log('Reached.....');

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let data = {
        email,
        password
    };

    console.log('data', data);

    let stringdata = JSON.stringify(data);
    console.log("string_data :", stringdata);

    try {
        let response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: stringdata
        });

        console.log('response', response);

        let parsed =  await response.json();
        console.log('parsed',parsed);

        let token_data = parsed.data;
        console.log('token_data',token_data);

        let user_type = token_data.user_type;

        let token = token_data.token;

        let id =token_data.id;
        console.log("id",id)

        let token_key = id;
        
        
        localStorage.setItem(token_key, token);
        console.log("token_key",token_key)


        if(user_type === 'Admin'){
            alert('admin logging successfull')
            window.location = `admin.html?login=${token_key}`
        }
        else if(user_type === 'Employee'){
            alert('emplozee login failed')
            window.location = `employee.html`
        }

       
    } catch (error) {
        console.log("error :", error);
    }

} 

function addpage(event){
    event.preventDefault()
  
    let params = new URLSearchParams(window.location.search);
    console.log(params)

    let token_key = params.get('login');
    console.log(token_key)

    window.location = `addpage.html?login=${token_key}`
}


async function adduser(event) {
    event.preventDefault();
    console.log('Form submission started...');

    const params = new URLSearchParams(window.location.search);
    console.log('params', params);

    const token_key = params.get('login');
    console.log("token_key", token_key);

    const token = localStorage.getItem(token_key);

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const user_type = document.getElementById('user_type').value;

    const data = { username, email, password, user_type };
    console.log("data", data);

    const strdata = JSON.stringify(data);
    console.log('strdata', strdata);

    try {
        const response = await fetch('/user', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: strdata,
        });
        console.log("response",response)
        let parsed_responce =await response.json()
        console.log("parsed_responce",parsed_responce)

        if(response.status===200){
            alert("Employee successfully added")
            window.location=`admin.html?login=${token_key}`
        }else{
            alert("something went worng")
        }
    } catch (error) {
        console.error("Fetch error:", error);

    }
}
async function listView(event) {
    event.preventDefault();
    console.log("reached list view ..............................")
    

    let params = new URLSearchParams(window.location.search);
    console.log('params',params);

    let token_key = params.get('login');
    console.log("token_key",token_key);

    let token = localStorage.getItem(token_key)

    try {
        let response = await fetch(`/user`,{
            method : 'GET',
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        });

        let parsed_Response = await response.json();
        console.log("parsed_Response",parsed_Response);

        let data = parsed_Response.data;
        console.log("data",data)

        const tableBody = document.getElementById('userTable');
        let row='';
        for(let i=0; i<data.length ; i++){

        
            row += `
                <tr>

                    <td class="hov">${data[i]._id}</td>
                    <td class="hov">${data[i].username}</td>
                    <td class="hov">${data[i].email}</td>
                    <td><button class="custom-btn btn-16" onclick="singleData('${data[i]._id}')" >view</button></td>
                   
                </tr>
            `;

            // tableBody.appendChild(row);
            tableBody.innerHTML =row;

        }
        

    } catch (error) {
        console.log("error",error);
    }
    
}



