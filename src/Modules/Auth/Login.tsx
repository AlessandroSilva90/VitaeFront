import { useNavigate } from "react-router-dom";
import "./login.scss";
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui viria sua lógica de autenticação
    localStorage.setItem("token", "fake-token");
    navigate("/"); // Redireciona para a área protegida
  };

  return (
    <div className="login-card">
      <h1 className="loginTitle">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input type="text" placeholder="Usuário" />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Senha" />
        </div>
        <div className="sts-fnc">
          <button type="submit" className="btn-submit">
            Entrar
          </button>
          <label>Esqueceu a senha ?</label>
        </div>
      </form>
    </div>
  );
};

export default Login;
