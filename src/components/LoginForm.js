import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import superagent from 'superagent';

function LoginForm() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(
    localStorage.token ? true : false
  );

  function submitForm(event) {
    event.preventDefault();
    superagent
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
        <form onSubmit={submitForm}>
          <label htmlFor="username">Имя пользователя:</label><br/>
          <input type="text" id="username" name="username" value={username}
                 onChange={event => setUsername(event.target.value)} /><br/>
          <label htmlFor="password">Пароль:</label><br/>
          <input type="password" id="password" name="password" value={password}
                 onChange={event => setPassword(event.target.value)} /><br/>
          <button type="submit">Войти</button>
        </form>}
    </React.Fragment>
  )
}

export default LoginForm;
