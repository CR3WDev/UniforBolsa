import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserController {
  async get(req: Request, res: Response) {
    const users = await prisma.user.findMany();
    res.json({ data: users });
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json({ data: user });
  }

  async post(req: Request, res: Response) {
    const { username, age, cep, street, number } = req.body;
    const user = await prisma.user.create({
      data: {
        username,
        age,
        cep,
        street,
        number,
      },
    });
    res.json({ data: user });
  }
  async put(req: Request, res: Response) {
    const { id, username, age, cep, street, number } = req.body;
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        age,
        cep,
        street,
        number,
      },
    });
    res.json({ data: updatedUser });
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleteUser = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ data: deleteUser });
  }
}

module.exports = new UserController();
