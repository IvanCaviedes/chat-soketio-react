import React, { useState } from "react";
import Chat from "./Socket/Chat";
import Navbar from './componentes/Navbar'

function App() {
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) => {
    e.preventDefault();
    if (nombre !== "") {
      setRegistrado(true);
    }
  };

  return (
    <>
      <Navbar />
      <div class="container p-4">
        {!registrado && (
              <div id="nickWrap">
              <div class="row">
                <div class="col-md-4 mx-auto">
                  <div class="card">
                    <div class="card-header">
                      <h3>Enter your Username</h3>
                    </div>
                    <p id="nickError"></p>
                    <div class="card-body">
                      <form id="nickForm" onSubmit={registrar}>
                        <input id="nickname" type="text" class="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        <input type="submit" class="btn btn-warning btn-block mt-2" />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}

        {registrado && <Chat nombre={nombre} />}
      </div>
    </>
  );
}

export default App;
