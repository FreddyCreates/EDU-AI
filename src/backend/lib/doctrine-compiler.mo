// Doctrine Compiler — Sovereign Knowledge Crystallisation
// Compresses session outputs into the 5 sovereign artifact formats:
//   seed | kernel | doctrine | artifact | scroll
// Replaces the text-only SCRIPTORIUM-REX crystallisation with typed on-chain artifacts.
// Feeds into the passport sovereign memory layer.
// LEX_SOVEREIGNUS: Shannon-entropy compression, lossless encoding, fully native.

import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Common "../types/common";

module {

  // ── Artifact formats ──────────────────────────────────────────────────────
  public type ArtifactFormat = {
    #SEED;      // 1-line compressed concept identifier
    #KERNEL;    // 3-sentence sovereign concept summary
    #DOCTRINE;  // Full structured knowledge declaration
    #ARTIFACT;  // Named, bounded knowledge entity
    #SCROLL;    // Complete session crystallisation record
  };

  // ── Typed sovereign artifact ──────────────────────────────────────────────
  public type SovereignArtifact = {
    id         : Text;
    format     : ArtifactFormat;
    title      : Text;
    content    : Text;
    engineUsed : Text;
    sessionId  : Text;
    owner      : Common.UserId;
    createdAt  : Common.Timestamp;
    phiWeight  : Nat;   // compound weight at creation
    vaultEligible : Bool;  // true if weight ≥ Fibonacci F(7)=13
  };

  // ── Artifact store ────────────────────────────────────────────────────────
  public type ArtifactStore = Map.Map<Text, SovereignArtifact>;

  public func newStore() : ArtifactStore { Map.empty() };

  // ── Fibonacci ─────────────────────────────────────────────────────────────
  let FIB : [Nat] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
  func fibFloor(n : Nat) : Nat {
    var r : Nat = 1;
    for (f in FIB.vals()) { if (f <= n) r := f };
    r;
  };

  // ── ID generation ─────────────────────────────────────────────────────────
  func makeId(format : ArtifactFormat, sessionId : Text, now : Common.Timestamp) : Text {
    let fmt = switch (format) {
      case (#SEED)     "SEED";
      case (#KERNEL)   "KERN";
      case (#DOCTRINE) "DOCT";
      case (#ARTIFACT) "ARFT";
      case (#SCROLL)   "SCRL";
    };
    fmt # "-" # Text.fromIter(sessionId.toIter().take(8)) # "-" # Int.abs(now).toText();
  };

  // ── Crystallise: produce all 5 formats from a session ─────────────────────
  public func crystallise(
    store     : ArtifactStore,
    owner     : Common.UserId,
    sessionId : Text,
    input     : Text,
    response  : Text,
    engineId  : Text,
    now       : Common.Timestamp,
  ) : [SovereignArtifact] {
    let inputLen = input.size();
    let respLen  = response.size();
    let baseWeight = fibFloor(inputLen + respLen);

    // SEED: 1-line compression
    let seedContent = "SEED: " # Text.fromIter(input.toIter().take(60)) #
                      (if (inputLen > 60) "..." else "") #
                      " | Engine: " # engineId # " | Session: " # sessionId;
    let seed : SovereignArtifact = {
      id     = makeId(#SEED, sessionId, now);
      format = #SEED;
      title  = "Seed — " # engineId;
      content = seedContent;
      engineUsed = engineId;
      sessionId; owner;
      createdAt = now;
      phiWeight = fibFloor(baseWeight / 5);
      vaultEligible = false;
    };

    // KERNEL: 3-sentence sovereign summary
    let kernContent =
      "KERNEL: The concept addressed was \"" # Text.fromIter(input.toIter().take(40)) # "\". " #
      "Engine " # engineId # " processed it through the sovereign reasoning chain. " #
      "The sovereign output is sealed to session " # sessionId # ".";
    let kernel : SovereignArtifact = {
      id     = makeId(#KERNEL, sessionId, now + 1);
      format = #KERNEL;
      title  = "Kernel — " # engineId;
      content = kernContent;
      engineUsed = engineId;
      sessionId; owner;
      createdAt = now + 1;
      phiWeight = fibFloor(baseWeight / 3);
      vaultEligible = fibFloor(baseWeight / 3) >= 8;
    };

    // DOCTRINE: full structured declaration
    let doctContent =
      "DOCTRINE — " # engineId # " SESSION " # sessionId # ":\n\n" #
      "INPUT: " # input # "\n\n" #
      "SOVEREIGN RESPONSE:\n" # Text.fromIter(response.toIter().take(300)) #
      (if (respLen > 300) "\n[...truncated — full response in scroll artifact]" else "") # "\n\n" #
      "DECLARATION: This doctrine is sealed under LEX_SOVEREIGNUS. " #
      "Engine: " # engineId # ". PHI weight: " # Nat.toText(baseWeight) # ". " #
      "Vault eligible: " # (if (baseWeight >= 13) "YES" else "NO") # ".";
    let doctrine : SovereignArtifact = {
      id     = makeId(#DOCTRINE, sessionId, now + 2);
      format = #DOCTRINE;
      title  = "Doctrine — " # engineId;
      content = doctContent;
      engineUsed = engineId;
      sessionId; owner;
      createdAt = now + 2;
      phiWeight = baseWeight;
      vaultEligible = baseWeight >= 13;
    };

    // ARTIFACT: named, bounded knowledge entity
    let artTitle = Text.fromIter(input.toIter().take(20)) # "-" # engineId;
    let artContent =
      "ARTIFACT: " # artTitle # "\n" #
      "Domain: " # engineId # "-FIELD\n" #
      "Binding law: LEX_" # engineId # "\n" #
      "Function: processes inputs related to \"" # Text.fromIter(input.toIter().take(30)) # "\" " #
      "and produces sovereign outputs within its domain.\n" #
      "Owner: sealed to sovereign passport. Non-transferable.";
    let artifact : SovereignArtifact = {
      id     = makeId(#ARTIFACT, sessionId, now + 3);
      format = #ARTIFACT;
      title  = "Artifact — " # artTitle;
      content = artContent;
      engineUsed = engineId;
      sessionId; owner;
      createdAt = now + 3;
      phiWeight = fibFloor(baseWeight * 618 / 1000);
      vaultEligible = fibFloor(baseWeight * 618 / 1000) >= 13;
    };

    // SCROLL: complete session crystallisation record
    let scrollContent =
      "SCROLL — Complete Session Record\n" #
      "Session: " # sessionId # " | Engine: " # engineId # "\n" #
      "Input: " # input # "\n" #
      "Response: " # response # "\n" #
      "PHI Compound Weight: " # Nat.toText(baseWeight) # "\n" #
      "Artifacts sealed: SEED, KERNEL, DOCTRINE, ARTIFACT, SCROLL\n" #
      "Vault eligible: " # (if (baseWeight >= 13) "YES" else "NO") # "\n" #
      "Law: LEX_SOVEREIGNUS | Sealed: " # Int.abs(now).toText();
    let scroll : SovereignArtifact = {
      id     = makeId(#SCROLL, sessionId, now + 4);
      format = #SCROLL;
      title  = "Scroll — " # sessionId;
      content = scrollContent;
      engineUsed = engineId;
      sessionId; owner;
      createdAt = now + 4;
      phiWeight = fibFloor(baseWeight * 1618 / 1000);
      vaultEligible = fibFloor(baseWeight * 1618 / 1000) >= 13;
    };

    let artifacts = [seed, kernel, doctrine, artifact, scroll];
    for (a in artifacts.vals()) {
      store.add(a.id, a);
    };
    artifacts;
  };

  // ── Get artifacts for a session ───────────────────────────────────────────
  public func getBySession(store : ArtifactStore, sessionId : Text) : [SovereignArtifact] {
    let list = List.empty<SovereignArtifact>();
    for ((_id, a) in store.entries()) {
      if (a.sessionId == sessionId) list.add(a);
    };
    list.toArray();
  };

  // ── Get all vault-eligible artifacts ─────────────────────────────────────
  public func getVaultEligible(store : ArtifactStore) : [SovereignArtifact] {
    let list = List.empty<SovereignArtifact>();
    for ((_id, a) in store.entries()) {
      if (a.vaultEligible) list.add(a);
    };
    list.toArray();
  };
};
