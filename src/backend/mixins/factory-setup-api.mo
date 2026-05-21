// FACTORY SETUP — first-deploy bootstrap and demo student creation
import PassportLib "../lib/passport";
import StudentsLib "../lib/students";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

mixin (
  adminState  : { var owner : ?Principal },
  factoryInit : { var initialized : Bool },
  profiles    : StudentsLib.ProfileStore,
  passports   : PassportLib.PassportStore,
  seedStore   : PassportLib.SeedStore,
) {

  public query func factoryStatus() : async {
    adminExists    : Bool;
    factoryLocked  : Bool;
    studentCount   : Nat;
  } {
    {
      adminExists   = adminState.owner.isSome();
      factoryLocked = factoryInit.initialized;
      studentCount  = profiles.size();
    };
  };

  /// Creates the admin student profile for the calling principal.
  /// Locks factory after first call.
  public shared ({ caller }) func initFactory(adminName : Text) : async { #ok : Text; #err : Text } {
    if (factoryInit.initialized) {
      return #err("Factory already initialized");
    };
    // Register as admin
    adminState.owner := ?caller;
    factoryInit.initialized := true;
    // Create passport for the admin
    switch (passports.get(caller)) {
      case null {
        ignore PassportLib.createPassport(
          passports, seedStore, caller, adminName, "12", "COLLEGIUM-SOPHIA", Time.now()
        );
      };
      case _ {};
    };
    #ok("Factory initialized. Admin: " # adminName);
  };

  /// Creates a student profile (only usable after factory is initialized).
  public shared ({ caller }) func createFactoryStudent(
    username   : Text,
    gradeLevel : Text,
  ) : async { #ok : Text; #err : Text } {
    if (not factoryInit.initialized) {
      return #err("Factory not initialized");
    };
    // Create passport immediately on registration
    switch (passports.get(caller)) {
      case null {
        ignore PassportLib.createPassport(
          passports, seedStore, caller, username, gradeLevel, "COLLEGIUM-COGNITIO", Time.now()
        );
      };
      case _ {};
    };
    #ok("Student created: " # username);
  };
};
