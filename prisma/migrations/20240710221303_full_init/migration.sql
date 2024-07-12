/*
  Warnings:

  - You are about to drop the column `pizzaId` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `cart` table. All the data in the column will be lost.
  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `pizza` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryName` on the `pizza` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `pizza` table. All the data in the column will be lost.
  - You are about to drop the column `imageURL` on the `pizza` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `pizza` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `pizza` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `pizza` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `pizza` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `activationLink` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `added_at` to the `pizza` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_name` to the `pizza` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `pizza` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `pizza` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `pizza` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `pizza` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activation_link` to the `user` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "Flour" AS ENUM ('THIN', 'THICK');

-- CreateEnum
CREATE TYPE "HotStage" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'INPROCESS', 'FULFILED');

-- CreateEnum
CREATE TYPE "CaloriesStage" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_pizzaId_fkey";

-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "pizza" DROP CONSTRAINT "pizza_categoryName_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_authorId_fkey";

-- DropIndex
DROP INDEX "pizza_imageURL_key";

-- DropIndex
DROP INDEX "user_activationLink_key";

-- AlterTable
CREATE SEQUENCE cart_id_seq;
ALTER TABLE "cart" DROP COLUMN "pizzaId",
DROP COLUMN "userId",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "total_price" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('cart_id_seq');
ALTER SEQUENCE cart_id_seq OWNED BY "cart"."id";

-- AlterTable
ALTER TABLE "category" DROP CONSTRAINT "category_pkey",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "pizza" DROP CONSTRAINT "pizza_pkey",
DROP COLUMN "categoryName",
DROP COLUMN "createdAt",
DROP COLUMN "imageURL",
DROP COLUMN "price",
DROP COLUMN "size",
DROP COLUMN "updatedAt",
DROP COLUMN "weight",
ADD COLUMN     "added_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "average_cooking_speed" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "category_name" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "discount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "flour" "Flour" NOT NULL DEFAULT 'THICK',
ADD COLUMN     "hot_stage" "HotStage" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "popular" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "available" SET DEFAULT true,
ADD CONSTRAINT "pizza_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "review" DROP COLUMN "authorId",
DROP COLUMN "rating",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "review_id_seq";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "activationLink",
DROP COLUMN "age",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "activation_link" TEXT NOT NULL,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "disctrict" TEXT,
ADD COLUMN     "house_number" INTEGER,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "street" TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "admin";

-- DropTable
DROP TABLE "customer";

-- DropEnum
DROP TYPE "roles";

-- DropEnum
DROP TYPE "sizes";

-- CreateTable
CREATE TABLE "additional_options" (
    "id" SERIAL NOT NULL,
    "pizza_name" TEXT NOT NULL,
    "size" "Size" NOT NULL DEFAULT 'MEDIUM',
    "weight" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "calories_stage" "CaloriesStage" NOT NULL,

    CONSTRAINT "additional_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_item" (
    "id" SERIAL NOT NULL,
    "pizza_name" TEXT NOT NULL,
    "cart_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "size" "Size" NOT NULL,

    CONSTRAINT "cart_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "total_price" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "id" SERIAL NOT NULL,
    "pizza_name" TEXT NOT NULL,
    "order_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "size" "Size" NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_review__liked" (
    "id" SERIAL NOT NULL,
    "review_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_review__liked_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_pizza__likes" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "pizza_name" TEXT NOT NULL,
    "added_like" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pizza__likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_pizza__favourite" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "pizza_name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "pizzaName" TEXT NOT NULL,

    CONSTRAINT "user_pizza__favourite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pizza" ADD CONSTRAINT "pizza_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "additional_options" ADD CONSTRAINT "additional_options_pizza_name_fkey" FOREIGN KEY ("pizza_name") REFERENCES "pizza"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_pizza_name_fkey" FOREIGN KEY ("pizza_name") REFERENCES "pizza"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_pizza_name_fkey" FOREIGN KEY ("pizza_name") REFERENCES "pizza"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_review__liked" ADD CONSTRAINT "user_review__liked_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_review__liked" ADD CONSTRAINT "user_review__liked_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_pizza__likes" ADD CONSTRAINT "user_pizza__likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_pizza__likes" ADD CONSTRAINT "user_pizza__likes_pizza_name_fkey" FOREIGN KEY ("pizza_name") REFERENCES "pizza"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_pizza__favourite" ADD CONSTRAINT "user_pizza__favourite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_pizza__favourite" ADD CONSTRAINT "user_pizza__favourite_pizza_name_fkey" FOREIGN KEY ("pizza_name") REFERENCES "pizza"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
