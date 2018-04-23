setwd ("/Users/katya/Desktop")

palcol <- c("gold2", "blue","red","violet","red4", "green4","orange",
            "deepskyblue1","lightblue","black","darkblue","royalblue","olivedrab","turquoise",
            "slateblue3","saddlebrown","darkorchid","deeppink","grey52","grey26",
            "bisque","yellow", "rosybrown1","limegreen", "orange3")

tbl <- read.csv("admix.Q", sep = " ")
print(tbl)
barplot(t(as.matrix(tbl)), col=palcol, xlab="Individual #", ylab="Ancestry", border=NA)