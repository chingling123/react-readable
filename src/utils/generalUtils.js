export function voteCompare(a, b) {
    const voteScoreA = a.voteScore;
    const voteScoreB = b.voteScore;
    
    let comparison = 0;
    if (voteScoreA > voteScoreB) {
      comparison = -1;
    } else if (voteScoreA < voteScoreB) {
      comparison = 1;
    }
    return comparison;
  }
  
  

  export function dateCompare(a, b) {
    const dateA = a.timestamp;
    const dateB = b.timestamp;
    
    let comparison = 0;
    if (dateA > dateB) {
      comparison = -1;
    } else if (dateA < dateB) {
      comparison = 1;
    }
    return comparison;
  }
  
  