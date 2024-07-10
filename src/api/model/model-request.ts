import mongoose, { Schema, Document } from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

interface IRequest extends Document {
  richiestaID: number;
  cognomeNomeRichiedente: string;
  dataInserimentoRichiesta: Date;
  importo: number;
  numeroRate: number;
}

const requestSchema: Schema = new Schema({
  richiestaID: { type: Number, unique: true },
  cognomeNomeRichiedente: { type: String, required: true },
  dataInserimentoRichiesta: { type: Date, default: Date.now },
  importo: { type: Number, required: true },
  numeroRate: { type: Number, required: true }
}, {
  collection: 'Richieste'
});

requestSchema.plugin(AutoIncrement, { inc_field: 'richiestaID' });

export default mongoose.model<IRequest>('Request', requestSchema);
