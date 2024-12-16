import { newsModel } from "./news.model.js";

export async function handleGetNews(req, res) {
    const news = await newsModel.find({});
    res.json(news);
}