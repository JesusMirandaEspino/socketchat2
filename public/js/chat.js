let user = null;
let socket = null;



const validarJWT = async () => {
    const token = await localStorage.getItem('token')  || '';

    if( token.length <= 10 ){
        window.location = 'index.html';
        throw new Error( 'No hay token en el servidor' );
    }

    const resp = await fetch( url, {
        headers: { 'token': token }
    } );

    const { user: userdb, token: tokendb } = resp.json();
    console.log( userdb, tokendb );


}


const main = async () => {
    await validarJWT();
}


main();



//const socket = io();