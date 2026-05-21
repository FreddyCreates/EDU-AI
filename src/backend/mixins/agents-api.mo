import Types "../types/agents";
import AgentsLib "../lib/agents";

mixin (agents : AgentsLib.AgentStore) {
  public query func getAgents() : async [Types.Agent] {
    AgentsLib.getAll(agents);
  };

  public query func getAgent(id : Text) : async ?Types.Agent {
    AgentsLib.getById(agents, id);
  };

  public query func getAgentsByWorkspace(workspace : Text) : async [Types.Agent] {
    AgentsLib.getByWorkspace(agents, workspace);
  };

  public query func getAgentsByProtocol(protocol : Text) : async [Types.Agent] {
    AgentsLib.getByProtocol(agents, protocol);
  };

  public query func getAgentsByEngine(engine : Text) : async [Types.Agent] {
    AgentsLib.getByEngine(agents, engine);
  };

  public query func getWorkspaces() : async [Text] {
    AgentsLib.listWorkspaces(agents);
  };
};
