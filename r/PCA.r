setwd ("/Users/katya/Desktop")
palcol <- c( "orangered","black", "olivedrab","#FF9326","#A945FF","#0089B2","#FDF060","#FFA6B2","#BFF217","#60D5FD","#CC1577","#F2B950","#7FB21D","#EC496F","#326397","#B26314","#027368","#A4A4A4","red","#610B5E", "deepskyblue4","red4","orange","orange3","violet", 
            "gold2","rosybrown1","Raw Umber","#EC687D", "slateblue3","yellow","Blue Bell","#006E82","turquoise","deepskyblue1","lightblue","black","darkblue","royalblue", "slateblue3","saddlebrown","indianred4","yellow","#1D72F5", "olivedrab","indianred4","grey26","#DF0101") 
palette(palcol)
data <- read.csv('pca-file-without-header.evec', sep="", header=F) 
pcaleg <- levels(factor(data$V5)) 
pcalegpch <- levels(factor(as.integer(data$V5))) 

figures <- c()
population <-data$V5

for(label in population){
  currentfigure <- 20
  if (label == "Nivkh"){
    currentfigure <- 17
  } 
  figures<-c(figures,currentfigure)
}
figures_leg <- c()
population <-pcaleg
for(label in population){
  currentfigure <- 20
  if (label == "Nivkh"){
    currentfigure <- 17
  } 
  figures_leg<-c(figures_leg,currentfigure)
}
xlim <- c(-0.05,0.18)
ylim <- c(-0.10,0.10)

plot(xlim = xlim, ylim = ylim, data$V2, data$V3, type = "n", xlab = "Главная компонента 1 (19,02%)", ylab = "Главная компонента 3 (7.321%)") 
points(data$V2, data$V3, col = data$V5, pch = figures)
legend("topright", inset=c(0.06,0), legend = pcaleg, bty = "n", cex = 0.75, col = pcalegpch, pch = figures_leg, pt.cex=c(1,1.10))
