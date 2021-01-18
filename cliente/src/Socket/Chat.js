import React, { useState, useEffect } from "react";
import socket from "./Socket";
const Chat = ({ nombre }) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    listar()
    usuarios()
    socket.emit("new user", nombre)
  }, [nombre]);



  const listar = () => {
    socket.on("load old msgs", (mensajes) => {
      setMensajes(mensajes)

    });
  }
  const usuarios = () => {
    socket.on('usernames', data => {
      setUsers(data)
      console.log(data)
    });
  }
  const submit = (e) => {
    e.preventDefault();
    socket.emit("send message", mensaje);

    setMensaje("")
  };
  const salir = (e) => {
    
    socket.emit("adios");
    window.location.href = "/";
  }

  return (
    <div id="contentWrap">
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header bg-dark text-white">
              <h4>Let's Chat</h4>
            </div>

            <div id="chat" class="card-body">{mensajes.map((mensaje) => {
              return (<p class="msg"><b>${mensaje.nick}</b>: ${mensaje.msg}</p>)
            })}</div>

            <form id="message-form" class="card-footer" onSubmit={submit}>
              <div class="input-group">
                <input type="text" id="message" class="form-control" value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
                <div class="input-group-append">
                  <button class="btn btn-warning" type="submit">
                    <i class="fas fa-location-arrow"></i> Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-header bg-dark text-white">
              <h3>Users</h3>
            </div>
            <div class="card-body">
              <div id="usernames">{users.map((user) => {
                return (<p key={user}><i class="fas fa-user"></i> ${user}</p>)
              })}</div>
            </div>
            <div class="card-footer">
              <button className="btn btn-danger btn-block" onClick={()=>salir()}  >Salir</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Chat;
