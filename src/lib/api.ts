import axios from "axios";
import { telegramToken } from "../constants";

export const api = axios.create({
	baseURL: `https://api.telegram.org/bot${telegramToken}`,
});
