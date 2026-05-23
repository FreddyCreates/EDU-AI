
import StudentsLib "lib/students";
import AgentsLib "lib/agents";
import CurriculumLib "lib/curriculum";
import SessionsLib "lib/sessions";
import StudentsMixin "mixins/students-api";
import AgentsMixin "mixins/agents-api";
import AdminMixin "mixins/admin-api";
import CurriculumMixin "mixins/curriculum-api";
import SessionsMixin "mixins/sessions-api";
import ChatMixin "mixins/chat-api";

import Map "mo:core/Map";
import LawsMixin "mixins/laws-api";
import PassportLib "lib/passport";
import PassportMixin "mixins/passport-api";
import CollegiumLib "lib/collegium";
import CollegiumMixin "mixins/collegium-api";
import EnginesMixin "mixins/engines-api";
import SkaiDocensMixin "mixins/skai-docens-api";
import EngineInteractMixin "mixins/engine-interact-api";
import SdkMixin "mixins/sdk-api";
import SovereignMemory "./lib/sovereign-memory";
import VaultTypes "./types/vault";
import SovereignMemoryMixin "./mixins/sovereign-memory-api";
import Principal "mo:core/Principal";
import SilverBuildersLib "lib/silver-builders";
import SilverBuildersMixin "mixins/silver-builders-api";
import AdaptiveMixin "mixins/adaptive-api";
import LessonMixin "mixins/lesson-api";
import FactorySetupMixin "mixins/factory-setup-api";
import EntanglementsMixin "mixins/entanglements-api";
import DigtMixin "mixins/digt-api";
import GvltMixin "mixins/gvlt-api";
import TchrMixin "mixins/tchr-api";
import MLTVMixin "mixins/mltv-api";
import ApixMixin "mixins/apix-api";
import QryxMixin "mixins/qryx-api";
import LiveIntelligenceMixin "mixins/live-intelligence-api";
import Array "mo:core/Array";
import ApixLib "lib/apix";
import MLTVLib "lib/mltv";
import _QryxLib "lib/qryx";
import Time "mo:core/Time";

import StaffLib "lib/staff";
import StaffMixin "mixins/staff-api";
import PortalLib "lib/portal";
import PortalMixin "mixins/portal-api";
import MetricsLib "lib/metrics";
import MetricsMixin "mixins/metrics-api";
import RcgnLib "lib/rcgn";
import NomsLib "lib/noms";
import AchvLib "lib/achv";
import RcgnMixin "mixins/rcgn-api";
import VisionMixin "mixins/vision-api";

// ── New engine imports ────────────────────────────────────────────────────────
import DistLib "lib/dist";
import DistMixin "mixins/dist-api";
import SisrLib "lib/sisr";
import SisrMixin "mixins/sisr-api";
import StndLib "lib/stnd";
import StndMixin "mixins/stnd-api";
import PrntLib "lib/prnt";
import PrntMixin "mixins/prnt-api";
import CounLib "lib/coun";
import CounMixin "mixins/coun-api";
import IesmLib "lib/iesm";
import IesmMixin "mixins/iesm-api";
import EsllLib "lib/esll";
import EsllMixin "mixins/esll-api";
import TprpLib "lib/tprp";
import TprpMixin "mixins/tprp-api";
import CrptLib "lib/crpt";
import CrptMixin "mixins/crpt-api";
import SchfLib "lib/schf";
import SchfMixin "mixins/schf-api";
import ClrdLib "lib/clrd";
import ClrdMixin "mixins/clrd-api";
import MhckLib "lib/mhck";
import MhckMixin "mixins/mhck-api";
import TutlLib "lib/tutl";
import TutlMixin "mixins/tutl-api";
import PgrpLib "lib/pgrp";
import PgrpMixin "mixins/pgrp-api";
import AsgnLib "lib/asgn";
import AsgnMixin "mixins/asgn-api";
import TpdfMixin "mixins/tpdf-api";
import SubsMixin "mixins/subs-api";
import _FtrpLib "lib/ftrp";
import FtrpMixin "mixins/ftrp-api";
import _LbryLib "lib/lbry";
import LbryMixin "mixins/lbry-api";
import _XcrrLib "lib/xcrr";
import XcrrMixin "mixins/xcrr-api";
import _CommLib "lib/comm";
import CommMixin "mixins/comm-api";
import EDDILib "lib/eddi";
import UnivLib "lib/university";
import EDDIMixin "mixins/eddi-api";
import UniversityMixin "mixins/university-api";
import StmpMixin "mixins/stmp-api";
import KnowledgeMixin "mixins/knowledge-api";
import RepReg "lib/repetition-registry";
import RepRegMixin "mixins/repetition-registry-api";
import StmpTypes "types/stmp";
import StmpLib "lib/stmp";
import SelfStudyLib "lib/selfstudy";
import FeedbackAILib "lib/feedbackai";
import SelfStudyMixin "mixins/selfstudy-api";
import FeedbackAIMixin "mixins/feedbackai-api";
import CatalogVisionLib "lib/catalog-vision";
import CatalogVisionMixin "mixins/catalog-vision-api";

