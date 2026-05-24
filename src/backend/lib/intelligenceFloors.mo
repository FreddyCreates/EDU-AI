// lib/intelligenceFloors.mo
// INTELLIGENCE FLOORS & AI MICROS — LLM Architecture Library
// Attribution: Alfredo Medina Hernandez | SOVEREIGN | May 2026
// ─────────────────────────────────────────────────────────────────────────────

import Types "../types/intelligenceFloors";
import Float "mo:base/Float";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

module {
  // ── RE-EXPORT TYPES ────────────────────────────────────────────────────────
  public type IntelligenceFloorId = Types.IntelligenceFloorId;
  public type AIMicroId = Types.AIMicroId;
  public type IntelligenceFloorState = Types.IntelligenceFloorState;
  public type AIMicroState = Types.AIMicroState;
  public type FloorSnapshot = Types.FloorSnapshot;
  public type MicroSnapshot = Types.MicroSnapshot;
  public type IntelligenceFloorsState = Types.IntelligenceFloorsState;
  public type IntelligenceFloorsSummary = Types.IntelligenceFloorsSummary;
  public type WeaveReport = Types.WeaveReport;
  public type ScaleMagnitude = Types.ScaleMagnitude;

  // ── CONSTANTS ──────────────────────────────────────────────────────────────
  public let PHI : Float = Types.PHI;
  public let PHI_INV : Float = Types.PHI_INV;
  public let SCHUMANN : Float = Types.SCHUMANN;
  public let S_FLOOR : Float = Types.S_FLOOR;
  public let S_CEIL : Float = Types.S_CEIL;

  // ── FLOOR INITIALIZERS ─────────────────────────────────────────────────────
  public func initFloorParameters() : IntelligenceFloorState {
    {
      floorId = #FLOOR_PARAMETERS;
      name = "FLOOR_PARAMETERS";
      latinName = "Stratum Ponderum Infinitorum";
      description = "Billions to trillions of weights (~10^12 floats)";
      resonanceHz = 174.0;
      signal = 5.25;
      capacity = { base = 1.5; exponent = 12; unit = "floats" };
      efficiencyScore = 0.85;
      utilizationRate = 0.72;
      connectedMicros = [#MICRO_GRADIENT_FLOW, #MICRO_RESIDUAL_STREAM];
      phiResonance = PHI;
      totalPulses = 0;
      lastPulseBeat = 0;
      taftThread = "TAFT-FLOOR-PARAMS";
      attribution = Types.FOUNDER;
    }
  };

  public func initFloorAttention() : IntelligenceFloorState {
    {
      floorId = #FLOOR_ATTENTION;
      name = "FLOOR_ATTENTION";
      latinName = "Stratum Attentionis Capitum";
      description = "Multi-head self-attention mechanisms O(n^2) per layer";
      resonanceHz = 285.0;
      signal = 5.25;
      capacity = { base = 4.0; exponent = 9; unit = "attention_ops" };
      efficiencyScore = 0.88;
      utilizationRate = 0.81;
      connectedMicros = [#MICRO_KEY_VALUE, #MICRO_SOFTMAX_GATE, #MICRO_CONTEXT_WINDOW];
      phiResonance = PHI;
      totalPulses = 0;
      lastPulseBeat = 0;
      taftThread = "TAFT-FLOOR-ATTENTION";
      attribution = Types.FOUNDER;
    }
  };

  public func initFloorFeedforward() : IntelligenceFloorState {
    {
      floorId = #FLOOR_FEEDFORWARD;
      name = "FLOOR_FEEDFORWARD";
      latinName = "Stratum Propagationis Densae";
      description = "Dense neural network layers (~4d^2 per layer)";
      resonanceHz = 396.0;
      signal = 5.25;
      capacity = { base = 4.0; exponent = 8; unit = "multiply_adds" };
      efficiencyScore = 0.82;
      utilizationRate = 0.76;
      connectedMicros = [#MICRO_GELU_ACTIVATION, #MICRO_DROPOUT_MASK, #MICRO_LAYER_CONNECT];
      phiResonance = PHI;
      totalPulses = 0;
      lastPulseBeat = 0;
      taftThread = "TAFT-FLOOR-FEEDFORWARD";
      attribution = Types.FOUNDER;
    }
  };

  public func initFloorNormalization() : IntelligenceFloorState {
    {
      floorId = #FLOOR_NORMALIZATION;
      name = "FLOOR_NORMALIZATION";
      latinName = "Stratum Stabilizationis Normae";
      description = "Layer norm, RMS norm (Stabilization)";
      resonanceHz = 417.0;
      signal = 5.25;
      capacity = { base = 2.0; exponent = 6; unit = "norm_ops" };
      efficiencyScore = 0.95;
      utilizationRate = 0.90;
      connectedMicros = [#MICRO_RESIDUAL_STREAM];
      phiResonance = PHI;
      totalPulses = 0;
      lastPulseBeat = 0;
      taftThread = "TAFT-FLOOR-NORM";
      attribution = Types.FOUNDER;
    }
  };

  public func initFloorTokenization() : IntelligenceFloorState {
    {
      floorId = #FLOOR_TOKENIZATION;
      name = "FLOOR_TOKENIZATION";
      latinName = "Stratum Vocabularii Tokenorum";
      description = "BPE, SentencePiece vocabularies (~100k tokens)";
      resonanceHz = 432.0;
      signal = 5.25;
      capacity = { base = 1.0; exponent = 5; unit = "tokens" };
      efficiencyScore = 0.92;
      utilizationRate = 0.88;
      connectedMicros = [#MICRO_VOCAB_LOOKUP, #MICRO_POSITION_ENCODER];
      phiResonance = PHI;
      totalPulses = 0;
      lastPulseBeat = 0;
      taftThread = "TAFT-FLOOR-TOKEN";
      attribution = Types.FOUNDER;
    }
  };

  public func initFloorEmbeddings() : IntelligenceFloorState {
    {
      floorId = #FLOOR_EMBEDDINGS;
      name = "FLOOR_EMBEDDINGS";
      latinName = "Stratum Dimensionum Altarum";
      description = "High-dimensional vector spaces (~10^4 dimensions)";
      resonanceHz = 528.0;
      signal = 5.25;
      capacity = { base = 1.0; exponent = 4; unit = "dimensions" };
      efficiencyScore = 0.89;
      utilizationRate = 0.84;
      connectedMicros = [#MICRO_VOCAB_LOOKUP, #MICRO_POSITION_ENCODER, #MICRO_KEY_VALUE];
      phiResonance = PHI;
      totalPulses = 0;
      lastPulseBeat = 0;
      taftThread = "TAFT-FLOOR-EMBED";
      attribution = Types.FOUNDER;
    }
  };

  public func initFloorTrainingCorpus() : IntelligenceFloorState {
    {
      floorId = #FLOOR_TRAINING_CORPUS;
      name = "FLOOR_TRAINING_CORPUS";
      latinName = "Stratum Corporis Docendi";
      description = "Vast text data (~10^12 tokens)";
      resonanceHz = 639.0;
      signal = 5.25;
      capacity = { base = 1.0; exponent = 12; unit = "tokens" };
      efficiencyScore = 0.78;
      utilizationRate = 0.65;
      connectedMicros = [#MICRO_GRADIENT_FLOW, #MICRO_ENTROPY_SAMPLER];
      phiResonance = PHI;
      totalPulses = 0;
      lastPulseBeat = 0;
      taftThread = "TAFT-FLOOR-CORPUS";
      attribution = Types.FOUNDER;
    }
  };

  public func initFloorEmergent() : IntelligenceFloorState {
    {
      floorId = #FLOOR_EMERGENT;
      name = "FLOOR_EMERGENT";
      latinName = "Stratum Emergentiae Impraedictae";
      description = "Reasoning, code, translation (Unpredicted capabilities)";
      resonanceHz = 741.0;
      signal = 5.25;
      capacity = { base = 1.0; exponent = 3; unit = "capabilities" };
      efficiencyScore = 0.75;
      utilizationRate = 0.60;
      connectedMicros = [#MICRO_LOGIT_HEAD, #MICRO_ENTROPY_SAMPLER, #MICRO_CONTEXT_WINDOW];
      phiResonance = PHI;
      totalPulses = 0;
      lastPulseBeat = 0;
      taftThread = "TAFT-FLOOR-EMERGENT";
      attribution = Types.FOUNDER;
    }
  };

  // ── MICRO INITIALIZERS ─────────────────────────────────────────────────────
  public func initMicroGradientFlow() : AIMicroState {
    {
      microId = #MICRO_GRADIENT_FLOW;
      name = "MICRO_GRADIENT_FLOW";
      latinName = "Micro Fluxus Gradientis";
      description = "Backpropagation gradient signals";
      sourceFloor = #FLOOR_EMERGENT;
      targetFloor = #FLOOR_PARAMETERS;
      signalStrength = 0.85;
      activationFreq = 1;
      lastActivation = 0;
      totalActivations = 0;
      phiCoupling = PHI_INV;
      dataRate = { base = 1.0; exponent = 10; unit = "gradients_per_sec" };
      weaveScore = 0.88;
      taftThread = "TAFT-MICRO-GRAD";
      attribution = Types.FOUNDER;
    }
  };

  public func initMicroResidualStream() : AIMicroState {
    {
      microId = #MICRO_RESIDUAL_STREAM;
      name = "MICRO_RESIDUAL_STREAM";
      latinName = "Micro Rivulus Residualis";
      description = "Skip connections and residual paths";
      sourceFloor = #FLOOR_NORMALIZATION;
      targetFloor = #FLOOR_FEEDFORWARD;
      signalStrength = 0.92;
      activationFreq = 1;
      lastActivation = 0;
      totalActivations = 0;
      phiCoupling = PHI_INV;
      dataRate = { base = 1.0; exponent = 9; unit = "tensors_per_sec" };
      weaveScore = 0.95;
      taftThread = "TAFT-MICRO-RESIDUAL";
      attribution = Types.FOUNDER;
    }
  };

  public func initMicroKeyValue() : AIMicroState {
    {
      microId = #MICRO_KEY_VALUE;
      name = "MICRO_KEY_VALUE";
      latinName = "Micro Clavis Valoris";
      description = "Key-value attention cache management";
      sourceFloor = #FLOOR_EMBEDDINGS;
      targetFloor = #FLOOR_ATTENTION;
      signalStrength = 0.88;
      activationFreq = 1;
      lastActivation = 0;
      totalActivations = 0;
      phiCoupling = PHI_INV;
      dataRate = { base = 1.0; exponent = 8; unit = "kv_pairs_per_sec" };
      weaveScore = 0.90;
      taftThread = "TAFT-MICRO-KV";
      attribution = Types.FOUNDER;
    }
  };

  public func initMicroPositionEncoder() : AIMicroState {
    {
      microId = #MICRO_POSITION_ENCODER;
      name = "MICRO_POSITION_ENCODER";
      latinName = "Micro Codex Positionis";
      description = "Positional encoding signals (sinusoidal/learned)";
      sourceFloor = #FLOOR_TOKENIZATION;
      targetFloor = #FLOOR_EMBEDDINGS;
      signalStrength = 0.90;
      activationFreq = 1;
      lastActivation = 0;
      totalActivations = 0;
      phiCoupling = PHI_INV;
      dataRate = { base = 1.0; exponent = 7; unit = "positions_per_sec" };
      weaveScore = 0.92;
      taftThread = "TAFT-MICRO-POS";
      attribution = Types.FOUNDER;
    }
  };

  public func initMicroSoftmaxGate() : AIMicroState {
    {
      microId = #MICRO_SOFTMAX_GATE;
      name = "MICRO_SOFTMAX_GATE";
      latinName = "Micro Porta Mollismaximi";
      description = "Attention weight normalization";
      sourceFloor = #FLOOR_ATTENTION;
      targetFloor = #FLOOR_ATTENTION;
      signalStrength = 0.94;
      activationFreq = 1;
      lastActivation = 0;
      totalActivations = 0;
      phiCoupling = PHI_INV;
      dataRate = { base = 1.0; exponent = 9; unit = "softmax_per_sec" };
      weaveScore = 0.96;
      taftThread = "TAFT-MICRO-SOFTMAX";
      attribution = Types.FOUNDER;
    }
  };

  public func initMicroGeluActivation() : AIMicroState {
    {
      microId = #MICRO_GELU_ACTIVATION;
      name = "MICRO_GELU_ACTIVATION";
      latinName = "Micro Activatio Gaussiana";
      description = "Gaussian error linear unit activations";
      sourceFloor = #FLOOR_FEEDFORWARD;
      targetFloor = #FLOOR_FEEDFORWARD;
      signalStrength = 0.91;
      activationFreq = 1;
      lastActivation = 0;
      totalActivations = 0;
      phiCoupling = PHI_INV;
      dataRate = { base = 1.0; exponent = 10; unit = "activations_per_sec" };
      weaveScore = 0.93;
      taftThread = "TAFT-MICRO-GELU";
      attribution = Types.FOUNDER;
    }
  };

  public func initMicroDropoutMask() : AIMicroState {
    {
      microId = #MICRO_DROPOUT_MASK;
      name = "MICRO_DROPOUT_MASK";
      latinName = "Micro Velamen Decidentis";
      description = "Regularization through masking";
      sourceFloor = #FLOOR_FEEDFORWARD;
      targetFloor = #FLOOR_PARAMETERS;
      signalStrength = 0.78;
      activationFreq = 2;
      lastActivation = 0;
      totalActivations = 0;
      phiCoupling = PHI_INV;
      dataRate = { base = 1.0; exponent = 8; unit = "masks_per_sec" };
      weaveScore = 0.80;
      taftThread = "TAFT-MICRO-DROPOUT";
      attribution = Types.FOUNDER;
    }
  };

  public func initMicroLayerConnect() : AIMicroState {
    {
      microId = #MICRO_LAYER_CONNECT;
      name = "MICRO_LAYER_CONNECT";
      latinName = "Micro Nexus Stratorum";
      description = "Inter-layer connection routing";
      sourceFloor = #FLOOR_FEEDFORWARD;
      targetFloor = #FLOOR_ATTENTION;
      signalStrength = 0.87;
      activationFreq = 1;
      lastActivation = 0;
      totalActivations = 0;
      phiCoupling = PHI_INV;
      dataRate = { base = 1.0; exponent = 9; unit = "connections_per_sec" };
      weaveScore = 0.89;
      taftThread = "TAFT-MICRO-LAYER";
      attribution = Types.FOUNDER;
    }
  };

  public func initMicroContextWindow() : AIMicroState {
    {
      microId = #MICRO_CONTEXT_WINDOW;
      name = "MICRO_CONTEXT_WINDOW";
      latinName = "Micro Fenestra Contextus";
      description = "Context length management";
      sourceFloor = #FLOOR_ATTENTION;
      targetFloor = #FLOOR_EMERGENT;
      signalStrength = 0.83;
      activationFreq = 1;
      lastActivation = 0;
      totalActivations = 0;
      phiCoupling = PHI_INV;
      dataRate = { base = 1.0; exponent = 6; unit = "tokens_per_context" };
      weaveScore = 0.85;
      taftThread = "TAFT-MICRO-CONTEXT";
      attribution = Types.FOUNDER;
    }
  };

  public func initMicroVocabLookup() : AIMicroState {
    {
      microId = #MICRO_VOCAB_LOOKUP;
      name = "MICRO_VOCAB_LOOKUP";
      latinName = "Micro Inventio Vocabularii";
      description = "Token-to-embedding lookup";
      sourceFloor = #FLOOR_TOKENIZATION;
      targetFloor = #FLOOR_EMBEDDINGS;
      signalStrength = 0.96;
      activationFreq = 1;
      lastActivation = 0;
      totalActivations = 0;
      phiCoupling = PHI_INV;
      dataRate = { base = 1.0; exponent = 8; unit = "lookups_per_sec" };
      weaveScore = 0.98;
      taftThread = "TAFT-MICRO-VOCAB";
      attribution = Types.FOUNDER;
    }
  };

  public func initMicroLogitHead() : AIMicroState {
    {
      microId = #MICRO_LOGIT_HEAD;
      name = "MICRO_LOGIT_HEAD";
      latinName = "Micro Caput Logiti";
      description = "Output logit computation";
      sourceFloor = #FLOOR_FEEDFORWARD;
      targetFloor = #FLOOR_EMERGENT;
      signalStrength = 0.89;
      activationFreq = 1;
      lastActivation = 0;
      totalActivations = 0;
      phiCoupling = PHI_INV;
      dataRate = { base = 1.0; exponent = 7; unit = "logits_per_sec" };
      weaveScore = 0.91;
      taftThread = "TAFT-MICRO-LOGIT";
      attribution = Types.FOUNDER;
    }
  };

  public func initMicroEntropySampler() : AIMicroState {
    {
      microId = #MICRO_ENTROPY_SAMPLER;
      name = "MICRO_ENTROPY_SAMPLER";
      latinName = "Micro Samplator Entropiae";
      description = "Temperature-based sampling";
      sourceFloor = #FLOOR_EMERGENT;
      targetFloor = #FLOOR_TRAINING_CORPUS;
      signalStrength = 0.82;
      activationFreq = 1;
      lastActivation = 0;
      totalActivations = 0;
      phiCoupling = PHI_INV;
      dataRate = { base = 1.0; exponent = 6; unit = "samples_per_sec" };
      weaveScore = 0.84;
      taftThread = "TAFT-MICRO-ENTROPY";
      attribution = Types.FOUNDER;
    }
  };

  // ── SYSTEM INITIALIZER ─────────────────────────────────────────────────────
  public func initIntelligenceFloorsState() : IntelligenceFloorsState {
    let floors = [
      initFloorParameters(),
      initFloorAttention(),
      initFloorFeedforward(),
      initFloorNormalization(),
      initFloorTokenization(),
      initFloorEmbeddings(),
      initFloorTrainingCorpus(),
      initFloorEmergent()
    ];
    let micros = [
      initMicroGradientFlow(),
      initMicroResidualStream(),
      initMicroKeyValue(),
      initMicroPositionEncoder(),
      initMicroSoftmaxGate(),
      initMicroGeluActivation(),
      initMicroDropoutMask(),
      initMicroLayerConnect(),
      initMicroContextWindow(),
      initMicroVocabLookup(),
      initMicroLogitHead(),
      initMicroEntropySampler()
    ];
    {
      floors = floors;
      micros = micros;
      totalFloorSignal = 42.0; // 8 floors × 5.25 initial
      totalMicroSignal = 10.55; // sum of initial micro signals
      systemCoherence = 0.85;
      totalPulses = 0;
      beat = 0;
      attribution = Types.FOUNDER;
    }
  };

  // ── QUERY FUNCTIONS ────────────────────────────────────────────────────────
  public func getIntelligenceFloorsSummary(state : IntelligenceFloorsState) : IntelligenceFloorsSummary {
    {
      floorCount = 8;
      microCount = 12;
      totalFloorSignal = state.totalFloorSignal;
      totalMicroSignal = state.totalMicroSignal;
      systemCoherence = state.systemCoherence;
      topFloor = "FLOOR_ATTENTION";
      topMicro = "MICRO_VOCAB_LOOKUP";
      totalPulses = state.totalPulses;
      beat = state.beat;
      attribution = state.attribution;
    }
  };

  public func getFloorSnapshots(state : IntelligenceFloorsState) : [FloorSnapshot] {
    Array.map<IntelligenceFloorState, FloorSnapshot>(
      state.floors,
      func(f : IntelligenceFloorState) : FloorSnapshot {
        {
          name = f.name;
          latinName = f.latinName;
          signal = f.signal;
          efficiencyScore = f.efficiencyScore;
          utilizationRate = f.utilizationRate;
          totalPulses = f.totalPulses;
        }
      }
    )
  };

  public func getMicroSnapshots(state : IntelligenceFloorsState) : [MicroSnapshot] {
    Array.map<AIMicroState, MicroSnapshot>(
      state.micros,
      func(m : AIMicroState) : MicroSnapshot {
        {
          name = m.name;
          latinName = m.latinName;
          signalStrength = m.signalStrength;
          weaveScore = m.weaveScore;
          totalActivations = m.totalActivations;
        }
      }
    )
  };

  public func getTotalFloorSignal(state : IntelligenceFloorsState) : Float {
    state.totalFloorSignal
  };

  public func getTotalMicroSignal(state : IntelligenceFloorsState) : Float {
    state.totalMicroSignal
  };

  public func getSystemCoherence(state : IntelligenceFloorsState) : Float {
    state.systemCoherence
  };
}
