import { Router } from 'express';
import { usersModel } from '../dao/models/usermodels.js';

const router = Router();

router.post('/signup', async (req, res) => {

    const { username, email, password } = req.body;
    console.log(username);

    const userExists = await usersModel.findOne({ email });

    if (userExists) { //validamos si usuario ya existe en la BD
        return res.send("El usuario ya existe");
    }

    if (email == "ecommerce_admin@ecommerce.com" || email == "adminCoder@coder.com") {
        const rol = "admin";
        const user = await usersModel.create({ username, email, password, rol });
        console.log(username);
    } else {
        const rol = "user";
        const user = await usersModel.create({ username, email, password, rol });
        console.log(username);
    }

    /*const user = await usersModel.create({ username, email, password, rol });
    console.log(username);*/


    //guardamos info del usuario en session
    req.session.username = username;
    req.session.email = email;
    req.session.isLogged = true;

    //res.send("Bienvenido");

    res.redirect('/ecommerce/home/profile');



});

router.post('/login', async (req, res) => {

    const { username, password } = req.body;
    console.log(username);
    console.log(password);

    const user = await usersModel.findOne({ username, password }).lean();

    if (!user) { //validamos si usuario ya existe en la BD
        return res.send("Credenciales INVALIDAS");
    }

    //const user = await usersModel.create({ username, email, password });
    //console.log(username); 
    //guardamos info del usuario en session
    req.session.username = username;
    req.session.email = user.email;
    req.session.isLogged = true;

    //res.send("Bienvenido");

    res.redirect('/mongo/products/catalog');

    //res.redirect('/ecommerce/home/profile');



});


/*router.get('/profile', async (req, res) => {

    const { username, email} = req.session;
    console.log(username);

    //const userExists = await usersModel.findOne({ email });

    /*if (userExists) { //validamos si usuario ya existe en la BD
        return res.send("El usuario ya existe");
    }*/

//const user = await usersModel.create({ username, email, password });
//console.log(username); 
//guardamos info del usuario en session
/*req.session.username = username;
req.session.email = email;
req.session.isLogged = true;*/

//res.send("Bienvenido");

/*res.render('/profile', { username, email});



});*/

export default router;