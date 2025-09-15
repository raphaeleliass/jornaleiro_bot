import { Hono } from "hono";
import { botSecret } from "../constants";

export const botRoute = new Hono();

botRoute.post(`/handler/${botSecret}`);
