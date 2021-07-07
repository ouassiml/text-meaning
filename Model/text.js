import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongoose_fuzzy_searching from 'mongoose-fuzzy-searching';
const schema = mongoose.Schema;


const contentSchema = new schema({
    nbWords: Number,
    mostOccurent: String,
    content: String,
})
const textSchema = new schema({
  fr: {
    type: contentSchema,
  },
  ar: {
    type: contentSchema,
  },
  en: {
    type: contentSchema,
  },
});

textSchema.plugin(mongoose_fuzzy_searching, { fields: ['fr.content', 'ar.content', 'en.content'] });
textSchema.plugin(mongoosePaginate);

const TextModel = mongoose.model("text", textSchema);

export { TextModel };