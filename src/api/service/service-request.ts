import Request from '../model/model-request';

interface IRequestDTO {
  cognomeNomeRichiedente: string;
  importo: number;
  numeroRate: number;
}

class RequestService {
  async getAllRequests(max: number) {
    return Request.find().sort({ dataInserimentoRichiesta: -1 }).limit(max);
  }

  async createRequest(data: IRequestDTO) {
    const newRequest = new Request(data);
    return newRequest.save();
  }

  async searchRequests(searchString: string) {
    return Request.find({ cognomeNomeRichiedente: new RegExp(searchString, 'i') }).sort({ dataInserimentoRichiesta: -1 });
  }

  async updateRequest(richiestaID: number, data: IRequestDTO & { dataInserimentoRichiesta: Date }) {
    return Request.findOneAndUpdate({ richiestaID }, data, { new: true });
  }

  async deleteRequest(richiestaID: number) {
    return Request.findOneAndDelete({ richiestaID });
  }

  async getRequestsByDateRange(dataMin: Date, dataMax: Date, max: number) {
    return Request.find({
      dataInserimentoRichiesta: {
        $gte: dataMin,
        $lte: dataMax
      }
    }).sort({ dataInserimentoRichiesta: -1 }).limit(max);
  }

  async getSumImportoByDateRange(dataMin: Date, dataMax: Date) {
    const result = await Request.aggregate([
      { $match: { dataInserimentoRichiesta: { $gte: dataMin, $lte: dataMax } } },
      { $group: { _id: null, totalSum: { $sum: "$importo" } } }
    ]);
    return result[0]?.totalSum || 0;
  }

  async getAverageRateByDateRange(dataMin: Date, dataMax: Date) {
    const result = await Request.aggregate([
      { $match: { dataInserimentoRichiesta: { $gte: dataMin, $lte: dataMax } } },
      { $group: { _id: null, averageRate: { $avg: "$numeroRate" } } }
    ]);
    return result[0]?.averageRate || 0;
  }

  // Altri metodi di servizio possono essere aggiunti qui
}

export default new RequestService();
