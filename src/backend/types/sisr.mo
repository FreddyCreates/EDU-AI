// SISR — SIS Sync Layer types (OneRoster-compatible internal schema)
module {
  public type SisStudentId = Text; // external SIS identifier

  public type SisRecord = {
    sisId : SisStudentId;
    studentPrincipal : ?Principal;
    grade : Nat;
    enrollmentStatus : EnrollmentStatus;
    schoolId : Nat;
    updatedAt : Int;
  };

  public type EnrollmentStatus = {
    #active;
    #inactive;
    #transferred;
    #graduated;
  };

  public type AttendanceRecord = {
    sisId : SisStudentId;
    date : Int;
    status : AttendanceStatus;
    periodCode : ?Text;
  };

  public type AttendanceStatus = {
    #present;
    #absent;
    #tardy;
    #excused;
  };

  public type ClassRoster = {
    classCode : Text;
    teacherPrincipal : Principal;
    subjectId : Nat;
    gradeLevel : Nat;
    studentSisIds : [SisStudentId];
  };

  public type BellSchedule = {
    schoolId : Nat;
    dayType : Text;
    periods : [PeriodSlot];
  };

  public type PeriodSlot = {
    periodNumber : Nat;
    startMinute : Nat; // minutes from midnight
    durationMinutes : Nat;
    periodLabel : Text;
  };

  public type CalendarEvent = {
    schoolId : Nat;
    eventDate : Int;
    title : Text;
    eventType : Text; // "holiday", "exam", "assembly"
    affectedGrades : [Nat];
  };
}
