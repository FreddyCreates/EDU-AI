module {
  public type Subject = {
    id : Text;
    name : Text;
    gradeLevel : Text;
  };

  public type Topic = {
    id : Text;
    subjectId : Text;
    title : Text;
    description : Text;
    gradeLevel : Text;
  };
};
