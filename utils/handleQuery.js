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

// Update query
const updateQuery = (baseQuery, id, data) => {
  if (Object.keys(data).length === 0) {
    throw new Error("Please provide data to update this");
  }
  const conditon = parseInt(id);
  let query = baseQuery;

  let values = [];
  let index = 1;

  for (const key in data) {
    if (data[key] !== null || data[key] !== undefined || data[key] !== "") {
      if (index > 1) {
        query += `,${key} = $${index}`;
      } else {
        query += `${key} = $${index}`;
      }
      values.push(data[key]);
      index++;
    }
  }
  query += ` WHERE id = $${index} RETURNING *`;

  values.push(conditon);

  return {
    query,
    values,
  };
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
  updateQuery,
};
