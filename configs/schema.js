import { pgTable, serial, varchar, boolean } from "drizzle-orm/pg-core";
import { json } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  imageUrl: varchar("imageUrl").notNull(),
  subscription: boolean("subscription").default(false)
});

export const VideoData = pgTable("videoData", {
  id: serial("id").primaryKey(),
  script: varchar("script").notNull(),
  audioFileUrl: varchar("audioFileUrl").notNull(),
  captions: json("captions").notNull(),
  imageList: json("imageList").array(),
  createdBy: varchar("createdBy").notNull(), 
});