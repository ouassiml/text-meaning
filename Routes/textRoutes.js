
import express from 'express';
import { addText, getTexts, updateText, countWordsController, search, mostOccurentContloller } from '../Controller/textController';

const router = express.Router()

router.route('/text').get(   async (req,res,next) =>  await getTexts(req,res,next));
router.route('/text').post(async (req, res,next) => await addText(req,res,next));
router.route('/text/:textId').put( async (req, res,next)=> await updateText(req,res,next));
router.route('/text/:textId/count').get( async (req, res,next) => await countWordsController(req,res,next));
router.route('/text/:textId/count/:language').get( async (req, res,next)=> await countWordsController(req,res,next));
router.route('/text/search?q=').get( async (req, res,next) => search );
router.route('/text/:textId/mostOccurent').get( async (req, res,next) => await mostOccurentContloller(req,res,next));

export default router;