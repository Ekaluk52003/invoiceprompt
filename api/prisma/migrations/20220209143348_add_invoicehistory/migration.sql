-- CreateTable
CREATE TABLE "InvoiceHistory" (
    "id" SERIAL NOT NULL,
    "user" TEXT,
    "description" TEXT,
    "invoiceId" INTEGER NOT NULL,

    CONSTRAINT "InvoiceHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InvoiceHistory" ADD CONSTRAINT "InvoiceHistory_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
