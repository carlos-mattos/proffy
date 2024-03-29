import db from "../database/connection";
import convertHourToMinute from "../utils/convertHourToMinutes";
import { Request, Response } from "express";

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    if (!filters.subject || !filters.week_day || !filters.time) {
      return response.status(400).json({
        error: "Missing filters to search for classes",
      });
    }

    const timeInMinutes = convertHourToMinute(filters.time as string);

    const classes = await db("classes")
      .whereExists(function () {
        this.select("class_schedule.*")
          .from("class_schedule")
          .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
          .whereRaw("`class_schedule`.`week_day` = ??", [
            Number(filters.week_day),
          ])
          .whereRaw("`class_schedule`.`from` <= ??", [timeInMinutes])
          .whereRaw("`class_schedule`.`to` > ??", [timeInMinutes]);
      })
      .where("classes.subject", "=", filters.subject as string)
      .join("users", "classes.user_id", "=", "users.id")
      .select(["classes.*", "users.*"]);

    const serializedClasses = classes.map((classItem) => {
      return {
        ...classItem,
        image_url: `http://192.168.100.4:3333/uploads/${classItem.avatar}`,
      };
    });

    return response.json(serializedClasses);
  }

  async create(request: Request, response: Response) {
    const { name, whatsapp, bio, subject, cost, schedule } = request.body;

    const trx = await db.transaction();

    try {
      const insertedUsersIds = await trx("users").insert({
        name,
        avatar: request.file.filename,
        whatsapp,
        bio,
      });

      const user_id = insertedUsersIds[0];

      const insertedClassesIds = await trx("classes").insert({
        subject,
        cost,
        user_id,
      });

      const class_id = insertedClassesIds[0];

      const classSchedule = JSON.parse(schedule).map((item: ScheduleItem) => {
        return {
          class_id,
          week_day: item.week_day,
          from: convertHourToMinute(item.from),
          to: convertHourToMinute(item.to),
        };
      });

      await trx("class_schedule").insert(classSchedule);

      await trx.commit();

      return response.status(201).send();
    } catch (error) {
      await trx.rollback();

      return response.status(400).json({
        Error: "Erro while creating class:" + error,
      });
    }
  }
}
