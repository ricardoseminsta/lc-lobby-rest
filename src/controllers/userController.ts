import { Request, Response } from 'express';
import { User } from '../models/User';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt'

export const postUser = async (req: Request, res: Response) => {
    let email: string = req.body.email;
    let password: string = req.body.password;
    const hasUser = await User.findOne({ where: { email } });

    if (!hasUser) {
        const hash = bcrypt.hashSync(password, 10);
        const newUser = User.build({
            email,
            password: hash
        })

        await newUser.save();
        res.status(201);
        return res.json({id: newUser.id, email: newUser.email, password: newUser.password});

    }
    //res.redirect('/user/list')
    return res.json({error: "usuario já existe"})
}

export const login = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        let email: string = req.body.email;
        let password: string = req.body.password;

        const user = await User.findOne({ where: { email } });

        if (user && bcrypt.compareSync(password, user.password)) {
                       
            const token = JWT.sign(
                { id: user.id, email: user.email },
                process.env.SECRET_KEY as string,
                { expiresIn: '2h' }
            );
            
            res.status(200);
            res.json({ status: true, token });
            return;
            

        } else {
            res.status(401);
            //res.redirect("/user/login");
            res.json({ status: false });

        }


    }
}

export const logout = (req: Request, res: Response) => {
    req.session.destroy(() => {
        console.log("sessão encerrada");
    });
    req.session.id = 'undefined';
    res.redirect('/');
}

export const listUser = async (req: Request, res: Response) => {
    const list = await User.findAll({ order: ['id'] });

    //res.render('pages/user/listUser', { list })
    res.status(200);
    return res.json({list});
}

export const updateUser = async (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    let email: string = req.body.email as string;
    let password = req.body.password;
    const hash = bcrypt.hashSync(password, 10);
    
    const user = await User.findByPk(id);
    if(user) {
        user.email = email;
        user.password = hash;
        await user.save();
        res.status(201);
        return res.json({user});
    }
    //res.redirect('/doorman/list')
    res.status(404);
    return res.json({error: "usuario nao encontrado"});
}

export const deleteUser = async (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id);
    
    await User.destroy({  where: { id }});
    res.status(200);
    return res.json({});
    //res.redirect('/doorman/list')
}