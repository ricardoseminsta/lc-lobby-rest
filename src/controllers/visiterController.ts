import { Request, Response } from 'express';
import { User } from '../models/User';
import { Visiter } from '../models/Visiter';

export const index = (req: Request, res: Response) => {
    res.render('pages/index')
}

export const newVisiter = (req: Request, res: Response) => {
    res.render('pages/visiter/newVisiter')
}

export const postVisiter = async (req: Request, res: Response) => {
    let name: string = req.body.name as string;
    let cpf: string  = req.body.cpf as string;
    let email: string = req.body.email as string;
    let bdate: Date = req.body.bdate as Date;
    

    if(email) {
        const newVisiter = Visiter.build({name, cpf, email, bdate});
        console.log(newVisiter);
        await newVisiter.save();
        
    }
   
    res.redirect('/visiter/list')
}

export const listVisiter = async (req: Request, res: Response) => {
    const list = await Visiter.findAll();    
    res.render('pages/visiter/listVisiter', {list})
}

export const visiter = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const visiter = await Visiter.findByPk(id);
    res.render('pages/visiter/updateVisiter', {visiter})
}

export const updateVisiter = async (req: Request, res: Response) => {
    let id: number = parseInt(req.body.id);
    let name: string = req.body.name as string;
    let cpf: string  = req.body.cpf as string;
    let email: string = req.body.email as string;
    let bdate: Date = req.body.bdate as Date;
    
    const visiter = await Visiter.findByPk(id);

    if(visiter){
        visiter.id = id;
        visiter.name = name;
        visiter.cpf = cpf;
        visiter.email = email;
        visiter.bdate = bdate;
        await visiter.save();
    }
    res.redirect('/visiter/list')
}

export const deleteVisiter = async (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id);
    console.log("ID", id);
    
    await Visiter.destroy({  where: { id }})
    res.redirect('/visiter/list')
}

