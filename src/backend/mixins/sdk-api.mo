import Types "../types/sdk";
import SdkLib "../lib/sdk";

mixin () {
  public query func getSdkEntries() : async [Types.SdkEntry] {
    SdkLib.getSdkEntries();
  };

  public query func getSdkEntryById(id : Text) : async ?Types.SdkEntry {
    SdkLib.getSdkEntryById(id);
  };

  public query func getSdkEntriesByCategory(category : Text) : async [Types.SdkEntry] {
    SdkLib.getSdkEntriesByCategory(category);
  };
}
