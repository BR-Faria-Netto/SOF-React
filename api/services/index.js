// system required
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// configure enviroment
const dotenv = require('dotenv').config();

// up server app express
const app = express();

// chamar o cliente no mesmo servidor em produção
//const path = __dirname + '/views/';
//app.use(express.static(path));
//app.get('/', function (req,res) {
//    res.sendFile(path + "index.html");
//    res.sendFile(path + "home");
//});

// user developer required
const userRoute = require('./user/user.route');
const tablecodeRoute = require('./tablecode/tablecode.route');
const favorecidoRoute = require('./favorecido/favorecido.route');
const secretariaRoute = require('./secretaria/secretaria.route');
const sequencialRoute = require('./sequencial/sequencial.route');

const orcamentoRoute = require('./orcamento/orcamento.route');
const responsavel = require('./responsavel/responsavel.route');
const gestor = require('./gestor/gestor.route');
const classificador = require('./classificador/classificador.route');
const lancamento = require('./lancamento/lancamento.route');
const nadRoute = require('./nad/nad.route');
const ndcRoute = require('./ndc/ndc.route');

const basePes = require('./planejamento/basepes/basePes.route');
const diretriz = require('./planejamento/diretriz/diretriz.route');
const objetivo = require('./planejamento/objetivo/objetivo.route');
const meta = require('./planejamento/meta/route');
const acao = require('./planejamento/acao/route');

const macroacao = require('./planejamento/macroacao/route');

// aplication to use
app.disable('x-powered-by');
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// user developer to use
app.use('/user',userRoute);
app.use('/tablecode',tablecodeRoute);
app.use('/favorecido',favorecidoRoute);
app.use('/secretaria',secretariaRoute);
app.use('/sequencial',sequencialRoute);
app.use('/responsavel',responsavel);
app.use('/gestor', gestor);
app.use('/classificador', classificador);
app.use('/lancamento', lancamento);
app.use('/orcamento', orcamentoRoute);
app.use('/nad',nadRoute);
app.use('/ndc',ndcRoute);

app.use('/basePes', basePes);
app.use('/diretriz', diretriz);
app.use('/objetivo', objetivo);
app.use('/meta', meta);
app.use('/acao', acao);

app.use('/macroacao', macroacao);


// exports server
module.exports = app;
