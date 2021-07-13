import { uuid } from 'uuidv4';
import { TextModel } from '../Model/text.js';
import { nbWords, mostOccurent } from '../Helpers/text.js';
const addText = async (req, res, next) => {
  try {
    let text = {
      fr: {
        nbWords: 0,
        mostOccurent: '',
        content: req.body.fr,
      },
      ar: {
        nbWords: 0,
        mostOccurent: '',
        content: req.body.ar,
      },
      en: {
        nbWords: 0,
        mostOccurent: '',
        content: req.body.en,
      },
    };

    text.fr.nbWords = nbWords(req.body.fr);
    text.ar.nbWords = nbWords(req.body.ar);
    text.en.nbWords = nbWords(req.body.en);
    text.fr.mostOccurent = mostOccurent(req.body.fr);
    text.ar.mostOccurent = mostOccurent(req.body.ar);
    text.en.mostOccurent = mostOccurent(req.body.en);

    text.uid = uuid();

    const newtext = await TextModel.create(text);
    res.status(200).json(newtext);
  } catch (e) {
    console.log(JSON.stringify(e));
    res.status(500).json({ message: 'server error' });
  }
};

const getTexts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) > 0 ? parseInt(req.query.limit, 10) : 0;
    const page = req.query.page || 1;
    const texts = await TextModel.paginate({}, { limit, page });
    res.status(200).json(texts);
  } catch (e) {
    console.log(JSON.stringify(e));
    res.status(500).json({ message: ' server error' });
  }
};

const updateText = async (req, res, next) => {
  try {
    let text = await TextModel.findById(req.body.id);

    text.fr.content = req.body.fr;
    text.ar.content = req.body.ar;
    text.en.content = req.body.en;

    text.fr.nbWords = nbWords(req.body.fr);
    text.ar.nbWords = nbWords(req.body.ar);
    text.en.nbWords = nbWords(req.body.en);

    text.fr.mostOccurent = mostOccurent(req.body.fr);
    text.ar.mostOccurent = mostOccurent(req.body.ar);
    text.en.mostOccurent = mostOccurent(req.body.en);

    const result = await text.save();

    res.status(200).json(result);
  } catch (e) {
    console.log(JSON.stringify(e));
    res.status(500).json({ message: ' server error' });
  }
};

const deleteText = async (req, res, next) => {
  try {
    let text = await TextModel.findById(req.params.textId);
    text.isDeleted = true;
    let result = await text.save();
    res.status(200).json({ mostOccurent: word });
  } catch (e) {
    console.log(JSON.stringify(e));
    res.status(500).json({ message: ' server error' });
  }
};
const countWordsController = async (req, res, next) => {
  try {
    const text = await TextModel.findById(req.params.textId);
    const language = req.params.language;
    const count = text[language].nbWords;
    res.status(200).json({ countWords: count });
  } catch (e) {
    console.log(JSON.stringify(e));
    res.status(500).json({ message: ' server error' });
  }
};

const search = async (req, res, next) => {
  try {
    const texts = await User.fuzzySearch(req.query.term);
    res.status(200).json(texts);
  } catch (e) {
    console.log(JSON.stringify(e));
    res.status(500).json({ message: ' server error' });
  }
};
const mostOccurentContloller = async (req, res, next) => {
  try {
    const text = await TextModel.findById(req.params.textId);
    const language = req.params.language;
    const word = text[language].mostOccurent;
    res.status(200).json({ mostOccurent: word });
  } catch (e) {
    console.log(JSON.stringify(e));
    res.status(500).json({ message: ' server error' });
  }
};

export {
  addText,
  getTexts,
  updateText,
  deleteText,
  countWordsController,
  search,
  mostOccurentContloller,
};
