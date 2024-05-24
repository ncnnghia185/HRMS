// Error query
const errorQuery = (error) => {
  throw new Error(error);
};

// Check exist result
const checkExistResult = (result) => {
  if (result.length === 0 || result.length === undefined)
    throw new Error("No results found");
  return true;
};

// Check missing update data
const checkUpdateData = (data) => {
  if (data === null || data === undefined || Object.values(data).length === 0)
    throw new Error("Missing update data");
  return true;
};

// Check permission add member to project
const permissionAddMember = (currentRole, newMemberRole) => {
  if (currentRole === "admin") {
    return ["pm", "member"].includes(newMemberRole);
  } else if (currentRole === "pm") {
    return newMemberRole === "member";
  }
  return false;
};

module.exports = {
  errorQuery,
  checkExistResult,
  checkUpdateData,
  permissionAddMember,
};
