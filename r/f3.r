##До запуска скрипта необходимо перевести таблицу в csv-формат и открыть в  Excel. Результаты сортируем по возрастанию значений f3-статистики

setwd ("/Users/katya/Desktop")
f3dat=read.table("f3-file.csv", sep = ";", header = T)
print(f3dat)
library(Hmisc)
errbar(1:25, f3dat$f_3[1:25],col= "red", 
       (f3dat$f_3+f3dat$std.err)[1:25],
       (f3dat$f_3-f3dat$std.err)[1:25], pch=20, las=2, cex.axis=0.4, xaxt='n',
        xlab="population", ylab="F3")
axis(1, at=1:25, labels=f3dat$Source2[1:25], las=2, cex.axis=0.6)