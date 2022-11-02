import { Request, Response } from 'express';
import { Doorman } from '../models/Doorman';

export const index = (req: Request, res: Response) => {
    res.render('pages/index')
}

export const newDoorman = (req: Request, res: Response) => {
    res.render('pages/doorman/newDoorman')
}

export const postDoorman = async (req: Request, res: Response) => {
    let name: string = req.body.name as string;
    let turn = req.body.turn;
    let active = req.body.active;
    active === undefined ? active = false : active = true;
    
    
    const newDoorman = Doorman.build({name, turn, active});
        await newDoorman.save();

    res.redirect('/doorman/list')
}

export const listDoorman = async (req: Request, res: Response) => {
    const list = await Doorman.findAll({ order: ['id'] });    
    res.render('pages/doorman/listDoorman', {list})
}

export const doorman = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const doorman = await Doorman.findByPk(id);
    res.render('pages/doorman/updateDoorman', {doorman})
}

export const updateDoorman = async (req: Request, res: Response) => {
    let id = parseInt(req.body.id);
    let name: string = req.body.name as string;
    let turn = req.body.turn;
    let active = req.body.active;
    active === undefined ? active = false : active = true;
    
    
    const doorman = await Doorman.findByPk(id);
    if(doorman) {
        doorman.id = id;
        doorman.name = name;
        doorman.turn = turn;
        doorman.active = active;
        await doorman.save();
    }
    res.redirect('/doorman/list')
}

export const deleteDoorman = async (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id);
    console.log("ID", id);
    
    await Doorman.destroy({  where: { id }})
    res.redirect('/doorman/list')
}

