import { StudentReport } from "./studentReportSchema";

export const createReport = async (data) => {
  try {
    const createData = await StudentReport.create(data);
    return createData;
  } catch (error) {
    throw error;
  }
};
export const getAllReport = async () => {
  try {
    const getReport = await StudentReport.findAll();
    return getReport;
  } catch (error) {
    throw error;
  }
};
export const getReportById = async (reportId) => {
  try {
    const getData = await StudentReport.findOne({ where: { id: reportId } });
    return getData;
  } catch (error) {
    throw error;
  }
};
export const updateReportById = async (reportId, updatedData) => {
  try {
    const report = await StudentReport.findOne({ where: { id: reportId } });
    if (!report) {
      return null;
    }
    const updatedReport = await report.update(updatedData);
    return updatedReport;

  } catch (error) {
    throw error
  }
};
export const deleteReportById = async function (reportId) {
  try {
    const deleteReport = await StudentReport.findOne({ where: { id: reportId } });
    if (deleteReport) {
      await deleteReport.destroy();
      return;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
