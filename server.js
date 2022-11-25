//transpilando  servidor
const app = require("express")();

//criando o servidor http
const http = require("http").createServer(app);

//chamando socket.io via https
const io = require("socket.io")(http);

//fazendo um GET na rota '/' com as infos do arquivo index
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

//quando um novo user conectar ao server ele retorna o id da instancia do socket do user
io.on("connection", (socket) => {
	console.log("New connection", socket.id + "<br>");
	socket.on("msg", (msg) => {
		console.log(msg);
		socket.broadcast.emit("msg", socket.id + " Connected");
	});
});

//ao funcionar retorna na porta http://localhost:3000 retorna o listen
http.listen(3000, function () {
	console.log("Listening on port 3000");
});
