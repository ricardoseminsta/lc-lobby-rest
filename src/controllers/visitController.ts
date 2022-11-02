import { Request, Response } from 'express';
import { User } from '../models/User';
import { Visit } from '../models/Visit';
import { Visiter } from '../models/Visiter';
import { Doorman } from '../models/Doorman';
import { Op } from 'sequelize';

const dateFormatter = (data: Date) => {

    let year = data.getUTCFullYear();
    let month = data.getUTCMonth() + 1;
    let day = data.getUTCDate();
    let hour = data.getHours() + 1;
    let minute = data.getMinutes();

    let formatedDate = `${year}-${
        month < 10 ? "0" + month : month
    }-${
        day < 10 ? "0" + day : day
    } : ${
        hour < 10 ? "0" + hour : hour
    }:${
        minute < 10 ? "0" + minute : minute
    }`;

    return formatedDate;
}

export const index = (req: Request, res: Response) => {
    res.render('pages/index')
}

export const newVisit = async (req: Request, res: Response) => {
    const doormans = await Doorman.findAll();
    const visiters = await Visiter.findAll();
    
    res.render('pages/visit/newVisit' , { doormans, visiters})
}

export const postVisit = async (req: Request, res: Response) => {

    let VisiterId: number = parseInt(req.body.visiterId);
    let DoormanId: number = parseInt(req.body.doormanId);
    let arrived = new Date();

    //let formatedDate = dateFormatter(arrived);

    // const newVisit = {  VisiterId, DoormanId, arrived }
    const newVisit = await Visit.create({VisiterId, DoormanId, arrived},{ include: [Visiter, Doorman] });
    console.log(newVisit);
    
    
    res.redirect('/visit/list')
}

export const listVisit = async (req: Request, res: Response) => {
//inclui models Viviter e Doorman na pesquisa, para retorno de chave primária nome equivalente
    const list = await Visit.findAll({
        include: [{
           model: Visiter,
           required: true,

        }, {
            model: Doorman,
            required: true
        }], 
        where: { exit: { [Op.is]: null }}
    }) as any;
    
    let visitData = [];
    for(let i in list) {
        visitData.push(dateFormatter(list[i].arrived));
    }

    res.render('pages/visit/listVisit', {list, visitData })
}

export const visit = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const visit = await Visit.findByPk(id);
    let formatedDate = '';
    if(visit) {
        formatedDate = dateFormatter(visit.arrived)
    }
    res.render('pages/visit/updateVisit', {visit, formatedDate})
}

export const updateVisit = async (req: Request, res: Response) => {
    let id: number = parseInt(req.body.id);
    let VisiterId: number = parseInt(req.body.visiterId);
    let DoormanId: number = parseInt(req.body.doormanId);
    
    const visiter = await Visit.findByPk(id) as any;

    if(visiter){
        visiter.id = id;
        visiter.VisiterId = VisiterId;
        visiter.DoormanId = DoormanId;
        await visiter.save();
    }
    res.redirect('/visit/list')
}

export const finish = async (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id);
    const visit = await Visit.findByPk(id);
    let exit = new Date();
    let formatedDate = dateFormatter(exit);
    //await Visit.destroy({  where: { id }})
    res.render('pages/visit/finishVisit', { visit, formatedDate, exit})
}

export const finishVisit = async (req: Request, res: Response) => {
    let id: number = parseInt(req.body.id);
    let exit = req.body.exit;

    const visiter = await Visit.findByPk(id);
    if(visiter) {
        visiter.exit = exit;
       // console.log(visiter.exit);
        await visiter.save();
    }
    res.redirect('/visit/closed')
}

export const closedVisit = async (req: Request, res: Response) => {
    // const doormans = await Doorman.findAll();
    // const visiters = await Visiter.findAll();
    //const list = await Visit.findAll({where:{ exit: { [Op.not]: null }}});
    const list = await Visit.findAll({
        include: [{
           model: Visiter,
           required: true,

        }, {
            model: Doorman,
            required: true
        }], 
        where: { exit: { [Op.not]: null }}
    }) as any;

    let visitData = [];
    let closed = [];
    for(let i in list) {
        visitData.push(dateFormatter(list[i].arrived));
        closed.push(dateFormatter(list[i].exit));
        
    }

    res.render('pages/visit/closedVisit', { list, visitData, closed })
}