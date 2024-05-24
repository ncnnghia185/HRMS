const userRoutes = require("../src/users/userRoute");
const departmentRoutes = require("../src/departments/departmentRoutes");
const positionRoutes = require("../src/positions/positionRoutes");
const taskstatusRoutes = require("../src/task_status/taskstatusRoutes");
const employeeRoutes = require("../src/employees/employeeRoutes");
const clientRoutes = require("../src/clients/clientRoutes");
const projectRoutes = require("../src/projects/projectRoutes");
const projecttaskRoutes = require("../src/project_task/projecttaskRoutes");
const projectemployeeRoutes = require("../src/project_employees/projectemployeeRoutes");
const employeetaskRoutes = require("../src/employee_task/employeetaskRoutes");
const projectStatusRoutes = require("../src/project_status/projectstatusRoutes");
const initWebRoutes = (app) => {
  app.use("/api/users", userRoutes);
  app.use("/api/departments", departmentRoutes);
  app.use("/api/positions", positionRoutes);
  app.use("/api/task-status", taskstatusRoutes);
  app.use("/api/employees", employeeRoutes);
  app.use("/api/clients", clientRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/project-task", projecttaskRoutes);
  app.use("/api/project-employee", projectemployeeRoutes);
  app.use("/api/employee-task", employeetaskRoutes);
  app.use("/api/project-status", projectStatusRoutes);
};

module.exports = initWebRoutes;