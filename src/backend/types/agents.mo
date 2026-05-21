module {
  public type AgentRole = { #explainer; #quizmaster; #encourager; #guide; #assessor; #curator };

  public type Agent = {
    id : Text;
    name : Text;
    role : AgentRole;
    systemPrompt : Text;
    isActive : Bool;
    engine : Text;
    protocols : [Text];
    version : Text;
    registeredAt : Int;
    workspace : Text;
  };
};
