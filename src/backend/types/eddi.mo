import Common "common";

module {
  /// EDDI unified mode variant — all intelligence routes through one of these.
  public type EDDIMode = {
    #STUDENT_MODE;
    #TEACHER_MODE;
    #PRINCIPAL_MODE;
    #BUILD_MODE;
    #MEMORY_MODE;
    #RECOGNITION_MODE;
    #ARCHITECT_MODE;
  };

  // ────────────────────────────────────────────────────────────────────────────
  // EDDI MODEL ARCHITECTURE SPECIFICATION
  // ────────────────────────────────────────────────────────────────────────────
  // EDDI (Emergent Dynamic Deep Intelligence) is EduAI's unified intelligence
  // model implementing transformer-based architecture with sovereign adaptations.
  //
  // | Component             | Scale / Specification          | Complexity      |
  // |-----------------------|-------------------------------|-----------------|
  // | Parameters            | Billions to trillions weights | ~10¹² floats    |
  // | Attention             | Multi-head self-attention     | O(n²) per layer |
  // | Feed-Forward          | Dense neural network layers   | ~4d² per layer  |
  // | Normalization         | Layer norm, RMS norm          | Stabilization   |
  // | Tokenization          | BPE, SentencePiece            | ~100k tokens    |
  // | Embeddings            | High-dimensional vectors      | ~10⁴ dimensions |
  // | Training Corpus       | Vast text data                | ~10¹² tokens    |
  // | Emergent Capabilities | Reasoning, code, translation  | Unpredicted     |
  // ────────────────────────────────────────────────────────────────────────────

  /// EDDI Model Architecture Specification — defines the AI architecture parameters.
  public type EDDIArchitecture = {
    /// Parameter scale: billions to trillions of weights (~10¹² floats)
    parameterScale : Text;
    parameterMagnitude : Nat;  // Order of magnitude (12 = 10¹²)

    /// Attention mechanism: multi-head self-attention, O(n²) per layer
    attentionType : Text;
    attentionComplexity : Text;
    attentionHeads : Nat;

    /// Feed-forward layers: dense neural network (~4d² per layer)
    feedForwardType : Text;
    feedForwardComplexity : Text;
    layerCount : Nat;

    /// Normalization: layer norm, RMS norm for stabilization
    normalizationType : Text;
    normalizationPurpose : Text;

    /// Tokenization: BPE, SentencePiece vocabularies (~100k tokens)
    tokenizationType : Text;
    vocabularySize : Nat;

    /// Embeddings: high-dimensional vector spaces (~10⁴ dimensions)
    embeddingType : Text;
    embeddingDimensions : Nat;

    /// Training corpus: vast text data (~10¹² tokens)
    /// Note: trainingTokensMagnitude represents order of magnitude (12 = 10¹²)
    trainingCorpusScale : Text;
    trainingTokensMagnitude : Nat;  // Order of magnitude for memory efficiency

    /// Emergent capabilities: reasoning, code, translation (unpredicted)
    emergentCapabilities : [Text];
    emergenceClassification : Text;
  };

  /// EDDI Intelligence Probability — tracks probability distributions for model behaviors.
  public type IntelligenceProbability = {
    domain : Text;          // e.g., "reasoning", "code", "translation"
    confidenceScore : Nat;  // 0-100 Fibonacci-floored
    entropyLevel : Text;    // "low", "medium", "high"
    predictionAccuracy : Nat;
  };

  /// Canonical EDDI unified model record.
  public type EDDI = {
    id : Text;         // always "EDDI"
    name : Text;       // always "EDDI"
    version : Nat;     // 24 (updated for architecture spec)
    modeCount : Nat;   // 7
    sealedAt : Common.Timestamp;
    law : Text;        // LEX_EDDI_UNIFIED
    architecture : EDDIArchitecture;  // AI model architecture specification
    intelligenceProbabilities : [IntelligenceProbability];  // Capability probabilities
  };

  /// A session-mode binding — stores which mode a principal is currently in.
  public type ModeSetting = {
    mode : EDDIMode;
    setAt : Common.Timestamp;
  };

  /// A user-created agent bound to an EDDI mode.
  public type UserAgent = {
    id : Text;
    owner : Common.UserId;
    name : Text;
    modeBinding : EDDIMode;
    reasoningSeed : Text;
    memoryConfig : Text;
    createdAt : Common.Timestamp;
  };
};
