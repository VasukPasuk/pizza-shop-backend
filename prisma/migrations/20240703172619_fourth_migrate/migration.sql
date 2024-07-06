-- DropForeignKey
ALTER TABLE "pizza" DROP CONSTRAINT "pizza_categoryName_fkey";

-- AddForeignKey
ALTER TABLE "pizza" ADD CONSTRAINT "pizza_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "category"("name") ON DELETE CASCADE ON UPDATE CASCADE;
