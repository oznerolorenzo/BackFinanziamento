import { Request, Response } from 'express';
import RequestService from '../service/service-request';

class RequestController {
  async getAllRequests(req: Request, res: Response) {
    try {
      const maxRequests: number = parseInt(req.query.max as string) || 10;
      const requests = await RequestService.getAllRequests(maxRequests);
      res.status(200).json({ message: 'OK', data: requests });
    } catch (error) {
      res.status(500).json({ message: 'KO', reason: error });
    }
  }

  async createRequest(req: Request, res: Response) {
    try {
      const { cognomeNomeRichiedente, importo, numeroRate, dataInserimentoRichiesta } = req.body;
      const requestData = {
        cognomeNomeRichiedente,
        importo,
        numeroRate,
        dataInserimentoRichiesta: dataInserimentoRichiesta ? new Date(dataInserimentoRichiesta) : new Date()
      };
      const newRequest = await RequestService.createRequest(requestData);
      res.status(201).json({ message: 'OK', data: newRequest });
    } catch (error) {
      res.status(500).json({ message: 'KO', reason: error });
    }
  }

  async searchRequests(req: Request, res: Response) {
    try {
      const searchString: string = req.query.search as string;
      const requests = await RequestService.searchRequests(searchString);
      res.status(200).json({ message: 'OK', data: requests });
    } catch (error) {
      res.status(500).json({ message: 'KO', reason: error });
    }
  }

  async updateRequest(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { cognomeNomeRichiedente, dataInserimentoRichiesta, importo, numeroRate } = req.body;
      const updatedRequest = await RequestService.updateRequest(Number(id), { cognomeNomeRichiedente, dataInserimentoRichiesta, importo, numeroRate });
      if (updatedRequest) {
        res.status(200).json({ message: 'OK', data: updatedRequest });
      } else {
        res.status(404).json({ message: 'KO', reason: 'Request not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'KO', reason: error });
    }
  }

  async deleteRequest(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedRequest = await RequestService.deleteRequest(Number(id));
      if (deletedRequest) {
        res.status(200).json({ message: 'OK', data: 'Request deleted successfully' });
      } else {
        res.status(404).json({ message: 'KO', reason: 'Request not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'KO', reason: error });
    }
  }

  async getRequestsByDateRange(req: Request, res: Response) {
    try {
      const { dataMin, dataMax, max } = req.body;
      const maxRequests: number = max || 10;
      const requests = await RequestService.getRequestsByDateRange(new Date(dataMin), new Date(dataMax), maxRequests);
      res.status(200).json({ message: 'OK', data: requests });
    } catch (error) {
      res.status(500).json({ message: 'KO', reason: error });
    }
  }

  async getSumImportoByDateRange(req: Request, res: Response) {
    try {
      const { dataMin, dataMax } = req.body;
      const totalSum = await RequestService.getSumImportoByDateRange(new Date(dataMin), new Date(dataMax));
      res.status(200).json({ message: 'OK', totalSum });
    } catch (error) {
      res.status(500).json({ message: 'KO', reason: error });
    }
  }

  async getAverageRateByDateRange(req: Request, res: Response) {
    try {
      const { dataMin, dataMax } = req.body;
      const averageRate = await RequestService.getAverageRateByDateRange(new Date(dataMin), new Date(dataMax));
      res.status(200).json({ message: 'OK', averageRate });
    } catch (error) {
      res.status(500).json({ message: 'KO', reason: error });
    }
  }
}

export default new RequestController();
