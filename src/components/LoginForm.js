import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import * as request from 'superagent';

function LoginForm() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(
    localStorage.token ? true : false
  );

  function submitForm(event) {
    event.preventDefault();
    request
      .post("https://emphasoft-test-assignment.herokuapp.com/api-token-auth/")
      .send({username: username, password: password})
      .end((err, res) => {
        if (err) {
          alert("Не получилось войти! Проверьте правильность имени пользователя и пароля.");
          return;
        }
        localStorage.token = res.body.token;
        setAuthenticated(true);
      });
    }

  return (
    <React.Fragment>
      {authenticated ? <Redirect to="/users" /> :
        <div className="form">
          <h3>Добро пожаловать!</h3>
          <br />
          <form onSubmit={submitForm}>
            <div className="form-group">
              <label htmlFor="username" className="control-label">Логин</label>
              <div className="col-sm-3 col-xs-3 center">
                <input type="text" class="form-control" id="username"
                       name="username" value={username} placeholder="Логин"
                       onChange={event => setUsername(event.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="control-label">Пароль</label>
              <div className="col-sm-3 col-xs-3 center">
                <input type="password" class="form-control" id="password"
                       name="password" value={password} placeholder="Пароль"
                       onChange={event => setPassword(event.target.value)} />
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Войти</button>
          </form>
        </div>}
    </React.Fragment>
  )
}

export default LoginForm;
