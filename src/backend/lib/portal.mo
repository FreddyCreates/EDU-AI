import Types "../types/portal";
import List  "mo:core/List";
import Time  "mo:core/Time";

module {
  // ── PRLT: Portal Transition Library ─────────────────────────────────────
  // Fibonacci ring buffer of size F(10) = 55

  let RING_SIZE : Nat = 55; // F(10)

  public type TransitionStore = {
    buffer : List.List<Types.PortalTransition>;
    state  : { var count : Nat };
  };

  public func newStore() : TransitionStore = {
    buffer = List.empty<Types.PortalTransition>();
    state  = { var count = 0 };
  };

  // ── logTransition ────────────────────────────────────────────────────────
  // Appends to circular buffer; evicts oldest when size reaches F(10)=55
  public func logTransition(
    store  : TransitionStore,
    from   : Text,
    to     : Text,
    userId : Text,
  ) {
    let entry : Types.PortalTransition = {
      fromPortal = from;
      toPortal   = to;
      userId;
      timestamp  = Time.now();
    };
    if (store.buffer.size() >= RING_SIZE) {
      // Evict oldest (front of list)
      ignore store.buffer.removeLast();
      // Insert at front by rebuilding — prepend via add + reverse trick
      // Since List is append-only, we drop the last (oldest = last) and add new at front
      // Strategy: keep most-recent at end, remove first element when full
      // We model ring buffer as: add to end, remove from front when full
      // removeLast removes newest — swap: remove at 0 by rebuild
      let arr = store.buffer.toArray();
      store.buffer.clear();
      // skip index 0 (oldest), re-add 1..end
      var i : Nat = 1;
      while (i < arr.size()) {
        store.buffer.add(arr[i]);
        i += 1;
      };
    };
    store.buffer.add(entry);
    store.state.count += 1;
  };

  // ── getRecentTransitions ─────────────────────────────────────────────────
  public func getRecentTransitions(
    store : TransitionStore,
    n     : Nat,
  ) : [Types.PortalTransition] {
    let all  = store.buffer.toArray();
    let size = all.size();
    // Return the last n entries (most recent)
    let start = if (n >= size) 0 else (size - n : Nat);
    let buf = List.empty<Types.PortalTransition>();
    var i = start;
    while (i < size) {
      buf.add(all[i]);
      i += 1;
    };
    buf.toArray();
  };

  // ── getTransitionCount ───────────────────────────────────────────────────
  // Returns the cumulative transition count (not capped at ring size)
  public func getTransitionCount(store : TransitionStore) : Nat {
    store.state.count;
  };
};
