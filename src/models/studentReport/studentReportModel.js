import { StudentReport } from "./studentReportSchema";

export const createReport = async (data) => {
  try {
    const createData = await StudentReport.create(data);
    return createData;
  } catch (error) {
    throw error;
  }
};
export const getAllReport = async (page = 1, pageSize = 10) => {
  try {
    const parsedPage = parseInt(page);
    const parsedPageSize = parseInt(pageSize);
    const offset = (parsedPage - 1) * parsedPageSize;

    if (!page && !pageSize) {
      const getStudentReport = await StudentReport.findAll();
      return getStudentReport;
    }

    const getReport = await StudentReport.findAndCountAll({
      offset,
      limit: parsedPageSize,
    });
    const totalPages = Math.ceil(getReport.count / parsedPageSize);
    return {
      data: getReport.rows,
      currentPage: parsedPage,
      totalPages: totalPages,
      totalData: getReport.count,
    };
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
    throw error;
  }
};
export const deleteReportById = async function (reportId) {
  try {
    const deleteReport = await StudentReport.findOne({
      where: { id: reportId },
    });
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
