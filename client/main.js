/* Indicamos la ruta donde se encuetra el socket y con la propiedad
    forceNew indicamos que vamos a forzar la conexión
*/
var socket = io.connect('http://192.168.100.48:6677',{'forceNew':true});
socket.on('messages',(data)=>{
    console.log(data);
    render(data);
});

function render(data){
    /*Itera el arreglo y cada elemento lo ingresa  a la variable message
        con join ingresamos un epacio en cada elemento
    */
    var html = data.map((message,index)=>{
        return (`    
            <div class="message">
                <strong>${message.nickname}</strong> dice:
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');

        /*con innerHTML agregamos el contenido que creamos*/
        var div_msgs = document.getElementById('messages');
   div_msgs.innerHTML = html;
   div_msgs.scrollTop = div_msgs.scrollHeight;
}

 addMessage=(e)=>{
    var message = {
        nickname : document.getElementById('nickname').value,
        text : document.getElementById('text').value,
    };

    document.getElementById('nickname').style.display = 'none';

    /*Crea el evento con el mensaje*/
    socket.emit('add-message',message);
    return false;
}
