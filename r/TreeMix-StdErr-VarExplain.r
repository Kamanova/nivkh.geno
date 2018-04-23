setwd ("/Users/katya/Desktop/treemix-result")
WHat = read.table(gzfile(paste("treemix.20.2", ".cov.gz", sep = "")), as.is = T, 
                  head = T, quote = "", comment.char = "")
W = read.table(gzfile(paste("treemix.20.2", ".modelcov.gz", sep = "")), as.is = T, 
               head = T, quote = "", comment.char = "")
  # set row and column names and order properly
  names(WHat) = rownames(WHat)
  names(W) = rownames(W)
  WHat = WHat[order(names(WHat)), order(names(WHat))]
  W = W[order(names(W)), order(names(W))]
  

  # calculate standard error of covariance matrix
  se = read.table(gzfile(paste("treemix.20.2", ".covse.gz", sep = "")), as.is = T, 
                  head = T, quote = "", comment.char = "")
  seBar = apply(se, 1, mean)
  seBar = mean(seBar)
  # calculate residuals
  R = WHat - W
  
  # set residual lower matrix triangle to NA
  R[lower.tri(R, diag = TRUE)] <- NA
  
  # calculate mean residual across upper matrix triangle
  RBar = mean(as.matrix(R), na.rm = TRUE)
  
  # set data-estimated W(hat) matrix lower matrix triangle to NA
  WHat[lower.tri(WHat, diag = TRUE)] <- NA
  
  # calculate mean W(hat)
  WHatBar = mean(as.matrix(WHat), na.rm = TRUE)
  
  # calculate numerator of equation 30
  fNum = sum((R - RBar)^2, na.rm = TRUE)
  
  # calculate denominator of equation 30
  fDen = sum((WHat - WHatBar)^2, na.rm = TRUE)
  
  # calculate f in equation 30
  f = 1 - (fNum/fDen)
  
  outList = list("StdErr" = seBar, "VarExplain" = f)
  print(outList)
