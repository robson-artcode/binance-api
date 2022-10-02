import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from "axios";
import Database from '@ioc:Adonis/Lucid/Database'
import AveragePriceHistoric from 'App/Models/AveragePriceHistoric';

export default class SymbolsController {

    public async index({ request, response } : HttpContextContract){
        const { symbol, symbols } = request.only(['symbol', 'symbols']);

        var params = {};
        if(typeof symbol !== "undefined") params = { symbol };
        if(typeof symbols !== "undefined") params = { symbols };
        
        await axios.get('https://api.binance.com/api/v3/exchangeInfo', { params })
        .then(function (res) {
            // handle success
            return response.status(200).json({ body: res.data.symbols });
        })
        .catch(function (error) {
            // handle error
            return error;
        });
    }

    public async averagePrice({ request, response} : HttpContextContract){
        const { symbol, symbols } = request.only(['symbol', 'symbols']);

        var params = [];
        if(typeof symbol !== "undefined") params.push(symbol);
        if(typeof symbols !== "undefined") params = symbols;
   
        try {
            var prices = [];

            await params.reduce(async (promise, element) => {
                await promise;
                
               await axios.get('https://api.binance.com/api/v3/avgPrice', { params: { symbol : element} })
                .then(function (res) {
                    // handle success
                    prices.push({
                        symbol: element,
                        average_price: res.data.price,
                        mins: res.data.mins
                    });
                })
                .catch(function (error) {
                    // handle error
                    return error;
                });
           
            }, Promise.resolve());

            try {
                await AveragePriceHistoric.createMany(prices);
                return response.status(200).json({ body: prices });
            } catch (error) {
                return error;
            }

        } catch(err) {
            return err;
        }
    }

    public async prices(){
        return await Database.query().from('average_price_historics');
    }
}
