const User = require("./user.model");
const Joi = require("@hapi/joi");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const util = require('../../helpers/utils');

const ncrypt = require('ncrypt-js');

module.exports = {

  async login(req, res) {
    try {
      let { email, password } = req.body;
      const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().required(),
        mailConfirmation : Joi.string()
      })
        
      const loggedUser = await loginUser(email, password)
      if (!loggedUser) throw ('Login ou Senha inválidos')
      else if (loggedUser.mailConfirmation!=loggedUser.email) throw ('Conta não confirmada, favor verificar seu email!')
      else {
          const token = jwt.sign({ email: loggedUser.email,  loggedUser: loggedUser._id }, process.env.AUTH_HASH, {
            expiresIn: '3h'
          });
          loggedUser.password = undefined;
          loggedUser.__v = undefined;
          res.cookie('invite', "login", { httpOnly: true }).json({ user: loggedUser, token, success: true })
      }

    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        error
      })
    }
  },

  async register(req, res) {
    try {
      let { login, name, email, role, password, confirmPassword } = req.body;

      let status = 'Autorizado';
      let confirmCode = util.generatePassword();
      let mailConfirmation = email;
      role = 'Administrador';

      let count = await User.countDocuments(); // count all 

      if (count > 0 ){
        role = 'Usuário';
        status = 'Solicitado';
        mailConfirmation = '';
      }
      
      var encryptPass = new ncrypt('encryptPass');
      var encryptedData = encryptPass.encrypt(password);

      console.log(encryptedData);

      const schema = Joi.object({
        login: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().regex(/^(?=.*?[A-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
        password: Joi.string().required(),
        confirmPassword: Joi.ref('password'),
        role : role,
        status: status,
        confirmCode : confirmCode,
        mailConfirmation : mailConfirmation
      })

      const { error } = schema.validate({ login, name, email, password, confirmPassword, confirmCode, mailConfirmation });

      if (error) throw (error.details)
      else {
        password = encryptedData;
        User.create({
          login,
          name,
          email,
          password,
          role,
          status,
          confirmCode,
          mailConfirmation
        }, (err, usr) => {
          try {
            if (err) throw ("Usuário já cadastrado"+error) 
            else {
              const subject = 'Confirmação de Acesso'; 
              const bodyText = 'Clique no link http:'+process.env.WEB_URL+'/ConfirmCode para confirmar seu cadastro, informe seu Código de Acesso: '+usr.confirmCode
              module.exports.sendMail({ email, subject, bodyText })
              res.json({success: true })
            }
          } catch (error) {
            console.log(error)
            res.json({
              success: false,
              error
            })
          }
        })
      }
    } catch (error) {
      console.log(error)
      res.json({
        success: false,
        error
      })
    }
  },
  
  // Defined listing route
  getAll(req, res) {
    User.find(function(err,user){
      if(err){
        console.log(err);
      }
      else {
        res.json(user);
      }
    });
  },
  
  // Defined add store route
  add(req, res) {
    let user = new User(req.body);
    user.mailConfirmation = ''
    var encryptPass = new ncrypt('encryptPass');
    var encryptedData = encryptPass.encrypt(req.body.password);
    user.password = encryptedData;

    user.save()
      .then(user => {
        res.status(200).json({'Usuario': 'Cadastrado com sucesso'});
        const subject = 'Confirmação de Acesso';
        const bodyText = 'Clique no link http:'+process.env.WEB_URL+'/ConfirmCode para confirmar seu cadastro, informe seu Código de Acesso: '+user.confirmCode
        module.exports.sendMail({ email, subject, bodyText })
      })
      .catch(err => {
        res.status(400).send("Usuário já cadastrado");
      });
  },
  
  // Defined edit route
  edit(req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user){
        res.json(user);
    });
  },

  //  Defined update route
  update(req, res) {
    User.findById(req.params.id, function(err, user) {
      if (!user)
        res.status(404).send("pagina não encontrada");
      else {
          user.name = req.body.name;
          user.email = req.body.email;

          if(!req.body.login) 
            user.login = user.login;
          else
            user.login = req.body.login;

          if(!req.body.role) 
            user.role = user.role;
          else
            user.role = req.body.role;
          
          if(!req.body.status) 
            user.status = user.status;
          else
            user.status = req.body.status;

          if(!req.body.password) 
            user.password = user.password;
          else {
            var encryptPass = new ncrypt('encryptPass');
            var encryptedData = encryptPass.encrypt(req.body.password);
            user.password = encryptedData;
          }
            
          if(!req.body.confirmpassword) 
            user.confirmepassword = user.confirmepassword;
          else
            user.confirmepassword = req.body.confirmpassword;

          if(!req.body.confirmCode) 
            user.confirmCode = user.confirmCode;
          else{
            user.confirmCode = req.body.confirmCode;
            user.mailConfirmation = ''
          }
    
          user.save().then(user => {
            res.json('Alteração com sucesso');
          })
          .catch(err => {
            res.status(400).send("Ocorreu na base");
          });
      }
    });
  },

  // Defined delete 
  delete (req, res) {
    User.findByIdAndRemove({_id: req.params.id}, function(err, user){
        if(err) res.json(err);
        else res.json('Excluido com sucesso');
    });
  },

  getSingleUser(id) {
    return new Promise((resolve, reject) => {
      User.findById(id, (err, user) => {
        if (err) {
          reject(false);
          return;
        }
        resolve(user)
      });
    });
  },

  // new password
  resetPassword(req, res) {
    try {
      let { email } = req.body;
      const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
      })
      const { error } = schema.validate({ email })
      if (error) throw (error.details)
      else {
        User.findOne({ email }, function (err, user) {
          try {
            if (!user) throw ("Email não encontrado")
            else {
              user.password = util.generatePassword()
              user.confirmCode = user.password
              user.status = 'Solicitado'
              user.mailConfirmation = 'resetPassword'
              user.save();
              res.json({
                success: true,
                user
              })

              const subject = 'Confirmação de Acesso';
              const bodyText = 'Clique no link http:'+process.env.WEB_URL+'/ConfirmCode para confirmar seu cadastro, informe seu Código de Acesso: '+user.password
              
              module.exports.sendMail({ email, subject, bodyText })
 
            }
          } catch (error) {
            console.log(error)
            res.json({
              success: false,
              error
            })
          }
        });
      }
    } catch (error) {
      console.log(error)
      res.json({
        success: false,
        error
      })
    }
  },

  // confirm new code email 
  confirmCode(req, res) {
    try {
      let { email, confirmCode } = req.body;
      const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
      })
      const { error } = schema.validate({ email })
      if (error) throw (error.details)
      else {
        User.findOne({ email }, function (err, user) {
          try {
            if (!user) throw ("Email não encontrado")
            if (confirmCode!=user.confirmCode) throw ("Código de acesso inválido, verifique seu email!")
            else {
              user.confirmCode = ''
              user.mailConfirmation = email
              // se usuario pedir senha vai receber com nova senha apos confirmação
              if (user.mailConfirmation === 'resetPassword') {
                user.password = util.generatePassword()
              }
              user.save();
              // reset senha recebe segundo email com senha temporaria  
              if (user.mailConfirmation === 'resetPassword') {
                const subject =  'Confirmação de Acesso';
                const bodyText = 'A Conta foi confirmada com sucesso. Troque a senha no primeiro acesso, clique no link http:'+process.env.WEB_URL+'/Login e informe a senha temporaria: '+user.password
                module.exports.sendMail({ email, subject, bodyText })
              }
              res.json({
                success: true,
                user
              })
            }
          } catch (error) {
            console.log(error)
            res.json({
              success: false,
              error
            })
          }
        });
      }
    } catch (error) {
      console.log(error)
      res.json({
        success: false,
        error
      })
    }
  },

// send email all
async sendMail({ email, subject, bodyText, attachment = null }) {

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_HOST,  
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email, 
    subject: subject,
    text: bodyText
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
       console.log(error);
    } else {
       console.log('Email sent: ' + info.response);
    }
  });

}
},

// get new user
loginUser = async (login, password) => {
  try {
    // valid email ou login
    var lastAtPos = login.lastIndexOf('@');
    var lastDotPos = login.lastIndexOf('.');
    var isValid = (lastAtPos < lastDotPos && lastAtPos > 0 && login.indexOf('@@') == -1 && lastDotPos > 2 && (login.length - lastDotPos) > 2);
    if (isValid) {
      // user valid por email
      var user = await User.findOne({ email : login});
    }
    else {
      // user valid por login
      var user = await User.findOne({ login : login});
    }
  
    // get user password
    if (user) {
      var encryptPass = new ncrypt('encryptPass');
      var encryptedData = encryptPass.encrypt(password);
      console.log(password);
      console.log(encryptedData);
      console.log(user.password );

      //if (bcrypt.compareSync(password, user.password)) {
      if ( encryptedData ===  user.password) {
        return user;
      }
    }
    return false
  } catch (error) {
    console.log(error)
  }
};