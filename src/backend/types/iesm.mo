// IESM — IEP Accommodation Layer types
module {
  public type IepAccommodation = {
    studentPrincipal : Principal;
    accommodationTypes : [AccommodationType];
    active : Bool;
    effectiveFrom : Int;
    reviewDate : ?Int;
    addedBy : Principal;
  };

  public type AccommodationType = {
    #extendedTime;
    #reducedDistraction;
    #readAloud;
    #largeFontSize;
    #simplifiedLanguage;
    #calculator;
    #spellChecker;
    #breaksBetweenTasks;
    #preferredSeating;
    #other : Text;
  };

  public type IesmStats = {
    totalStudentsWithAccom : Nat;
    mostCommonAccom : Text;
    activeAccomCount : Nat;
  };
}
