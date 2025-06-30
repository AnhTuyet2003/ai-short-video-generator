import { integer } from "drizzle-orm/gel-core";
import { pgTable, serial, varchar, boolean } from "drizzle-orm/pg-core";
import { json } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  imageUrl: varchar("imageUrl").notNull(),
  subscription: boolean("subscription").default(false),
  credits: integer("credits").default(30),
});

export const VideoData = pgTable("videoData", {
  id: serial("id").primaryKey(),
  script: varchar("script").notNull(),
  audioFileUrl: varchar("audioFileUrl").notNull(),
  captions: json("captions").notNull(),
  imageList: json("imageList").array(),
  createdBy: varchar("createdBy").notNull(), 
  videoOutputUrl: varchar("videoOutputUrl")
});

export const VideoEditConfig = pgTable("videoEditConfig", {
  id: serial("id").primaryKey(), 
  videoId: integer("videoId").notNull().unique(), 
  fontFamily: varchar("fontFamily").notNull(),
  fontSize: integer("fontSize").notNull(),
  textColor: varchar("textColor").notNull(),
  textAnimation: varchar("textAnimation").notNull(),
  bgAnimation: varchar("bgAnimation").notNull(),
  sticker: varchar("sticker"),
  stickerWidth: integer("stickerWidth").default(64),
  stickerHeight: integer("stickerHeight").default(64),
  audioUrl: varchar("audioUrl"),
  screenSize: varchar("screenSize"), 
});