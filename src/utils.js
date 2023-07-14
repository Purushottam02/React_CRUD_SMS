const getTopScoreRollNo = (students) => {
  var maxScore = 0;
  var maxScoreIndex = -1;
  for (var i = 0; i < students.length; i++) {
    var student = students[i];
    var totalScore = student.physics + student.maths + student.english;
    if (totalScore > maxScore) {
      maxScore = totalScore;
      maxScoreIndex = student.rollNo;
    }
  }
  return maxScoreIndex;
};
 export default getTopScoreRollNo;