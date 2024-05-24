import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        let response = await fetch("http://localhost:8080/pets/images", {
          method: "GET",
          headers: {
            Authorization: `${token}`,
            "Access-Control-Allow-Origin": "*",
          },
        });
        let data = await response.json();
        setImages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, [token]);

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log({
        username,
        password,
    });

    try {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                user: {
                    username,
                    password,
                },
            }),
        });

        const data = await response.json();
        console.log(data);
        setToken(data.token);
        setMessage(data.message || "Login successful");
        setUsername("");
        setPassword("");
    } catch (error) {
        setMessage("Error: Unable to register");
        console.error(error);
    }
};
  return (
    <div>
      <h1>Hello</h1>
      <div>
        <form onSubmit={handleRegister}>
          <div>
            <label style={{marginRight: 10}}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{marginRight: 10}}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button style={{marginTop: 10}} type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
      </div>
      <div>
        {images.length > 0 ? (
          images.map((image, index) => (
            <img key={index} width={150} height={150} src={`data:image/png;base64,${image.base64}`} alt={`Image ${index + 1}`} />
          ))
        ) : (
          <p>Log in to view images</p>
        )}
      </div>
    </div>
  );
}

export default App;