// ── Alpha Deep EDDI (ADEDDI) + EDDI OS ───────────────────────────────────────
import ADEDDILib "lib/adeddi";
import EddiOsLib "lib/eddi-os";
import AdeddiMixin "mixins/adeddi-api";

// ── Deep EDDI Kernel ──────────────────────────────────────────────────────────
import DeepKernelMixin "mixins/deep-kernel-api";

// ── Scaffold, Protocol, Feedback Loop ────────────────────────────────────────
import ScaffoldLib "lib/scaffold";
import ScaffoldMixin "mixins/scaffold-api";
import ProtocolLib "lib/protocol";
import ProtocolMixin "mixins/protocol-api";
import FeedbackLoopLib "lib/feedbackloop";
import FeedbackLoopMixin "mixins/feedbackloop-api";



actor EduAI {
  // Compatibility stub — preserves stable migration from a prior version that had openAIApiKey
  let openAIApiKey : Text = "";
  ignore openAIApiKey;
  let profiles : StudentsLib.ProfileStore = Map.empty();
  let agentStore : AgentsLib.AgentStore = Map.empty();
  let subjects : CurriculumLib.SubjectStore = Map.empty();
  let topics : CurriculumLib.TopicStore = Map.empty();
  let stmpStore : Map.Map<Text, StmpTypes.SubjectTemplate> = Map.empty();
  let sessionScheduleStore : RepReg.SessionScheduleStore = RepReg.createScheduleStore();
  let results : SessionsLib.ResultStore = Map.empty();
  let enrollments : CollegiumLib.EnrollmentStore = Map.empty();
  let gateEntries : CollegiumLib.GateEntryStore = Map.empty();
  let passports : PassportLib.PassportStore = Map.empty();
  let passportSeeds : PassportLib.SeedStore = Map.empty();

  let adminState = { var owner : ?Principal = null };
  let memState = { var vaultCanisterId : ?Principal = null };
  let diagState = {
    var totalSessions  : Nat = 0;
    var totalSeeds     : Nat = 0;
    var passportCount  : Nat = 0;
    var sealedCount    : Nat = 0;
    var heartbeatCount : Nat = 0;
  };
  let vaultBuffer = {
    var payloads   : [Blob] = [];
    var totalBytes : Nat = 0;
    var lastDrainAt : Int = 0;
  };
  let builderStats : SilverBuildersLib.StatsStore = Map.empty();
  let factoryInit = { var initialized : Bool = false };
  let allocState = SovereignMemory.newState();
  let apixState = ApixLib.newState();
  do { ApixLib.seedEndpoints(apixState) };
  let mltvState = MLTVLib.newState();
  let silverBuilders : SilverBuildersLib.SilverBuilderStore = Map.empty();
  let staffStore : StaffLib.StaffStore = Map.empty();
  let portalTransitions = PortalLib.newStore();
  let metricsState = MetricsLib.newState();
  let rcgnStore  : RcgnLib.RcgnStore  = Map.empty();
  let nomStore   : NomsLib.NomStore   = Map.empty();
  let achvStore  : AchvLib.AchvStore  = Map.empty();
  let trackStore    : SelfStudyLib.TrackStore    = Map.empty();
  let feedbackStore : FeedbackAILib.FeedbackStore = Map.empty();
  // ── Catalog-Vision state ─────────────────────────────────────────────────────
  let fundingStore : CatalogVisionLib.FundingStore = CatalogVisionLib.emptyFundingStore();
  let rcgnCycleState = { var count : Nat = 0 }; // fires every F(6)=8 cycles
  // ── EDDI unified model state ─────────────────────────────────────────────
  let eddiModeStore  : EDDILib.ModeStore      = Map.empty();
  let eddiAgentStore : EDDILib.UserAgentStore = Map.empty();

  // ── Alpha Deep EDDI (ADEDDI) + EDDI OS state ──────────────────────────────
  let adeddiTraceStore  : ADEDDILib.TraceStore      = ADEDDILib.newTraceStore();
  let eddiOsState       : EddiOsLib.OsState         = EddiOsLib.newOsState();
  let adeddiFieldState  : ADEDDILib.SharedFieldState = ADEDDILib.newFieldState();
  let adeddiArtifacts   : ADEDDILib.ArtifactStore   = ADEDDILib.newArtifactStore();

  // ── Scaffold, Protocol, Feedback Loop state ───────────────────────────────
  let scaffoldFrameStore   : ScaffoldLib.FrameStore   = ScaffoldLib.newFrameStore();
  let scaffoldSessionStore : ScaffoldLib.SessionStore = ScaffoldLib.newSessionStore();
  let protocolStore        : ProtocolLib.ProtocolStore   = ProtocolLib.newProtocolStore();
  let protocolAssignStore  : ProtocolLib.AssignmentStore = ProtocolLib.newAssignmentStore();
  let feedbackLoopStore    : FeedbackLoopLib.LoopStore   = FeedbackLoopLib.newLoopStore();

  // ── University sovereign course state ────────────────────────────────────
  let univCourseStore  : UnivLib.CourseStore      = Map.empty();
  let univEnrollStore  : UnivLib.EnrollmentStore  = Map.empty();
  do { UnivLib.seedCourses(univCourseStore) };

  // ── New engine state stores ───────────────────────────────────────────────
  let districtStore  = DistLib.newDistrictStore();
  let distTrends     = DistLib.newTrendStore();
  let distGaps       = DistLib.newGapStore();

  let sisStore       = SisrLib.newSisStore();
  let attendanceStore = SisrLib.newAttendanceStore();
  let rosterStore    = SisrLib.newRosterStore();
  let calendarStore  = SisrLib.newCalendarStore();
  let sisState       = SisrLib.newSyncState();

  let standardStore  = StndLib.newStandardStore();
  let alignmentStore = StndLib.newAlignmentStore();
  let digtContentIds = StndLib.newDigtContentStore();

  let parentStore    = PrntLib.newStore();

  let counPlanStore  = CounLib.newStore();

  let iesmStore      = IesmLib.newStore();

  let esllStore      = EsllLib.newStore();

  let tprpSessions   = TprpLib.newSessionStore();
  let tprpProjections = TprpLib.newProjectionStore();
  let tprpCounter    = TprpLib.newCounter();

  let pathwayStore   = CrptLib.newStore();
  let crptCounter    = CrptLib.newCounter();

  let schfPrograms   = SchfLib.newProgramStore();
  let schfMatches    = SchfLib.newMatchStore();
  let schfCounter    = SchfLib.newCounter();

  let clrdStore      = ClrdLib.newStore();

  let mhckCheckIns   = MhckLib.newCheckInStore();
  let mhckAggregates = MhckLib.newAggregateStore();

  let tutlStore      = TutlLib.newStore();
  let tutlCounter    = TutlLib.newCounter();

  let pgrpGroups     = PgrpLib.newGroupStore();
  let pgrpSessions   = PgrpLib.newSessionStore();
  let pgrpCounter    = PgrpLib.newCounter();

  let assignmentStore = AsgnLib.newAssignmentStore();
  let submissionStore = AsgnLib.newSubmissionStore();
  let gradeStore      = AsgnLib.newGradeStore();
  let asgnCounter     = AsgnLib.newCounter();


  // Seed the registry and curriculum once
  AgentsLib.seedAgents(agentStore);
  CurriculumLib.seedCurriculum(subjects, topics);
  StmpLib.seedDefaults(stmpStore);
  SilverBuildersLib.seedBuilders(silverBuilders);
  StaffLib.seedStaff(staffStore);
  ScaffoldLib.seedFrames(scaffoldFrameStore);
  ProtocolLib.seedProtocols(protocolStore);

  // Register pinned sovereign doctrine blocks — never evicted
  ignore SovereignMemory.alloc(allocState, 256, 3, "genesis_hash",  true);
  ignore SovereignMemory.alloc(allocState, 128, 3, "math_constant", true);

  include StudentsMixin(profiles);
  include AgentsMixin(agentStore);
  include AdminMixin(adminState, diagState, vaultBuffer);
  include CurriculumMixin(subjects, topics);
  include SessionsMixin(results, allocState, subjects, passports);
  include ChatMixin(agentStore);
  include PassportMixin(passports, passportSeeds, allocState);
  include LawsMixin();
  include CollegiumMixin(enrollments, gateEntries);
  include EnginesMixin();
  include EngineInteractMixin(passports, passportSeeds);
  include SkaiDocensMixin();
  include AdaptiveMixin(results);
  include SilverBuildersMixin(silverBuilders, builderStats);
  include LessonMixin(topics);
  include FactorySetupMixin(adminState, factoryInit, profiles, passports, passportSeeds);
  include SdkMixin();
  include SovereignMemoryMixin(adminState, memState, allocState);
  include EntanglementsMixin();
  include DigtMixin();
  include GvltMixin();
  include TchrMixin();
  include MLTVMixin(mltvState);
  include ApixMixin(apixState);
  include QryxMixin(apixState);
  include StaffMixin(staffStore);
  include PortalMixin(portalTransitions);
  include MetricsMixin(results, metricsState);
  include LiveIntelligenceMixin(passports, passportSeeds, results, rcgnStore, nomStore, achvStore);
  include RcgnMixin(rcgnStore, nomStore, achvStore, passports, passportSeeds);
  include VisionMixin(rcgnStore, nomStore, achvStore);

  // ── New engine mixins ─────────────────────────────────────────────────────
  include DistMixin(districtStore, distTrends, distGaps);
  include SisrMixin(sisStore, attendanceStore, rosterStore, calendarStore, sisState);
  include StndMixin(standardStore, alignmentStore, digtContentIds);
  include PrntMixin(parentStore);
  include CounMixin(counPlanStore);
  include IesmMixin(iesmStore);
  include EsllMixin(esllStore);
  include TprpMixin(tprpSessions, tprpProjections, tprpCounter);
  include CrptMixin(pathwayStore, crptCounter);
  include SchfMixin(schfPrograms, schfMatches, schfCounter);
  include ClrdMixin(clrdStore);
  include MhckMixin(mhckCheckIns, mhckAggregates);
  include TutlMixin(tutlStore, tutlCounter);
  include PgrpMixin(pgrpGroups, pgrpSessions, pgrpCounter);
  include AsgnMixin(assignmentStore, submissionStore, gradeStore, asgnCounter);
  include TpdfMixin();
  include SubsMixin();
  include FtrpMixin();
  include LbryMixin();
  include XcrrMixin();
  include CommMixin();

  include EDDIMixin(eddiModeStore, eddiAgentStore, passports, passportSeeds);
  include UniversityMixin(univCourseStore, univEnrollStore, passports, passportSeeds);
  include StmpMixin(stmpStore);
  include KnowledgeMixin(subjects, topics);
  include RepRegMixin(sessionScheduleStore);
  include SelfStudyMixin(trackStore);
  include FeedbackAIMixin(feedbackStore);
  include CatalogVisionMixin(fundingStore, rcgnStore, nomStore, achvStore);

  // ── Alpha Deep EDDI (ADEDDI) + EDDI OS ───────────────────────────────────
  include AdeddiMixin(adeddiTraceStore, eddiOsState, adeddiFieldState, adeddiArtifacts);

  // ── Deep EDDI Kernel (stateless formula engine) ───────────────────────────
  include DeepKernelMixin();

  // ── Scaffold, Protocol, Feedback Loop ────────────────────────────────────
  include ScaffoldMixin(scaffoldFrameStore, scaffoldSessionStore);
  include ProtocolMixin(protocolStore, protocolAssignStore);
  include FeedbackLoopMixin(feedbackLoopStore);

  // ── Sovereign heartbeat — ticks allocator, routes vault payloads ─────────
  system func heartbeat() : async () {
    let vaultPayloads = SovereignMemory.heartbeat(allocState);
    vaultBuffer.payloads := vaultBuffer.payloads.concat(vaultPayloads);
    var _payloadBytes : Nat = 0;
    for (b in vaultPayloads.vals()) { _payloadBytes += b.size() };
    vaultBuffer.totalBytes += _payloadBytes;
    diagState.heartbeatCount += 1;
    rcgnCycleState.count += 1;
    // RCGN autonomous scan every F(6)=8 heartbeat cycles
    if (rcgnCycleState.count % 8 == 0) {
      ignore RcgnLib.runScan(rcgnStore, passports, passportSeeds, Time.now());
    };
    // EDDI OS heartbeat tick — advances all subsystem counters
    EddiOsLib.tick(eddiOsState);
    // FieldMonitor heartbeat tick — updates organism health every cycle
    ADEDDILib.tickFieldMonitor(adeddiFieldState);
    SilverBuildersLib.incrementBuilderStat(builderStats, "ARGENTUM-NEXUS", #session, Time.now());
    ignore tickEntanglementCycle();
    if (vaultPayloads.size() > 0) {
      switch (memState.vaultCanisterId) {
        case (?id) {
          let vault = actor(id.toText()) : VaultTypes.AbyssusVaultActor;
          ignore vault.receiveCompressedSeeds(vaultPayloads);
        };
        case null {};
      };
    };
  };
};
